FROM node:20

WORKDIR /usr/src/app

COPY . .

# Change npm ci to npm install since we are going to be in development mode
RUN npm install

EXPOSE 5173

# Start the application in development mode
CMD ["npm", "run", "dev", "--", "--host"]