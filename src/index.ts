import { getInput, setFailed, debug, error, type AnnotationProperties } from '@actions/core';
import * as glob from '@actions/glob';
import { readContent } from './utils/readContent';
import { FluentBitSchema } from '@calyptia/fluent-bit-config-parser';
import fetch from 'node-fetch';
import { CALYPTIA_API_ENDPOINT, CALYPTIA_API_VALIDATION_PATH } from './utils/constants';
import { FieldErrors, normalizeErrors } from './utils/normalizeErrors';
export enum ExtraOptions {
  HTTP_TIMEOUT = 'HTTP_TIMEOUT',
  MAX_RETRIES = 'MAX_RETRIES',
  SUCCEED_ON_FUNCTION_FAILURE = 'SUCCEED_ON_FUNCTION_FAILURE',
}

export enum InputValues {
  CONFIG_LOCATION_GLOB = 'CONFIG_LOCATION_GLOB',
  CALYPTIA_API_KEY = 'CALYPTIA_API_KEY',
  GITHUB_TOKEN = 'GITHUB_TOKEN',
}

type ValidationResponse = { errors: FieldErrors };

const getActionInput = () => {
  return Object.keys(InputValues).reduce((memo, prop) => {
    const value = getInput(prop);
    return value ? { ...memo, [prop]: value } : memo;
  }, {} as Record<keyof typeof InputValues, string>);
};

export const main = async () => {
  try {
    const input = getActionInput();

    const globber = await glob.create(input.CONFIG_LOCATION_GLOB, { matchDirectories: false });

    let annotations = [] as AnnotationProperties[];

    for await (const filePath of globber.globGenerator()) {
      debug(`evaluating file ${filePath}`);

      const content = await readContent(filePath);

      if (FluentBitSchema.isFluentBitConfiguration(content)) {
        debug(`File ${filePath} seems to be fluent-bit config, validating...`);

        const URL = `${CALYPTIA_API_ENDPOINT}/${CALYPTIA_API_VALIDATION_PATH}`;

        const headers = {
          'Content-Type': 'application/json',
          'x-project-token': input.CALYPTIA_API_KEY,
        };

        try {
          const config = new FluentBitSchema(content);

          const response = (await fetch(URL, {
            method: 'POST',
            body: JSON.stringify(config.schema),
            headers,
          })) as Response;

          const data = (await response.json()) as unknown as ValidationResponse;
          if (response.status === 200) {
            debug(`[${filePath}]: ${JSON.stringify(data)}`);

            const errors = normalizeErrors(filePath, data.errors);
            if (errors.length) {
              annotations = [...annotations, ...errors];
            }
          } else {
            setFailed(`The request failed:  ${JSON.stringify(data)}`);
          }
        } catch (e) {
          setFailed(`something went very wrong ${JSON.stringify((e as Error).message)}`);
        }
      }
    }

    if (annotations.length) {
      for (const annotation of annotations) {
        error(new Error('Linting Error'), annotation);
      }

      setFailed('We found errors in your configurations');
    }
  } catch (error) {
    setFailed(JSON.stringify(error));
  }
};
