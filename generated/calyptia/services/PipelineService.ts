/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreatedPipeline } from '../models/CreatedPipeline';
import type { CreatePipeline } from '../models/CreatePipeline';
import type { Pipeline } from '../models/Pipeline';
import type { UpdatedPipeline } from '../models/UpdatedPipeline';
import type { UpdatePipeline } from '../models/UpdatePipeline';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class PipelineService {
  /**
   * Create pipeline
   * Create pipeline within an aggregator.
   * The pipeline name must be unique within the aggregator.
   * The resource profile must exist already. If you don't provide one, it will default to "best-effort-low-resource".
   * Use them to easily deploy configured agents to the aggregator.
   * @param aggregatorId
   * @param requestBody
   * @returns CreatedPipeline Created
   * @throws ApiError
   */
  public static createPipeline(aggregatorId: string, requestBody?: CreatePipeline): CancelablePromise<CreatedPipeline> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/v1/aggregators/{aggregatorID}/pipelines',
      path: {
        aggregatorID: aggregatorId,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * Pipelines
   * Pipelines from an aggregator.
   * @param aggregatorId
   * @param last Last pipelines.
   * @param name Name matching pipelines.
   * @returns Pipeline OK
   * @throws ApiError
   */
  public static pipelines(aggregatorId: string, last?: number, name?: string): CancelablePromise<Array<Pipeline>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/v1/aggregators/{aggregatorID}/pipelines',
      path: {
        aggregatorID: aggregatorId,
      },
      query: {
        last: last,
        name: name,
      },
    });
  }

  /**
   * Project pipelines
   * Pipelines from a project.
   * @param projectId
   * @param last Last pipelines.
   * @param name Name matching pipelines.
   * @returns Pipeline OK
   * @throws ApiError
   */
  public static projectPipelines(projectId: string, last?: number, name?: string): CancelablePromise<Array<Pipeline>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/v1/projects/{projectID}/pipelines',
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
   * Pipeline
   * Pipeline by ID.
   * @param pipelineId
   * @returns Pipeline OK
   * @throws ApiError
   */
  public static pipeline(pipelineId: string): CancelablePromise<Pipeline> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/v1/aggregator_pipelines/{pipelineID}',
      path: {
        pipelineID: pipelineId,
      },
    });
  }

  /**
   * Update pipeline
   * Update pipeline by its ID.
   * @param pipelineId
   * @param requestBody
   * @returns UpdatedPipeline OK
   * @throws ApiError
   */
  public static updatePipeline(pipelineId: string, requestBody?: UpdatePipeline): CancelablePromise<UpdatedPipeline> {
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/v1/aggregator_pipelines/{pipelineID}',
      path: {
        pipelineID: pipelineId,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * Delete pipeline
   * Delete pipeline by its ID.
   * @param pipelineId
   * @returns void
   * @throws ApiError
   */
  public static deletePipeline(pipelineId: string): CancelablePromise<void> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/v1/aggregator_pipelines/{pipelineID}',
      path: {
        pipelineID: pipelineId,
      },
    });
  }
}
