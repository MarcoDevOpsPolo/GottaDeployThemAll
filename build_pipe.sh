#!/bin/bash

echo "gotta catch em all"

# Frontend React Build

cd frontend || { echo "Failed to enter 'frontend' directory"; exit 1; }

npm run build

cd ..


# Start docker compose

cd backend

docker build -t gottafetchtemall .

cd ..

# here lies the tomb of approximately 20 deleted lines. Let this be a memoir on hard working o7

