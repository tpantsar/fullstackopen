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
```
