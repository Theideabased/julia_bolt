#!/bin/bash

# Render deployment start script
echo "Starting Julia Bolt on Render..."

# Set up environment
export NODE_ENV=production
export WRANGLER_SEND_METRICS=false

# Get bindings and start the application
bindings=$(./bindings.sh)
echo "Bindings: $bindings"

# Start wrangler with the bindings
exec wrangler pages dev ./build/client $bindings --ip 0.0.0.0 --port $PORT --no-show-interactive-dev-session
