# E-Commerce Backend REST API

A complete E-Commerce Backend REST API built with **Node.js** and **Express.js**, featuring Users and Products resources, Express Router, custom middleware, API key authentication, and request validation.

## Features

- 10 REST APIs (5 for Users, 5 for Products)
- Full CRUD: GET, POST, PUT, DELETE
- Routes organized with **Express Router** (`routes/userRoutes.js`, `routes/productRoutes.js`)
- **API Key authentication** via query parameter (`?apiKey=...`)
- **6 protected routes** (POST/PUT/DELETE for both Users and Products)
- Request **validation middleware** for Users and Products
- Centralized **error handling** middleware + 404 handler
- Request **logger** middleware
- Proper HTTP status codes: `200`, `201`, `400`, `401`, `404`, `500`
- Consistent JSON response shape: `{ status, message, data }`

## Project Structure

```
ecommerce-api/
├── server.js                  # App entry point
├── config/
│   └── config.js               # PORT & API_KEY config
├── data/
│   ├── users.js                # In-memory users "database"
│   └── products.js             # In-memory products "database"
├── middleware/
│   ├── auth.js                 # API key authentication middleware
│   ├── validators.js           # User & Product validation middleware
│   ├── logger.js                # Request logger middleware
│   └── errorHandler.js         # 404 + centralized error handler
├── controllers/
│   ├── userController.js       # User CRUD logic
│   └── productController.js    # Product CRUD logic
├── routes/
│   ├── userRoutes.js           # Express Router for /api/users
│   └── productRoutes.js        # Express Router for /api/products
├── postman_collection.json      # Postman collection (import this)
├── package.json
└── .env.example
```

## Setup & Run

```bash
# 1. Install dependencies
npm install

# 2. Create your .env file (or just use the defaults)
cp .env.example .env

# 3. Start the server
npm start

# For development with auto-restart:
npm run dev
```

Server runs at: `http://localhost:3000`

Default API key (change in `.env`): `my-secret-api-key-123`

## API Endpoints

### Users (`/api/users`)

| # | Method | Endpoint | Protected? | Description |
|---|--------|----------|------------|--------------|
| 1 | GET | `/api/users` | No | Get all users |
| 2 | GET | `/api/users/:id` | No | Get a single user |
| 3 | POST | `/api/users?apiKey=...` | **Yes** | Add a new user |
| 4 | PUT | `/api/users/:id?apiKey=...` | **Yes** | Update a user |
| 5 | DELETE | `/api/users/:id?apiKey=...` | **Yes** | Delete a user |

**User body example:**
```json
{
  "name": "Bilal Hassan",
  "email": "bilal.hassan@example.com",
  "age": 30
}
```

### Products (`/api/products`)

| # | Method | Endpoint | Protected? | Description |
|---|--------|----------|------------|--------------|
| 6 | GET | `/api/products` | No | Get all products |
| 7 | GET | `/api/products/:id` | No | Get a single product |
| 8 | POST | `/api/products?apiKey=...` | **Yes** | Add a new product |
| 9 | PUT | `/api/products/:id?apiKey=...` | **Yes** | Update a product |
| 10 | DELETE | `/api/products/:id?apiKey=...` | **Yes** | Delete a product |

**Product body example:**
```json
{
  "name": "USB-C Hub",
  "description": "7-in-1 USB-C hub adapter",
  "price": 2999,
  "category": "Electronics",
  "stock": 100
}
```

## Authentication

Protected routes require an API key passed as a **query parameter**:

```
POST /api/users?apiKey=my-secret-api-key-123
```

- Missing key → `401 Unauthorized` — "API key is missing..."
- Wrong key → `401 Unauthorized` — "Invalid API key."

## Validation Rules

**User**
- `name`: required, string, min 2 characters
- `email`: required, valid email format, must be unique
- `age`: optional, number between 1 and 120

**Product**
- `name`: required, string, min 2 characters
- `price`: required, positive number
- `category`: required, string
- `stock`: optional, non-negative integer

Validation failures return `400 Bad Request` with an `errors` array.

## Response Format

Success:
```json
{
  "status": "success",
  "message": "User created successfully.",
  "data": { "id": 3, "name": "...", "email": "...", "age": 30 }
}
```

Error:
```json
{
  "status": "error",
  "message": "Validation failed.",
  "errors": ["Name is required and must be at least 2 characters long."]
}
```

## Testing with Postman

1. Import `postman_collection.json` into Postman (**File → Import**).
2. The collection includes a `baseUrl` variable (`http://localhost:3000`) and an `apiKey` variable — edit them if needed.
3. Start the server (`npm start`) before running requests.
4. The collection is organized into **Users** and **Products** folders, each containing:
   - Successful requests for all 5 CRUD operations
   - Error-case requests: missing/invalid API key (`401`), validation errors (`400`), and not-found IDs (`404`)
5. Run the whole collection with the **Postman Collection Runner** to test everything in one go.

## HTTP Status Codes Used

| Code | Meaning | When |
|------|----------|------|
| 200 | OK | Successful GET, PUT, DELETE |
| 201 | Created | Successful POST |
| 400 | Bad Request | Validation errors, duplicate email |
| 401 | Unauthorized | Missing/invalid API key |
| 404 | Not Found | Resource or route doesn't exist |
| 500 | Internal Server Error | Unexpected server errors |
