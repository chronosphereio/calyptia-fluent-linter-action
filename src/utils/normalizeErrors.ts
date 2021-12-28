import { join } from 'path';
import { AGENT_TYPE } from './constants';

type FieldError = { [key: string]: string[] };
export type FieldErrors = Record<string, FieldError>;

type ErrorGroup = [group: string, reasons: string[]];
export type Annotation = { filePath: string; errorGroups: ErrorGroup[]; section: string };

declare let process: {
  env: {
    GITHUB_WORKSPACE: string;
  };
};

function relativeFilePath(filePath: string): string {
  return filePath.replace(join(process.env.GITHUB_WORKSPACE, '/'), '');
}

export function normalizeErrors(filePath: string, agentType: AGENT_TYPE, fieldErrors: FieldErrors): Annotation[] {
  if (agentType === AGENT_TYPE.FLUENT_BIT) {

    for (const issue of fieldErrors) {
    }
    const annotations = Object.entries(fieldErrors).reduce((memo, [command, issues]) => {
      const issues = fieldErrors[command];
      if (Object.keys(issues).length) {
        const errorGroups = Object.entries(issues);

        return [...memo, { filePath: relativeFilePath(filePath), section: command, errorGroups }];
      }

      return memo;
    }, [] as unknown[]);

    return annotations;
  }


  return runtime.filter(Boolean);
}
