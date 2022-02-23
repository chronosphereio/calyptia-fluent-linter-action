import { join } from 'path';
import type { ValidatedConfigV2 } from '../../generated/calyptia';

export type IdError = [id: string, message: string];

export type FullError = [line: number, col: number, reason: string];
type ErrorGroup = IdError | FullError;
export type Annotation = { filePath: string; errors: ErrorGroup[] };

declare let process: {
  env: {
    GITHUB_WORKSPACE: string;
  };
};

/**
 * There are errors we can not ignore in runtime, but we know are not relevant for linting purposes.
 * This ignore list should help us filter these out
 */
const IGNORE_LIST = ['Error binding socket'];
export function getRelativeFilePath(filePath: string): string {
  const relativePath = filePath.replace(join(process.env.GITHUB_WORKSPACE, '/'), '');

  // We add the ./ to the relative path to match the problem matcher.
  return `./${relativePath}`;
}
export function normalizeErrors(filePath: string, errors: ValidatedConfigV2['errors']): Annotation[] {
  const annotations = [] as Annotation[];

  const relativeFilePath = getRelativeFilePath(filePath);

  const { runtime, ...rest } = errors;

  if (runtime.length) {
    for (const error of runtime) {
      const issues = error.errors.filter((err) => !IGNORE_LIST.includes(err));

      // We skip the error report if we don't have issues left.
      if (!issues.length) {
        continue;
      }
      annotations.push({ filePath: relativeFilePath, errors: issues.map((err) => [error.id, err]) });
    }
  }
  for (const command in rest) {
    const issues = rest[command as keyof typeof rest];

    if (Object.keys(issues).length) {
      const errors = Object.entries(issues).reduce((memo, [, errs]) => {
        return [...memo, ...errs.map(({ id, errors }) => [id, errors.join('\n')] as ErrorGroup)];
      }, [] as ErrorGroup[]);

      annotations.push({ filePath: relativeFilePath, errors });
    }
  }

  return annotations;
}
