# Monorepo Project

This project is a monorepo managed with [TurboRepo](https://turbo.build/). It contains two main applications: a backend API and a frontend web application.

## Table of Contents

1.  [Local Installation](#local-installation)
2.  [Running the Applications](#running-the-applications)
    *   [Backend](#backend)
    *   [Frontend](#frontend)
    *   [Running Both with TurboRepo](#running-both-with-turborepo)
3.  [Running Tests](#running-tests)
4.  [Deployed URLs (Placeholders)](#deployed-urls-placeholders)

## 1. Local Installation

To get started with local development, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd web-developer-assignment-Public-main # Or your cloned directory name
    ```

2.  **Install dependencies:**
    This monorepo uses `npm` for package management. From the root of the project, run:
    ```bash
    npm install
    ```
    This will install dependencies for both the backend and frontend applications.

## 2. Running the Applications

### Backend

The backend application is located in `apps/backend`.

*   **Navigate to the backend directory:**
    ```bash
    cd apps/backend
    ```
*   **Build the backend:**
    ```bash
    npm run build
    ```
*   **Start the backend API:**
    ```bash
    npm run start
    ```
    The backend API should be running at `http://localhost:3001` (placeholder URL).

### Frontend

The frontend application is located in `apps/frontend`.

*   **Navigate to the frontend directory:**
    ```bash
    cd apps/frontend
    ```
*   **Start the frontend development server:**
    ```bash
    npm run dev
    ```
    The frontend application should be accessible at `http://localhost:5173` (placeholder URL).

### Running Both with TurboRepo

You can leverage TurboRepo to run both applications concurrently from the project root.

*   **Run both frontend and backend in development mode:**
    ```bash
    npm run dev
    ```
    *(Note: This assumes your root `package.json` has a `dev` script that orchestrates `turbo run dev` for both apps. If not, you might need `turbo run dev` directly if configured.)*

## 3. Running Tests

*(Placeholder for test instructions)*

To run tests for specific applications or the entire monorepo:

*   **Run all tests in the monorepo:**
    ```bash
    npm test # Or `turbo run test` if configured
    ```
*   **Run backend tests:**
    ```bash
    cd apps/backend
    npm test # Or `npm run test`
    ```
*   **Run frontend tests:**
    ```bash
    cd apps/frontend
    npm test # Or `npm run test`
    ```

## 4. Deployed URLs (Placeholders)

*   **Frontend Application:** `https://your-frontend-app-url.com`
*   **Backend API:** `https://your-backend-api-url.com`