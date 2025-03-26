
// Build the frontend
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Check if dist directory exists, if not, build the frontend
const distPath = path.join(__dirname, '../dist');
if (!fs.existsSync(distPath)) {
  console.log('Building frontend...');
  try {
    execSync('npm run build', { stdio: 'inherit' });
  } catch (error) {
    console.error('Failed to build frontend:', error);
    process.exit(1);
  }
}

// Verify environment variables are loaded
console.log('Environment variables loaded:');
console.log('- USERNAME:', process.env.USERNAME ? 'Set' : 'Not set');
console.log('- PASSWORD:', process.env.PASSWORD ? 'Set' : 'Not set');
console.log('- SECRET_MESSAGE:', process.env.SECRET_MESSAGE ? 'Set' : 'Not set');

// Start the server
console.log('Starting server...');
require('./server.js');
