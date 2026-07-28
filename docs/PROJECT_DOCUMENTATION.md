# Interior Haven — Project Documentation

## 1. Project summary

Interior Haven is a responsive interior-design marketing website with CRM lead capture. It presents the studio, services, projects, process, testimonials, FAQs, and contact details. Visitors can submit a validated project enquiry, which is converted into the ASP.NET Core CRM payload and sent to the existing backend.

### Main objectives

- Present a premium and trustworthy interior-design brand.
- Make project discovery easy across desktop and mobile devices.
- Capture qualified leads through a professional enquiry form.
- Load master data from the backend rather than hardcoding dropdown values.
- Keep UI, validation, API communication, configuration, and content separate.

## 2. Technology stack

| Technology | Responsibility |
|---|---|
| React 19 | Component-based user interface |
| Vite 8 | Development server and production bundling |
| JavaScript | Application language |
| Tailwind CSS v4 | Utility styling and design tokens |
| React Router DOM 7 | Client-side routing and lazy-loaded pages |
| Axios | HTTP clients and response error normalization |
| React Hook Form | Form state, registration, submission state, and errors |
| Zod | Declarative form validation schema |
| React Hot Toast | Success and failure notifications |
| Lucide React | Accessible interface icons |
| Framer Motion | Reveal and entrance animations |
| ESLint | Static code-quality checks |

## 3. Getting started

### Requirements

- Node.js compatible with Vite 8
- npm
- Internet access for CRM APIs and current Unsplash image references

### Installation

Open PowerShell in the frontend directory:

```powershell
cd .\interior-frontend
npm install
```

Start development:

```powershell
npm run dev
```

If PowerShell blocks `npm.ps1`, use:

```powershell
npm.cmd run dev
```

The default Vite address is normally `http://localhost:5173`.

### Environment variables

The project uses two API origins because the backend contract is split across two hosts:

```text
VITE_API_BASE_URL=https://crmapp.coteriesoft.in
VITE_LOOKUP_API_BASE_URL=https://crmsoftapi.coteriesoft.com
```

Definitions are documented in `.env.example`. Local values belong in `.env.local`, which is ignored by Git through the `*.local` rule.

Restart Vite after changing environment variables. Vite injects these values at build/start time, not dynamically after the application is running.

## 4. Available scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Starts the Vite development server |
| `npm run lint` | Runs ESLint across the source code |
| `npm run build` | Creates the optimized production bundle in `dist/` |
| `npm run preview` | Serves the production bundle locally for verification |

Recommended pre-delivery check:

```powershell
npm.cmd run lint
npm.cmd run build
npm.cmd run preview
```

## 5. Application routes

| Route | Page | Description |
|---|---|---|
| `/` | HomePage | Complete marketing homepage |
| `/projects` | ProjectsPage | Portfolio listing |
| `/projects/:projectSlug` | ProjectDetailPage | Data-driven project detail |
| `/contact` | ContactPage | Contact information and CRM enquiry form |
| `/not-found` | NotFoundPage | Branded 404 page |
| `*` | Redirect | Redirects unknown URLs to `/not-found` |

Pages are loaded with `React.lazy`. `Suspense` displays `PageLoader` while a page chunk downloads.

## 6. Source architecture

```text
src/
├── components/
│   ├── common/             Application-level reusable components
│   ├── layout/             Navbar, footer, mobile menu, site shell
│   └── ui/                 Generic visual primitives
├── constants/              API paths, fixed payload values, content, navigation
├── hooks/                  Reusable React behavior
├── pages/                  Route-level pages
│   └── home/               Homepage section components
├── routes/                 Route table and scroll restoration
├── services/               Axios clients and backend operations
├── styles/                 Tailwind theme and global styles
└── utils/                  Pure helpers and Zod schemas
```

### Responsibility rules

