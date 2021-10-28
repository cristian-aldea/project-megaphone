# Docker

- [Docker](#docker)
  - [Building Images](#building-images)

## Building Images

To build the images for the projects in this repository, run the following commands:

```bash
docker build -f docker/Dockerfile -t cristianaldea/project-megaphone:latest .

# Build using local dist/ to avoid downloading all packages
npm i
npm run build-prod
docker build -f docker/local.Dockerfile -t cristianaldea/project-megaphone:latest .
```

## Pushing Images

```bash
docker push cristianaldea/project-megaphone:latest
```
