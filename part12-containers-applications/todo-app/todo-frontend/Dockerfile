# The first FROM is now a stage called build-stage
FROM node:22 AS build-stage 

WORKDIR /usr/src/app

COPY --chown=node:node . .

ENV VITE_BACKEND_URL=http://localhost:8080/api/

RUN npm ci --only=production

# build stage for testing
FROM build-stage AS test-stage
RUN CI=true npm test

RUN npm run build

# This is a new stage, everything before this is gone, except for the files that we want to COPY
FROM nginx:latest

# COPY the directory dist from the build-stage to /usr/share/nginx/html
# The target location here was found from the Docker hub page
COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html

# If you add a custom CMD in the Dockerfile, be sure to include -g daemon off;
# in the CMD in order for nginx to stay in the foreground, so that Docker can track the process properly
# (otherwise your container will stop immediately after starting)!
# https://hub.docker.com/_/nginx
# CMD ["nginx", "-g", "daemon off;"]