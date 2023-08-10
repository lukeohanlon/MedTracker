# Use the Node.js image as the base image
FROM node:14

# Set the working directory inside the container
WORKDIR /frontend

# Copy package.json and package-lock.json to the container
COPY ["package*.json", "package-lock.json*", "./"]

# Install dependencies
RUN npm install

# Copy the rest of the frontend application files to the container
COPY . .

# Build the frontend application
RUN npm run build

# Expose the port that your frontend application listens on (if applicable)
# If your frontend application doesn't listen on any port, you can omit this line.
EXPOSE 3001

# Start the frontend application using your preferred command
# For example:
CMD ["npm", "start"]