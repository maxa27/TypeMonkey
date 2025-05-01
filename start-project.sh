#!/bin/bash

set -e

# 🧹 Функция остановки и удаления контейнера при Ctrl+C
function cleanup {
  echo "🛑 Stopping and removing database container..."
  docker rm -f typemonkey-db > /dev/null 2>&1 || true
  exit 0
}

# ⌨️ Перехват Ctrl+C
trap cleanup SIGINT

echo "🚀 Starting TypeMonkey project..."

# 🛠️ Сборка образа, если не существует
if ! docker image inspect typemonkey-db > /dev/null 2>&1; then
  echo "📦 Building Docker image..."
  npm run start:build
else
  echo "📦 Docker image already exists. Skipping build."
fi

# 📦 Проверка существования и запуска контейнера
if [ "$(docker ps -a -q -f name=^typemonkey-db$)" ]; then
  echo "📦 Container exists."

  if [ "$(docker inspect -f '{{.State.Running}}' typemonkey-db)" == "true" ]; then
    echo "🟢 Container already running."
  else
    echo "▶️ Starting existing container..."
    docker start typemonkey-db
  fi
else
  echo "🚀 Creating and starting new container..."
  docker run -d -p 5432:5432 --name typemonkey-db typemonkey-db
fi

# ⏳ Ожидание готовности PostgreSQL
echo "⏳ Waiting for PostgreSQL to be ready..."
until docker exec typemonkey-db pg_isready -U typemonkey -d typemonkeydb > /dev/null 2>&1; do
  sleep 1
done

echo "✅ PostgreSQL is ready!"

# ⚛️ Запуск Vite и Electron
npm run dev &
npx wait-on http://localhost:5173
npm run start:electron

wait
