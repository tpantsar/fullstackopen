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

## Docker Container (production)

```bash
docker build -t todo-frontend-prod .
docker run --name todo-frontend-prod -d -p 8080:80 todo-frontend-prod
```
