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

import clsx from 'clsx';
import { motion } from 'framer-motion';
import { HTMLProps } from 'react';
import classes from './BounceButton.module.scss';

interface Props extends Omit<HTMLProps<HTMLButtonElement>, 'type'> {
  scale?: number;
}

export function BounceButton({
  scale = 0.9,
  className,
  children,
  ...props
}: Props) {
  return (
    <button {...props} className={clsx(classes.root, className)}>
      <motion.span
        className={classes.wrapper}
        whileHover={{ scale }}
        transition={{
          type: 'spring',
          mass: 1,
          stiffness: 600,
          damping: 15,
        }}
      >
        {children}
      </motion.span>
    </button>
  );
}
