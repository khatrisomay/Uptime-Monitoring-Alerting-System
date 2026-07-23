#!/bin/sh
set -e

echo "[Uptime Monitor Backend] Container starting up..."
echo "[Uptime Monitor Backend] Environment: ${NODE_ENV:-production}"
echo "[Uptime Monitor Backend] Host: ${HOST:-0.0.0.0}, Port: ${PORT:-8000}"

# Execute command passed to docker entrypoint
exec "$@"
