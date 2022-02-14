/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreatedPipelineFile } from '../models/CreatedPipelineFile';
import type { CreatePipelineFile } from '../models/CreatePipelineFile';
import type { PipelineFile } from '../models/PipelineFile';
import type { UpdatePipelineFile } from '../models/UpdatePipelineFile';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class PipelineFileService {
  /**
   * Create pipeline file
   * Create file within a pipeline.
   * The given name is unique within the pipeline.
   * These files can be referenced by their name within a fluentbit configuration file like so `{{files.thename}}`.
   * Use them to share common stuff like parsers.
   * @param pipelineId
   * @param requestBody
   * @returns CreatedPipelineFile Created
   * @throws ApiError
   */
  public static createPipelineFile(
    pipelineId: string,
    requestBody?: CreatePipelineFile
  ): CancelablePromise<CreatedPipelineFile> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/v1/aggregator_pipelines/{pipelineID}/files',
      path: {
        pipelineID: pipelineId,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * Pipeline files
   * Files from a pipeline.
   * @param pipelineId
   * @param last Last files.
   * @returns PipelineFile OK
   * @throws ApiError
   */
  public static pipelineFiles(pipelineId: string, last?: number): CancelablePromise<Array<PipelineFile>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/v1/aggregator_pipelines/{pipelineID}/files',
      path: {
        pipelineID: pipelineId,
      },
      query: {
        last: last,
      },
    });
  }

  /**
   * Pipeline file
   * File by ID.
   * @param fileId
   * @returns PipelineFile OK
   * @throws ApiError
   */
  public static pipelineFile(fileId: string): CancelablePromise<PipelineFile> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/v1/pipeline_files/{fileID}',
      path: {
        fileID: fileId,
      },
    });
  }

  /**
   * Update pipeline file
   * Update file by its ID.
   * @param fileId
   * @param requestBody
   * @returns void
   * @throws ApiError
   */
  public static updatePipelineFile(fileId: string, requestBody?: UpdatePipelineFile): CancelablePromise<void> {
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/v1/pipeline_files/{fileID}',
      path: {
        fileID: fileId,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * Delete pipeline file
   * Delete pipeline file by its ID.
   * The file cannot be deleted if some pipeline config is still referencing it;
   * you must delete the pipeline first if you want to delete the file.
   * @param fileId
   * @returns void
   * @throws ApiError
   */
  public static deletePipelineFile(fileId: string): CancelablePromise<void> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/v1/pipeline_files/{fileID}',
      path: {
        fileID: fileId,
      },
    });
  }
}
