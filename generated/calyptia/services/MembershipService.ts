/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Membership } from '../models/Membership';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class MembershipService {
  /**
   * Members
   * Members from a project.
   * @param projectId
   * @param last Last members.
   * @returns Membership OK
   * @throws ApiError
   */
  public static members(projectId: string, last?: number): CancelablePromise<Array<Membership>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/v1/projects/{projectID}/members',
      path: {
        projectID: projectId,
      },
      query: {
        last: last,
      },
    });
  }
}
