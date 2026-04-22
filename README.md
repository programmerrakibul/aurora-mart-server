# AuroraMart Server

A modern, type-safe REST API server for AuroraMart, an e-commerce platform built
with **Express.js**, **TypeScript**, and **PostgreSQL**.

## 🎯 Overview

AuroraMart Server is a fully-featured backend API for an e-commerce platform. It
provides:

- **User Authentication & Authorization** - Register, login, logout with session
  management
- **Role-based Access Control** - Support for Customer, Seller, and Manager
  roles
- **User Management** - Retrieve user profiles and manage user data
- **Session Management** - PostgreSQL-backed session storage
- **Type Safety** - 100% TypeScript implementation
- **Input Validation** - Zod schema validation for all requests
- **Error Handling** - Centralized error handling middleware
- **CORS Support** - Cross-origin resource sharing enabled
- **Vercel Ready** - Configured for deployment on Vercel

## 🛠 Tech Stack

- **Runtime**: Node.js (ESM modules)
- **Framework**: Express.js 5.x
- **Language**: TypeScript 6.x
- **Database**: PostgreSQL
- **Validation**: Zod
- **Authentication**: Express Session + bcryptjs
- **CORS**: cors
- **Session Store**: connect-pg-simple
- **Development**: tsx watch, tsc-alias

## 📁 Project Structure

```
src/
├── index.ts                 # Server entry point, middleware setup
├── config/
│   ├── db.ts               # PostgreSQL connection pool
│   └── env.ts              # Environment variable configuration
├── controllers/
│   └── auth.controller.ts   # Authentication logic (register, login, logout, profile)
├── middlewares/
│   ├── authorize.ts        # Role-based authorization middleware
│   ├── errorHandler.ts     # Global error handling middleware
│   └── validateData.ts     # Request data validation middleware
├── routes/
│   ├── index.ts            # Route mounting configuration
│   └── auth.routes.ts      # Authentication routes
├── schemas/
│   ├── env.ts              # Environment variable schema (Zod)
│   └── user.ts             # User data schema (Zod)
├── types/
│   ├── express.d.ts        # Express type augmentation for sessions
│   ├── index.ts            # API response types
│   └── user.ts             # User interface types
└── utils/
    ├── error.ts            # Custom error classes
    └── password.ts         # Password hashing and comparison

dist/                       # Compiled JavaScript (generated)
package.json
tsconfig.json
vercel.json                 # Vercel deployment config
```

## ✅ Prerequisites

