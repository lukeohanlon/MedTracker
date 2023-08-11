#!/bin/bash

# Stop and remove the existing frontend container
FRONTEND_CONTAINER=$(docker ps -a -q --filter ancestor="$FRONTEND_IMAGE" --format="{{.ID}}")
if [ "$FRONTEND_CONTAINER" ]; then
  docker rm -f "$FRONTEND_CONTAINER"
fi

# Stop and remove the existing backend container
BACKEND_CONTAINER=$(docker ps -a -q --filter ancestor="$BACKEND_IMAGE" --format="{{.ID}}")
if [ "$BACKEND_CONTAINER" ]; then
  docker rm -f "$BACKEND_CONTAINER"
fi

# Pull the latest frontend image from the container registry
docker pull "$FRONTEND_IMAGE"

# Pull the latest backend image from the container registry
docker pull "$BACKEND_IMAGE"

# Create and start the frontend container with the specified port mapping
docker create -p 3001:3001 --name frontend-container "$FRONTEND_IMAGE"
docker start frontend-container

# Create and start the backend container with the specified port mapping
docker create -p 3000:3000 --name backend-container "$BACKEND_IMAGE"
docker start backend-container
