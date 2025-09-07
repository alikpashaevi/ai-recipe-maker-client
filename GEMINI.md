# Project: AI Recipe Maker

## Project Overview

This is a web application that allows users to generate recipes using AI. Users can input a list of ingredients, and the application will generate a recipe with instructions, estimated time, and servings. The application also includes features like user authentication, saving favorite recipes, and viewing recipe history.

The project is built with Next.js and uses Tailwind CSS for styling. It communicates with a backend API for user authentication and recipe generation.

**Key Technologies:**

*   **Frontend:** Next.js, React, TypeScript
*   **Styling:** Tailwind CSS, Radix UI
*   **Authentication:** Custom authentication with a backend API
*   **API Communication:** Fetch API

## Building and Running

To get the application running locally, follow these steps:

1.  **Install Dependencies:**
    ```bash
    npm install
    ```

2.  **Run the Development Server:**
    ```bash
    npm run dev
    ```
    This will start the development server at `http://localhost:3000`.

3.  **Build for Production:**
    ```bash
    npm run build
    ```
    This will create a production-ready build of the application.

4.  **Start the Production Server:**
    ```bash
    npm run start
    ```
    This will start the production server.

**Available Scripts:**

*   `npm run dev`: Starts the development server.
*   `npm run build`: Builds the application for production.
*   `npm run start`: Starts the production server.
*   `npm run lint`: Lints the codebase using Next.js's built-in ESLint configuration.

## Development Conventions

*   **Component-Based Architecture:** The application is built using a component-based architecture, with reusable components located in the `components` directory.
*   **Styling:** The project uses Tailwind CSS for styling, with custom components and variants. The `cn` utility is used to merge class names.
*   **State Management:** The application uses React's built-in state management and context API for managing global state, such as authentication.
*   **API Communication:** The application communicates with a backend API for data fetching and mutations. The API services are located in the `lib` directory.
*   **Authentication:** Authentication is handled via a custom `AuthService` that communicates with a backend API. The user's authentication token is stored in local storage.
*   **Backend API:** The application expects a backend API to be running at `http://localhost:8080`.
