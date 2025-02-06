# Use Node.js 20.11.1 with Alpine for a lightweight image
FROM node:20.11.1-alpine AS base

# Set working directory
WORKDIR /app

# Copy only necessary files for dependency installation
COPY package.json pnpm-lock.yaml ./

# Install dependencies using pnpm
RUN corepack enable pnpm && pnpm install --frozen-lockfile

# Copy the rest of the application
COPY . .

# Set environment variables
ENV NEXT_DISABLE_WARNINGS=1 \
    PORT=3000

# Build the application
RUN pnpm run build

# Expose the application port
EXPOSE 3000

# Run the application
CMD ["pnpm", "run", "start"]
