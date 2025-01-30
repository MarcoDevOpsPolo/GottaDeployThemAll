#!/bin/bash
ecr=$1
region=$2
aws_acc_id=$3

set -e

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

docker build -t gottafetchthemall:latest .

cd ..

# Start docker analysis

cd analysis

docker build -t analyser .

cd ..

cd deployment

. push_docker_image.sh $ecr $region $aws_acc_id

. create_cluster.sh

. attach_image_to_deployment.sh $region

kubectl apply -f poke-namespace.yaml
kubectl apply -f monitoring-namespace.yaml
kubectl apply -f docker-secret.yaml
kubectl apply -f deployment.yaml
kubectl apply -f service.yaml

. scale_up_nodes.sh

kubectl apply -f ingress.yaml

. add-nginx-helm.sh

host=$(kubectl get ingress gottafetchthemall-ingress -n poke -o jsonpath='{.status.loadBalancer.ingress[0].hostname}')

echo poke-api will run at: "$host"

. attach_host_to_ingress.sh "$host"

kubectl apply -f ingress.yaml

. install_prom_graf.sh

. port_forward.sh &


echo "Poke-Api has been deployed successfully! Enjoy the game at $host"