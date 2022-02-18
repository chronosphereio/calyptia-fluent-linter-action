/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Update agent request body.
 */
export type UpdateAgent = {
  name?: string | null;
  version?: string | null;
  edition?: UpdateAgent.edition | null;
  flags?: Array<string> | null;
  rawConfig?: string | null;
  metadata?: any;
};

export namespace UpdateAgent {
  export enum edition {
    COMMUNITY = 'community',
    ENTERPRISE = 'enterprise',
  }
}
