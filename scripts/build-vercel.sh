#!/bin/bash
echo "Building client-only for Vercel deployment..."

# Set environment variables for client-only build
export VERCEL=true
export NODE_ENV=production

# Build only the client
npx vite build --mode production

echo "Client build completed successfully!"
