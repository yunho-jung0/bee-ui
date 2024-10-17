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

import { useEffect } from 'react';
import { IntersectionOptions, useInView } from 'react-intersection-observer';

interface Props extends Omit<IntersectionOptions, 'onChange'> {
  onFetchNextPage: () => void;
  isFetching: boolean;
  hasNextPage?: boolean;
}

export function useFetchNextPageInView({
  onFetchNextPage,
  hasNextPage,
  isFetching,
  skip,
  rootMargin = '160px 0px 0px 0px',
  ...inViewProps
}: Props) {
  const inViewReturn = useInView({
    skip: skip ?? !hasNextPage,
    rootMargin,
    onChange(inView) {
      if (inView && !isFetching) {
        onFetchNextPage();
      }
    },
    ...inViewProps,
  });

  useEffect(() => {
    if (inViewReturn.entry?.isIntersecting && !isFetching && hasNextPage) {
      onFetchNextPage();
    }
  }, [
    hasNextPage,
    inViewReturn.entry?.isIntersecting,
    isFetching,
    onFetchNextPage,
  ]);

  return inViewReturn;
}
