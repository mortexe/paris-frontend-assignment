# Paris Frontend Assignment

Thank you for taking a look over this assignment. I tried to follow all instructions explained in the PDF,
and hope I didn't misunderstand or misinterpret any of the actual assignment intentions!

I've also uploaded the **Part 1 : Code Review** pdf file directly into this repo as well.


## Setup Instructions

### Prerequisites

- **Node.js**: v16 or higher.
- **npm**

### Steps

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/mortexe/paris-frontend-assignment.git
    cd paris-frontend-assignment
    ```

2. **Install Dependencies**:
    ```bash
    npm install
    ```

3. **Start the Development Server**:
    ```bash
    npm run dev
    ```

4. Open a browser and navigate to: `http://localhost:3000`

5. **Run Tests**:
    ```bash
    npm test
    ```

### Additional Commands

- **Linting**:
    ```bash
    npm run lint
    ```

- **Code Formatting**:
    ```bash
    npm run format
    ```

- **Build the Application**:
    ```bash
    npm run build
    ```

- **Run the Production Build Locally**:
    ```bash
    npm start
    ```

---

## Architectural Decisions

### Performance Optimization
- **Image Optimization**:
  - The app can leverage Next.js's `next/image` component for automatic image resizing, lazy loading, and format selection.

- **SWR**:
  - SWR helps with efficient data fetching by caching responses and allowing the app to use previously fetched data while revalidating in the background. This reduces redundant network requests and ensures updated data.

- **useCallback & useMemo**:
  - Utilizing React's performance optimization hooks collectively improves the performance of `WatchHistoryContext.Provider` and its consumers, especially in contexts where frequent state updates like watch history tracking might occur.

### Framework
The project uses **Next.js**, taking advantage of:
- **Server-Side Rendering (SSR)** and **Static Site Generation (SSG)** for optimized performance and improved SEO.
- **File-based routing** for a scalable and maintainable architecture.

### Folder Structure

- **`src` Folder**: Contains all application files and code.
    - `components`: UI components, further split into:
        - `shared`: Reusable components like `Modal`, `ProgressBar`, etc.
        - `content`: Specific components for content display, e.g., `ContentGrid`, `ContentItemCard`.
        - `error`: Components for error handling (`ErrorBoundary`, `GenericErrorFallback`)
    - `context`: For global state management using React contexts, e.g., `WatchHistoryContext`, `ToastContext`.
    - `data`: Static or mock data files such as `sample.json`.
    - `hooks`: Reusable custom React hooks, e.g., `useTrending`, `useFocusTrap`.
    - `locales`: Localization files for internationalization.
    - `shared`: Shared utilities or configuration files (e.g. i18n setup).
    - `types`: TypeScript type definitions for models or utilities.

### State Management
The app uses **React Context API** for global state:
- **WatchHistoryContext**: Manages and persists watch history and progress tracking.
- **ToastContext**: Manages toast notifications across the app.

### Error Handling
- **ErrorBoundary Component**:
    - Wraps components to catch rendering errors and display fallback UIs gracefully.
    - Errors are logged via `console.error` (extendable for production, e.g., logging with Sentry).

### Styling
The application uses **TailwindCSS** for utility-first CSS styling:
- Consistent designs using reusable utility classes.
- Configuration and customization are defined in `tailwind.config.js`.

### Testing
The project uses **Vitest** for testing:
- **Unit Tests**: `ContentGrid.test.tsx` validates `ContentGrid.tsx` component.

Testing setup is defined in `setupTests.ts`.

### Code Quality
- **ESLint**: Enforces coding standards and catches potential issues during development.
- **Prettier**: Automatically formats code for consistency based on `.prettierrc` rules.

---

## Assumptions

### Data and Content
- Static mock data files stored in the `src/data/` directory simulate API responses during development.
- It assumes the backend will deliver data in the same format as the provided mock files.

### Watch History
- `WatchHistoryContext` manages video progress and history.
- Persistent storage (e.g., localStorage or backend sync) is assumed.

### Accessibility
- The app strives to meet basic accessibility standards using attributes like `aria-label` and proper keyboard navigation.

### Browser Support
- The app is optimized for modern browsers supporting ES6+ JavaScript and modern CSS features like Flexbox and CSS Grid.

### Error Management
- Critical application areas are wrapped in the `ErrorBoundary` component to handle runtime errors gracefully.
- Fallback UIs ensure users are provided with clear feedback in case of failures.
- The `ToastProvider` is utilized to display toast notifications for non-critical errors (404, 500 etc.) and user feedback. It's currently being used in `useTrending` hook, where all fetching is done.
