import { getInput, setFailed, debug } from '@actions/core';
import * as glob from '@actions/glob';
import { readContent } from './utils/readContent';
import { FluentBitSchema, TokenError } from '@calyptia/fluent-bit-config-parser';
import fetch, { Headers } from 'node-fetch';
import { ACTION_MESSAGES, CALYPTIA_API_ENDPOINT, FALSE_VALUE, PROBLEM_MATCHER_FILE_NAME } from './utils/constants';
import { Annotation, normalizeErrors, getRelativeFilePath, IdError } from './utils/normalizeErrors';
import { formatErrorsPerFile } from './formatErrorsPerFile';
import { resolve } from 'path';
import { ConfigValidatorV2Service, OpenAPI, ValidatingConfig } from '../generated/calyptia';
export enum InputValues {
  CONFIG_LOCATION_GLOB = 'CONFIG_LOCATION_GLOB',
  CALYPTIA_API_KEY = 'CALYPTIA_API_KEY',
  FOLLOW_SYMBOLIC_LINKS = 'FOLLOW_SYMBOLIC_LINKS',
}

const getActionInput = () => {
  return Object.keys(InputValues).reduce((memo, prop) => {
    const value = getInput(prop);
    return { ...memo, [prop]: value };
  }, {} as Record<keyof typeof InputValues, string>);
};

global.Headers = Headers;
global.fetch = fetch;

export const main = async (): Promise<void> => {
  const { FOLLOW_SYMBOLIC_LINKS = FALSE_VALUE, CONFIG_LOCATION_GLOB, CALYPTIA_API_KEY } = getActionInput();

  const globber = await glob.create(CONFIG_LOCATION_GLOB, {
    matchDirectories: false,
    followSymbolicLinks: FOLLOW_SYMBOLIC_LINKS !== FALSE_VALUE,
  });

  const files = await globber.glob();

  if (!files.length) {
    setFailed(`We could not find any files from using the provided GLOB (${CONFIG_LOCATION_GLOB})`);
  }

  let annotations = [] as Annotation[];
  let config: FluentBitSchema;
  const location = resolve(__dirname, PROBLEM_MATCHER_FILE_NAME);
  console.log(`::add-matcher::${location}`);

  for await (const filePath of files) {
    debug(`evaluating file ${filePath}`);

    const content = await readContent(filePath);

    if (FluentBitSchema.isFluentBitConfiguration(content)) {
      debug(`File ${filePath} seems to be Fluent Bit config, validating...`);

      const headers = {
        'Content-Type': 'application/json',
        'x-project-token': CALYPTIA_API_KEY,
      };

      try {
        config = new FluentBitSchema(content, filePath);

        if (!config.schema.length) {
          debug(`${filePath}: Empty schema, moving on...`);
          continue;
        }

        OpenAPI.BASE = CALYPTIA_API_ENDPOINT;
        OpenAPI.HEADERS = headers;

        const sectionsWithoutNames = config.schema.filter(({ name }) => !name);

        if (sectionsWithoutNames.length) {
          // We will log the errors found and skip the file giving that we can not really validate without a name in the section.
          const errors = sectionsWithoutNames.map((section) => [section.id, 'attribute "name" missing'] as IdError);
          annotations.push({ filePath: getRelativeFilePath(filePath), errors });

          debug(
            `We have skipped ${getRelativeFilePath(
              filePath
            )}. It seems to be missing in some sections the name attribute.`
          );

          continue;
        }

        const response = await ConfigValidatorV2Service.validateConfigV2({
          config: config.schema as ValidatingConfig['config'],
        });

        if (response.errors) {
          const errors = normalizeErrors(filePath, response.errors);

          debug(`${filePath}, Found errors: ${JSON.stringify(errors, null, 2)}`);
          annotations = [...annotations, ...errors];
        }
      } catch (e) {
        if (e instanceof TokenError) {
          const { filePath: _filePath, line, col, message } = e as TokenError;
          const errorReport = formatErrorsPerFile(getRelativeFilePath(_filePath), [[line, col, message]]);
          console.log(errorReport);
        } else {
          setFailed((e as Error).message);
        }
        setFailed(ACTION_MESSAGES.FATAL_ERROR);
      }
    }
  }

  if (annotations.length) {
    console.log(JSON.stringify(annotations, null, 2));
    const groupedByFile = annotations.reduce((memo, { filePath, errors }) => {
      memo[filePath] = memo[filePath] ? [...memo[filePath], ...errors] : errors;

      return memo;
    }, {} as Record<string, unknown[]>);
    for (const file in groupedByFile) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      console.log(formatErrorsPerFile(file, groupedByFile[file] as Annotation['errors'], config!));
    }
    setFailed(ACTION_MESSAGES.CONFIG_ERRORS);
  }
};
