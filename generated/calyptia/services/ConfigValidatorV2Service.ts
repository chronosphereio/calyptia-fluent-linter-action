/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ValidatedConfigV2 } from '../models/ValidatedConfigV2';
import type { ValidatingConfig } from '../models/ValidatingConfig';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ConfigValidatorV2Service {
  /**
   * Validate configuration on the v2 endpoint of the service
   * Validates that an already parsed fluentbit config is semantically valid under the V2 error specification
   * To parse the raw agent config take a look at https://github.com/calyptia/fluent-bit-config-parser.
   * @param requestBody
   * @returns ValidatedConfigV2 OK
   * @throws ApiError
   */
  public static validateConfigV2(requestBody?: ValidatingConfig): CancelablePromise<ValidatedConfigV2> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/v1/config_validate_v2',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
}
