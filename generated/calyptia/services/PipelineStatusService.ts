/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PipelineStatus } from '../models/PipelineStatus';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class PipelineStatusService {
  /**
   * Pipeline status history
   * Status history from a pipeline.
   * Every time a pipeline status is changed, a new history entry with the change is created.
   * @param pipeline
   * @param last Last history entries.
   * @returns PipelineStatus OK
   * @throws ApiError
   */
  public static pipelineStatusHistory(pipeline: string, last?: number): CancelablePromise<Array<PipelineStatus>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/v1/aggregator_pipelines/{pipeline}/status_history',
      path: {
        pipeline: pipeline,
      },
      query: {
        last: last,
      },
    });
  }
}
