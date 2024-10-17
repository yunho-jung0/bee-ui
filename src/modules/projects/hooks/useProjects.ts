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

import { ProjectsListQuery } from '@/app/api/projects/types';
import { useInfiniteQuery } from '@tanstack/react-query';
import { projectsQuery } from '../queries';
import { useEffect } from 'react';

export function useProjects() {
  const query = useInfiniteQuery(projectsQuery(PROJECTS_QUERY_PARAMS));

  useEffect(() => {
    if (query.hasNextPage && !query.isFetching) {
      query.fetchNextPage();
    }
  }, [query]);

  return query;
}

export const PROJECTS_QUERY_PARAMS: ProjectsListQuery = {
  limit: 100,
  order_by: 'created_at',
  order: 'asc',
};
