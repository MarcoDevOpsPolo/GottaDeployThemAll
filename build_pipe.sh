#!//bash
#Dont forget to run this script as a source! '. ./build_pipe.sh'

# Kill Poke Container

if [[ -n "$POKE_CONTAINER_ID" ]] 
then
    docker kill "$POKE_CONTAINER_ID"
    docker rm "$POKE_CONTAINER_ID"
fi

echo "gotta catch em all"

# Analyser container build

cd analysis || { echo "Failed to enter 'analysis' directory"; exit 1; }

docker rmi -f analyser

docker build -t analyser

cd ..

# Frontend React Build

cd frontend || { echo "Failed to enter 'frontend' directory"; exit 1; }

npm run build

cd ..

# Backend docker container creation

cd backend || { echo "Failed to enter 'backend' directory"; exit 1; }

docker rmi -f poke-api

docker build -t poke-api .

cd ..

POKE_CONTAINER_ID=$(docker run -d -p 8128:8128 poke-api )
export POKE_CONTAINER_ID

echo "id: $POKE_CONTAINER_ID"

docker logs -f "$POKE_CONTAINER_ID" >> ./analysis/log.txt 2>&1 &
