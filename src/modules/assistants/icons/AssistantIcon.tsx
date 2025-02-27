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

import { Assistant, AssistantTemplate } from '../types';
import { getAssistantIconName, getAssistantName } from '../utils';
import {
  AssistantBaseIcon,
  AssistantBaseIconProps,
  AssistantIconColor,
  AssitantIconName,
} from './AssistantBaseIcon';

export interface AssistantIconProps {
  assistant: Assistant | AssistantTemplate | null;
  size?: AssistantBaseIconProps['size'];
  iconName?: AssitantIconName;
  color?: AssistantIconColor;
  initialLetter?: string;
  className?: string;
}

export function AssistantIcon({
  assistant,
  color,
  iconName: iconNameProps,
  initialLetter,
  ...props
}: AssistantIconProps) {
  const iconName = iconNameProps ?? getAssistantIconName(assistant);
  const name = getAssistantName(assistant);

  return (
    <AssistantBaseIcon
      name={iconName}
      color={color ?? assistant?.uiMetadata.color}
      initialLetter={name.at(0) ?? initialLetter}
      {...props}
    />
  );
}
