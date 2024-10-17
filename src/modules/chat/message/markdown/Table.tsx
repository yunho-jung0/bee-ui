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

import clsx from 'clsx';
import { TableHTMLAttributes } from 'react';
import { ExtraProps } from 'react-markdown';
import classes from './Table.module.scss';

export function Table({
  node,
  className,
  ...props
}: TableHTMLAttributes<HTMLTableElement> & ExtraProps) {
  return (
    <div className={classes.root}>
      <table {...props} className={clsx(classes.table, className)} />
    </div>
  );
}
