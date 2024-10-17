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

'use client';

// HACK: This has to be first 'client' component in the
// component's tree to ensure global styles are loaded before
// any other styles from component's css modules in the production
// build. Until this Next.js bug is resolved:
// https://github.com/vercel/next.js/issues/64921

import '@/styles/global.scss';
export const IncludeGlobalStyles = () => <></>;
