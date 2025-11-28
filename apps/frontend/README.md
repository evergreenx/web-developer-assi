# Users-Posts Frontend

This is the frontend client for the Web Developer Assignment, built with React, TypeScript, and Vite.

## Prerequisites

- Node
- Npm

## Installation

1.  Install dependencies:

    ```bash
    npm install
    ```

## Running the Application

To start the development server:

```bash
npm run dev
```

## Building for Production

To build the application for production:

```bash
npm run build
```

This will create a `dist/` directory with the production-ready files.

## Architecture Overview

The frontend follows a modern React architecture, separating concerns into three main areas:

-   **Components (`src/components`):** Reusable UI elements responsible for rendering the application's views.
-   **Hooks (`src/hooks`):** Custom hooks that encapsulate business logic, state management, and data fetching.
-   **Services (`src/services`):** Modules responsible for communicating with the backend API.

## Core Technologies

-   **React & TypeScript:** For building a type-safe and component-based user interface.
-   **Vite:** As the build tool and development server.
-   **TanStack Query (`@tanstack/react-query`):** For managing server state, including caching, refetching, and background updates.
-   **nuqs:** For managing state within the URL's query parameters, allowing for shareable and bookmarkable URLs.
-   **Axios:** As the HTTP client for making API requests.

## Key Components

-   `UserTable`: Displays a paginated table of users, allowing for user selection.
-   `UserPosts`: Displays the posts for a selected user and provides functionality to create and delete posts.
-   `NewPostModal`: A modal dialog for creating new posts.

## State Management

The application employs a hybrid state management strategy:

-   **Server State:** Managed by `@tanstack/react-query`, which handles all data fetching, caching, and synchronization with the backend.
-   **URL State:** Managed by `nuqs`, which stores UI state (like page numbers) in the URL's query string. This makes the application state more predictable and shareable.

## Routing

As noted in the Design Choices, a full-fledged router was omitted for simplicity. The `App.tsx` component manages which view (`UserTable` or `UserPosts`) is displayed based on the presence of a `userId` in the URL, which is managed by the `nuqs` library.

## Project Structure

```
frontend/
├── src/           # TypeScript and React source files
│   ├── components/  # Reusable React components
│   ├── hooks/       # Custom React hooks
│   ├── services/    # API communication services
│   └── ...
├── public/        # Static assets
└── ...
```
