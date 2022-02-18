/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AgentConfig } from '../models/AgentConfig';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AgentConfigService {
  /**
   * Agent configuration history
   * Configuration history from an agent.
   * Every time an agent config is updated, a new history entry with the change is created.
   * @param agentId
   * @param last Last config history entries.
   * @returns AgentConfig OK
   * @throws ApiError
   */
  public static agentConfigHistory(agentId: string, last?: number): CancelablePromise<Array<AgentConfig>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/v1/agents/{agentID}/config_history',
      path: {
        agentID: agentId,
      },
      query: {
        last: last,
      },
    });
  }
}
