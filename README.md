
# Node.js Authentication Service

A minimal Node.js service with Basic Authentication.

## Features

- Public route (`/`) that returns "Hello, world!"
- Protected route (`/secret`) that requires Basic Authentication
- Environment variable configuration for credentials and secret message

## Getting Started

1. Clone this repository
2. Create a `.env` file based on `.env.example`
3. Install dependencies:
   ```
   npm install
   ```
4. Start the server:
   ```
   node src/server.js
   ```

## Environment Variables

Configure the following environment variables in your `.env` file:

- `PORT`: The port the server will run on (default: 3000)
- `USERNAME`: The username for Basic Authentication
- `PASSWORD`: The password for Basic Authentication
- `SECRET_MESSAGE`: The message returned by the `/secret` route

## API Endpoints

### Public Route
```
GET /
```
Returns "Hello, world!"

### Protected Route
```
GET /secret
```
Requires Basic Authentication with the credentials specified in your `.env` file.
Returns the secret message specified in your `.env` file.
