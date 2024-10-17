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

import { Project } from '@/app/api/projects/types';
import classes from './UsersCount.module.scss';
import { SkeletonText } from '@carbon/react';
import { useProjectUsersCount } from './useProjectUsersCount';

interface Props {
  project: Project;
}

export function UsersCount({ project }: Props) {
  const { totalCount, isLoading } = useProjectUsersCount(project);

  const total = (totalCount ?? 1) - 1;

  return (
    <div className={classes.root}>
      {isLoading ? (
        <SkeletonText className={classes.skeleton} />
      ) : total ? (
        <>Shared with {total > 99 ? '99+' : total}</>
      ) : null}
    </div>
  );
}
