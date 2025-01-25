FROM node:22

WORKDIR /usr/src/app

COPY --chown=node:node . .

ENV DEBUG=todo-backend:*

RUN npm ci --only=production

EXPOSE 3000

USER node

CMD ["npm", "run", "start"]