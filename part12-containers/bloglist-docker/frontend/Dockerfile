FROM node:22 AS build-stage

WORKDIR /usr/src/app

COPY . .

ENV VITE_BACKEND_URL=/api

RUN npm ci

RUN npm run build

FROM nginx:alpine

COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html