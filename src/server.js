
require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Basic Authentication middleware
const basicAuth = (req, res, next) => {
  // Check if authorization header exists
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    res.setHeader('WWW-Authenticate', 'Basic');
    return res.status(401).json({ error: 'Authentication required' });
  }

  // Get credentials from header
  const auth = Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
  const username = auth[0];
  const password = auth[1];

  // Check if credentials match
  if (username === process.env.USERNAME && password === process.env.PASSWORD) {
    return next();
  }

  // If credentials don't match
  res.setHeader('WWW-Authenticate', 'Basic');
  return res.status(401).json({ error: 'Invalid credentials' });
};

// Routes
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.get('/secret', basicAuth, (req, res) => {
  res.json({ message: process.env.SECRET_MESSAGE });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
