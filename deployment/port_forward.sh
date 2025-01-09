#!/bin/bash

# kubectl port-forward -n monitoring svc/prometheus-operated 9090:9090
kubectl port-forward --address=0.0.0.0 -n monitoring svc/prometheus-operated 9090:9090 &
