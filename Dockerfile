# Use Node.js 20.11.1 with Alpine for a lightweight image
FROM node:20.11.1-alpine AS base

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

# Create writable cache directories to prevent EACCES error
RUN mkdir -p /.cache /app/.cache /app/node_modules/.cache && chmod -R 777 /.cache /app/.cache /app/node_modules/.cache

# Set environment variables
ENV NEXT_DISABLE_WARNINGS=1 \
    XDG_CACHE_HOME=/app/.cache \
    NPM_CONFIG_CACHE=/app/.cache \
    PNPM_HOME=/app/.cache \
    PORT=3000

# Build the application
RUN pnpm run build

# Expose the application port
EXPOSE 3000

# Run the application
CMD ["pnpm", "run", "start"]
