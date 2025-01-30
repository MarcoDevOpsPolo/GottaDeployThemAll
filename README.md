# GottaDeployThemAll

GottaDeployThemAll is 

** Running an EKS cluster costs around $0.10 per hour, and instances cost around the same, make sure to be prepared before running the script! Refer to [Amazon pricing](https://aws.amazon.com/eks/pricing/)! **

## Prerequisites

- A working, valid **AWS account**
- awscli installed
- kubernetes
    - eksctl
- docker
- helm

## Running the project

1. Create a `docker-secret.yaml` file in `deployment`

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

2. Copy the result of the encrypted docker config file to `.dockerconfigjson:`

```bash
cat ~/.docker/config.json | base64
```

3. Run `build_pipe.sh` with the corresponding parameters.

```bash
./build_pipe.sh <ecr name> <aws region code> <aws account id>
```

Creation takes a couple of minutes. If everything progressed fine, your last message will be 
> "Poke-Api has been deployed successfully! Enjoy the game at HOSTNAME"

Enjoy!

## Cleanup

Once you feel enough of playing, and you don't want to pay too much for the running instances, delete your cluster and all the resources using this command: 

```bash
eksctl delete cluster --name poke-api --region <your-region>
```