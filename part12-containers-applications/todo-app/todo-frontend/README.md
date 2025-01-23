## React application

This application is created with [Vite](https://vitest.dev/).

Install dependencies with `npm install`

You can run the application in development mode with `npm run dev`

You can build static files for production release with `npm run build`

## Environment variables

Use env VITE_BACKEND_URL to set where the backend for this application is

## Docker Container (development)

```bash
docker build -f ./Dockerfile.dev -t todo-frontend-dev .
docker run --name todo-frontend-dev -d -p 5173:5173 todo-frontend-dev
```

```bash
docker compose -f docker-compose.dev.yml up
docker run -p 5173:5173 -v "$(pwd):/usr/src/app/" todo-frontend-dev
```

- Busybox:
- Flag `-O -` outputs the response to the stdout
- remove-orphans flag removes the orphan containers (duplicates)

```bash
docker compose -f docker-compose.dev.yml run --remove-orphans debug-helper wget -O - http://app:5173
```

### Installing new dependencies to container:

```bash
docker exec todo-frontend-dev npm install axios
```

OR: add it to the package.json and run `docker build` again.

## Docker Container (production)

```bash
docker build -t todo-frontend-prod .
docker run --name todo-frontend-prod -d -p 8080:80 todo-frontend-prod
```
