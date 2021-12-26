export type FieldErrors = Record<string, Record<string, string[]>>;

type ErrorGroup = [group: string, reasons: string[]];
export type Annotation = { filePath: string; errorGroups: ErrorGroup[]; section: string };
export function normalizeErrors(filePath: string, { runtime, ...errors }: FieldErrors): Annotation[] {
  const annotations = Object.entries(errors).reduce((memo, [command, issues]) => {
    if (Object.keys(issues).length) {
      const errorGroups = Object.entries(issues);

      return [...memo, { filePath, section: command, errorGroups }];
    }

    return memo;
  }, [] as Annotation[]);

  return annotations;
}
