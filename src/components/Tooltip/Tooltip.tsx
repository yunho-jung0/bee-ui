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
  arrow,
  autoUpdate,
  flip,
  FloatingArrow,
  FloatingPortal,
  offset,
  Placement,
  safePolygon,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useRole,
} from '@floating-ui/react';
import { Slot } from '@radix-ui/react-slot';
import { PropsWithChildren, ReactNode, useRef, useState } from 'react';
import classes from './Tooltip.module.scss';

export interface TooltipProps {
  content: ReactNode;
  placement?: Placement;
  asChild?: boolean;
}

export function Tooltip({
  content,
  placement = 'bottom',
  asChild,
  children,
}: PropsWithChildren<TooltipProps>) {
  const arrowRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    placement,
    open: isOpen,
    onOpenChange: setIsOpen,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(ARROW_HEIGHT + OFFSET),
      flip({
        fallbackAxisSideDirection: 'start',
      }),
      shift(),
      arrow({
        element: arrowRef,
      }),
    ],
  });

  const hover = useHover(context, { move: false, handleClose: safePolygon() });
  const focus = useFocus(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: 'tooltip' });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
    dismiss,
    role,
  ]);

  const Comp = asChild ? Slot : 'button';

  return (
    <>
      <Comp ref={refs.setReference} {...getReferenceProps()}>
        {children}
      </Comp>

      {isOpen && (
        <FloatingPortal>
          <div
            ref={refs.setFloating}
            style={floatingStyles}
            className={classes.root}
            {...getFloatingProps()}
          >
            <div className={classes.content}>{content}</div>

            <FloatingArrow
              ref={arrowRef}
              context={context}
              width={ARROW_WIDTH}
              height={ARROW_HEIGHT}
              className={classes.arrow}
            />
          </div>
        </FloatingPortal>
      )}
    </>
  );
}

const ARROW_WIDTH = 9;
const ARROW_HEIGHT = 7;
const OFFSET = 5;
