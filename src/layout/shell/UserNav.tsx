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

import { ExternalLink } from '@/components/ExternalLink/ExternalLink';
import { Link } from '@/components/Link/Link';
import { useAppContext } from '@/layout/providers/AppProvider';
import { usePrefetchVectorStores } from '@/modules/knowledge/api/queries/usePrefetchVectorStores';
import { usePrefetchTools } from '@/modules/tools/api/queries/usePrefetchTools';
import { useRoutes } from '@/routes/useRoutes';
import { DOCUMENTATION_URL, FEEDBACK_URL } from '@/utils/constants';
import { FeatureName } from '@/utils/parseFeatureFlags';
import { ArrowUpRight } from '@carbon/react/icons';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { HTMLAttributes } from 'react';
import classes from './UserNav.module.scss';
import { UserProfile } from './UserProfile';

interface Props extends HTMLAttributes<HTMLElement> {}

export function UserNav({ className }: Props) {
  const pathname = usePathname();
  const { routes } = useRoutes();
  const { featureFlags } = useAppContext();

  const prefetchTools = usePrefetchTools({ useDefaultParams: true });
  const prefetchVectoreStores = usePrefetchVectorStores({
    useDefaultParams: true,
  });

  const ITEMS = [
    {
      label: 'Tools',
      href: routes.tools(),
      prefetchData: prefetchTools,
    },
    {
      label: 'Knowledge',
      href: routes.vectorStores(),
      featureName: FeatureName.Knowledge,
      prefetchData: prefetchVectoreStores,
    },
  ];

  return (
    <nav className={clsx(classes.root, className)} aria-label="User menu">
      <ul className={classes.nav}>
        {ITEMS.filter(
          ({ featureName }) => !featureName || featureFlags[featureName],
        ).map(({ label, href, prefetchData }) => (
          <li key={href}>
            <Link
              href={href}
              aria-current={pathname === href ? 'page' : undefined}
              onMouseEnter={() => prefetchData()}
            >
              {label}
            </Link>
          </li>
        ))}
        {DOCUMENTATION_URL && (
          <li>
            <ExternalLink href={DOCUMENTATION_URL} Icon={ArrowUpRight}>
              Resources
            </ExternalLink>
          </li>
        )}
        {FEEDBACK_URL && (
          <li>
            <ExternalLink href={FEEDBACK_URL} Icon={ArrowUpRight}>
              Give feedback
            </ExternalLink>
          </li>
        )}
      </ul>

      <UserProfile className={classes.userProfile} />
    </nav>
  );
}
