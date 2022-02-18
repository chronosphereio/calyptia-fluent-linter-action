/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreatedPipelineSecret } from '../models/CreatedPipelineSecret';
import type { CreatePipelineSecret } from '../models/CreatePipelineSecret';
import type { PipelineSecret } from '../models/PipelineSecret';
import type { UpdatePipelineSecret } from '../models/UpdatePipelineSecret';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class PipelineSecretService {
  /**
   * Create pipeline secret
   * Create secret within a pipeline.
   * The given name is unique within the pipeline.
   * These secrets can be referenced by their name within a fluentbit configuration file like so `{{secrets.thename}}`.
   * Use them to hide sensible values from your config file.
   * @param pipelineId
   * @param requestBody
   * @returns CreatedPipelineSecret Created
   * @throws ApiError
   */
  public static createPipelineSecret(
    pipelineId: string,
    requestBody?: CreatePipelineSecret
  ): CancelablePromise<CreatedPipelineSecret> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/v1/aggregator_pipelines/{pipelineID}/secrets',
      path: {
        pipelineID: pipelineId,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * Pipeline secrets
   * Secrets from a pipeline.
   * @param pipelineId
   * @param last Last secrets.
   * @returns PipelineSecret OK
   * @throws ApiError
   */
  public static pipelineSecrets(pipelineId: string, last?: number): CancelablePromise<Array<PipelineSecret>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/v1/aggregator_pipelines/{pipelineID}/secrets',
      path: {
        pipelineID: pipelineId,
      },
      query: {
        last: last,
      },
    });
  }

  /**
   * Pipeline secret
   * Secret by ID.
   * @param secretId
   * @returns PipelineSecret OK
   * @throws ApiError
   */
  public static pipelineSecret(secretId: string): CancelablePromise<PipelineSecret> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/v1/pipeline_secrets/{secretID}',
      path: {
        secretID: secretId,
      },
    });
  }

  /**
   * Update pipeline secret
   * Update secret by its ID.
   * @param secretId
   * @param requestBody
   * @returns void
   * @throws ApiError
   */
  public static updatePipelineSecret(secretId: string, requestBody?: UpdatePipelineSecret): CancelablePromise<void> {
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/v1/pipeline_secrets/{secretID}',
      path: {
        secretID: secretId,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * Delete pipeline secret
   * Delete pipeline secret by its ID.
   * The secret cannot be deleted if some pipeline config is still referencing it;
   * you must delete the pipeline first if you want to delete the secret.
   * @param secretId
   * @returns void
   * @throws ApiError
   */
  public static deletePipelineSecret(secretId: string): CancelablePromise<void> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/v1/pipeline_secrets/{secretID}',
      path: {
        secretID: secretId,
      },
    });
  }
}
