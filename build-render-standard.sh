#!/bin/bash
set -e

echo "Building Julia Bolt for Render with maximum memory..."

# Clear everything to start fresh
rm -rf build dist .vite node_modules/.vite node_modules/.cache
npm cache clean --force

# Set environment variables
export NODE_ENV=production
export RENDER=true
export GENERATE_SOURCEMAP=false

# Use maximum available memory for build
echo "Building with 896MB memory allocation..."
NODE_OPTIONS='--max-old-space-size=896 --gc-interval=100' \
npm run build

echo "Build completed successfully!"
echo "Build output:"
ls -la build/
