import { getInput, setFailed, debug, error, type AnnotationProperties } from '@actions/core';
import * as glob from '@actions/glob';
import { readContent } from './utils/readContent';
import { FluentBitSchema } from '@calyptia/fluent-bit-config-parser';
import fetch from 'node-fetch';
import { CALYPTIA_API_ENDPOINT, CALYPTIA_API_VALIDATION_PATH } from './utils/constants';
import { operations } from '../api';
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

type r200 = operations['agentConfigValidation']['responses']['200']['content']['application/json'];

type r401 = operations['agentConfigValidation']['responses']['401']['content']['application/json'];

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

    const annotations = [] as AnnotationProperties[];

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
            method: 'post',
            body: JSON.stringify(config),
            headers,
          })) as Response;

          if (response.status === 200) {
            const data = response.json() as unknown as r200;
            debug(`[${filePath}]: ${JSON.stringify(data)}`);
          } else {
            const data = response.json() as unknown as r401;
            annotations.push({ file: filePath, title: data.error });
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
