# Task Manager API

This is a small Task Manager API implemented in Node.js. Below is a summary of the available endpoints, their HTTP methods, expected request bodies, validation rules (inferred from tests), and example responses.

Base URL: http://localhost:1012 (port configured in `index.js`)

## Endpoints

### POST /tasks
- Purpose: Create a new task.
- Request:
  - Content-Type: application/json
  - Body (required fields):
    - `title` (string) — required
    - `description` (string) — required
    - `completed` (boolean) — required
- Responses:
  - 201 Created
    - Body: the created task object (usually includes an `id` numeric field and the provided fields)
  - 400 Bad Request
    - Returned when required fields are missing or data types are invalid (e.g. missing `description` or `completed` not boolean).

Example request JSON:

```
{
  "title": "New Task",
  "description": "New Task Description",
  "completed": false
}
```


### GET /tasks
- Purpose: Retrieve a list of all tasks.
- Request: none
- Responses:
  - 200 OK
    - Body: an array of task objects. Each task object contains:
      - `id` (number)
      - `title` (string)
      - `description` (string)
      - `completed` (boolean)

Example response body (array):

```
[
  {
    "id": 1,
    "title": "Set up environment",
    "description": "Install Node.js, npm, and git",
    "completed": true
  },
  {
    "id": 2,
    "title": "Another task",
    "description": "Another description",
    "completed": false
  }
]
```


### GET /tasks/:id
- Purpose: Retrieve a single task by its numeric `id`.
- Request:
  - URL parameter: `id` (number)
- Responses:
  - 200 OK
    - Body: the task object
  - 404 Not Found
    - Returned when a task with the given `id` does not exist

Expected example for `GET /tasks/1` (from tests):

```
{
  "id": 1,
  "title": "Set up environment",
  "description": "Install Node.js, npm, and git",
  "completed": true
}
```


### PUT /tasks/:id
- Purpose: Update an existing task.
- Request:
  - URL parameter: `id` (number)
  - Content-Type: application/json
  - Body (fields to update, validated):
    - `title` (string) — required
    - `description` (string) — required
    - `completed` (boolean) — required
- Responses:
  - 200 OK
    - Body: the updated task object (or a success confirmation)
  - 400 Bad Request
    - When the request body contains invalid data types (e.g. `completed` provided as a string)
  - 404 Not Found
    - When the `id` does not match an existing task

Example request JSON:

```
{
  "title": "Updated Task",
  "description": "Updated Task Description",
  "completed": true
}
```


### DELETE /tasks/:id
- Purpose: Remove a task by id.
- Request:
  - URL parameter: `id` (number)
- Responses:
  - 200 OK
    - Task deleted successfully (may return an empty body or a confirmation message)
  - 404 Not Found
    - When the `id` does not match an existing task


## Notes and Assumptions
- Documentation is inferred from the project's tests (`test/server.test.js`) and controller behavior. If you have additional validation rules or fields in `Controllers/TaskController.js`, update this README to match.
- The server listens on port 1012 (see `index.js`).
- Authentication is not implemented in the current tests; all endpoints are public.

## Running tests
This project uses `tap` and `supertest` (as shown in `test/server.test.js`). To run tests locally:

```bash
npm install
npm test
```

If `npm test` is not configured, run the test file directly (example):

```bash
npx tap
```

---
If you'd like, I can also add example curl commands for each endpoint, or wire up a Postman collection. Which would you prefer?

## Setup and run
Follow these steps to get the project running locally.

Prerequisites
- Node.js 18 or later (the project enforces Node >= 18 in `package.json`).

Install dependencies

```bash
npm install
```

Run the development server

```bash
# Starts the server with nodemon (auto-restarts on changes)
npm start
```

By default the server listens on port 1012 as configured in `index.js`. You can open http://localhost:1012 to access the API.

Run tests

```bash
npm test
```

If you don't have `npm test` script available for some reason, you can run the tests via `npx`:

```bash
npx tap
```

How it works (brief)
- `index.js` boots the Express app found in `app.js` and starts listening on port 1012.
- `app.js` registers the routes and middleware for the API (see `Controllers/TaskController.js` for request handling).
- Tests in `test/server.test.js` use `supertest` to exercise the endpoints and `tap` as the test runner.

Troubleshooting
- If you see an error about Node.js version, ensure you have Node 18+ installed. On macOS you can use a version manager like `nvm` or `fnm` to install the correct version.
- If the port 1012 is already in use, either stop the other process or edit `index.js` to change the port.

---

