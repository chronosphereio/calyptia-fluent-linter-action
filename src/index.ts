import { getInput, setFailed, debug } from '@actions/core';
import * as glob from '@actions/glob';
import { readContent } from './utils/readContent';
import { FluentBitSchema, TokenError } from '@calyptia/fluent-bit-config-parser';
import fetch from 'node-fetch';
import {
  CALYPTIA_API_ENDPOINT,
  CALYPTIA_API_VALIDATION_PATH,
  FALSE_VALUE,
  PROBLEM_MATCHER_FILE_NAME,
} from './utils/constants';
import { Annotation, normalizeErrors, getRelativeFilePath } from './utils/normalizeErrors';
import { formatErrorsPerFile } from './formatErrorsPerFile';
import { resolve } from 'path';
import type { ValidatedConfigV2 } from '../generated/calyptia';
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

export const main = async (): Promise<void> => {
  const { FOLLOW_SYMBOLIC_LINKS = 'false', CONFIG_LOCATION_GLOB, CALYPTIA_API_KEY } = getActionInput();

  let followSymbolicLinks = false;
  if (!FOLLOW_SYMBOLIC_LINKS) {
    followSymbolicLinks = (FOLLOW_SYMBOLIC_LINKS && FOLLOW_SYMBOLIC_LINKS.toLowerCase() !== FALSE_VALUE) || false;
  }
  const globber = await glob.create(CONFIG_LOCATION_GLOB, {
    matchDirectories: false,
    followSymbolicLinks,
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

      const URL = `${CALYPTIA_API_ENDPOINT}/${CALYPTIA_API_VALIDATION_PATH}`;

      const headers = {
        'Content-Type': 'application/json',
        'x-project-token': CALYPTIA_API_KEY,
      };

      try {
        config = new FluentBitSchema(content, filePath);
        const response = (await fetch(URL, {
          method: 'POST',
          body: JSON.stringify({ config: config.schema }),
          headers,
        })) as Response;

        const data = (await response.json()) as ValidatedConfigV2;

        if (response.status === 200) {
          debug(`[${filePath}]: ${JSON.stringify(data)}`);

          if (data.errors) {
            const errors = normalizeErrors(filePath, data.errors);

            debug(`${filePath}, Found errors: ${JSON.stringify(errors, null, 2)}`);
            annotations = [...annotations, ...errors];
          }
        } else {
          setFailed(`The request failed:  status: ${response.status}, data: ${JSON.stringify(data)}`);
        }
      } catch (e) {
        if (e instanceof TokenError) {
          const { filePath: _filePath, line, col, message } = e as TokenError;
          const errorReport = formatErrorsPerFile(getRelativeFilePath(_filePath), [[line, col, message]]);
          console.log(errorReport);
        } else {
          setFailed((e as Error).message);
        }
        setFailed('We found an error, please check, please check your logs');
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
    setFailed('We found errors in your configurations. Please check your logs');
  }
};
