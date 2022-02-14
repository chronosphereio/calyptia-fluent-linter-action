/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PipelineConfig } from './PipelineConfig';
import type { PipelineFile } from './PipelineFile';
import type { PipelineSecret } from './PipelineSecret';
import type { PipelineStatus } from './PipelineStatus';
import type { ResourceProfile } from './ResourceProfile';

/**
 * Created pipeline response body.
 */
export type CreatedPipeline = {
  id?: string;
  name?: string;
  config?: PipelineConfig;
  secrets?: Array<PipelineSecret>;
  files?: Array<PipelineFile>;
  status?: PipelineStatus;
  resourceProfile?: ResourceProfile;
  replicasCount?: number;
  createdAt?: string;
};
