import type { Annotation } from './utils/normalizeErrors';
import { table } from 'table';
import { NO_STYLES_IN_TABLE } from './utils/constants';
import { isFullError } from './utils/guards';
import type { FluentBitSchema } from '@calyptia/fluent-bit-config-parser';

const DEFAULT_LINE_AND_COLUMN = '0:0';
const ISSUE_LEVEL = 'error';
export function formatErrorsPerFile(
  filePath: string,
  errorGroups: Annotation['errors'],
  schema?: FluentBitSchema
): string {
  const data = [] as string[][];

  for (const error of errorGroups) {
    let content = [];
    console.log('error:', error);
    if (isFullError(error)) {
      const [line, col, message] = error;
      content = [`${filePath}:`, `${line}:${col}`, ISSUE_LEVEL, 'LINTER', message];
    } else {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const tokens = schema!.getTokensBySectionId(error[0]);

      if (tokens) {
        content = [`${filePath}:`, `${tokens[0].line}:${tokens[0].col}`, ISSUE_LEVEL, 'LINTER', error[1]];
      } else {
        content = [`${filePath}:`, DEFAULT_LINE_AND_COLUMN, ISSUE_LEVEL, 'LINTER', error[1]];
      }
    }
    data.push(content);
  }
  return table(data, NO_STYLES_IN_TABLE);
}
