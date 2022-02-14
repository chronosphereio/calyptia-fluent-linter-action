/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CreatePipelineFile } from './CreatePipelineFile';
import type { CreatePipelineSecret } from './CreatePipelineSecret';

/**
 * Create pipeline request body.
 */
export type CreatePipeline = {
  /**
   * DNS label format as of defined on RFC1123
   */
  name: string;
  replicasCount: number;
  rawConfig: string;
  secrets: Array<CreatePipelineSecret> | null;
  files: Array<CreatePipelineFile> | null;
  resourceProfile: string;
  autoCreatePortsFromConfig: boolean;
  metadata?: {
    nodeSelector?: any;
  } | null;
};
