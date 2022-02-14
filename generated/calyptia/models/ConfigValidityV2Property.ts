/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Property of the validated configuration section
 */
export type ConfigValidityV2Property = {
  /**
   * ID of the configuration section
   */
  id: string;
  /**
   * property name
   */
  property: string;
  /**
   * property name, value
   */
  text: string;
  errors: Array<string>;
};
