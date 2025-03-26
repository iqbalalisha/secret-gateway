
# Secret Gateway

A Node.js service with Basic Authentication and a React frontend.

## Features

- Frontend interface to interact with the API
- Public route (`/api`) that returns "Hello, world!"
- Protected route (`/api/secret`) that requires Basic Authentication
- Environment variable configuration for credentials and secret message

## Getting Started

1. Clone this repository
2. Create a `.env` file based on `.env.example`
3. Install dependencies:
   ```
   npm install
   ```
4. For development (with hot reloading):
   ```
   npm run dev
   ```
5. For production:
   ```
   npm run build
   npm start
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
GET /api
```
Returns "Hello, world!"

### Protected Route
```
GET /api/secret
```
Requires Basic Authentication with the credentials specified in your `.env` file.
Returns the secret message specified in your `.env` file.

## Frontend

The frontend is a React application that provides a user interface for interacting with the API endpoints. It includes:

- A public route button that fetches from the `/api` endpoint
- A form for entering username and password to access the protected `/api/secret` endpoint
- Display of the secret message when authenticated successfully

