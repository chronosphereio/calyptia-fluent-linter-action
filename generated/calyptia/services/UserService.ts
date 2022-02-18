/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class UserService {
  /**
   * Send verification email
   * Sends a verification email to the user.
   * When a new user registers within Calyptia Cloud with password, it should receive a verification email, in the case it didn't receive it, or the email expired already, use this endpoint to request a new one.
   * @returns void
   * @throws ApiError
   */
  public static sendVerificationEmail(): CancelablePromise<void> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/v1/verification_email',
    });
  }
}
