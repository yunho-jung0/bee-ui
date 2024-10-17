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

import { Container } from '@/components/Container/Container';
import { ComponentProps, PropsWithChildren, ReactElement } from 'react';
import classes from './AdminView.module.scss';
import { SearchInput } from './SearchInput';
import { Button } from '@carbon/react';
import { Add } from '@carbon/react/icons';

interface Props {
  title?: ReactElement | string;
  header?: ReactElement;
  description?: string;
  newButtonTitle?: string;
  searchPlaceholder?: string;
  newButtonKind?: ComponentProps<typeof Button>['kind'];
  onClickNew?: () => void;
  onSearchChange?: (search: string) => void;
}

export function AdminView({
  title,
  header,
  description,
  newButtonTitle = 'Create new',
  newButtonKind = 'secondary',
  searchPlaceholder,
  onClickNew,
  onSearchChange,
  children,
}: PropsWithChildren<Props>) {
  return (
    <div className={classes.root}>
      <Container>
        {title && <h1 className={classes.heading}>{title}</h1>}
        {header}

        {description && <p className={classes.description}>{description}</p>}

        {(onSearchChange || onClickNew) && (
          <div className={classes.searchBar}>
            {onSearchChange && (
              <SearchInput
                placeholder={searchPlaceholder}
                onChange={(event) => onSearchChange(event.target.value)}
              />
            )}

            {onClickNew && (
              <Button
                className={classes.newButton}
                kind={newButtonKind}
                onClick={onClickNew}
              >
                <span>{newButtonTitle}</span>
                <Add />
              </Button>
            )}
          </div>
        )}

        {children}
      </Container>
    </div>
  );
}
