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
import { ModalProps } from '@/layout/providers/ModalProvider';
import { Button, ModalBody, ModalFooter, ModalHeader } from '@carbon/react';
import { ArrowUpRight } from '@carbon/react/icons';
import classes from './ChooseTemplateModal.module.scss';

export function ChooseTemplateModal({ ...props }: ModalProps) {
  return (
    <Modal {...props} size="lg" className={classes.modal}>
      <ModalHeader>
        <h2>Choose a template</h2>
      </ModalHeader>

      <ModalBody>
        <section className={classes.cards}>
          {/* TODO: I imagine these will be public assistants */}
          {/* <AssistantCard
            name="Start from scratch"
            description="Create your own agent from scratch"
            blank
            onClick={() => {}}
          />

          {Array.from({ length: 4 }).map((_, i) => (
            <AssistantCard
              name="Webex summarizer"
              description="Need help with structuring notes from a standup call? I'm your smart scribe"
              onClick={() => {}}
              key={i}
            />
          ))} */}
        </section>
      </ModalBody>

      <ModalFooter>
        <div className={classes.actions}>
          <Button kind="secondary" onClick={() => {}}>
            <span>Start creating</span>
            <ArrowUpRight />
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  );
}
