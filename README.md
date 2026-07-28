# Interior Haven Interior Design Frontend

A responsive interior-design website built with React 19, Vite, Tailwind CSS v4, React Router, Framer Motion, Axios, React Hook Form, and Zod.

## Documentation

- [Complete project documentation](docs/PROJECT_DOCUMENTATION.md)
- [Developer learning and presentation handbook](docs/DEVELOPER_HANDBOOK.md)
- [Principal frontend code review](docs/CODE_REVIEW.md)

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

- `/` — marketing homepage
- `/projects` — portfolio listing
- `/projects/:projectSlug` — project detail
- `/contact` — validated CRM enquiry form

## Deployment note

The host must rewrite unknown frontend paths to `index.html` so BrowserRouter routes work after a direct page refresh. Configure the two Vite environment variables in the deployment platform and verify that both API servers allow requests from the deployed frontend origin.

Marketing copy, contact details, and project image references are centralized in `src/constants/siteContent.js` for replacement with approved brand content.
