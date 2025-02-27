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

import { listApiKeys } from '@/app/api/api-keys';
import { ApiKeysListQuery } from '@/app/api/api-keys/types';
import { useWorkspace } from '@/layout/providers/WorkspaceProvider';
import { queryOptions } from '@tanstack/react-query';
import { useMemo } from 'react';

export function useApiKeysQueries() {
  const { organization } = useWorkspace();

  const apiKeysQueries = useMemo(
    () => ({
      all: () => ['api-keys'] as const,
      lists: () => [...apiKeysQueries.all(), 'list'] as const,
      list: (params?: ApiKeysListQuery) => {
        const usedParams: ApiKeysListQuery = {
          order: 'desc',
          order_by: 'created_at',
          ...params,
        };

        return queryOptions({
          queryKey: [...apiKeysQueries.lists(), usedParams],
          queryFn: () => listApiKeys(organization.id, usedParams),
          meta: {
            errorToast: {
              title: 'Failed to load api keys',
              includeErrorMessage: true,
            },
          },
        });
      },
    }),
    [organization.id],
  );

  return apiKeysQueries;
}
