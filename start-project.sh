#!/bin/bash

# Функция остановки базы при выходе из проекта
function cleanup {
    echo "🛑 Stopping database container..."
    npm run stop:db
    exit 0
}

# Ловим сигнал Ctrl+C
trap cleanup SIGINT

# Стартуем полноценный проект
echo "🚀 Starting TypeMonkey project..."
npm run start:build
npm run start:db
npm run dev &
npm run start:electron

# Ждем, пока всё работает
wait
