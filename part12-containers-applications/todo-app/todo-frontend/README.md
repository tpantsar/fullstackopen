# React application

This application is created with [Vite](https://vitest.dev/).

Install dependencies with `npm install`

You can run the application in development mode with `npm run dev`

You can build static files for production release with `npm run build`

## Environment variables

Use env VITE_BACKEND_URL to set where the backend for this application is

# Docker Container

```bash
$ docker build -t todo-frontend-web .

$ docker run --name todo-frontend -d todo-frontend-web

$ docker run --name todo-frontend -d -p 8080:80 todo-frontend-web
```
