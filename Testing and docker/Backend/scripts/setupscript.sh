#!/bin/bash

# Stop and remove existing containers
docker-compose down

# Remove old images (optional)
# docker rmi $(docker images -q) -f

# Build and start containers in detached mode
docker-compose up --build -d

# Get the MySQL container ID dynamically
MYSQL_CONTAINER=$(docker ps -q -f name=db_crud_typeorm-db)

if [ -z "$MYSQL_CONTAINER" ]; then
  echo "Error: MySQL container not found!"
  exit 1
fi

echo "Using MySQL container: $MYSQL_CONTAINER"

# Wait for MySQL to be ready
echo "Waiting for MySQL to start..."
until docker exec "$MYSQL_CONTAINER" mysqladmin -uroot -proottbz123 ping -h"localhost" --silent; do
  sleep 2
done

echo "MySQL is ready. Applying database schema..."
docker exec -i "$MYSQL_CONTAINER" mysql -uroot -proottbz123 mydatabase < init.sql

echo "Setup complete!"
