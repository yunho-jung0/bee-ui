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

import { Dispatch, SetStateAction, useMemo, useRef } from 'react';
import { useForceUpdate } from './useForceUpdate';

export function useStateWithGetter<S>(
  initialState: S,
): [() => S, Dispatch<SetStateAction<S>>] {
  const stateRef = useRef(initialState);
  const forceUpdate = useForceUpdate();

  return useMemo(
    () => [
      () => stateRef.current as S,
      (updater: SetStateAction<S>) => {
        stateRef.current =
          typeof updater === 'function'
            ? (updater as Function)(stateRef.current)
            : updater;
        forceUpdate();
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
}
