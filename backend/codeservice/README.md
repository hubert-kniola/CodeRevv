## Judge0 code execution

1. [API DOCS](https://ce.judge0.com/)


2. First start

```bash
sudo apt install docker docker-compose &&
sudo dockerd& &&
source start.sh
```

3. API url: http://ec2-3-18-215-227.us-east-2.compute.amazonaws.com:2358

4. SSH access
    1. Download `judge0aws.pem` file.
    1. Open an SSH client.
    1. Connect to your instance using its Public DNS. Example:
    ```sh
    ssh -i "~/judge0aws.pem" ubuntu@ec2-3-18-215-227.us-east-2.compute.amazonaws.com
    ```