- **Node.js** 18+ or higher
- **npm** or **yarn** package manager
- **PostgreSQL** 12+ database
- A `.env` file with required environment variables

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/programmerrakibul/aurora-mart-server.git
   cd aurora-mart-server
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Create `.env` file**

   ```bash
   cp .env.example .env
   ```

   (Or create manually - see [Environment Variables](#environment-variables)
   section)

4. **Set up the database**

   Ensure PostgreSQL is running and the database specified in `.env` exists:

   ```sql
   CREATE DATABASE aurora_mart;
   ```

   The application will automatically create the `user_session` table on first
   run.

## ⚙️ Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Server
NODE_ENV=development
PORT=3000

# Database
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=aurora_mart

# Session
SESSION_SECRET=your_secret_key_here_change_in_production
```

**Important Notes:**

- `NODE_ENV` can be `development`, `production`, or `test`
- `SESSION_SECRET` should be a strong, random string in production
- All variables are validated on startup using Zod schema

## 🚀 Running the Server

### Development Mode (with auto-reload)

```bash
npm run dev
```

The server will start with hot-reload enabled on the port specified in `.env`
(default: 3000).

### Production Mode

```bash
npm run build
npm start
```

### Running Built Version

```bash
npm run build
node dist/index.js
```

The server will output:

```
PostgreSQL connected!
Welcome to Aurora Mart API!
Server running at http://localhost:3000
```

## 📡 API Endpoints

### Base URL

```
http://localhost:3000/api/v1
```

### Authentication Routes (`/api/v1/auth`)

#### 1. **Register User**

- **Endpoint**: `POST /auth/register`
- **Authentication**: None
- **Request Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "SecurePass123!",
    "gender": "Male",
    "photoURL": "https://example.com/photo.jpg"
  }
  ```
- **Response** (201):
  ```json
  {
    "success": true,
    "message": "User created successfully!",
    "data": {
      "uid": "550e8400-e29b-41d4-a716-446655440000"
    }
  }
  ```
- **Validation Rules**:
  - `name`: 3-150 characters
  - `email`: Valid email format, 1-255 characters
  - `password`: Min 6 chars, at least 1 uppercase, 1 lowercase, 1 number, 1
    special character
  - `gender`: "Male" or "Female"
  - `photoURL`: Valid URL (optional, defaults to example image)

#### 2. **Login User**

- **Endpoint**: `POST /auth/login`
- **Authentication**: None
- **Request Body**:
  ```json
  {
    "email": "john@example.com",
    "password": "SecurePass123!"
  }
  ```
- **Response** (200):
  ```json
  {
    "success": true,
    "message": "Login successful!"
  }
  ```
- **Sets**: Secure session cookie (`aurora_sid`)
- **Returns**: 401 Unauthorized if credentials are invalid

#### 3. **Get User Profile**

- **Endpoint**: `GET /auth/profile`
- **Authentication**: Required (any logged-in user)
- **Response** (200):
  ```json
  {
    "success": true,
    "message": "User profile fetched successfully!",
    "data": {
      "uid": "550e8400-e29b-41d4-a716-446655440000",
      "name": "John Doe",
      "email": "john@example.com",
      "gender": "Male",
      "role": "CUSTOMER",
      "photoURL": "https://example.com/photo.jpg",
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    }
  }
  ```

#### 4. **Get All Users**

- **Endpoint**: `GET /auth/all-users`
- **Authentication**: None
- **Response** (200):
  ```json
  {
    "success": true,
    "message": "All users fetched successfully!",
    "total": 5,
    "data": [
      {
        "uid": "550e8400-e29b-41d4-a716-446655440000",
        "name": "John Doe",
        "email": "john@example.com",
        "gender": "Male",
        "role": "CUSTOMER",
        "photoURL": "https://example.com/photo.jpg",
        "createdAt": "2024-01-15T10:30:00Z",
        "updatedAt": "2024-01-15T10:30:00Z"
      }
    ]
  }
  ```
- **Sorting**: By creation date (newest first), then by name

#### 5. **Logout User**

- **Endpoint**: `POST /auth/logout`
- **Authentication**: Required
- **Response** (200):
  ```json
  {
    "success": true,
    "message": "Logout successful!"
  }
  ```
- **Effect**: Destroys the user's session

### Root Endpoint

#### Health Check

- **Endpoint**: `GET /`
- **Response** (200):
  ```json
  {
    "success": true,
    "message": "Welcome to Aurora Mart API!"
  }
  ```

## 🔐 Authentication & Authorization

### Session-Based Authentication

The server uses **Express Session** with PostgreSQL backend for session
management:

- Sessions are stored in the `user_session` table
- Session cookies are HTTP-only and secure (in production)
- Session cookie name: `aurora_sid`
- Session max age: 30 days
- Automatic table creation on first run

```javascript
// Without login - 403 Forbidden
GET /api/v1/auth/profile

// With login session - 200 OK
GET /api/v1/auth/profile
Cookie: aurora_sid=...
```

## 🗄 Database

### Connection Configuration

PostgreSQL connection is managed through a connection pool with the following
settings:

- **Driver**: pg (Node.js PostgreSQL client)
- **Connection Pool**: Automatic pooling
- **Credentials**: From `.env` file
- **Error Handling**: Auto-reconnect on pool errors

### Database Schema

#### Users Table

```sql
CREATE TABLE users (
  uid UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(150) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  gender VARCHAR(10) NOT NULL,
  role VARCHAR(20) DEFAULT 'CUSTOMER',
  photoURL VARCHAR(255),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### User Session Table

Created automatically by `connect-pg-simple`:

```sql
CREATE TABLE user_session (
  sid VARCHAR PRIMARY KEY,
  sess JSONB NOT NULL,
  expire TIMESTAMP NOT NULL
);
```

## 🔨 Build & Deployment

### Local Build

```bash
npm run build
```

Outputs compiled files to `dist/` directory with:

- JavaScript compilation (ESM modules)
- TypeScript declaration files
- Source maps
- Path alias resolution

### Vercel Deployment

The project is configured for Vercel deployment:

1. **Push to GitHub**

   ```bash
   git push origin main
   ```

2. **Deploy on Vercel**
   - Connect your GitHub repository to Vercel
   - Vercel automatically detects `vercel.json`
   - Environment variables are set in Vercel dashboard
   - Build command: `npm run vercel-build`
   - Start command: `node dist/index.js`

3. **Environment Variables on Vercel**

   Set the same `.env` variables in Vercel project settings:
   - `NODE_ENV=production`
   - `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`
   - `SESSION_SECRET` (strong random value)

## 📜 Scripts

| Script                 | Description                               |
| ---------------------- | ----------------------------------------- |
| `npm run dev`          | Start development server with auto-reload |
| `npm run build`        | Compile TypeScript to JavaScript          |
| `npm run start`        | Run compiled production build             |
| `npm run clean`        | Remove `dist/` directory                  |
| `npm run vercel-build` | Build script for Vercel deployment        |

## 🔍 Key Features

✅ **Type-Safe**: Full TypeScript implementation  
✅ **Validated Input**: Zod schema validation for all requests  
✅ **Secure Passwords**: bcryptjs hashing with salt rounds  
✅ **Session Management**: PostgreSQL-backed sessions  
✅ **Error Handling**: Centralized error middleware with custom error classes  
✅ **CORS Enabled**: Cross-origin requests supported  
✅ **ESM Modules**: Modern JavaScript module system  
✅ **Production Ready**: Configured for Vercel deployment  
✅ **Auto-Generated Sessions**: Tables created automatically on startup

## 🐛 Troubleshooting

### "PostgreSQL connected!" doesn't appear

- Check database connection credentials in `.env`
- Ensure PostgreSQL is running
- Verify database exists

### Environment variable validation error

- Ensure all required `.env` variables are set
- Check `src/schemas/env.ts` for required fields
- Verify variable format matches schema

### CORS errors

- Ensure client domain is allowed in CORS configuration
- Default: All origins allowed in development

### Session not persisting

- Check PostgreSQL connection
- Verify `user_session` table exists
- Ensure `SESSION_SECRET` is set
- Check browser cookie settings

## 🙋 Support

For issues or questions, please create an issue in the repository.
