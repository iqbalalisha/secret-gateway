
require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');

// Basic Authentication middleware
const basicAuth = (req, res, next) => {
  try {
    // Check if authorization header exists
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      res.setHeader('WWW-Authenticate', 'Basic');
      return res.status(401).json({ error: 'Authentication required' });
    }

    // Get credentials from header
    const base64Credentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('utf-8');
    const [username, password] = credentials.split(':');

    // Check if credentials match
    if (username === process.env.USERNAME && password === process.env.PASSWORD) {
      return next();
    }

    // If credentials don't match
    res.setHeader('WWW-Authenticate', 'Basic');
    return res.status(401).json({ error: 'Invalid credentials' });
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(500).json({ error: 'Server error during authentication' });
  }
};

// Middleware to parse JSON
app.use(express.json());

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, '../dist')));

// API Routes
app.get('/api', (req, res) => {
  try {
    res.send('Hello Adeeb!');
  } catch (error) {
    console.error('Error in public route:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/secret', basicAuth, (req, res) => {
  try {
    res.json({ message: process.env.SECRET_MESSAGE });
  } catch (error) {
    console.error('Error in secret route:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Handle React routing, return all requests to React app
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`Using USERNAME: ${process.env.USERNAME}`);
  console.log(`Using PASSWORD: ${process.env.PASSWORD}`);
});
