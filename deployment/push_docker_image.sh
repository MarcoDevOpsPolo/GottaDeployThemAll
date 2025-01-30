#!/bin/bash
aws ecr get-login-password --region "$2" | docker login --username AWS --password-stdin "$3".dkr.ecr."$2".amazonaws.com

docker tag gottafetchthemall:latest "$3".dkr.ecr."$2".amazonaws.com/"$1":latest

docker push "$3".dkr.ecr."$2".amazonaws.com/"$1":latest