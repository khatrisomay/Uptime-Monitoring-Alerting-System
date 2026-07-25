#!/usr/bin/env bash
# ==============================================================================
# Uptime Monitor - Docker Helper Script
# ==============================================================================

set -e

PROJECT_NAME="uptime-monitor"
DOCKER_DIR="deployments/docker"

usage() {
    echo "Usage: $0 {build|dev|prod|full|stop|logs|clean}"
    echo "  build  : Build all Docker images"
    echo "  dev    : Run docker-compose development stack with live reload"
    echo "  prod   : Run docker-compose production stack with health checks"
    echo "  full   : Run docker-compose full-stack with Postgres & Redis"
    echo "  stop   : Stop all running containers"
    echo "  logs   : View logs from running containers"
    echo "  clean  : Remove unused Docker images, containers, and networks"
    exit 1
}

case "$1" in
    build)
        echo "Building Docker images for ${PROJECT_NAME}..."
        docker-compose build
        ;;
    dev)
        echo "Starting ${PROJECT_NAME} development environment..."
        docker-compose -f ${DOCKER_DIR}/docker-compose.dev.yml up --build -d
        echo "Dev server ready: Frontend http://localhost:5173 | Backend http://localhost:8000"
        ;;
    prod)
        echo "Starting ${PROJECT_NAME} production environment..."
        docker-compose -f ${DOCKER_DIR}/docker-compose.prod.yml up --build -d
        echo "Production server ready: Frontend http://localhost:80 | Backend http://localhost:8000"
        ;;
    full)
        echo "Starting ${PROJECT_NAME} full-stack environment (Postgres + Redis)..."
        docker-compose -f ${DOCKER_DIR}/docker-compose.full-stack.yml up --build -d
        ;;
    stop)
        echo "Stopping ${PROJECT_NAME} containers..."
        docker-compose -f docker-compose.yml down 2>/dev/null || true
        docker-compose -f ${DOCKER_DIR}/docker-compose.dev.yml down 2>/dev/null || true
        docker-compose -f ${DOCKER_DIR}/docker-compose.prod.yml down 2>/dev/null || true
        docker-compose -f ${DOCKER_DIR}/docker-compose.full-stack.yml down 2>/dev/null || true
        ;;
    logs)
        docker-compose logs -f
        ;;
    clean)
        echo "Cleaning up dangling Docker resources..."
        docker system prune -f
        ;;
    *)
        usage
        ;;
esac
