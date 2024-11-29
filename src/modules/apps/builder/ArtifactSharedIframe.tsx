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

'use client';
import { USERCONTENT_SITE_URL } from '@/utils/constants';
import { removeTrailingSlash } from '@/utils/helpers';
import { Loading } from '@carbon/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useAppBuilder, useAppBuilderApi } from './AppBuilderProvider';
import classes from './ArtifactSharedIframe.module.scss';

interface Props {}

export function ArtifactSharedIframe({}: Props) {
  const { code } = useAppBuilder();
  const { getCode } = useAppBuilderApi();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [state, setState] = useState<State>(State.LOADING);

  const triggerCodeUpdate = useCallback((code: string | null) => {
    if (!code) {
      return;
    }

    iframeRef?.current?.contentWindow?.postMessage?.(
      {
        type: StliteMessageType.UPDATE_CODE,
        code,
      },
      USERCONTENT_SITE_URL,
    );
  }, []);

  const handleMessage = useCallback((event: MessageEvent<StliteMessage>) => {
    const { origin, data } = event;

    if (origin !== removeTrailingSlash(USERCONTENT_SITE_URL)) {
      return;
    }

    if (
      data.type === SCRIPT_RUN_STATE_CHANGED &&
      data.scriptRunState === ScriptRunState.RUNNING
    ) {
      setState(State.READY);
    }
  }, []);

  useEffect(() => triggerCodeUpdate(code), [code, triggerCodeUpdate]);

  useEffect(() => {
    if (state === State.READY) {
      const code = getCode();
      if (code) triggerCodeUpdate(getCode());
    }
  }, [getCode, state, triggerCodeUpdate]);

  useEffect(() => {
    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [handleMessage]);

  return (
    <div className={classes.root}>
      <iframe
        ref={iframeRef}
        src={USERCONTENT_SITE_URL}
        title="Bee App preview"
        sandbox="allow-scripts allow-downloads allow-same-origin"
        className={classes.app}
      />

      {state === State.LOADING && code && <Loading />}
    </div>
  );
}

enum StliteMessageType {
  UPDATE_CODE = 'updateCode',
  // TODO: Add error handling
  ERROR = 'error',
}

enum ScriptRunState {
  INITIAL = 'initial',
  NOT_RUNNING = 'notRunning',
  RUNNING = 'running',
}

enum State {
  LOADING = 'loading',
  READY = 'ready',
}

const SCRIPT_RUN_STATE_CHANGED = 'SCRIPT_RUN_STATE_CHANGED';

interface StliteMessage {
  type: typeof SCRIPT_RUN_STATE_CHANGED;
  scriptRunState: ScriptRunState;
}