- Pages compose sections; they do not construct HTTP payloads.
- UI components handle presentation and accessibility, not business rules.
- Services know backend endpoints and response shapes.
- Zod owns client-side validation rules.
- Constants own navigation, marketing data, and fixed backend values.
- Environment variables own API origins.

## 7. Entry and layout flow

```text
main.jsx
  └── ErrorBoundary
      └── App.jsx
          ├── BrowserRouter
          ├── ScrollToTop
          ├── AppRoutes
          │   └── SiteLayout
          │       ├── Navbar
          │       ├── Current page through Outlet
          │       └── Footer
          └── Toaster
```

`ErrorBoundary` handles unexpected render failures. API/form failures are handled locally and displayed through retry UI or toast notifications.

## 8. Design system

The Tailwind v4 theme is defined in `src/styles/globals.css`.

### Semantic tokens

| Token | Intended use |
|---|---|
| `background` | Main warm page background |
| `surface` | Cards and alternate sections |
| `foreground` | Primary text and dark sections |
| `muted` | Supporting text |
| `primary` | Main actions and brand emphasis |
| `secondary` | Supporting brand action |
| `accent` | Restrained decorative emphasis |
| `border` | Dividers and control borders |
| `destructive` | Validation and error states |

Semantic names allow the palette to change without rewriting every component.

### Typography

- Display token: Cormorant Garamond with Georgia fallback
- Body token: Inter with Segoe UI fallback

The current project defines font stacks but does not include self-hosted font files. For final production branding, add licensed/open WOFF2 files and `@font-face` definitions.

### Accessibility foundations

- Visible `:focus-visible` outline
- Semantic headings and navigation landmarks
- Form labels connected through `htmlFor` and `id`
- Validation connected with `aria-describedby`
- Mobile menu exposes `aria-expanded` and becomes `inert` while closed
- Decorative icons use `aria-hidden`
- Reduced-motion preference disables unnecessary transitions
- Buttons use accessible minimum heights

## 9. Reusable components

### UI primitives

| Component | Responsibility |
|---|---|
| `Button` | Controlled variants, sizes, button/link rendering |
| `Container` | Consistent max width and responsive horizontal padding |
| `SectionHeading` | Standard eyebrow, heading, and description hierarchy |
| `Logo` | Central brand link and accessible label |
| `FormField` | Input/textarea label, error, and ARIA wiring |
| `SelectField` | Select label, options, error, and ARIA wiring |

### Common components

| Component | Responsibility |
|---|---|
| `ProjectCard` | Reusable project preview |
| `Reveal` | Reduced-motion-aware scroll animation |
| `LeadForm` | Form orchestration and UI state |
| `PageLoader` | Lazy-page loading feedback |
| `ErrorBoundary` | Unexpected render failure fallback |

## 10. Homepage composition

The homepage is divided into focused components:

1. `HeroSection`
2. `AboutSection`
3. `ServicesSection`
4. `ProjectsSection`
5. `ProcessSection`
6. `TestimonialsSection`
7. `FaqSection`
8. `ContactCtaSection`

Marketing data is centralized in `src/constants/siteContent.js`. Project cards and project-detail pages consume the same `PROJECTS` array, preventing duplicated content.

## 11. CRM API architecture

### Axios clients

`src/services/apiClient.js` creates two clients:

| Client | Environment origin | Used for |
|---|---|---|
| `apiClient` | `VITE_API_BASE_URL` | Industry, company, source, lead submission |
| `lookupApiClient` | `VITE_LOOKUP_API_BASE_URL` | State, district, lead type |

Both clients use:

- JSON content type
- 15-second timeout
- Shared response-error normalization

### Master endpoints

| Data | Client | Endpoint | Parameters |
|---|---|---|---|
| States | Lookup | `/api/Auth/GetStates` | None |
| Districts | Lookup | `/api/Auth/GetDistrictById` | `StateId` |
| Lead types | Lookup | `/api/Admin/GetLeadType` | None |
| Industries | Main | `/api/Admin/GetIndustryType` | None |
| Companies | Main | `/api/Admin/GetCompanyDetail` | `CompanyId=0` |
| Sources | Main | `/api/Admin/GetSourceOfLead` | None |
| Submit lead | Main | `/api/Admin/PostLeadDetail` | JSON body |

