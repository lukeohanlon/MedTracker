# Use the official Node.js image as the base image
FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Copy the frontend application code into the container
COPY . /app/

# Install dependencies
RUN npm install

# Build the frontend application
RUN npm run build

# Expose the port your frontend app will run on (if needed)
EXPOSE 3001

# Start the frontend application
CMD ["npm", "start"]
