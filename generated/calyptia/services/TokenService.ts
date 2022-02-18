/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateToken } from '../models/CreateToken';
import type { Token } from '../models/Token';
import type { UpdateToken } from '../models/UpdateToken';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class TokenService {
  /**
   * Create token
   * Create token within a project.
   * These tokens are to authorize other applications to access the project.
   * For example:
   * - an agent might use it to register itself to the project.
   * - you might create a new aggregator in the project using the aggregator CLI.
   * - you might use it within the Calyptia CLI to grant access to your project.
   * @param projectId
   * @param requestBody
   * @returns Token Created
   * @throws ApiError
   */
  public static createToken(projectId: string, requestBody?: CreateToken): CancelablePromise<Token> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/v1/projects/{projectID}/tokens',
      path: {
        projectID: projectId,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * Tokens
   * Tokens from a project.
   * @param projectId
   * @param last Last tokens.
   * @param name Name matching tokens.
   * @returns Token OK
   * @throws ApiError
   */
  public static tokens(projectId: string, last?: number, name?: string): CancelablePromise<Array<Token>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/v1/projects/{projectID}/tokens',
      path: {
        projectID: projectId,
      },
      query: {
        last: last,
        name: name,
      },
    });
  }

  /**
   * Token
   * Token by ID.
   * @param tokenId
   * @returns Token OK
   * @throws ApiError
   */
  public static token(tokenId: string): CancelablePromise<Token> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/v1/project_tokens/{tokenID}',
      path: {
        tokenID: tokenId,
      },
    });
  }

  /**
   * Update token
   * Update token by its ID.
   * @param tokenId
   * @param requestBody
   * @returns void
   * @throws ApiError
   */
  public static updateToken(tokenId: string, requestBody?: UpdateToken): CancelablePromise<void> {
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/v1/project_tokens/{tokenID}',
      path: {
        tokenID: tokenId,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * Delete token
   * Delete token by its ID.
   * @param tokenId
   * @returns void
   * @throws ApiError
   */
  public static deleteToken(tokenId: string): CancelablePromise<void> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/v1/project_tokens/{tokenID}',
      path: {
        tokenID: tokenId,
      },
    });
  }
}
