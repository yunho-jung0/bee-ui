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

import { FunctionToolDefinition } from '@/app/api/threads-runs/types';

export enum FunctionTool {
  UserCoordinates = 'UserCoordinates',
}

export const GET_USER_LOCATION_FUNCTION_TOOL: FunctionToolDefinition = {
  type: 'function',
  function: {
    name: FunctionTool.UserCoordinates,
    description: "Get current user's location coordinates.",
    parameters: { schema: { type: 'object', properties: {} } },
  },
};

export function getUserLocation(): Promise<string> {
  const errorMessage =
    'The precise geographic location of the user could not be determined.';

  return new Promise((resolve) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          const latitude: number = position.coords.latitude;
          const longitude: number = position.coords.longitude;

          resolve(
            JSON.stringify({
              latitude,
              longitude,
            }),
          );
        },
        () => {
          resolve(errorMessage);
        },
      );
    } else {
      resolve(errorMessage);
    }
  });
}
