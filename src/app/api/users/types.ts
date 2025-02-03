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

import { UserMetadata } from '@/store/user-profile/types';
import { paths } from '../schema';
import { EntityWithDecodedMetadata } from '../types';

export type UserResponse =
  paths['/v1/users']['get']['responses']['200']['content']['application/json'];

export type UserEntity = EntityWithDecodedMetadata<UserResponse, UserMetadata>;

export type UserCreateBody = NonNullable<
  paths['/v1/users']['post']['requestBody']
>['content']['application/json'];

export type UserUpdateBody = NonNullable<
  paths['/v1/users']['put']['requestBody']
>['content']['application/json'];
