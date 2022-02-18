/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Pipeline port model.
 */
export type PipelinePort = {
  id: string;
  protocol: string;
  frontendPort: number;
  backendPort: number;
  endpoint: string;
  createdAt: string;
  updatedAt: string;
};
