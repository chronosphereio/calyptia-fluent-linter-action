/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Agent model.
 */
export type Agent = {
  id: string;
  token: string;
  name: string;
  machineID: string;
  type: Agent.type;
  version: string;
  edition: Agent.edition;
  flags: Array<string> | null;
  rawConfig: string;
  metadata: any;
  firstMetricsAddedAt: string;
  lastMetricsAddedAt: string;
  metricsCount: number;
  createdAt: string;
  updatedAt: string;
};

export namespace Agent {
  export enum type {
    FLUENTBIT = 'fluentbit',
    FLUENTD = 'fluentd',
  }

  export enum edition {
    COMMUNITY = 'community',
    ENTERPRISE = 'enterprise',
  }
}
