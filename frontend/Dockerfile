# Use a base image with Node.js installed
FROM node:14

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the frontend application
RUN npm run build

# Expose the port your frontend application will run on
EXPOSE 3001

# Command to start the frontend application
CMD ["npm", "start"]
