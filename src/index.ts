import { getInput, setFailed, debug } from '@actions/core';
import * as glob from '@actions/glob';
import { readContent } from './utils/readContent';
import { FluentBitSchema, TokenError } from '@calyptia/fluent-bit-config-parser';
import fetch, { Headers } from 'node-fetch';
import {
  ACTION_MESSAGES,
  ATTRIBUTE_NAME_MISSING,
  CALYPTIA_API_ENDPOINT,
  FALSE_VALUE,
  PROBLEM_MATCHER_FILE_NAME,
} from './utils/constants';
import { Annotation, normalizeErrors, getRelativeFilePath, FullError } from './utils/normalizeErrors';
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

OpenAPI.BASE = CALYPTIA_API_ENDPOINT;

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

        OpenAPI.HEADERS = headers;
        const sectionsWithoutNames = config.schema.filter(({ name }) => !name);

        if (sectionsWithoutNames.length) {
          const sectionsWithoutNamesErrors = [];
          // We will log the errors found and skip the file giving that we can not really validate without a name in the section.
          for (const section of sectionsWithoutNames) {
            const tokens = config.getTokensBySectionId(section.id);
            if (tokens) {
              sectionsWithoutNamesErrors.push([tokens[0].line, tokens[0].col, ATTRIBUTE_NAME_MISSING] as FullError);
            }
          }
          annotations.push({ filePath: getRelativeFilePath(filePath), errors: sectionsWithoutNamesErrors });
          debug(
            `We have skipped ${getRelativeFilePath(
              filePath
            )}. It seems to be missing the name attribute, in some sections. These errors will be annotated.`
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
