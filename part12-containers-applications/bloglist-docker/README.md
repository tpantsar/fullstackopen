## node_volumes directory needs to be added as a volume in docker-compose.yml

https://stackoverflow.com/a/60194067

```bash
volumes:
  - ./:/usr/src/app
  - /usr/src/app/node_modules
```

## Docker development container:

`-d` flag is used to run the container in the background.

```bash
docker compose -f docker-compose.dev.yml up -d --build
```

## Docker production container:

```bash
docker compose up -d --build
```

## Other commands:

```bash
docker run -it bloglist-backend-dev bash

docker run -it bloglist-frontend-dev bash
npm i

docker compose -f docker-compose.dev.yml run debug-helper wget -O - http://frontend:5173

docker build -f Dockerfile.dev -t bloglist-backend-dev .
docker build -f Dockerfile.dev -t bloglist-frontend-dev .

docker run -p 3001:3001 bloglist-backend-dev
docker run -p 5173:5173 bloglist-frontend-dev
```
