/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PipelineConfig } from './PipelineConfig';
import type { PipelineStatus } from './PipelineStatus';
import type { ResourceProfile } from './ResourceProfile';

/**
 * Pipeline model.
 */
export type Pipeline = {
  id: string;
  /**
   * DNS label format as of defined on RFC1123
   */
  name: string;
  config: PipelineConfig;
  status: PipelineStatus;
  resourceProfile: ResourceProfile;
  replicasCount: number;
  metadata: {
    nodeSelector?: any;
  } | null;
  createdAt: string;
  updatedAt: string;
};