### Response normalization

Backend master responses do not have one uniform shape. Examples include:

```json
{ "status": true, "data": [] }
```

and:

```json
{ "status": true, "data": { "result": [] } }
```

Field casing also varies: `stateID`, `districtId`, `leadtype`, and `industryTypes`.

`extractCollection` recursively finds the collection. `toOptions` converts each backend item into the stable frontend shape:

```js
{
  value: "34",
  label: "Uttar Pradesh"
}
```

The UI therefore does not depend on backend casing or nesting.

### Lookup caching

`getLeadLookups` stores the active Promise in `lookupRequest`. This prevents React Strict Mode from making duplicate master requests during development. If the request fails, the cached Promise is cleared so Retry can start a fresh request.

## 12. Lead form lifecycle

```text
ContactPage renders LeadForm
  ↓
Master lookups load in parallel
  ↓
User chooses State
  ↓
District selection resets
  ↓
District API loads matching districts
  ↓
User submits form
  ↓
Zod validates all fields
  ↓ valid
submitLead maps UI values to backend payload
  ↓
Axios sends POST request
  ↓
Success toast + form reset OR normalized error toast
```

`districtRequest` is a counter stored in a ref. If users change states quickly, an older district response cannot overwrite the latest selection.

## 13. Validation contract

| Field | Validation |
|---|---|
| Full name | 2–80 trimmed characters |
| Email | Valid email address |
| Mobile | Valid Indian 10-digit number starting with 6–9 |
| Lead type | Required |
| Company | Required |
| Source | Required |
| Industry | Required |
| Budget | Optional; digits only |
| Address | 5–200 trimmed characters |
| State | Required |
| District | Required |
| Pincode | Exactly 6 digits |
| Project brief | 20–1000 trimmed characters |

The backend additionally treats `LeadName`, `ContactNo`, and `EmailId` as unique.

## 14. Submission payload mapping

| Frontend field/source | Backend field | Conversion |
|---|---|---|
| `leadName` | `LeadName` | Trimmed string |
| `leadName` | `PersonName` | Trimmed string |
| `leadTypeId` | `LeadTypeId` | Number |
| `companyId` | `CompanyId` | Number |
| `budget` | `ValueAmt` | Number; defaults to 0 |
| `contactNo` | `ContactNo` | Trimmed string |
| `email` | `EmailId` | Trimmed string |
| `sourceId` | `SourceId` | Number |
| `industryId` | `IndustryId` | Number |
| Constant | `Tags` | Website enquiry tags |
| `description` | `Description` | Trimmed string |
| `address` | `Address` | Trimmed string |
| `stateId` | `StateId` | Number |
| `districtId` | `DistrictId` | Number |
| `pincode` | `Pincode` | Number |

Fixed values are defined in `LEAD_DEFAULTS`, outside the UI:

```json
{
  "Visibility": 1,
  "CreateBy": "1",
  "StageId": 1,
  "StageUserId": "2",
  "StageTags": "Website enquiry",
  "StageDescription": "Lead submitted through the interior design website",
  "StageVisibility": 1,
  "LeadStatus": "Open"
}
```

Expected success response:

```json
{
  "status": true,
  "message": "Insert Lead Detail successfully"
}
```

## 15. Duplicate-lead behavior

The observed backend error was:

```text
Violation of PRIMARY KEY constraint 'PK_T_LeadDetails'.
Cannot insert duplicate key in object 'dbo.T_LeadDetails'.
The duplicate key value is (Swastik Singh).
```

This proves that the request reached the API and the backend attempted a database insert. It also indicates that `LeadName` is used as, or included in, a database primary/unique key. Use a new name, mobile number, and email for each test.

