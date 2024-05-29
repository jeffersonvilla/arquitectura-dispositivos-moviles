# Build Stage
FROM node:20 AS build

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

COPY . .
RUN yarn build

# Serve Stage
FROM nginx:latest

COPY --from=build /app/dist /usr/share/nginx/html

# Optional: Override Nginx's default configuration to improve compatibility
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
