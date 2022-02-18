/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Pipeline } from './Pipeline';
import type { ResourceProfile } from './ResourceProfile';

/**
 * Created aggregator response body.
 */
export type CreatedAggregator = {
  id: string;
  token: string;
  privateRSAKey: string;
  publicRSAKey: string;
  name: string;
  createdAt: string;
  healthCheckPipeline?: Pipeline;
  resourceProfiles: Array<ResourceProfile>;
};
