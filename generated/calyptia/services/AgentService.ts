/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Agent } from '../models/Agent';
import type { RegisterAgent } from '../models/RegisterAgent';
import type { RegisteredAgent } from '../models/RegisteredAgent';
import type { UpdateAgent } from '../models/UpdateAgent';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AgentService {
  /**
   * Register agent
   * Register agent within a project.
   * The project in which the agent is registered is parsed from the authorization token.
   * Users are not allowed to register agents.
   * @param requestBody
   * @returns RegisteredAgent Created
   * @throws ApiError
   */
  public static registerAgent(requestBody?: RegisterAgent): CancelablePromise<RegisteredAgent> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/v1/agents',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * Agents
   * Agents from a project.
   * @param projectId
   * @param last Last agents.
   * @param name Name matching agents.
   * @returns Agent OK
   * @throws ApiError
   */
  public static agents(projectId: string, last?: number, name?: string): CancelablePromise<Array<Agent>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/v1/projects/{projectID}/agents',
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
   * Agent
   * Agents by ID.
   * @param agentId
   * @returns Agent OK
   * @throws ApiError
   */
  public static agent(agentId: string): CancelablePromise<Agent> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/v1/agents/{agentID}',
      path: {
        agentID: agentId,
      },
    });
  }

  /**
   * Update agent
   * Update agent by its ID.
   * @param agentId
   * @param requestBody
   * @returns void
   * @throws ApiError
   */
  public static updateAgent(agentId: string, requestBody?: UpdateAgent): CancelablePromise<void> {
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/v1/agents/{agentID}',
      path: {
        agentID: agentId,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * Delete agent
   * Delete agent by its ID.
   * @param agentId
   * @returns void
   * @throws ApiError
   */
  public static deleteAgent(agentId: string): CancelablePromise<void> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/v1/agents/{agentID}',
      path: {
        agentID: agentId,
      },
    });
  }
}
