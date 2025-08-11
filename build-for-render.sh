#!/bin/bash
set -e

# Script for building Julia Bolt with aggressive memory constraints on Render
echo "Starting build process with aggressive memory optimizations..."

# Clear any previous builds and caches
rm -rf build dist .vite node_modules/.vite node_modules/.cache

# Clear all caches to free up memory
npm cache clean --force
rm -rf ~/.npm ~/.cache

# Set environment variable for Render-specific optimizations
export RENDER=true

# Disable source maps to save memory
export GENERATE_SOURCEMAP=false

# Set memory constraints and build with garbage collection
echo "Building with aggressive memory allocation (448MB)..."
NODE_OPTIONS='--max-old-space-size=448 --gc-interval=50 --max-semi-space-size=64' \
NODE_ENV=production \
RENDER=true \
GENERATE_SOURCEMAP=false \
npx remix vite:build --config vite.render.config.ts

echo "Build completed successfully!"
