/**
 * Copyright 2024 IBM Corp.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { components, paths as basePaths } from './schema';

export interface paths extends basePaths {
  '/v2/cms/terms-of-use': {
    get: {
      parameters: {
        query: {
          version: '2023-11-22';
          for_tou_agreement?: boolean;
        };
      };
      responses: {
        200: {
          content: {
            'application/json': {
              result: {
                content: string;
              };
            };
          };
        };
        /** @description Server could not understand the request due to invalid syntax. In most cases relates with the schema validation. */
        400: {
          content: {
            'application/json': components['schemas']['BadRequestResponse'];
          };
        };
        /** @description Unauthorized route access. */
        401: {
          content: {
            'application/json': components['schemas']['UnauthorizedResponse'];
          };
        };
        /** @description The server can not find requested resource. */
        404: {
          content: {
            'application/json': components['schemas']['NotFoundResponse'];
          };
        };
        /** @description The user has sent too many requests in a given amount of time ("rate limiting").. */
        429: {
          content: {
            'application/json': components['schemas']['TooManyRequestsResponse'];
          };
        };
        /** @description The server encountered an unexpected condition that prevented it from fulfilling the request. */
        500: {
          content: {
            'application/json': components['schemas']['InternalServerErrorResponse'];
          };
        };
        /** @description The remote server is not ready to handle the request. */
        503: {
          content: {
            'application/json': components['schemas']['UnavailableResponse'];
          };
        };
      };
    };
  };
}
