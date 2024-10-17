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

import { Root } from 'hast';
import { Link, Text } from 'mdast';
import { visit } from 'unist-util-visit';

export const ATTACHMENT_FILE_PREFIX = 'urn:bee:file:';

export function remarkAttachmentLink() {
  return (tree: Root) => {
    visit(tree, 'link', (node: Link) => {
      if (node.url.startsWith(ATTACHMENT_FILE_PREFIX)) {
        node.data = {
          ...node.data,
          hName: 'attachmentLink',
          hProperties: {
            fileId: node.url.slice(ATTACHMENT_FILE_PREFIX.length),
            filename: (node?.children?.[0] as Text)?.value || 'file.txt',
            title: node.title,
          },
        };
      }
    });
  };
}
