/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Create aggregator request body.
 */
export type CreateAggregator = {
  name: string;
  addHealthCheckPipeline: boolean;
  healthCheckPipelinePort: number;
};
