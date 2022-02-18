/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Membership } from './Membership';

/**
 * Created project response body.
 */
export type CreatedProject = {
  id: string;
  token: string;
  createdAt: string;
  membership: Membership;
};
