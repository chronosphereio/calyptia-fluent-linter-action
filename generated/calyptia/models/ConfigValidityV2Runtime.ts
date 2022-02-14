/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Runtime errors for the validated configuration.
 */
export type ConfigValidityV2Runtime = {
  errors: Array<string>;
  /**
   * Id of the configuration section
   */
  id: string;
};
