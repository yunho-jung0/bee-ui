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
import { TermsOfUse } from '@/modules/auth/TermsOfUse';
import { ModalBody, ModalHeader } from '@carbon/react';
import { ModalProps } from '../providers/ModalProvider';

export function TermsOfUseModal({ ...props }: ModalProps) {
  return (
    <Modal {...props}>
      <ModalHeader>
        <h2>Terms of Use</h2>
      </ModalHeader>

      <ModalBody>
        <TermsOfUse />
      </ModalBody>
    </Modal>
  );
}
