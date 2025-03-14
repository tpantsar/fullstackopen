FROM node:22

WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm ci --omit=dev

ENV NODE_ENV=production

USER node

CMD ["npm", "run", "start"]