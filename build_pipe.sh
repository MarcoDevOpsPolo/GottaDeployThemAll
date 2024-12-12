#!/bin/bash
#Dont forget to run this script as a source! '. ./build_pipe.sh'

if [[ -n "$CONTAINER_ID" ]] 
then
    docker kill "$CONTAINER_ID"
    docker rm "$CONTAINER_ID"
fi

echo "gotta catch em all"

cd frontend || { echo "Failed to enter 'frontend' directory"; exit 1; }

npm run build

cd ..

cd backend || { echo "Failed to enter 'backend' directory"; exit 1; }

docker rmi -f poke-api

docker build -t poke-api .

cd ..

CONTAINER_ID=$(docker run -d -p 8128:8128 poke-api )
export CONTAINER_ID

echo "id: $CONTAINER_ID"

docker logs -f "$CONTAINER_ID" >> ./analysis/log.txt 2>&1 &