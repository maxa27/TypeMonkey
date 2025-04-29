#!/bin/bash

function cleanup {
    echo "🛑 Stopping database container..."
    npm run stop:db
    exit 0
}

trap cleanup SIGINT

echo "🚀 Starting TypeMonkey project..."
npm run start:build
npm run start:db
npm run dev &
npm run start:electron

wait
