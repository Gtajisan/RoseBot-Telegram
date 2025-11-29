#!/bin/bash
# Run Rose Bot

echo "🚀 Starting Rose Bot..."

if [ -z "$BOT_TOKEN" ]; then
    echo "❌ BOT_TOKEN not set!"
    exit 1
fi

JAR="$(dirname "$0")/../target/RoseBot-TG-2.0.0-jar-with-dependencies.jar"

if [ ! -f "$JAR" ]; then
    echo "📦 Building first..."
    bash "$(dirname "$0")/build.sh"
fi

echo "▶️ Running bot..."
java -jar "$JAR"
