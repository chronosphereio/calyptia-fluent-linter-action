/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreatedPipelinePort } from '../models/CreatedPipelinePort';
import type { CreatePipelinePort } from '../models/CreatePipelinePort';
import type { PipelinePort } from '../models/PipelinePort';
import type { UpdatePipelinePort } from '../models/UpdatePipelinePort';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class PipelinePortService {
  /**
   * Create pipeline port
   * Create port within a pipeline.
   * Ports can automatically be parsed from a config file, but this action allows you to programatically add more.
   * @param pipelineId
   * @param requestBody
   * @returns CreatedPipelinePort Created
   * @throws ApiError
   */
  public static createPipelinePort(
    pipelineId: string,
    requestBody?: CreatePipelinePort
  ): CancelablePromise<CreatedPipelinePort> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/v1/aggregator_pipelines/{pipelineID}/ports',
      path: {
        pipelineID: pipelineId,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * Pipeline ports
   * Ports from a pipeline.
   * @param pipelineId
   * @param last Last ports.
   * @returns PipelinePort OK
   * @throws ApiError
   */
  public static pipelinePorts(pipelineId: string, last?: number): CancelablePromise<Array<PipelinePort>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/v1/aggregator_pipelines/{pipelineID}/ports',
      path: {
        pipelineID: pipelineId,
      },
      query: {
        last: last,
      },
    });
  }

  /**
   * Pipeline port
   * Port by ID.
   * @param portId
   * @returns PipelinePort OK
   * @throws ApiError
   */
  public static pipelinePort(portId: string): CancelablePromise<PipelinePort> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/v1/pipeline_ports/{portID}',
      path: {
        portID: portId,
      },
    });
  }

  /**
   * Update pipeline port
   * Update port by its ID.
   * @param portId
   * @param requestBody
   * @returns void
   * @throws ApiError
   */
  public static updatePipelinePort(portId: string, requestBody?: UpdatePipelinePort): CancelablePromise<void> {
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/v1/pipeline_ports/{portID}',
      path: {
        portID: portId,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * Delete pipeline port
   * Delete port by its ID.
   * @param portId
   * @returns void
   * @throws ApiError
   */
  public static deletePipelinePort(portId: string): CancelablePromise<void> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/v1/pipeline_ports/{portID}',
      path: {
        portID: portId,
      },
    });
  }
}
