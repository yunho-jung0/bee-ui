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

import { CarbonIconType, Launch } from '@carbon/react/icons';
import clsx from 'clsx';
import { AnchorHTMLAttributes } from 'react';
import classes from './ExternalLink.module.scss';

interface Props
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'target' | 'rel'> {
  Icon?: CarbonIconType;
}

export function ExternalLink({
  Icon = Launch,
  className,
  children,
  ...props
}: Props) {
  return (
    <a
      {...props}
      target="_blank"
      rel="noopener noreferrer"
      className={clsx(classes.root, className)}
    >
      <span>{children}</span>

      <Icon />
    </a>
  );
}
