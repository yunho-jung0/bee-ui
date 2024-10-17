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
import { useToast } from '@/layout/providers/ToastProvider';
import { Button, Checkbox, InlineLoading } from '@carbon/react';
import { ArrowRight } from '@carbon/react/icons';
import { ReactNode, useEffect, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { acceptTou } from '../../app/auth/accept-tou/actions';
import classes from './AcceptToUForm.module.scss';

interface Props {
  tou: ReactNode;
  callbackUrl: string;
}

export function AcceptToUForm({ tou, callbackUrl }: Props) {
  const [accepted, setAccepted] = useState(false);
  const [response, formAction] = useFormState(acceptTou.bind(null), null);

  const { addToast } = useToast();
  useEffect(() => {
    if (response?.success) {
      // CSS styles don't get loaded correctly when redirecting
      // to the (main) layout with next/navigation, I couldn't
      // find a better solution than using native browser redirect.
      window.location.replace(callbackUrl);
    }
    if (response?.error) {
      addToast({
        title: 'Accepting Terms of Use failed',
        subtitle: response.message,
        timeout: 10000,
      });
    }
  }, [response, addToast, callbackUrl]);

  return (
    <form className={classes.root} action={formAction}>
      <div className={classes.body}>
        <div className={classes.bodyContent}>
          <h1 className={classes.bodyHeading}>Terms of Use</h1>
          <div className={classes.tou}>{tou}</div>
          <div className={classes.acceptWrapper}>
            <Checkbox
              labelText="I accept the terms of use"
              id="accept"
              name="accept"
              className={classes.acceptCheckbox}
              required
              value="yes"
              checked={accepted}
              onChange={(e, { checked }) => {
                setAccepted(checked);
              }}
            />
          </div>
        </div>
      </div>
      <footer className={classes.footer}>
        <SubmitButton
          disabled={!accepted}
          isRedirecting={Boolean(response?.success)}
        />
      </footer>
    </form>
  );
}

function SubmitButton({
  disabled,
  isRedirecting,
}: {
  disabled?: boolean;
  isRedirecting: boolean;
}) {
  const { pending } = useFormStatus();

  const isPending = pending || isRedirecting;
  return (
    <Button
      className={classes.acceptBtn}
      size="2xl"
      renderIcon={ArrowRight}
      disabled={disabled || isPending}
      type="submit"
    >
      {isPending ? (
        <InlineLoading description="Accepting..." />
      ) : (
        'Accept and get started'
      )}
    </Button>
  );
}
