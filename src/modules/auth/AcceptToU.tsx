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

import { Session } from 'next-auth';
import classes from './AcceptToU.module.scss';
import { AcceptToUForm } from './AcceptToUForm';
import { TermsOfUse } from './TermsOfUse';
import Illustration from './tou-illustration.svg';

interface Props {
  session: Session;
  callbackUrl: string;
}

export function AcceptToU({ session, callbackUrl }: Props) {
  return (
    <article className={classes.root}>
      <div className={classes.intro}>
        <div className={classes.introContainer}>
          <div className={classes.introContent}>
            <Illustration />
            <p className={classes.introGreeting}>
              Hi {session.userProfile.firstName},<br />
              you’re almost there...
            </p>
            <p className={classes.introText}>
              Harness the power of foundation models for your enterprise use
              cases.
            </p>
          </div>
        </div>
      </div>
      <AcceptToUForm tou={<TermsOfUse />} callbackUrl={callbackUrl} />
    </article>
  );
}
