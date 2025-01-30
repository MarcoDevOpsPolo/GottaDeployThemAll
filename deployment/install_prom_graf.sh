#!/bin/bash
helm install prometheus prometheus-community/kube-prometheus-stack --version 45.7.1 --namespace monitoring