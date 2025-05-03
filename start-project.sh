#!/bin/bash

set -e

function cleanup {
  echo "🛑 Stopping and removing database container..."
  docker rm -f typemonkey-db > /dev/null 2>&1 || true
  exit 0
}

trap cleanup SIGINT

echo "🚀 Starting TypeMonkey project..."

if ! docker image inspect typemonkey-db > /dev/null 2>&1; then
  echo "📦 Building Docker image..."
  npm run start:build
else
  echo "📦 Docker image already exists. Skipping build."
fi

if ! docker ps | grep typemonkey-db > /dev/null 2>&1; then
  echo "🗃️ Starting PostgreSQL container..."
  docker ps -a --format '{{.Names}}' | grep typemonkey-db > /dev/null 2>&1 \
    && docker start typemonkey-db \
    || docker run -d -p 6000:5432 --name typemonkey-db typemonkey-db
else
  echo "🚀 Creating and starting new container..."
  docker run -d -p 6000:5432 --name typemonkey-db typemonkey-db
fi

echo "⏳ Waiting for PostgreSQL to be ready..."
until docker exec typemonkey-db pg_isready -U typemonkey -d typemonkeydb > /dev/null 2>&1; do
  sleep 1
done

echo "✅ PostgreSQL is ready!"

npm run dev &
npx wait-on http://localhost:5173
npm run start:electron

wait
