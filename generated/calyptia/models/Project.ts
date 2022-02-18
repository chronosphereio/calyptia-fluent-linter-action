/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Membership } from './Membership';

/**
 * Project model.
 */
export type Project = {
  id: string;
  name: string;
  membersCount: number;
  agentsCount: number;
  aggregatorsCount: number;
  createdAt: string;
  membership?: Membership;
};
