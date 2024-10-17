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

import { Button, ButtonBaseProps } from '@carbon/react';
import { forwardRef } from 'react';
import classes from './ActionButton.module.scss';

interface Props
  extends Omit<
    ButtonBaseProps,
    'kind' | 'size' | 'tooltipPosition' | 'hasIconOnly' | 'className'
  > {
  kind?: 'ghost' | 'tertiary';
}

export const ActionButton = forwardRef<HTMLButtonElement, Props>(
  function ActionButton({ kind = 'ghost', children, ...props }, ref) {
    return (
      <Button
        {...props}
        ref={ref}
        kind={kind}
        size="sm"
        tooltipPosition="right"
        className={classes.root}
        hasIconOnly
      >
        {children}
      </Button>
    );
  },
);
