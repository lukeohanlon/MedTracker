#!/bin/bash

# Define environment variables
export RAILS_ENV=production

# Navigate to the application directory
cd /app

# Bring down any existing containers
docker-compose down

# Pull the latest images
docker-compose pull

# Start the containers in detached mode
docker-compose up -d
