FROM node:20.11.1-alpine AS base

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat

ENV APP_DIR=/app

RUN mkdir -p ${APP_DIR}
WORKDIR ${APP_DIR}

# Install dependencies only when needed
FROM base AS deps

ENV CI=1
ENV HUSKY=0

# Install dependencies based on the preferred package manager
COPY package.json pnpm-lock.yaml* ./
COPY patches ./patches
RUN corepack enable pnpm && pnpm i --frozen-lockfile

# Rebuild the source code only when needed
FROM base AS builder

ENV CI=1

COPY --from=deps ${APP_DIR}/node_modules ./node_modules
COPY . .

ARG NEXT_PUBLIC_APP_NAME
ARG NEXT_PUBLIC_AUTH_PROVIDER_ID
ARG NEXT_PUBLIC_AUTH_LABEL
ARG NEXT_PUBLIC_AUTH_PARAMS
ARG NEXT_PUBLIC_TOU_TEXT
ARG NEXT_PUBLIC_PRIVACY_URL
ARG NEXT_PUBLIC_DOCUMENTATION_URL
ARG NEXT_PUBLIC_FEEDBACK_URL
ARG NEXT_PUBLIC_USERCONTENT_SITE_URL
ARG AUTH_JWKS_ENDPOINT
ARG DUMMY_JWT_TOKEN
ARG NEXT_PUBLIC_WAITLIST_URL
ARG NEXT_PUBLIC_BEE_AGENT_PLATFORM_URL
ARG NEXT_PUBLIC_ARTIFACTS_SITE_URL

RUN corepack enable pnpm && pnpm run build;

EXPOSE 3000

ENV PORT 3000

CMD npm run start
