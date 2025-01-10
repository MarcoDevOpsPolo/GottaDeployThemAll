#!/bin/bash

# https://chatgpt.com/share/677e7dff-7880-8013-974a-6ea08fac287a

helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
helm repo update
helm install ingress-nginx ingress-nginx/ingress-nginx \
  --namespace ingress-nginx --create-namespace

