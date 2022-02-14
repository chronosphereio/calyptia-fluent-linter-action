/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { MetricFields } from './MetricFields';
import type { Metrics } from './Metrics';

/**
 * Agent metrics model.
 */
export type AgentMetrics = {
  measurements: Record<
    string,
    {
      plugins: Record<string, Metrics>;
      totals: Record<string, Array<MetricFields>>;
    }
  >;
};
