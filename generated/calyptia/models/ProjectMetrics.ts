/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Metrics } from './Metrics';

/**
 * Project metrics model.
 */
export type ProjectMetrics = {
  measurements: Record<
    string,
    {
      totals: Record<string, number | null>;
      plugins: Record<string, Metrics>;
    }
  >;
  topPlugins: Record<string, Record<string, number | null>>;
};
