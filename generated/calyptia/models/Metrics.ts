/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { MetricFields } from './MetricFields';

/**
 * Metrics model.
 */
export type Metrics = {
  metrics: Record<string, Array<MetricFields>>;
};
