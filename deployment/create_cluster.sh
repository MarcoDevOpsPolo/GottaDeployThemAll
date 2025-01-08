#!/bin/bash
eksctl create cluster \
--name poke-cluster \
--version 1.31 \
--region eu-west-2 \
--nodegroup-name linux-nodes \
--node-type t2.micro \
--nodes 35