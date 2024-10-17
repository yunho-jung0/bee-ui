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

import { authorizeUser } from '@/app/auth/signin/authorization';
import { createRemoteJWKSet, jwtVerify } from 'jose';
import { NextResponse, NextRequest } from 'next/server';

// The following route is a technical bypass for NextJS middleware runtime limitation.
// In short, NextJS middleware enforces edge runtime although we run in in NodeJS which results in problems when using NodeJS libraries like ioredis
// However, API routes apparently don't have this limitation. Therefore, we use Fetch API in the middleware calling an API route which is an antipattern.

let JWKS: ReturnType<typeof createRemoteJWKSet> | null;
const getJWKS = () => {
  if (!JWKS) {
    JWKS = createRemoteJWKSet(new URL(process.env.AUTH_JWKS_ENDPOINT!));
  }
  return JWKS;
};

export async function GET(request: NextRequest) {
  const token = request.headers.get('authorization')?.split(' ').at(-1);
  if (!token) return NextResponse.json({}, { status: 400 });

  const {
    payload: { email },
  } = await jwtVerify<{ email?: string }>(token, getJWKS());
  if (!email) return NextResponse.json({}, { status: 400 });

  try {
    await authorizeUser({ email: email.toLowerCase() });
    return NextResponse.json({});
  } catch {
    return NextResponse.json({}, { status: 403 });
  }
}
