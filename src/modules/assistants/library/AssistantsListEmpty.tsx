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
import { ArrowUpRight } from '@carbon/react/icons';
import classes from './AssistantsListEmpty.module.scss';

export function AssistantsListEmpty() {
  return (
    <section className={classes.root}>
      <h3 className={classes.heading}>You haven’t created any bees yet</h3>

      <p className={classes.description}>
        Get started by exploring the library of available bees to jump-start
        your productivity, or build your own bee fitted specifically for your
        needs and use cases!
      </p>

      <div className={classes.actions}>
        <Link href="/library/new">
          <Button kind="tertiary">
            <span>Build a bee</span>

            <ArrowUpRight />
          </Button>
        </Link>
      </div>
    </section>
  );
}
