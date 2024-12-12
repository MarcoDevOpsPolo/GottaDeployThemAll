#!/bin/sh

echo "gotta catch em all"

cd frontend || { echo "Failed to enter 'frontend' directory"; exit 1; }

npm run build

cd ..
