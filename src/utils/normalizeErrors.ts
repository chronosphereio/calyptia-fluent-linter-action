import type { AnnotationProperties } from '@actions/core';
export type FieldErrors = Record<string, Record<string, string[]>>;

export type Annotation = AnnotationProperties & { problems: string };
export function normalizeErrors(filePath: string, { runtime, ...errors }: FieldErrors): Annotation[] {
  const annotations = Object.entries(errors).reduce((memo, [command, issues]) => {
    if (Object.keys(issues).length) {
      const errGroup = Object.entries(issues).map(([group, problems]) => `[${group}]: ${problems.join('\n')}`);

      return [
        ...memo,
        { file: filePath, problems: `${errGroup.join('\n')}`, title: `Problems found in command ${command}` },
      ];
    }

    return memo;
  }, [] as Annotation[]);

  return annotations;
}
