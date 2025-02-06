# Use Node.js 20.11.1 with Alpine for a lightweight image
FROM node:20.11.1 AS base

# Set working directory
WORKDIR /app

ENV HUSKY=0

# Copy only necessary files for dependency installation
COPY package.json pnpm-lock.yaml ./
COPY patches ./patches

# Install dependencies using pnpm
RUN corepack enable pnpm && pnpm install --frozen-lockfile

# Copy the rest of the application
COPY . .

ARG NEXT_PUBLIC_APP_NAME="Bee Test"
ARG DUMMY_JWT_TOKEN="eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0ZXN0IiwicHJlZmVycmVkX3VzZXJuYW1lIjoiVGVzdCBVc2VyIiwiZW1haWwiOiJ0ZXN0QGVtYWlsLmNvbSIsImlhdCI6MTUxNjIzOTAyMiwiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3QiLCJhdWQiOiJiZWUtdGVzdCJ9.vwkGnl7lBbzJYk6BtoW3VoA3mnNJVI-nDQU8aK7zOH-rkf2pn5cn6CKwpq7enDInIXro8WtBLNZP8Nr8GQIZKahICuP3YrPRmzv7YIW8LuXKnx1hycg5OAtj0OtQi5FYwwCxTYW9pBF2it7XwQSBcW7yYsOrvgs7jVhThCOsavX0YiAROxZIhk1idZT4Pl3egfUI_dy9iBxcn7xocTnos-94wqJNt8oCVgB8ynj75yJFHJbiQ-9Tym_V3LcMHoEyv67Jzie8KugCgdpuF6EbQqcyfYJ83q5jJpR2LiuWMuGsNSbjjDY-f1vCSMo9L9-R8KFrDylT_BzLvRBswOzW7A"
ARG API_URL="http://52.118.190.205:4000/"
ARG FEATURE_FLAGS='{"Knowledge":true,"Files":true,"TextExtraction":true,"FunctionTools":true,"Observe":true,"Projects":true}'

# Create writable cache directories to prevent EACCES error
RUN mkdir -p /.cache /app/.cache /app/node_modules/.cache && chmod -R 777 /.cache /app/.cache /app/node_modules/.cache

# Set environment variables
ENV NEXT_DISABLE_WARNINGS=1 \
    XDG_CACHE_HOME=/app/.cache \
    NPM_CONFIG_CACHE=/app/.cache \
    PNPM_HOME=/app/.cache \
    PORT=3000

ENV NODE_ENV=development

# Build the application
RUN pnpm run build

# Expose the application port
EXPOSE 3000

# Run the application
CMD ["pnpm", "run", "start"]
