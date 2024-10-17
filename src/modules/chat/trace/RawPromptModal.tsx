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
import { ModalBody, ModalHeader } from '@carbon/react';
import { ModalProps } from '@/layout/providers/ModalProvider';
import classes from './RawPromptModal.module.scss';
import { TextWithCopyButton } from '@/components/TextWithCopyButton/TextWithCopyButton';

interface Props extends ModalProps {
  code: string;
}

export function RawPromptModal({ code, ...props }: Props) {
  return (
    <Modal {...props} size="lg">
      <ModalHeader className={classes.header}>
        <h2>Raw prompt</h2>
        <p>
          A raw prompt is the entire prompt given directly to a language model
          to generate a response.
        </p>
      </ModalHeader>
      <ModalBody className={classes.body}>
        <TextWithCopyButton className={classes.code} text={code}>
          {code}
        </TextWithCopyButton>
      </ModalBody>
    </Modal>
  );
}
