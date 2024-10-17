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

import {
  ComponentProps,
  HTMLProps,
  KeyboardEvent,
  ReactElement,
  useCallback,
  useId,
  useMemo,
  useRef,
} from 'react';
import classes from './Dropdown.module.scss';
import { ComboBox, Dropdown as CarbonDropdown, Button } from '@carbon/react';
import has from 'lodash/has';
import { isNotNull } from '../../utils/helpers';
import isEqual from 'lodash/isEqual';
import clsx from 'clsx';
import { CODE_ESCAPE } from 'keycode-js';
import { Close } from '@carbon/react/icons';

type HtmlAttributesProps = Pick<
  HTMLProps<HTMLInputElement>,
  'onFocus' | 'onBlur' | 'className' | 'placeholder'
>;

type CarbonDropdownProps = ComponentProps<typeof CarbonDropdown>;

type Props<T> = HtmlAttributesProps & {
  defaultItem?: T | null;
  items: T[];
  selected: T | null;
  disabled?: boolean;
  label?: string;
  size?: CarbonDropdownProps['size'];
  onChange: (item: T | null) => void;
  itemToString: (item: T) => string;
  itemToElement?: (item: T) => ReactElement;
  footer?: ReactElement;
  header?: ReactElement;
  isFilterEnabled?: boolean;
  hideClearButton?: boolean;
};

/**
 * Component that allows selecting a value from a dropdown, merges
 * carbon's SelectBox and Dropdown into one component and allows
 * for better custom styling of dropdown options and addition of
 * custom elements on top/bottom of the dropdown list
 *
 */
export function Dropdown<T extends Record<string, any>>({
  defaultItem,
  items,
  selected,
  disabled,
  footer,
  header,
  isFilterEnabled,
  size = 'md',
  label,
  placeholder = 'Select value',
  hideClearButton,
  onChange,
  itemToElement,
  itemToString,
  className,
  ...htmlProps
}: Props<T>) {
  const htmlId = useId();

  const options: DropdownOption<T>[] = useMemo(() => {
    return [
      header && { __id: 'header' as const },
      ...items,
      footer && { __id: 'footer' as const },
    ].filter(isNotNull);
  }, [footer, header, items]);

  const selectedOption = useMemo(() => {
    return (
      options.find(
        (option) => isDropdownOptionItem(option) && isEqual(option, selected),
      ) ?? null
    );
  }, [options, selected]);

  const optionToElement = useCallback(
    (item: DropdownOption<T>) => {
      if (isDropdownOptionItem(item)) {
        return itemToElement ? (
          itemToElement(item)
        ) : (
          <div className={classes.option}>
            <div className={classes.optionContent}>
              <span className={classes.prompt}>{itemToString(item)}</span>
            </div>
          </div>
        );
      } else {
        return (
          <div
            className={clsx(classes.option, classes.customOption)}
            onClick={(e) => e.stopPropagation()}
          >
            {item?.__id === 'header' ? header : footer}
          </div>
        );
      }
    },
    [footer, header, itemToElement, itemToString],
  );

  const ref = useRef<HTMLInputElement>(null);

  const props = {
    id: htmlId,
    ref,
    className: clsx(classes.dropdown, className),
    items: options,
    itemToElement: optionToElement,
    itemToString: (item: DropdownOption<T> | null) =>
      item && isDropdownOptionItem(item) ? itemToString(item) : (label ?? ''),
    size,
    selectedItem: selectedOption,
    onChange: (item: {
      selectedItem: DropdownOption<T> | undefined | null;
    }) => {
      const selectedOption = item.selectedItem;
      selectedOption &&
        isDropdownOptionItem(selectedOption) &&
        onChange(selectedOption);
    },
    onKeyDown: (e: KeyboardEvent) => {
      // improves wrong ComboBox behaviour on Escape key
      if (isFilterEnabled && e.code === CODE_ESCAPE) {
        ref.current?.blur();
        ref.current?.focus();
      }
    },
    label: placeholder,
    titleText: label ?? '',
    disabled,
    ...htmlProps,
    downshiftProps: {
      id: htmlId,
    },
  };

  return (
    <div className={classes.root}>
      {isFilterEnabled ? (
        <ComboBox {...props} />
      ) : (
        <CarbonDropdown {...props} selectedItem={props.selectedItem} />
      )}
      {!hideClearButton && props.selectedItem && (
        <Button
          kind="ghost"
          size="sm"
          className={classes.clearButton}
          onClick={() => onChange(null)}
        >
          <Close size={16} />
        </Button>
      )}
    </div>
  );
}

interface DropdownOptionComponent {
  __id: 'header' | 'footer';
}

type DropdownOption<T> = T | DropdownOptionComponent | null;

export function isDropdownOptionItem<T>(
  option: DropdownOption<T>,
): option is T {
  return !has(option, '__id');
}
