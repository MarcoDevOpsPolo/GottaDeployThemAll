# GottaDeployThemAll

GottaDeployThemAll is 

** Running an EKS cluster costs around $0.10 per hour, and instances cost around the same, make sure to be prepared before running the script! Refer to [Amazon pricing](https://aws.amazon.com/eks/pricing/)! **

## Prerequisites

- A working, valid **AWS account**
- awscli
- kubernetes
    - eksctl
- docker
- helm

## Running the project

1. Create a `docker-secrete.yaml` file in `deployment`

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: docker-login
  namespace: poke
data:
  .dockerconfigjson: <<secretdata encrypted base64>>
type: kubernetes.io/dockerconfigjson
```

2. Run `build_pipe.sh`

```bash
./build_pipe.sh
```

Creation takes a couple of minutes. 