# Build Stage
FROM node:20-alpine AS build

LABEL maintainer="Somay Khatri <khatrisomay@github>"
LABEL description="Uptime Monitor Frontend React Application Build"

WORKDIR /app

# Copy package descriptors first for efficient caching
COPY package*.json ./

# Install dependencies (ci for reproducible builds)
RUN npm ci

# Copy source code and build production assets
COPY . .
RUN npm run build

# Production Stage (Nginx Alpine)
FROM nginx:1.25-alpine AS production

LABEL description="Uptime Monitor Frontend Web Server"

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy built static files from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose HTTP port
EXPOSE 80

# Health check endpoint
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:80/ || exit 1

# Run Nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
