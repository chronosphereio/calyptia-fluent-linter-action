import { getInput, setFailed, debug } from '@actions/core';
import * as glob from '@actions/glob';
import { readContent } from './utils/readContent';
import { FluentBitSchema, TokenError } from '@calyptia/fluent-bit-config-parser';
import fetch from 'node-fetch';
import { CALYPTIA_API_ENDPOINT, CALYPTIA_API_VALIDATION_PATH, PROBLEM_MATCHER_FILE_NAME } from './utils/constants';
import { Annotation, FieldErrors, normalizeErrors, relativeFilePath } from './utils/normalizeErrors';
import { formatErrorsPerFile } from './formatErrorsPerFile';
import { resolve } from 'path';
export enum InputValues {
  CONFIG_LOCATION_GLOB = 'CONFIG_LOCATION_GLOB',
  CALYPTIA_API_KEY = 'CALYPTIA_API_KEY',
}

type ValidationResponse = { errors?: FieldErrors };

const getActionInput = () => {
  return Object.keys(InputValues).reduce((memo, prop) => {
    const value = getInput(prop);
    return { ...memo, [prop]: value };
  }, {} as Record<keyof typeof InputValues, string>);
};

export const main = async (): Promise<void> => {
  const input = getActionInput();

  const globber = await glob.create(input.CONFIG_LOCATION_GLOB, { matchDirectories: false });

  let annotations = [] as Annotation[];
  const location = resolve(__dirname, PROBLEM_MATCHER_FILE_NAME);
  console.log(`::add-matcher::${location}`);

  for await (const filePath of globber.globGenerator()) {
    debug(`evaluating file ${filePath}`);

    const content = await readContent(filePath);

    if (FluentBitSchema.isFluentBitConfiguration(content)) {
      debug(`File ${filePath} seems to be Fluent Bit config, validating...`);

      const URL = `${CALYPTIA_API_ENDPOINT}/${CALYPTIA_API_VALIDATION_PATH}`;

      const headers = {
        'Content-Type': 'application/json',
        'x-project-token': input.CALYPTIA_API_KEY,
      };

      try {
        const config = new FluentBitSchema(content, filePath);
        const response = (await fetch(URL, {
          method: 'POST',
          body: JSON.stringify(config.schema),
          headers,
        })) as Response;

        const data = (await response.json()) as unknown as ValidationResponse;

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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (e) {
        if (e instanceof TokenError) {
          const { filePath: _filePath, line, col, message } = e as TokenError;
          const errorReport = formatErrorsPerFile(relativeFilePath(_filePath), [['PARSE', [[line, col, message]]]]);
          console.log(errorReport);
        } else {
          setFailed((e as Error).message);
        }
        setFailed('We found an error, please check, please check your logs');
      }
    }
  }

  if (annotations.length) {
    const groupedByFile = annotations.reduce((memo, { filePath, errorGroups }) => {
      memo[filePath] = memo[filePath] ? [...memo[filePath], ...errorGroups] : errorGroups;

      return memo;
    }, {} as Record<string, unknown[]>);
    for (const file in groupedByFile) {
      console.log(formatErrorsPerFile(file, groupedByFile[file] as Annotation['errorGroups']));
    }
    setFailed('We found errors in your configurations. Please check your logs');
  }
};
