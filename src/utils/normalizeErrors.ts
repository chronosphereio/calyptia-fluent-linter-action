import { join } from 'path';
import { AGENT_TYPE } from './constants';

type FieldError = { [key: string]: string[] };

type RuntimeErrors = { runtime: string[] };

type ErrorGroup = [group: string, reasons: string[]];
export type FluentBitErrors = Record<string, FieldError>;
export type Annotation = { filePath: string; errorGroups: ErrorGroup[]; section: string };

declare let process: {
  env: {
    GITHUB_WORKSPACE: string;
  };
};

export type FieldErrors = FluentBitErrors & RuntimeErrors;

function relativeFilePath(filePath: string): string {
  return filePath.replace(join(process.env.GITHUB_WORKSPACE, '/'), '');
}

export function normalizeErrors(filePath: string, agentType: AGENT_TYPE, errors: FieldErrors): Annotation[] {
  const { runtime, ...fieldErrors } = errors;
  if (agentType === AGENT_TYPE.FLUENT_BIT) {
    const annotations = Object.entries(fieldErrors).reduce((memo, [command, issues]) => {
      if (Object.keys(issues).length) {
        const errorGroups = Object.entries(issues);

        return [...memo, { filePath: relativeFilePath(filePath), section: command, errorGroups }];
      }

      return memo;
    }, [] as Annotation[]);

    return annotations;
  }

  return [
    {
      filePath: relativeFilePath(filePath),
      section: 'runtime',
      errorGroups: [['runtime', runtime.filter(Boolean)]],
    },
  ];
}
