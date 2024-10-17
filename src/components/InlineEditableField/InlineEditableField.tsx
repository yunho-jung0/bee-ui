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

import classes from './InlineEditableField.module.scss';
import { Checkmark, Close, Edit } from '@carbon/react/icons';
import {
  InputHTMLAttributes,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { Button, TextInput } from '@carbon/react';
import { mergeRefs } from 'react-merge-refs';
import { RefCallBack } from 'react-hook-form';
import clsx from 'clsx';
import { CODE_ENTER, CODE_ESCAPE } from 'keycode-js';

interface Props
  extends Pick<
    InputHTMLAttributes<HTMLInputElement>,
    'name' | 'onChange' | 'placeholder' | 'maxLength'
  > {
  isInvalid?: boolean;
  isDisabled?: boolean;
  refCallback?: RefCallBack;
  textClassName?: string;
  value?: string;
}

export function InlineEditableField({
  name,
  value,
  refCallback,
  onChange,
  isInvalid,
  isDisabled,
  textClassName,
  ...inputProps
}: Props) {
  const id = useId();
  const [isEditing, setEditing] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useLayoutEffect(() => {
    if (isEditing && inputRef.current) inputRef.current.focus();
  }, [isEditing]);

  const ButtonIcon = !isEditing ? Edit : !isInvalid ? Checkmark : Close;

  return (
    <div
      className={clsx(classes.root, {
        [classes.isEditing]: isEditing,
        [classes.isInvalid]: isInvalid,
      })}
    >
      <div className={classes.input}>
        <TextInput
          type="text"
          labelText=""
          hideLabel
          name={name}
          value={value}
          id={`${id}:input`}
          onKeyDown={(e) => {
            if (
              !isInvalid &&
              (e.code === CODE_ENTER || e.code === CODE_ESCAPE)
            ) {
              setEditing(false);
              inputRef.current?.blur();
            }
          }}
          className={textClassName}
          disabled={isDisabled}
          onChange={onChange}
          onBlur={onChange}
          ref={mergeRefs([refCallback, inputRef])}
          {...inputProps}
        />

        <span className={textClassName}>{value}</span>
      </div>

      {!isDisabled && (
        <Button
          className={classes.editButton}
          disabled={isInvalid}
          kind="ghost"
          size="sm"
          onClick={() => setEditing((isEditing) => !isEditing)}
        >
          <ButtonIcon size={16} />
        </Button>
      )}
    </div>
  );
}
