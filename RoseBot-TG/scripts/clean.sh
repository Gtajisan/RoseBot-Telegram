#!/bin/bash
# Clean build

echo "🧹 Cleaning..."
cd "$(dirname "$0")/.."
mvn clean
rm -rf target/ data/
echo "✅ Cleaned!"