Backend database errors should ideally be translated by ASP.NET Core into a user-friendly `409 Conflict`, such as “A lead with this name already exists.” That improvement belongs to the backend.

## 16. Testing checklist

### Automated checks currently available

```powershell
npm.cmd run lint
npm.cmd run build
```

Both checks passed at the time this document was created.

### Manual responsive testing

Test at minimum:

- 320px mobile
- 375px mobile
- 768px tablet
- 1024px laptop
- 1440px desktop

Verify:

- No horizontal overflow
- Mobile navigation opens, closes, and closes with Escape
- Keyboard focus is always visible
- Project routes and browser Back work
- Images preserve their aspect ratios
- Footer content does not overlap

### Form testing

1. Submit empty form and verify field errors.
2. Test invalid email, phone, pincode, and short brief.
3. Verify dropdown loading and retry state.
4. Change states quickly and confirm districts match the last state.
5. Submit unique test data and expect `status: true`.
6. Confirm the lead in CRM/database.
7. Resubmit the same unique values and verify duplicate handling.
8. Test offline mode and request timeout behavior.

### Postman verification

Use:

```text
POST https://crmapp.coteriesoft.in/api/Admin/PostLeadDetail
Content-Type: application/json
```

Always use unique `LeadName`, `ContactNo`, and `EmailId`. A complete test is successful only when the API reports success and the record is visible in CRM.

## 17. Production deployment

### Build

```powershell
npm.cmd run build
```

Deploy the generated `dist/` directory.

### Required hosting configuration

- Set both `VITE_*` environment variables before building.
- Rewrite unknown routes to `index.html` for BrowserRouter.
- Serve the site over HTTPS.
- Confirm both APIs allow the deployed origin through CORS.
- Add caching for hashed assets but not indefinitely for `index.html`.
- Replace demo content and remote image references with approved assets.

Example SPA rewrite concept:

```text
If requested file does not exist → serve /index.html
```

## 18. Known limitations and recommended improvements

### Before real client launch

- Replace placeholder phone, email, address, testimonials, statistics, and project descriptions.
- Replace Unsplash URLs with optimized local/client-approved AVIF or WebP assets.
- Self-host approved font files.
- Replace the demo social link.
- Add a real favicon and social sharing image.
- Confirm CORS on production domain.
- Confirm successful CRM insertion and record visibility.

### Future engineering improvements

- Add Vitest and React Testing Library.
- Add Playwright end-to-end tests.
- Add an API mocking layer for predictable form testing.
- Add runtime monitoring and error reporting.
- Add analytics only with appropriate consent.
- Add a privacy notice because personal lead data is collected.
- Add server-side rate limiting/CAPTCHA if spam becomes a problem.
- Ask backend team to return structured `400`, `409`, and `500` responses.
- Consider a proxy/backend-for-frontend if the browser cannot safely call CRM APIs directly.

## 19. Security notes

- `VITE_*` variables are visible in the browser bundle. Never place secrets, tokens, passwords, or private keys in them.
- Client-side Zod validation improves UX but does not replace server-side validation.
- Backend must validate, sanitize, authorize, rate-limit, and safely persist every request.
- Avoid logging personal lead data in production browsers.
- Use HTTPS for both frontend and API traffic.

## 20. Final delivery status

Implemented:

- Responsive marketing UI
- Reusable component architecture
- Routing and lazy loading
- Portfolio listing and detail pages
- Lead form with validation
- Dynamic master and dependent dropdown APIs
- Payload transformation and fixed values
- Loading, retry, success, and failure UX
- Animations and reduced-motion support
- SEO metadata helper
- Error boundary and 404 route
- Environment-based API origins
- Successful lint and production build

Final business acceptance requires:

1. One unique lead returns `status: true`.
2. That lead is visible inside CRM/database.
3. Demo branding/content/assets are replaced or formally approved.
4. The deployed origin passes CORS and responsive acceptance testing.
