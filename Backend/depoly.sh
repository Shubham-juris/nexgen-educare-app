#!/bin/bash
 
# Navigate to the project directory
cd /var/www/vhosts/nexgeneducare.com/httpdocs
 
# Pull latest code from Git
git pull origin main
 
# Install dependencies
npm install
 
# Build the project 
npm run build
 
# Restart Application using PM2 
pm2 reload ecosystem.config.js --env production