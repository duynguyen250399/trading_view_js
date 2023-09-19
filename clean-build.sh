#!/bin/bash

# Run this script to clean and build node module

if [ -d "dist" ]; then
    rm -rf dist
fi

if [ -d ".parcel-cache" ]; then
    rm -rf .parcel-cache
fi

npm run build