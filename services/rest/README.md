# REST Library Service

REST API for managing books, authors, and publishers.

## Requirements Coverage

Implemented endpoints:

- Books: create, read by ID, list with pagination, update, delete
- Authors: create, read by ID, list all, update, delete
- Publishers: create, read by ID, list all, update, delete

API tests are available in Postman collection format in [docs/postman-collection.json](docs/postman-collection.json).

## Tech Stack

- Node.js + TypeScript
- Express
- Prisma
- PostgreSQL
- Vitest

## Prerequisites

- Docker

## Getting Started

1. Create a devcontainer environment file from the template:

```bash
cd services/rest/.devcontainer
cp .env-sample .env
```

2. Fill in the values in `.env`:

- `POSTGRES_USER`
- `POSTGRES_PW`
- `POSTGRES_DB`
- `PGADMIN_MAIL`
- `PGADMIN_PW`

`DATABASE_URL` is already templated in `.env-sample`.

3. Start the dev container:

Use VS Code command palette and run:

- `Dev Containers: Reopen in Container`

This starts the services defined in `.devcontainer/docker-compose.yml` (Node, Postgres, pgAdmin).

4. Install dependencies inside the container:

```bash
npm i
```

5. Generate Prisma client, apply migrations, and seed:

```bash
npm run prepare
```

6. Start the service:

```bash
npm start
```

Server runs on `http://localhost:3000`.

## Scripts

- `npm start`: run the API (`tsx src/server.ts`)
- `npm run prepare`: generate client, run migrations, seed DB
- `npm test`: run tests once with coverage
- `npm run test:watch`: run tests in watch mode
- `npm run lint`: run ESLint

## API Base URL

`http://localhost:3000`

## Endpoint Summary

### Authors

- `GET /authors`
- `POST /authors`
- `GET /authors/:id`
- `PUT /authors/:id`
- `DELETE /authors/:id`

Create/Update payload:

```json
{
	"name": "John",
	"surname": "Doe"
}
```

### Publishers

- `GET /publishers`
- `POST /publishers`
- `GET /publishers/:id`
- `PUT /publishers/:id`
- `DELETE /publishers/:id`

Create/Update payload:

```json
{
	"name": "Penguin Books"
}
```

### Books

- `GET /books`
- `POST /books`
- `GET /books/:id`
- `PUT /books/:id`
- `DELETE /books/:id`

Create/Update payload:

```json
{
	"title": "Clean Code",
	"publishingYear": 2008,
	"authorId": 1,
	"publishingCompanyId": 1
}
```

Pagination for `GET /books`:

- Query params used by current implementation: `pageNum`, `pageSize`
- Example: `/books?pageNum=1&pageSize=10`
- Offset behavior is derived as `(pageNum - 1) * pageSize`

## Response Codes

- `200 OK`: successful reads/updates
- `201 Created`: successful create
- `204 No Content`: successful delete
- `400 Bad Request`: invalid or missing required fields
- `404 Not Found`: resource does not exist

## Testing

### Automated tests

```bash
npm test
```

### Postman collection

Import [docs/postman-collection.json](docs/postman-collection.json) and set:

- `baseUrl` to `http://localhost:3000`

Then run the collection.
