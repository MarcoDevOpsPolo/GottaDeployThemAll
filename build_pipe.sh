#!/bin/bash

echo "gotta catch em all"

# Create log folder

if [ -d "logs" ]; then
	  rm -rf logs
fi

mkdir logs

touch logs/log.txt

# Frontend React Build

cd frontend || { echo "Failed to enter 'frontend' directory"; exit 1; }

npm run build

cd ..


# Start docker compose

docker-compose up --build -d

docker-compose logs -f >> logs/log.txt 2>&1 &

# here lies the tomb of approximately 20 deleted lines. Let this be a memoir on hard working o7

