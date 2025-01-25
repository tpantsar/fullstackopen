FROM node:22

WORKDIR /usr/src/app

COPY . .

EXPOSE 5173

# Change npm ci to npm install since we are going to be in development mode
RUN npm install

# Start the application in development mode
CMD ["npm", "run", "dev", "--", "--host"]