#!/bin/bash
eksctl scale nodegroup --name=linux-nodes --cluster=poke-cluster --nodes=30 --nodes-min=1 --nodes-max=30