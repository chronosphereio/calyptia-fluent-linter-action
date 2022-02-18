/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ValidatedConfig } from '../models/ValidatedConfig';
import type { ValidatingConfig } from '../models/ValidatingConfig';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ConfigValidatorService {
  /**
   * Validate configuration
   * Validates that an already parsed fluentbit or fluentd config is semantically valid.
   * To parse the raw agent config take a look at https://github.com/calyptia/fluent-bit-config-parser.
   * @param agentType
   * @param requestBody
   * @returns ValidatedConfig OK
   * @throws ApiError
   */
  public static validateConfig(
    agentType: 'fluentbit' | 'fluentd',
    requestBody?: ValidatingConfig
  ): CancelablePromise<ValidatedConfig> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/v1/config_validate/{agentType}',
      path: {
        agentType: agentType,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }
}
