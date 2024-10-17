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

import { useMessageFeedback } from '@/modules/chat/providers/MessageFeedbackProvider';
import { IconButton } from '@carbon/react';
import {
  ThumbsDown,
  ThumbsDownFilled,
  ThumbsUp,
  ThumbsUpFilled,
} from '@carbon/react/icons';

interface Props {
  btnWrapperClasses?: string;
}

export function MessageFeedbackTrigger({ btnWrapperClasses }: Props) {
  const { run, onVoteClick, currentVote } = useMessageFeedback();

  return (
    <>
      <div className={btnWrapperClasses}>
        <IconButton
          label="I like this response"
          kind="ghost"
          size="sm"
          align="bottom"
          onClick={() => {
            onVoteClick('up');
          }}
          disabled={!run}
        >
          {currentVote === 'up' ? <ThumbsUpFilled /> : <ThumbsUp />}
        </IconButton>
      </div>
      <div className={btnWrapperClasses}>
        <IconButton
          label="I dislike this response"
          kind="ghost"
          size="sm"
          align="bottom"
          onClick={() => {
            onVoteClick('down');
          }}
          disabled={!run}
        >
          {currentVote === 'down' ? <ThumbsDownFilled /> : <ThumbsDown />}
        </IconButton>
      </div>
    </>
  );
}
