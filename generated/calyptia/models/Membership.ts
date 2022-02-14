/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { User } from './User';

/**
 * Membership of a user in a project.
 */
export type Membership = {
  id: string;
  roles: Array<'creator' | 'admin'> | null;
  createdAt: string;
  user?: User;
};
