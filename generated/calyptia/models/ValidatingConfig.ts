/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Validating configuration request body.
 */
export type ValidatingConfig = {
  config: Array<{
    command: string;
    name: string;
    optional?: Record<string, string> | null;
    id: string;
  }>;
};
