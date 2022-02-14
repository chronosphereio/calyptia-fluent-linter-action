/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Aggregator } from '../models/Aggregator';
import type { CreateAggregator } from '../models/CreateAggregator';
import type { CreatedAggregator } from '../models/CreatedAggregator';
import type { UpdateAggregator } from '../models/UpdateAggregator';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AggregatorService {
  /**
   * Create aggregator
   * Create aggregator within a project.
   * The project in which the aggregator is created is parser from the authorization token.
   * Users are not allowed to create aggregators.
   * @param requestBody
   * @returns CreatedAggregator Created
   * @throws ApiError
   */
  public static createAggregator(requestBody?: CreateAggregator): CancelablePromise<CreatedAggregator> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/v1/aggregators',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * Aggregators
   * Aggregators from a project.
   * @param projectId
   * @param last Last aggregators.
   * @param name Name matching aggregators.
   * @returns Aggregator OK
   * @throws ApiError
   */
  public static aggregators(projectId: string, last?: number, name?: string): CancelablePromise<Array<Aggregator>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/v1/projects/{projectID}/aggregators',
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
   * Aggregator
   * Aggregator by ID.
   * @param aggregatorId
   * @returns Aggregator OK
   * @throws ApiError
   */
  public static aggregator(aggregatorId: string): CancelablePromise<Aggregator> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/v1/aggregators/{aggregatorID}',
      path: {
        aggregatorID: aggregatorId,
      },
    });
  }

  /**
   * Update aggregator
   * Update aggregator by its ID.
   * @param aggregatorId
   * @param requestBody
   * @returns void
   * @throws ApiError
   */
  public static updateAggregator(aggregatorId: string, requestBody?: UpdateAggregator): CancelablePromise<void> {
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/v1/aggregators/{aggregatorID}',
      path: {
        aggregatorID: aggregatorId,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * Delete aggregator
   * Delete aggregator by its ID.
   * @param aggregatorId
   * @returns void
   * @throws ApiError
   */
  public static deleteAggregator(aggregatorId: string): CancelablePromise<void> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/v1/aggregators/{aggregatorID}',
      path: {
        aggregatorID: aggregatorId,
      },
    });
  }
}
