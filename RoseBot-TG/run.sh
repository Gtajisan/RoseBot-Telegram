#!/bin/bash
echo "🌹 Rose Bot - Telegram Edition"
echo "================================"

# Check if BOT_TOKEN is set
if [ -z "$BOT_TOKEN" ]; then
    echo "❌ ERROR: BOT_TOKEN environment variable not set!"
    echo "Set it with: export BOT_TOKEN='your_token_here'"
    exit 1
fi

echo "✅ Configuration loaded"
echo "Building project..."

cd "$(dirname "$0")"
mvn clean package -q

if [ $? -eq 0 ]; then
    echo "✅ Build successful"
    echo "🤖 Starting bot..."
    java -jar target/RoseBot-TG-1.0.0-jar-with-dependencies.jar
else
    echo "❌ Build failed"
    exit 1
fi
