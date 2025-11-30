# --------------------------------------------------
# Stage 1: Build Angular App (Node Alpine)
# --------------------------------------------------
FROM node:22-alpine AS build

WORKDIR /app

# Copy only package files first (for better caching)
COPY package.json package-lock.json ./
COPY angular.json ./
COPY tsconfig*.json ./

# Install deps (prod-only)
RUN npm ci --omit=dev

# Install Angular CLI (only for build)
RUN npm install @angular/cli --save-dev

# Copy source code
COPY . .

# Build Angular app for production
RUN npm run build:shell

# Remove sourcemaps to shrink output
RUN find dist/shell/browser -type f -name "*.map" -delete


# --------------------------------------------------
# Stage 2: Final NGINX Image (VERY small)
# --------------------------------------------------
FROM nginx:stable-alpine-slim


# Remove default nginx page
RUN rm -rf /usr/share/nginx/html/*

# Copy Angular dist output
COPY --from=build /app/dist/shell/browser /usr/share/nginx/html/

# Copy Nginx SPA config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
