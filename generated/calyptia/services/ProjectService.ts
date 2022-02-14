/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreatedProject } from '../models/CreatedProject';
import type { CreateProject } from '../models/CreateProject';
import type { Project } from '../models/Project';
import type { UpdateProject } from '../models/UpdateProject';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ProjectService {
  /**
   * Create project
   * Creates a new project.
   * A project is the base unit of work at Calyptia Cloud.
   * You can register agents here, create aggregators in which you can deploy an entire set of pipelines, and monitor them.
   * You can even invite other people to the project and have a team.
   * @param requestBody
   * @returns CreatedProject Created
   * @throws ApiError
   */
  public static createProject(requestBody?: CreateProject): CancelablePromise<CreatedProject> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/v1/projects',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * Projects
   * Projects you are a member of.
   * @param last Last projects.
   * @param name Name matching projects.
   * @returns Project OK
   * @throws ApiError
   */
  public static projects(last?: number, name?: string): CancelablePromise<Array<Project>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/v1/projects',
      query: {
        last: last,
        name: name,
      },
    });
  }

  /**
   * Project
   * Project by ID.
   * @param projectId
   * @returns Project OK
   * @throws ApiError
   */
  public static project(projectId: string): CancelablePromise<Project> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/v1/projects/{projectID}',
      path: {
        projectID: projectId,
      },
    });
  }

  /**
   * Update project
   * Update project by its ID.
   * @param projectId
   * @param requestBody
   * @returns void
   * @throws ApiError
   */
  public static updateProject(projectId: string, requestBody?: UpdateProject): CancelablePromise<void> {
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/v1/projects/{projectID}',
      path: {
        projectID: projectId,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }
}
