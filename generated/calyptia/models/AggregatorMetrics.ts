/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { MetricFields } from './MetricFields';

/**
 * Agent metrics model.
 */
export type AggregatorMetrics = {
  measurements: Record<
    string,
    {
      metrics: Record<string, Array<MetricFields>>;
      totals: Record<string, Array<MetricFields>>;
    }
  >;
};
