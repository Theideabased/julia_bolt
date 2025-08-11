#!/bin/bash
set -e

# Script for building Julia Bolt with memory constraints on Render
echo "Starting build process with memory optimizations..."

# Clear any previous builds
rm -rf build dist .vite

# Clear npm cache to free up memory
npm cache clean --force

# Set environment variable for Render-specific optimizations
export RENDER=true

# Set memory constraints and build
echo "Building with reduced memory allocation..."
NODE_OPTIONS='--max-old-space-size=256 --optimize-for-size --gc-interval=100' \
NODE_ENV=production \
RENDER=true \
npx remix vite:build --config vite.render.config.ts

echo "Build completed successfully!"
