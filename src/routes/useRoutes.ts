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

import { useWorkspace } from '@/layout/providers/WorkspaceProvider';
import { useRouter } from 'next-nprogress-bar';
import { useMemo } from 'react';
import { commonRoutes, definitions } from '.';
import { createRoute } from './helpers';
import {
  ArtifactBuilderRoute,
  ArtifactRoute,
  AssistantBuilderRoute,
  ChatRoute,
  ThreadRoute,
  VectorStoreRoute,
} from './types';

export function useRoutes() {
  const { project } = useWorkspace();
  const router = useRouter();

  const projectId = project.id;

  const routes = useMemo(
    () => ({
      ...commonRoutes,
      artifacts: () => commonRoutes.artifacts({ projectId }),
      artifact: ({ artifactId }: ArtifactRoute) =>
        createRoute({
          base: definitions.artifact({ projectId, artifactId }),
        }),
      thread: ({ threadId }: ThreadRoute) =>
        createRoute({
          base: definitions.thread({ projectId, threadId }),
        }),
      tools: () =>
        createRoute({
          base: definitions.tools({ projectId }),
        }),
      preferences: () =>
        createRoute({
          base: definitions.preferences({ projectId }),
        }),
      apiKeys: () =>
        createRoute({
          base: definitions.apiKeys({ projectId }),
        }),
      vectorStores: () =>
        createRoute({
          base: definitions.vectorStores({ projectId }),
        }),
      vectorStore: ({ vectorStoreId }: VectorStoreRoute) =>
        createRoute({
          base: definitions.vectorStore({ projectId, vectorStoreId }),
        }),
      chat: ({ assistantId }: ChatRoute) =>
        createRoute({
          base: definitions.chat({ projectId, assistantId }),
        }),
      artifactBuilder: ({
        artifactId,
        threadId,
        clone,
        params,
      }: ArtifactBuilderRoute = {}) =>
        createRoute({
          base: definitions.artifactBuilder({
            projectId,
            artifactId,
            threadId,
            clone,
          }),
          params,
        }),
      assistantBuilder: ({
        assistantId,
        threadId,
        params,
      }: AssistantBuilderRoute = {}) =>
        createRoute({
          base: definitions.assistantBuilder({
            projectId,
            assistantId,
            threadId,
          }),
          params,
        }),
    }),
    [projectId],
  );

  const navigate = (route: string, params?: { replace?: boolean }) => {
    if (params?.replace) {
      router.replace(route);
    } else {
      router.push(route);
    }
  };

  return { routes, navigate };
}
