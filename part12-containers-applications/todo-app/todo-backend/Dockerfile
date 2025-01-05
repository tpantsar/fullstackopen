FROM node:20

WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm ci --omit=dev

EXPOSE 3000

ENV DEBUG=todo-backend:*

USER node

CMD ["npm", "run", "start"]