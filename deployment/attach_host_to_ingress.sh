#!/bin/bash
awk -v newhost="$1" '/host:/ {$3=newhost}1' ingress.yaml > temp.yaml && mv temp.yaml ingress.yaml
