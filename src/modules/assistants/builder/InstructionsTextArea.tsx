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

import { useAppContext } from '@/layout/providers/AppProvider';
import { TextArea } from '@carbon/react';
import { useController } from 'react-hook-form';
import { AssistantFormValues } from './AssistantBuilderProvider';
import classes from './InstructionsTextArea.module.scss';

interface Props {
  className?: string;
}

const LIMIT = 2000;

const formatContent = (text: string | undefined) => text?.slice(0, LIMIT) || '';

export function InstructionsTextArea({ className }: Props) {
  const { isProjectReadOnly } = useAppContext();
  const {
    field: { value, onChange },
  } = useController<AssistantFormValues, 'instructions'>({
    name: 'instructions',
  });
  const content = value ?? '';

  return (
    <div className={classes.root}>
      <TextArea
        labelText="Instructions"
        className={className}
        placeholder="You are a helpful assistant."
        rows={5}
        maxLength={LIMIT}
        value={content}
        readOnly={isProjectReadOnly}
        onChange={(event) => {
          onChange(formatContent(event.target.value));
        }}
      />

      {!isProjectReadOnly && (
        <div className={classes.bottom}>
          <span className={classes.limit}>
            {content.length}/{LIMIT}
          </span>
        </div>
      )}
    </div>
  );
}
