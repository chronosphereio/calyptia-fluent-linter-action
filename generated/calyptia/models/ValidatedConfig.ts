/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Validate config response body.
 */
export type ValidatedConfig = {
  errors: {
    runtime: Array<string>;
    input: Record<string, Array<string>>;
    output: Record<string, Array<string>>;
    filter: Record<string, Array<string>>;
  };
};
