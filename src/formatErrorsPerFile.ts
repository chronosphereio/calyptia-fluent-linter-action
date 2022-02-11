import type { Annotation } from './utils/normalizeErrors';
import { table } from 'table';
import { NO_STYLES_IN_TABLE } from './utils/constants';
import { isString } from './utils/guards';

const DEFAULT_LINE_AND_COLUMN = '0:0';
const ISSUE_LEVEL = 'error';
export function formatErrorsPerFile(filePath: string, errorGroups: Annotation['errorGroups']): string {
  const data = [] as string[][];

  for (const [group, errors] of errorGroups) {
    for (const reason of errors) {
      if (isString(reason)) {
        data.push([`${filePath}:`, DEFAULT_LINE_AND_COLUMN, ISSUE_LEVEL, group, reason]);
      } else {
        const [line, col, message] = reason;
        data.push([`${filePath}:`, `${line}:${col}`, ISSUE_LEVEL, group, message]);
      }
    }
  }

  return table(data, NO_STYLES_IN_TABLE);
}
