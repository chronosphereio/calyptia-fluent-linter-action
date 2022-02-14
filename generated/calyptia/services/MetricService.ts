/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AgentMetrics } from '../models/AgentMetrics';
import type { AggregatorMetrics } from '../models/AggregatorMetrics';
import type { ProjectMetrics } from '../models/ProjectMetrics';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class MetricService {
  /**
   * Project metrics
   * Contains an overview of the aggregated metrics for a project.
   * It includes metrics link the amount of records, bytes, and errors per plugin.
   * @param projectId
   * @param start
   * @param interval
   * @returns ProjectMetrics OK
   * @throws ApiError
   */
  public static projectMetrics(
    projectId: string,
    start: string = '-24h',
    interval: string = '1h'
  ): CancelablePromise<ProjectMetrics> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/v1/projects/{projectID}/metrics',
      path: {
        projectID: projectId,
      },
      query: {
        start: start,
        interval: interval,
      },
    });
  }

  /**
   * Agent metrics
   * Contains an overview of the aggregated metrics for an agent.
   * It includes metrics link the amount of records, bytes, and errors per plugin.
   * @param agentId
   * @param start
   * @param interval
   * @returns AgentMetrics OK
   * @throws ApiError
   */
  public static agentMetrics(
    agentId: string,
    start: string = '-24h',
    interval: string = '1h'
  ): CancelablePromise<AgentMetrics> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/v1/agents/{agentID}/metrics',
      path: {
        agentID: agentId,
      },
      query: {
        start: start,
        interval: interval,
      },
    });
  }

  /**
   * Pipeline metrics
   * Contains an overview of the aggregated metrics for a pipeline.
   * It includes metrics link the amount of records, bytes, and errors per plugin.
   * @param pipelineId
   * @param start
   * @param interval
   * @returns AgentMetrics OK
   * @throws ApiError
   */
  public static pipelineMetrics(
    pipelineId: string,
    start: string = '-24h',
    interval: string = '1h'
  ): CancelablePromise<AgentMetrics> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/v1/pipeline_metrics/{pipelineID}',
      path: {
        pipelineID: pipelineId,
      },
      query: {
        start: start,
        interval: interval,
      },
    });
  }

  /**
   * Aggregator metrics
   * @param aggregatorId
   * @param start Option to filter metrics since the given time ago
   *
   * @param interval Option to set the time window to group metrics
   *
   * @returns AggregatorMetrics OK
   * @throws ApiError
   */
  public static aggregatorMetrics(
    aggregatorId: string,
    start: string = '-24h',
    interval: string = '1h'
  ): CancelablePromise<AggregatorMetrics> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/v1/aggregator_metrics/{aggregatorID}',
      path: {
        aggregatorID: aggregatorId,
      },
      query: {
        start: start,
        interval: interval,
      },
    });
  }
}
