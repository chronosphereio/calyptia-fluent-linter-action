/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PipelineConfig } from '../models/PipelineConfig';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class PipelineConfigService {
  /**
   * Pipeline configuration history
   * Configuration history from a pipeline.
   * Every time a pipeline config is updated, a new history entry with the change is created.
   * @param pipeline
   * @param last Last history entries.
   * @returns PipelineConfig OK
   * @throws ApiError
   */
  public static pipelineConfigHistory(pipeline: string, last?: number): CancelablePromise<Array<PipelineConfig>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/v1/aggregator_pipelines/{pipeline}/config_history',
      path: {
        pipeline: pipeline,
      },
      query: {
        last: last,
      },
    });
  }
}
