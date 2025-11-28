# UserPosts Repo

This project is a monorepo managed with [TurboRepo](https://turbo.build/). It contains two main applications: a backend API and a frontend web application.

## Table of Contents

1.  [Local Installation](#local-installation)
2.  [Environment Variables](#environment-variables)
3.  [Running the Applications](#running-the-applications)
    - [Backend](#backend)
    - [Frontend](#frontend)
    - [Running Both with TurboRepo](#running-both-with-turborepo)
4.  [Running Tests](#running-tests)
5.  [Deployed URLs (Placeholders)](#deployed-urls-placeholders)

## 1. Local Installation

To get started with local development, follow these steps:

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/evergreenx/web-developer-assi
    cd web-developer-assi
    ```

2.  **Install dependencies:**
    This monorepo uses `npm` for package management. From the root of the project, run:
    ```bash
    npm install
    ```
    This will install dependencies for both the backend and frontend applications.

## 2. Environment Variables

This application requires specific environment variables to function correctly. Without these, the application will not work.

Create a `.env.local` file in the `apps/frontend` directory and add the following:

```
VITE_APP_LOCAL_BASE_URL="http://localhost:3001"
```

## 3. Running the Applications

### Backend

The backend application is located in `apps/backend`.

- **Navigate to the backend directory:**
  ```bash
  cd apps/backend
  ```
- **Build the backend:**
  ```bash
  npm run build
  ```
- **Start the backend API:**
  ```bash
  npm run start
  ```
  The backend API should be running at `http://localhost:3001`.

### Frontend

The frontend application is located in `apps/frontend`.

- **Navigate to the frontend directory:**
  ```bash
  cd apps/frontend
  ```
- **Start the frontend development server:**
  ```bash
  npm run dev
  ```
  The frontend application should be accessible at `http://localhost:5173` (placeholder URL).

### Running Both with TurboRepo

You can leverage TurboRepo to run both applications concurrently from the project root.

- **Run both frontend and backend in development mode:**
  ```bash
  turbo dev
  ```

## 4. Running Tests

To run tests for specific applications or the entire monorepo:

- **Run frontend tests:**

  The frontend uses `vitest` with `@testing-library/react` and `@testing-library/jest-dom` for testing.

  1.  **Install dependencies:** Ensure all dependencies are installed by running `npm install` in the `apps/frontend` directory.

  2.  **Vitest Configuration:** A `vitest.config.ts` file is set up in `apps/frontend/vitest.config.ts` to configure `vitest`, including `jsdom` environment and `src/test-setup.ts`.

  3.  **Jest-DOM Setup:** The `src/test-setup.ts` file imports `@testing-library/jest-dom` to extend `vitest`'s `expect` with additional matchers like `toBeInTheDocument`.

  4.  **Run frontend tests:**

      ```bash

      cd apps/frontend

      npx vitest

      ```

## 5. Deployed URLs (Placeholders)

- **Frontend Application:** `https://luminous-daifuku-bebd97.netlify.app/`
- **Backend API:** ` https://web-developer-assi.onrender.com/users`
