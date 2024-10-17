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

import { TraceCallInfo } from './types';
import classes from './TraceInfoView.module.scss';
import { IconButton } from '@carbon/react';
import { TermReference } from '@carbon/react/icons';
import { useModal } from '@/layout/providers/ModalProvider';
import { RawPromptModal } from './RawPromptModal';

export function TraceInfoView({ data }: { data: TraceCallInfo }) {
  const { openModal } = useModal();

  if (!data) return;

  const { tokenCount, executionTime, rawPrompt } = data;
  return (
    <div className={classes.root}>
      <dl>
        <dd>Token count:</dd>
        <dt>{tokenCount}</dt>
        <dd>execution time:</dd>
        <dt>{executionTime}ms</dt>
      </dl>
      {rawPrompt && (
        <IconButton
          label="Show raw prompt"
          size="sm"
          kind="ghost"
          onClick={() =>
            openModal((props) => <RawPromptModal code={rawPrompt} {...props} />)
          }
        >
          <TermReference size={14} />
        </IconButton>
      )}
    </div>
  );
}
