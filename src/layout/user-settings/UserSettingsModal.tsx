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

import { Modal } from '@/components/Modal/Modal';
import { SettingsFormGroup } from '@/components/SettingsFormGroup/SettingsFormGroup';
import { Theme, useTheme } from '@/layout/providers/ThemeProvider';
import {
  Checkbox,
  FormGroup,
  ModalBody,
  ModalHeader,
  RadioButton,
  RadioButtonGroup,
  Toggle,
} from '@carbon/react';
import { Laptop, Moon, Sun } from '@carbon/react/icons';
import { useId } from 'react';
import { useUserSetting } from '../hooks/useUserSetting';
import { ModalProps } from '../providers/ModalProvider';
import classes from './UserSettingsModal.module.scss';

export function UserSettingsModal({ ...props }: ModalProps) {
  const id = useId();
  const { getUserSetting, setUserSetting } = useUserSetting();
  const { theme, setTheme } = useTheme();

  return (
    <Modal {...props} className={classes.modal}>
      <ModalHeader>
        <h2>User Settings</h2>
      </ModalHeader>
      <ModalBody>
        <SettingsFormGroup>
          <Toggle
            size="sm"
            labelText="Debug mode"
            id={`${id}:assistant-plan-always-visible`}
            toggled={getUserSetting('chatDebugMode')}
            onToggle={(value) => {
              setUserSetting('chatDebugMode', value);
            }}
          />

          <RadioButtonGroup
            legendText="Theme"
            name="theme"
            className={classes.themeToggle}
            onChange={(theme) => setTheme(theme as Theme)}
            valueSelected={theme}
          >
            {THEMES.map(({ name, label, icon: Icon }) => (
              <RadioButton
                key={name}
                labelText={
                  <>
                    <Icon size={18} /> {label}
                  </>
                }
                value={name}
              />
            ))}
          </RadioButtonGroup>
        </SettingsFormGroup>
      </ModalBody>
    </Modal>
  );
}

const THEMES = [
  {
    name: Theme.System,
    label: 'Sync with system',
    icon: Laptop,
  },
  {
    name: Theme.Light,
    label: 'Light',
    icon: Sun,
  },
  {
    name: Theme.Dark,
    label: 'Dark',
    icon: Moon,
  },
];
