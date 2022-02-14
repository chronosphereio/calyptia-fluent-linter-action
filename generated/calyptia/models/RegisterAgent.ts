/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Register agent request body.
 */
export type RegisterAgent = {
  name: string;
  machineID: string;
  type: RegisterAgent.type;
  version: string;
  edition: RegisterAgent.edition;
  flags: Array<string> | null;
  rawConfig: string;
  metadata?: any;
};

export namespace RegisterAgent {
  export enum type {
    FLUENTBIT = 'fluentbit',
    FLUENTD = 'fluentd',
  }

  export enum edition {
    COMMUNITY = 'community',
    ENTERPRISE = 'enterprise',
  }
}
