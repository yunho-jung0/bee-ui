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

import { Link } from '@/components/Link/Link';
import { Button } from '@carbon/react';
import { ArrowRight } from '@carbon/react/icons';
import classes from './BeeBanner.module.scss';
import backgroundImage from './bee-banner.jpg';

// TODO: Currently not being used anywhere
export function BeeBanner() {
  return (
    <section
      className={classes.root}
      style={{ backgroundImage: `url(${backgroundImage.src})` }}
    >
      <h3 className={classes.heading}>Talk to Bee</h3>
      <p className={classes.description}>
        I&apos;m a helpful general purpose agent, by IBM Research
      </p>

      <Link href="/">
        <Button kind="tertiary" className={classes.button}>
          <span>Start a chat</span>
          <ArrowRight />
        </Button>
      </Link>
    </section>
  );
}
