# Use an official Node.js LTS (Long Term Support) as a base image
FROM node:14-alpine AS build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the React app for production
RUN npm run build

# Create a new image with a lightweight Node.js image
FROM node:14-alpine

# Set the working directory in the container
WORKDIR /app

# Copy only the build output from the previous stage
COPY --from=build /app/build ./build

# Install a simple HTTP server to serve the React app
RUN npm install -g serve

# Expose the port that the HTTP server will run on
EXPOSE 5000

# Define the command to serve the React app
CMD ["serve", "-s", "build"]
