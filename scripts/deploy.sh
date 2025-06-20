#!/bin/bash

# Snake Game Website Deployment Script
echo "🐍 Starting Snake Game Website Deployment..."

# Build the project
echo "📦 Building the project..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
else
    echo "❌ Build failed!"
    exit 1
fi

# Deploy to Vercel (if vercel CLI is installed)
if command -v vercel &> /dev/null; then
    echo "🚀 Deploying to Vercel..."
    vercel deploy --prod
    echo "✅ Deployment complete!"
else
    echo "⚠️  Vercel CLI not found. Please install it with: npm i -g vercel"
    echo "📁 Static files are ready in the 'out' directory"
fi

echo "🎮 Snake Game Website deployment finished!"