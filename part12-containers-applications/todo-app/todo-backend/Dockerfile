FROM node:20

WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm ci --only=production

ENV DEBUG=todo-backend:*

USER node

CMD ["npm", "run", "start"]