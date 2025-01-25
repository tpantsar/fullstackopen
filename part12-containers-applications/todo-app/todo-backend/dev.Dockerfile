FROM node:22

WORKDIR /usr/src/app

COPY package*.json ./

# Change npm ci to npm install since we are going to be in development mode
RUN npm install

COPY . .

EXPOSE 3000

# Start the application in development mode
CMD ["npm", "run", "dev", "--", "--host"]