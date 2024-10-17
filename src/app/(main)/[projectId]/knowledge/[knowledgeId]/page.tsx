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

import { readVectorStore } from '@/app/api/rsc';
import { ErrorPage } from '@/components/ErrorPage/ErrorPage';
import { KnowledgeDetail } from '@/modules/knowledge/detail/KnowledgeDetail';
import { handleApiError } from '@/utils/handleApiError';
import { notFound } from 'next/navigation';

interface Props {
  params: {
    knowledgeId?: string;
    projectId: string;
  };
}

export default async function KnowledgeDetailPage({
  params: { knowledgeId, projectId },
}: Props) {
  let vectorStore;
  if (knowledgeId) {
    try {
      vectorStore = await readVectorStore(projectId, knowledgeId);
    } catch (e) {
      const apiError = handleApiError(e);

      if (apiError) {
        return (
          <ErrorPage
            statusCode={apiError.error.code}
            title={apiError.error.message}
          />
        );
      }
    }
  }

  if (!vectorStore) notFound();

  return <KnowledgeDetail vectorStore={vectorStore} />;
}
