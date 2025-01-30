#!/bin/sh
awk -v newimg="$(aws ecr describe-repositories --region "$1" --repository-names marcopolo/gottafetchthemall --query "repositories[0].repositoryUri" --output text)" '/image:/ {$0 = "        image: " newimg}1' deployment.yaml > temp.yaml && mv temp.yaml deployment.yaml
