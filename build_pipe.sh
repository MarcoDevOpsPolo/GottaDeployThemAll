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


# Start docker gottafetchthemall

cd backend

docker build -t gottafetchtemall .

cd ..

# Start docker analysis

cd analysis

docker build -t analyser .

cd ..
# here lies the tomb of approximately 20 deleted lines. Let this be a memoir on hard working o7

