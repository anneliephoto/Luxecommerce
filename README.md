# Advanced FakeStore App

React + Vite storefront app with Redux, React Query, Firebase, and a CI/CD workflow for automated testing and deployment.

## Live Demo

The production build is configured for Vercel deployment. After the Vercel project is connected and the workflow runs successfully, update this link to your deployed app URL:

https://your-vercel-project-name.vercel.app

## Local Development

1. Install dependencies:
   npm install
2. Start the development server:
   npm run dev
3. Build the production bundle:
   npm run build
4. Run the test suite:
   npm test

## Testing

The project includes React Testing Library tests for:

- ConfirmModal rendering and button interactions
- ProductDetails loading and add-to-cart behavior
- Cart integration when adding a product

## CI/CD

GitHub Actions is configured in [.github/workflows/main.yml](.github/workflows/main.yml) to:

- run on pushes and pull requests to the main branch
- install dependencies
- run the Jest test suite
- build the Vite app
- deploy to Vercel after CI passes

### Required GitHub Secrets

Add the following repository secrets before enabling the Vercel deploy job:

- VERCEL_TOKEN
- VERCEL_ORG_ID
- VERCEL_PROJECT_ID

## Vercel Notes

- The app uses a Vercel-friendly base path in Vite.
- A SPA fallback is provided in [vercel.json](vercel.json) so deep links work after refresh.
