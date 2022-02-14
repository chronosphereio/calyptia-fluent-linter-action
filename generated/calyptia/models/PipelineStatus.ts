/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AgentConfig } from './AgentConfig';

/**
 * Pipeline status history entry.
 */
export type PipelineStatus = {
  id: string;
  config: AgentConfig;
  status: PipelineStatus.status;
  createdAt: string;
};

export namespace PipelineStatus {
  export enum status {
    NEW = 'NEW',
    FAILED = 'FAILED',
    STARTING = 'STARTING',
    STARTED = 'STARTED',
    DELETED = 'DELETED',
  }
}
