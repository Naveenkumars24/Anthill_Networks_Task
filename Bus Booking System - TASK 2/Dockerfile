FROM node:16

WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .
COPY .env .env

# Start the application
CMD ["node", "server.js"]