# --------------------------------------------------
# 1. Build Angular App using Node 22 Alpine
# --------------------------------------------------
FROM node:22-alpine AS build

WORKDIR /app

# Copy package files
# Copy essential config files FIRST
COPY package.json package-lock.json ./
COPY angular.json ./
COPY tsconfig*.json ./


# Install only required deps (clean + small)
RUN npm ci --omit=dev

# Install Angular CLI locally (IMPORTANT)
RUN npm install @angular/cli --save-dev
# Copy all project files
COPY . .

# Build Angular for production
RUN npm run build:shell

# Clean node_modules to reduce image size
RUN rm -rf node_modules


# --------------------------------------------------
# 2. Serve Built App using NGINX Alpine
# --------------------------------------------------
FROM nginx:alpine

# Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy Angular dist output into Nginx public folder
COPY --from=build /app/dist/shell/browser /usr/share/nginx/html/

# Custom Nginx SPA config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
