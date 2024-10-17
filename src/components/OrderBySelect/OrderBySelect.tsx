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

import { PropsWithChildren, useMemo } from 'react';
import classes from './OrderBySelect.module.scss';
import { Dropdown } from '../Dropdown/Dropdown';

interface OrderBy {
  order?: string;
  order_by?: string;
}

export type OrderByNamed<T extends OrderBy> = T & { label: string };

export interface OrderBySelectProps<T extends OrderBy> {
  selected: T;
  orderByItems: OrderByNamed<T>[];
  onChangeOrder: (order: T) => void;
}

export function OrderBySelect<T extends OrderBy>({
  selected,
  orderByItems,
  onChangeOrder,
}: PropsWithChildren<OrderBySelectProps<T>>) {
  const selectedOption = useMemo(
    () =>
      orderByItems.find(
        ({ order, order_by }) =>
          selected?.order === order && selected?.order_by === order_by,
      ) ?? null,
    [orderByItems, selected],
  );
  return (
    <Dropdown<OrderByNamed<T>>
      label="Sort:"
      selected={selectedOption}
      onChange={(item) => {
        if (item) {
          const { order, order_by } = item;
          onChangeOrder({ order, order_by } as T);
        }
      }}
      items={orderByItems}
      itemToString={(item) => item.label}
      hideClearButton
      className={classes.select}
    />
  );
}
