/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UpdatePipelineFile } from './UpdatePipelineFile';
import type { UpdatePipelineSecret } from './UpdatePipelineSecret';

/**
 * Update pipeline request body.
 */
export type UpdatePipeline = {
  /**
   * DNS label format as of defined on RFC1123
   */
  name?: string | null;
  replicasCount?: number | null;
  rawConfig?: string | null;
  secrets?: Array<UpdatePipelineSecret> | null;
  files?: Array<UpdatePipelineFile> | null;
  resourceProfile?: string | null;
  autoCreatePortsFromConfig?: boolean | null;
  metadata?: {
    nodeSelector?: any;
  } | null;
};
