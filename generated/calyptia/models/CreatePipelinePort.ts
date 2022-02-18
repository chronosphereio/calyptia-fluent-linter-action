/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Create pipeline port request body.
 */
export type CreatePipelinePort = {
  protocol: string;
  frontendPort: number;
  backendPort: number;
  endpoint: string;
};
