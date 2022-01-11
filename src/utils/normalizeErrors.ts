import { join } from 'path';

export type FieldErrors = Record<string, Record<string, string[]>>;
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
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function normalizeErrors(filePath: string, { runtime, ...errors }: FieldErrors): Annotation[] {
  const annotations = Object.entries(errors).reduce((memo, [command, issues]) => {
    if (Object.keys(issues).length) {
      const errorGroups = Object.entries(issues);

      return [...memo, { filePath: relativeFilePath(filePath), section: command, errorGroups }];
    }

    return memo;
  }, [] as Annotation[]);

  return annotations;
}
