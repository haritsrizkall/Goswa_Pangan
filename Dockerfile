# Stage 1: Build static site
FROM node:22-alpine AS builder

WORKDIR /app

# Enable corepack for pnpm
RUN corepack enable

# Copy package files first for better caching
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build arg for API URL (baked at build time)
ARG NEXT_PUBLIC_API_URL=https://goswa.gaia.smartsoft.co.id
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

# Build static export
RUN pnpm build

# Stage 2: Serve with Nginx
FROM nginx:1.27-alpine

# Copy custom nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# Copy static files from builder
COPY --from=builder /app/out /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
