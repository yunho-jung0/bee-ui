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

import { load } from 'cheerio';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { url } = await req.json();
    const response = await fetch(url);
    const htmlString = await response.text();
    const document = load(htmlString);
    const title = document('title').text();
    const faviconPath =
      document('link[rel="icon"]').prop('href') ??
      document('link[rel="shortcut icon"]').prop('href') ??
      'favicon.ico';
    const { protocol, origin } = new URL(url);
    let icon;

    if (faviconPath.startsWith('http')) {
      icon = faviconPath;
    } else if (faviconPath.startsWith('//')) {
      icon = `${protocol}${faviconPath}`;
    } else {
      icon = `${origin}${
        faviconPath.startsWith('/') ? faviconPath : `/${faviconPath}`
      }`;
    }

    return NextResponse.json({
      title,
      icon,
    });
  } catch (e) {
    return NextResponse.json({
      error: 'Fetching link preview failed.',
    });
  }
}
