import type { AnnotationProperties } from '@actions/core';
export type FieldErrors = Record<string, Record<string, string[]>>;

export type Annotation = AnnotationProperties & { group: string };
export function normalizeErrors(filePath: string, { runtime, ...errors }: FieldErrors): Annotation[] {
  const annotations = Object.entries(errors).reduce((memo, [group, issues]) => {
    if (Object.keys(issues).length) {
      const errGroup = Object.entries(issues).map(([group, problems]) => `[${group}]: ${problems.join(',')}`);

      return [...memo, { file: filePath, title: `${errGroup.join('\n')}`, group }];
    }

    return memo;
  }, [] as Annotation[]);

  return annotations;
}
