/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Create resource profile request body.
 */
export type CreateResourceProfile = {
  name: string;
  storageMaxChunksUp: number;
  storageSyncFull: boolean;
  storageBacklogMemLimit: string;
  storageVolumeSize: string;
  storageMaxChunksPause: boolean;
  cpuBufferWorkers: number;
  cpuLimit: string;
  cpuRequest: string;
  memoryLimit: string;
  memoryRequest: string;
};
