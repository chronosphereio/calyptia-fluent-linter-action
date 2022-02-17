/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ConfigValidityV2Property } from './ConfigValidityV2Property';
import type { ConfigValidityV2Runtime } from './ConfigValidityV2Runtime';

/**
 * Validation V2 config response.
 */
export type ValidatedConfigV2 = {
  errors: {
    runtime: Array<ConfigValidityV2Runtime>;
    input: Record<string, Array<ConfigValidityV2Property>>;
    output: Record<string, Array<ConfigValidityV2Property>>;
    filter: Record<string, Array<ConfigValidityV2Property>>;
  };
};
