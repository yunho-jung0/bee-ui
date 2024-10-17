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

import { notFound } from 'next/navigation';

/**
 * This is a trick for nextjs, because by default
 * unmatched routes fall to the /app/not-found.tsx
 * which is in global layout which doesn't contain app shell.
 * Using this we catch all unmatched routes and call notFound()
 * which renders a not-found.tsx in current layout
 */
export default function CatchAllPage() {
  notFound();
}
