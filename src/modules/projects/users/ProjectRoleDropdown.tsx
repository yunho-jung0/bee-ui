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

import { ProjectUserRole } from '@/app/api/projects-users/types';
import classes from './ProjectRoleDropdown.module.scss';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { Dropdown } from '@/components/Dropdown/Dropdown';
import { Button } from '@carbon/react';

interface Props {
  role: ProjectUserRole;
  className?: string;
  onChange: (role: ProjectUserRole) => void;
  onDelete?: () => void;
}
export function ProjectRoleDropdown({
  role,
  className,
  onChange,
  onDelete,
}: Props) {
  const [selected, setSelected] = useState<UserRoleOption | null>(
    ROLES.find((item) => role === item.role) ?? null,
  );

  useEffect(
    () => setSelected(ROLES.find((item) => role === item.role) ?? null),
    [role],
  );

  return (
    <Dropdown<UserRoleOption>
      className={clsx(classes.select, className)}
      items={ROLES}
      label={''}
      size="sm"
      onChange={(item) => {
        setSelected(item);
        if (item) onChange(item.role);
      }}
      itemToString={(item) => item.label}
      selected={selected}
      hideClearButton
      footer={
        onDelete && (
          <Button
            kind="danger--ghost"
            size="sm"
            className={classes.removeButton}
            onClick={onDelete}
          >
            Remove
          </Button>
        )
      }
    />
  );
}

const ROLES: { role: ProjectUserRole; label: string }[] = [
  {
    role: 'admin',
    label: 'Admin',
  },
  {
    role: 'writer',
    label: 'Editor',
  },
  {
    role: 'reader',
    label: 'Reader',
  },
];
type UserRoleOption = (typeof ROLES)[number];
