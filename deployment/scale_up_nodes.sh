#!/bin/bash
eksctl scale nodegroup --region eu-west-2 --name=linux-nodes --cluster=poke-cluster --nodes=10 --nodes-min=1 --nodes-max=10