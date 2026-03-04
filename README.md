# Node.js App with CI/CD to EC2 (Docker Compose)

This project now uses a simple deployment model:
- Developer pushes code to GitHub.
- GitHub Actions runs CI (lint, test, Docker build).
- On push to `main`, GitHub Actions copies project files to EC2 and runs Docker Compose.

## Project Structure

- `src/index.js`: sample HTTP API with `/health` endpoint
- `Dockerfile`: container image definition
- `compose.yaml`: Compose definition for EC2 runtime
- `.github/workflows/ci.yml`: CI pipeline
- `.github/workflows/deploy.yml`: CD pipeline to EC2 with Compose

## Local Run

```bash
npm install
npm test
npm run lint
npm start
```

## Docker Compose Run (Local or EC2)

```bash
docker compose up -d --build
```

App will be available on port `80`.

## EC2 One-Time Setup

1. Launch an EC2 instance (Ubuntu/Amazon Linux).
2. Install Docker + Docker Compose plugin.
3. Ensure SSH access is available from GitHub Actions and your key pair is ready.
4. Open EC2 security group inbound for your app (TCP 80).

## GitHub Secrets Required

- `EC2_HOST` (public IP or DNS)
- `EC2_USER` (Ubuntu: `ubuntu`, Amazon Linux: `ec2-user`)
- `EC2_SSH_KEY` (private key content)
- `EC2_APP_DIR` (absolute path on EC2, example: `/home/ubuntu/devops-app`)

## Deployment Flow

- Push to any branch: CI workflow runs.
- Push to `main`: Deploy workflow runs.

Deploy workflow steps:
1. Checkout repository.
2. Copy project files to EC2 target directory.
3. Run `docker compose up -d --build` on EC2.

## Notes

- This flow does not use ECR or ECS.
- If your app needs env vars, add them in `compose.yaml` under `services.app.environment`.