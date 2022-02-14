/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AcceptInvitation } from '../models/AcceptInvitation';
import type { CreateInvitation } from '../models/CreateInvitation';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class InvitationService {
  /**
   * Create invitation
   * Create invitation to a project.
   * This will send an invitation email with a link to join to the email address provided.
   * @param projectId
   * @param requestBody
   * @returns void
   * @throws ApiError
   */
  public static createInvitation(projectId: string, requestBody?: CreateInvitation): CancelablePromise<void> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/v1/projects/{projectID}/invite',
      path: {
        projectID: projectId,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * Accept invitation
   * Accept invitation to a project.
   * The project to which you join is parsed from the token.
   * @param requestBody
   * @returns void
   * @throws ApiError
   */
  public static acceptInvitation(requestBody?: AcceptInvitation): CancelablePromise<void> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/v1/join_project',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
}
