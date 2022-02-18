/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Resource profile model.
 */
export type ResourceProfile = {
  id: string;
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
  createdAt: string;
  updatedAt: string;
};
