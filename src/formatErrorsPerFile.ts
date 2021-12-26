import { Annotation } from './utils/normalizeErrors';
import { table } from 'table';
import { NO_STYLES_IN_TABLE } from './utils/constants';

const DEFAULT_LINE_AND_COLUMN = '0:0';
const ISSUE_LEVEL = 'error';
export function formatErrorsPerFile(errorGroups: Annotation['errorGroups']): string {
  const data = [] as string[][];

  for (const [group, errors] of errorGroups) {
    for (const reason of errors) {
      data.push([DEFAULT_LINE_AND_COLUMN, ISSUE_LEVEL, group, reason]);
    }
  }

  return table(data, NO_STYLES_IN_TABLE);
}
