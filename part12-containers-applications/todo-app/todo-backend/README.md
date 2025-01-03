## .env

```
PORT=3000
MONGO_URL=mongodb://the_username:the_password@localhost:3456/the_database
REDIS_URL=redis://localhost:6379
```

# Express application

Install dependencies with `npm install`

Run with `npm start`

Or in development mode with `npm run dev`

# Visit counter

When running the server, visit http://localhost:3000 to see visit counter, or give environment variable `PORT` to change the port.

# MongoDB

The application has /todos crud which requires a MongoDB. Pass connection url with env `MONGO_URL`

# Redis

Pass connection url with env `REDIS_URL`