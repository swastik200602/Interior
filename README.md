# Interior Haven Interior Design Frontend

A responsive interior-design website built with React 19, Vite, Tailwind CSS v4, React Router, Framer Motion, Axios, React Hook Form, and Zod.

## Documentation

- [Complete project documentation](docs/PROJECT_DOCUMENTATION.md)
## Local development

```powershell
npm install
npm run dev
```

If PowerShell blocks `npm.ps1`, use `npm.cmd run dev`.

## Environment

Copy `.env.example` to `.env.local` and configure:

```text
VITE_API_BASE_URL=<CRM admin API origin>
VITE_LOOKUP_API_BASE_URL=<state and district API origin>
```

Restart the Vite development server after changing environment variables.

## Quality checks

```powershell
npm run lint
npm run build
```

## Routes

- `/` - marketing homepage
- `/projects` - portfolio listing
- `/projects/:projectSlug` - project detail
- `/contact` - validated CRM enquiry form

## Firebase Hosting

The Firebase project is configured as `interior-heaven`. Hosting publishes the Vite `dist` directory and rewrites unknown routes to `index.html`, allowing React Router routes to work after a direct page refresh.

Build and deploy from the project directory:

```powershell
npm.cmd run build
firebase.cmd deploy --only hosting
```

Deployment URL:

```text
https://interior-heaven.web.app
```

### Firebase configuration

`firebase.json` must retain this SPA configuration:

```json
{
  "hosting": {
    "public": "dist",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

### Firebase welcome page troubleshooting

If the deployed URL displays `Firebase Hosting Setup Complete`, Firebase's placeholder page was deployed instead of the Vite application. Regenerate `dist` and deploy again:

```powershell
npm.cmd run build
firebase.cmd deploy --only hosting
```

Verify `dist/index.html` contains the Interior Haven title before deploying. Avoid running `firebase init` again after building because initialization may replace `dist/index.html` with Firebase's welcome page.

After deployment, use `Ctrl + Shift + R` to bypass an old browser cache.

### Production requirements

- Configure both Vite API environment variables before building.
- Confirm both backend APIs allow requests from `https://interior-heaven.web.app` through CORS.
- Never put secrets in `VITE_*` variables because they are included in the browser bundle.
- Run `npm.cmd run lint` and `npm.cmd run build` before deployment.

Marketing copy, contact details, and project image references are centralized in `src/constants/siteContent.js` for replacement with approved brand content.
