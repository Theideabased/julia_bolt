#!/usr/bin/env bash

echo "🚀 Building Julia Bolt for Render deployment..."

# Install dependencies
npm ci

# Set NODE_ENV to production
export NODE_ENV=production

# Increase Node.js memory limit for build
export NODE_OPTIONS="--max-old-space-size=8192"

# Build the application
npm run build

echo "✅ Build completed successfully for Render"
