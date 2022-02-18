/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Update resource profile request body.
 */
export type UpdateResourceProfile = {
  name?: string | null;
  storageMaxChunksUp?: number | null;
  storageSyncFull?: boolean | null;
  storageBacklogMemLimit?: string | null;
  storageVolumeSize?: string | null;
  storageMaxChunksPause?: boolean | null;
  cpuBufferWorkers?: number | null;
  cpuLimit?: string | null;
  cpuRequest?: string | null;
  memoryLimit?: string | null;
  memoryRequest?: string | null;
};
