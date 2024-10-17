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
import { ChevronDown } from '@carbon/react/icons';
import classes from './ExpandPanelButton.module.scss';

interface Props
  extends Omit<
    ButtonBaseProps,
    'wrapperClasses' | 'kind' | 'renderIcon' | 'hasIconOnly'
  > {
  id: string;
  panelId: string;
  expanded: boolean;
}

export function ExpandPanelButton({ panelId, expanded, ...props }: Props) {
  return (
    <Button
      {...props}
      wrapperClasses={classes.root}
      kind="ghost"
      aria-label={expanded ? 'Collapse' : 'Expand'}
      aria-controls={panelId}
      aria-expanded={expanded}
      renderIcon={ChevronDown}
      hasIconOnly
    />
  );
}
