# Deployment Environment Variables for SiteSurveyorStore

This document explains the environment variables used for deploying the SiteSurveyorStore project on Netlify, specifically related to Supabase integration.

## Environment Variables

### Frontend (Vite) Environment Variables

The frontend code uses the following environment variables with the `VITE_` prefix, which are accessed via `import.meta.env` in the code (see `src/lib/supabase.js`):

- `VITE_SUPABASE_DATABASE_URL`: The Supabase project URL.
- `VITE_SUPABASE_ANON_KEY`: The Supabase anonymous public API key.

These variables must be set in the Netlify environment for the frontend to connect to Supabase properly.

### Backend / Server-side Environment Variables

The following environment variables are not directly used in the frontend code but may be required for backend services, serverless functions, or other secure operations:

- `SUPABASE_DATABASE_URL`: The Supabase project URL (same as `VITE_SUPABASE_DATABASE_URL`).
- `SUPABASE_SERVICE_ROLE_KEY`: The Supabase service role key with elevated privileges.
- `SUPABASE_JWT_SECRET`: The JWT secret used for authentication or token verification.

These should be securely stored in Netlify environment variables if you have backend functions or other services that require them.

## Netlify Configuration

- The `netlify.toml` file configures the build and dev commands using `bun`.
- The build output directory is `dist`.
- Environment variables should be set in the Netlify dashboard or via CLI to match the keys above.
- No additional code changes are required for environment variable usage in the frontend.

## Summary

- Ensure all the above environment variables are set in your Netlify project settings.
- The frontend uses the `VITE_` prefixed variables.
- Backend or serverless functions should use the non-prefixed variables.
- Restart the Netlify build after setting environment variables to apply changes.

---

This setup ensures your SiteSurveyorStore project connects securely and correctly to Supabase when deployed on Netlify.
