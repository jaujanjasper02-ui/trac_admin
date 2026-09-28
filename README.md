# TRAC Registrar Admin

React single-page application for registrar staff to manage document requests and the TRAC request system. The app includes an operations dashboard, request queue and details, document management, admin user management, activity logs, profile management, and system settings.

## Requirements

- Node.js 18 or newer (Node.js 20 LTS is recommended) and npm.
- The TRAC backend API running locally or deployed and reachable from the browser.

## Dependencies

Install all dependencies from `package.json` with `npm install`.

| Package | Purpose |
| --- | --- |
| `react`, `react-dom` | User interface and browser rendering |
| `react-router-dom` | Client-side page routing |
| `axios` | HTTP client for backend requests |
| `lucide-react`, `react-icons` | Interface icons |
| `bcryptjs` | Password-hashing utility currently declared by the app |
| `jspdf`, `jspdf-autotable` | PDF and tabular report generation |
| `vite`, `@vitejs/plugin-react` | Development server and production bundler |
| `tailwindcss`, `postcss`, `autoprefixer` | Styling and CSS processing |

## Configuration

Create a `.env` file in this project directory:

```dotenv
VITE_API_URL=http://localhost:5000/api
```

`VITE_API_URL` is the base URL for backend requests. The admin app uses `http://localhost:5000/api` for local development when the backend is running with its default settings. For deployment, set it to the public API base URL, including `/api`, then rebuild the frontend. Vite variables prefixed with `VITE_` are included in client-side code, so never put secrets in this file.

## Install and Run

```bash
npm install
npm run dev
```

Vite serves the app at `http://localhost:3000` by default. The dev server may select another port if `3000` is occupied because `strictPort` is disabled in `vite.config.js`.

The backend must allow the frontend origin through its `CORS_ORIGINS` setting. The backend's default local CORS list includes `http://localhost:3000`.

## Available Commands

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server. |
| `npm run build` | Create an optimized production build in `dist/`. |
| `npm run preview` | Preview the latest production build locally. Run `npm run build` first. |

There are no lint or test scripts defined in this project's `package.json`.

## Project Layout

```text
src/
  components/      Shared admin UI components
  layouts/         Admin page layout and navigation shell
  pages/           Dashboard, requests, users, settings, logs, and profile pages
  routes/          Admin route definitions
  services/        Backend API client and request helpers
  App.jsx          App-level routing and composition
  index.css        Global styles
```

## Production Deployment

1. Set `VITE_API_URL` to the deployed backend API base URL.
2. Confirm the backend's `CORS_ORIGINS` allows the deployed admin site's origin.
3. Install dependencies and build the static assets:

   ```bash
   npm install
   npm run build
   ```

4. Deploy the contents of `dist/` to a static hosting provider. Configure the host to serve `index.html` for application routes so React Router paths work on refresh.

Use `npm run preview` to inspect the production build locally. It serves the generated files with Vite's preview server (port `4173` by default unless changed by Vite).