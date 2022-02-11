import type { Annotation } from './utils/normalizeErrors';
import { table } from 'table';
import { NO_STYLES_IN_TABLE } from './utils/constants';

const DEFAULT_LINE = 0;
const DEFAULT_COLUMN = 0;
const ISSUE_LEVEL = 'error';
type AnnotationTuple = [filePath: string, loc: string, issueLevel: string, message: string];
type FormatErrorProps = {
  filePath: string;
  message: string;
  line: number;
  col: number;
  issueLevel?: string;
};
export function formatError({
  filePath,
  line,
  col,
  issueLevel = ISSUE_LEVEL,
  message,
}: FormatErrorProps): AnnotationTuple {
  return [`${filePath}:`, `${line}:${col}`, issueLevel, message];
}
export function formatErrorsPerFile(filePath: string, errorGroups: Annotation['errorGroups']): string {
  const data = [] as string[][];

  for (const [group, errors] of errorGroups) {
    for (const reason of errors) {
      data.push(
        formatError({
          filePath,
          line: DEFAULT_LINE,
          col: DEFAULT_COLUMN,
          issueLevel: ISSUE_LEVEL,
          message: `${group} ${reason}`,
        })
      );
    }
  }

  return table(data, NO_STYLES_IN_TABLE);
}
