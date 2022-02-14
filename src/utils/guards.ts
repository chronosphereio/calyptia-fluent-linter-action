import type { FullError } from './normalizeErrors';

export const isString = (value: unknown): value is string => typeof value === 'string';

export const isFullError = (content: unknown): content is FullError => Array.isArray(content) && content.length === 3;
