/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreatedResourceProfile } from '../models/CreatedResourceProfile';
import type { CreateResourceProfile } from '../models/CreateResourceProfile';
import type { ResourceProfile } from '../models/ResourceProfile';
import type { UpdateResourceProfile } from '../models/UpdateResourceProfile';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ResourceProfileService {
  /**
   * Create resource profile
   * Create resource profile within an aggregator.
   * A resource profile is a specification of a resource used during the deployment of a pipeline.
   * By default, when you setup an aggregator, Calyptia Cloud will generate 3 resource profiles for you:
   * - high-performance-guaranteed-delivery.
   * - high-performance-optimal-throughput.
   * - best-effort-low-resource.
   * @param aggregatorId
   * @param requestBody
   * @returns CreatedResourceProfile Created
   * @throws ApiError
   */
  public static createResourceProfile(
    aggregatorId: string,
    requestBody?: CreateResourceProfile
  ): CancelablePromise<CreatedResourceProfile> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/v1/aggregators/{aggregatorID}/resource_profiles',
      path: {
        aggregatorID: aggregatorId,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * Resource profiles
   * Resource profiles from an aggregator.
   * @param aggregatorId
   * @param last Last tokens.
   * @returns ResourceProfile OK
   * @throws ApiError
   */
  public static resourceProfiles(aggregatorId: string, last?: number): CancelablePromise<Array<ResourceProfile>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/v1/aggregators/{aggregatorID}/resource_profiles',
      path: {
        aggregatorID: aggregatorId,
      },
      query: {
        last: last,
      },
    });
  }

  /**
   * Resource profile
   * Resource profile by ID.
   * @param resourceProfileId
   * @returns ResourceProfile OK
   * @throws ApiError
   */
  public static resourceProfile(resourceProfileId: string): CancelablePromise<ResourceProfile> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/v1/resource_profiles/{resourceProfileID}',
      path: {
        resourceProfileID: resourceProfileId,
      },
    });
  }

  /**
   * Update resource profile
   * Update resource profile by its ID.
   * @param resourceProfileId
   * @param requestBody
   * @returns void
   * @throws ApiError
   */
  public static updateResourceProfile(
    resourceProfileId: string,
    requestBody?: UpdateResourceProfile
  ): CancelablePromise<void> {
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/v1/resource_profiles/{resourceProfileID}',
      path: {
        resourceProfileID: resourceProfileId,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * Delete resource profile
   * Delete resource profile by its ID.
   * @param resourceProfileId
   * @returns void
   * @throws ApiError
   */
  public static deleteResourceProfile(resourceProfileId: string): CancelablePromise<void> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/v1/resource_profiles/{resourceProfileID}',
      path: {
        resourceProfileID: resourceProfileId,
      },
    });
  }
}
