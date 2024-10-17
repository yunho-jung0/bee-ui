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

import { ReactNode } from 'react';
import classes from './EmptyList.module.scss';

interface Props {
  heading: ReactNode;
  content: ReactNode;
}

export function EmptyList({ heading, content }: Props) {
  return (
    <div className={classes.root}>
      <h3 className={classes.heading}>{heading}</h3>

      <p className={classes.content}>{content}</p>
    </div>
  );
}
