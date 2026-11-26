# Everyday Goods Online Store

A dynamic online store (Node.js + Express) that runs in Docker, is built by Jenkins and is deployed on an AWS EC2 server.

## Run locally
    npm install
    npm start        # http://localhost:3000

## Docker
    docker build -t online-store .
    docker run -d -p 80:3000 online-store

## Deploy on EC2
1. Create an EC2 instance (Ubuntu). In the Security Group, open ports 22 and 80.
2. SSH in and install Docker: `sudo apt update && sudo apt install -y docker.io git`
3. `git clone <your-github-repo> && cd online-store`
4. Build and run with the Docker commands above (use `sudo`).
5. Open `http://<EC2-PUBLIC-IP>` in a browser. The site is served from a single IP address.

## Jenkins
Create a Pipeline job, choose "Pipeline script from SCM" and point it at the GitHub repo. The `Jenkinsfile` is already in the repo.
