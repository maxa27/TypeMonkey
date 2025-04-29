#!/bin/bash

set -e

# Функция остановки базы при выходе из проекта
function cleanup {
  echo "🛑 Stopping database container..."
  docker stop typemonkey-db > /dev/null 2>&1 || true
  exit 0
}

# Ловим сигнал Ctrl+C
trap cleanup SIGINT

echo "🚀 Starting TypeMonkey project..."

# Сборка образа, если ещё не существует
if ! docker image inspect typemonkey-db > /dev/null 2>&1; then
  echo "📦 Building Docker image..."
  npm run start:build
else
  echo "📦 Docker image already exists. Skipping build."
fi

# Запуск базы (если контейнер не запущен)
if ! docker ps | grep typemonkey-db > /dev/null 2>&1; then
  echo "🗃️ Starting PostgreSQL container..."
  docker ps -a --format '{{.Names}}' | grep typemonkey-db > /dev/null 2>&1 \
    && docker start typemonkey-db \
    || docker run -d -p 5432:5432 --name typemonkey-db typemonkey-db
else
  echo "🟢 Database container already running."
fi

# Ожидаем готовность PostgreSQL
echo "⏳ Waiting for PostgreSQL to be ready..."
until docker exec typemonkey-db pg_isready -U typemonkey > /dev/null 2>&1; do
  sleep 1
done
echo "✅ PostgreSQL is ready!"

# Запуск фронта и электрона
npm run dev &
npx wait-on http://localhost:5173
npm run start:electron

wait
