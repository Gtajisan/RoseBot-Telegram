#!/bin/bash
# Build Rose Bot

echo "🔨 Building Rose Bot..."
cd "$(dirname "$0")/.."
mvn clean package

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo "📦 JAR: target/RoseBot-TG-2.0.0-jar-with-dependencies.jar"
else
    echo "❌ Build failed!"
    exit 1
fi
