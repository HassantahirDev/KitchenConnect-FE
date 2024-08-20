# Stage 1: Build the React application
FROM node:18-alpine AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project to the working directory
COPY . .

# Build the React app for production
RUN npm run build

# Stage 2: Serve the app with Node.js
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy built React app from the previous stage
COPY --from=build /app/build /app/build

# Copy the server script to the working directory
COPY server.js .

# Install express to serve the app
RUN npm install express

# Expose the port the app will run on
EXPOSE 80

# Command to run the server
CMD ["node", "server.js"]
