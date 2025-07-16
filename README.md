# Micro-Frontend Demo - Docker Setup

This repository contains a complete Docker setup for running a micro-frontend application with Module Federation.

## Architecture Overview

- **Host Application** (Port 5173): Main application that consumes remote modules
- **Remote1** (Port 5174): Provides Header component
- **Remote2** (Port 5175): Provides Table component

## Prerequisites

- [Docker](https://www.docker.com/get-started) installed and running
- [Docker Compose](https://docs.docker.com/compose/install/) installed

## Docker Commands

Run Docker commands manually:

```bash
# Build and start all services
docker-compose up --build

# Start services in detached mode (background)
docker-compose up -d --build

# Stop all services
docker-compose down

# View logs
docker-compose logs

# View logs for a specific service
docker-compose logs host
docker-compose logs remote1
docker-compose logs remote2
```

## Application URLs

Once the containers are running, access your applications at:

- **Main Application**: http://localhost:5173
- **Remote1 (Header)**: http://localhost:5174
- **Remote2 (Table)**: http://localhost:5175

## Troubleshooting

### Port Conflicts

If you encounter port conflicts, you can modify the ports in `docker-compose.yml`:

```yaml
ports:
  - "5173:5173" # Change first number to different port
```

### Container Build Issues

```bash
# Clean up and rebuild containers
docker-compose down
docker system prune -f
docker-compose up --build --force-recreate
```

### Check Container Status

```bash
# View running containers
docker-compose ps

# Check container health
docker-compose logs [service-name]
```

### Module Federation Issues

Make sure all remote applications are running before accessing the host application. The host depends on both remote1 and remote2 to be available.

## Docker Configuration Details

### Dockerfiles

Each application has its own Dockerfile that:

- Uses Node.js 20 Alpine for small image size
- Installs dependencies with npm ci for faster, reliable installs
- Exposes the appropriate port
- Runs the Vite development server

### Docker Compose

The `docker-compose.yml` file:

- Creates a shared network for all services
- Sets up volume mapping for live development
- Configures service dependencies
- Includes health checks for monitoring

### .dockerignore

Each application excludes unnecessary files:

- node_modules (installed in container)
- Build artifacts
- Environment files
- Git files
- Log files

## Stopping the Application

Press `Ctrl+C` in the terminal where you started the application, or run:

```bash
docker-compose down
```
