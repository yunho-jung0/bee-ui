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

import { VectorStoresListQuery } from '@/app/api/vector-stores/types';
import { useQueryClient } from '@tanstack/react-query';
import { useVectorStoresQueries } from '..';
import { VECTOR_STORES_ORDER_DEFAULT } from '../../KnowledgeView';

const DEFAULT_PARAMS: Partial<VectorStoresListQuery> = {
  ...VECTOR_STORES_ORDER_DEFAULT,
};

export function usePrefetchVectorStores({
  useDefaultParams,
}: {
  useDefaultParams?: boolean;
}) {
  const queryClient = useQueryClient();
  const vectorStoresQueries = useVectorStoresQueries();

  return (params?: VectorStoresListQuery) =>
    queryClient.prefetchInfiniteQuery(
      vectorStoresQueries.list({
        ...(useDefaultParams ? DEFAULT_PARAMS : {}),
        ...params,
      }),
    );
}
