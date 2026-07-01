# Luxecommerce

React + Vite e-commerce storefront with Redux cart state, Firestore-backed product data, and GitHub Actions CI/CD.

## Local Development

1. Install dependencies: `npm install`
2. Start the dev server: `npm run dev`
3. Run tests: `npm test`
4. Build production bundle: `npm run build`

## CI/CD

The repository includes `.github/workflows/main.yml` for test and deploy automation, and Netlify is connected to the GitHub repo for automatic production deploys.

1. Run Jest tests on every push to `main`.
2. Build the app after tests pass.
3. Deploy to Netlify from the connected GitHub repo.

If you ever choose to deploy through GitHub Actions instead of Netlify's auto-deploy, you will need these secrets:

1. `NETLIFY_AUTH_TOKEN`
2. `NETLIFY_SITE_ID`

`netlify.toml` is already included, so the site can be deployed from Netlify directly without any manual secret setup.

## Live App

Live app: [https://luxecommerce-store.netlify.app](https://luxecommerce-store.netlify.app)
