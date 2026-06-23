# Advanced FakeStore App

React + Vite storefront app with Redux and React Query.

## Local Development

1. Install dependencies:
	npm install
2. Start dev server:
	npm run dev
3. Build production bundle:
	npm run build

## GitHub Pages Deployment

Deployment is configured with GitHub Actions in `.github/workflows/deploy.yml`.

Checklist:

1. Push this repo to GitHub.
2. In GitHub, open Settings -> Pages.
3. Set Source to GitHub Actions.
4. Push to `main` (or run the workflow manually from Actions tab).

The app already uses a GitHub Pages-compatible setup:

1. Vite base path is configured for the repository path.
2. Routing uses hash-based URLs, so deep links work on static hosting.
