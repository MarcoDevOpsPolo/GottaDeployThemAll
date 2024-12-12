#!/bin/sh

echo "gotta catch em all"

cd frontend || { echo "Failed to enter 'frontend' directory"; exit 1; }

npm run build

cd ..

cd backend || { echo "Failed to enter 'backend' directory"; exit 1; }

docker rmi -f poke-api

docker build -t poke-api .

cd ..

CONTAINER_ID=$(docker run -d -p 8128:8128 poke-api )

echo "id: $CONTAINER_ID"

