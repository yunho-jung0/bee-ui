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

'use server';

import { signIn as authSignIn } from '..';

const Realm = {
  IBMID: 'ent.ibm.com',
  GOOGLE: 'www.google.com',
} as const;
export type Realm = (typeof Realm)[keyof typeof Realm];

export async function signIn(callbackUrl: string, realm: Realm) {
  const authorizationParams = new URLSearchParams();
  authorizationParams.append('prompt', 'login');
  authorizationParams.append('login_hint', JSON.stringify({ realm }));

  await authSignIn(
    process.env.NEXT_PUBLIC_AUTH_PROVIDER_ID,
    {
      redirectTo: callbackUrl,
    },
    authorizationParams,
  );
}
