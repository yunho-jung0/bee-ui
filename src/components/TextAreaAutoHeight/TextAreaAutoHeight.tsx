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

import clsx from 'clsx';
import { TextareaHTMLAttributes, forwardRef, useState } from 'react';
import classes from './TextAreaAutoHeight.module.scss';

type Props = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'value'>;

export const TextAreaAutoHeight = forwardRef<HTMLTextAreaElement, Props>(
  function TextAreaAutoHeight({ className, onChange, ...rest }, ref) {
    const [value, setValue] = useState(rest.defaultValue ?? '');
    return (
      <div
        className={clsx(classes.root, className)}
        data-replicated-value={value}
      >
        <textarea
          ref={ref}
          {...rest}
          onChange={(e) => {
            setValue(e.target.value);
            onChange?.(e);
          }}
        />
      </div>
    );
  },
);
