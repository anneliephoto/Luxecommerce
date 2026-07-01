# Luxecommerce

React + Vite e-commerce storefront with Redux cart state, Firestore-backed product data, and GitHub Actions CI/CD.

## Local Development

1. Install dependencies: `npm install`
2. Start the dev server: `npm run dev`
3. Run tests: `npm test`
4. Build production bundle: `npm run build`

## CI/CD

The repository uses `.github/workflows/main.yml` to:

1. Run Jest tests on every push to `main`.
2. Build the app after tests pass.
3. Deploy to Netlify when the required secrets are available.

Required Netlify secrets:

1. `NETLIFY_AUTH_TOKEN`
2. `NETLIFY_SITE_ID`

`netlify.toml` is already included, so the site can be deployed from the GitHub Actions workflow or directly from Netlify if needed.

## Live App

Add your deployed app URL here after deployment: [Live E-Commerce App](https://example.com)
