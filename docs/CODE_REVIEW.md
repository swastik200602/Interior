# Interior Haven — Principal Frontend Code Review

## 1. Overall architecture review

The project has a sound small-application architecture. Route-level pages compose sections, UI primitives remain mostly presentation-only, API behavior lives in services, validation lives in a Zod schema, and backend constants are outside components. This is appropriate separation without introducing Redux, a query library, context providers, or feature factories that the current scope does not need.

The architecture was preserved. The refactor focused on dead-code removal, safer API handling, accessibility, and readability.

### Keep as is

- BrowserRouter with a shared layout route
- Route-level lazy loading
- Separate Axios clients for the two backend origins
- React Hook Form plus Zod
- Service-layer payload transformation
- Central marketing data
- Small `cn` helper
- One metadata hook
- Error boundary, toast provider, and reduced-motion-aware animation

### Changed

- Removed default JSON headers from all Axios calls. Axios sets JSON headers for JSON POST bodies; forcing them on GET can cause avoidable CORS preflight requests.
- Submission now requires the documented `status: true` response.
- Raw duplicate/primary-key messages are translated into user-safe copy.
- Mobile menu moves focus into the dialog and returns it to the trigger.
- District loading has an explicit state and label.
- Dense one-line JSX was expanded for reviewability.
- Dead scaffold files and empty folders were removed.

## 2. Folder structure review

Final structure:

```text
src/
├── components/
│   ├── common/
│   ├── layout/
│   └── ui/
├── constants/
├── hooks/
├── pages/
│   └── home/
├── routes/
├── services/
├── styles/
└── utils/
```

This is slightly layered but justified. Collapsing everything into `components/` would make ownership less clear. A feature-first architecture would be unnecessary for a site with one business feature (lead capture).

Removed:

- Empty `src/contexts/`
- Unused `src/assets/`
- Vite and React scaffold SVG files
- Unused `hero.png`
- Unused `public/icons.svg`

No new folder was added.

## 3. Code quality review

### Strengths

- API URLs use environment variables.
- Backend response inconsistencies are isolated in `leadService`.
- Fixed CRM values are not editable UI state.
- HTML select strings are converted to numbers at the API boundary.
- Failed lookup caching resets, enabling Retry.
- Stale district responses cannot overwrite a newer selection.
- Components have clear names and mostly one responsibility.
- ESLint passes with React 19 hook/compiler rules.

### Remaining business risks

- The backend appears to expose raw SQL errors. The frontend now masks known duplicate errors, but the backend should return structured `409 Conflict` responses.
- The lead name appears to be a primary/unique database value. That is a backend-domain constraint and should be documented clearly to users.
- Contact details, testimonials, statistics, social URL, and remote project images require business approval.
- Client-side validation is UX only; the backend must validate every field.

## 4. Performance review

### Keep as is

- Lazy-loaded pages
- Lazy project images
- High-priority hero image
- Master lookup Promise caching
- Framer Motion isolated to reveal/hero behavior
- No premature `useMemo`, `useCallback`, or `memo`

The bundle is acceptable for an internship marketing site. The main chunk is about 82 KB gzip; the contact chunk is about 47 KB gzip because it contains form/validation dependencies. Adding a server-state library would increase complexity and bundle size without sufficient value.

### Future performance work only if metrics justify it

- Replace remote images with responsive AVIF/WebP assets.
- Self-host and preload approved fonts.
- Measure with Lighthouse/Web Vitals before adding memoization.

## 5. Readability review

The main readability issue was dense single-line JSX. It made route tables, forms, and mapped section markup difficult to review. The refactor expanded the files where nesting and conditional rendering made line breaks materially useful.

Naming changes:

- `defaults` → `defaultValues`, matching React Hook Form terminology.
- `isLoadingDistricts` makes the dependent request state explicit.

No broad renaming was performed because existing names such as `LeadForm`, `ProjectCard`, `getLeadLookups`, `submitLead`, and `useDocumentMeta` are already clear.

## 6. Suggested improvements, highest priority first

1. Confirm one unique successful lead in CRM, not only an API response.
2. Ask the backend team for structured validation and `409` duplicate responses.
3. Replace demo contact/content/image/social values with approved production data.
4. Add tests for `leadSchema`, response normalization, and lead payload mapping.
5. Add one Playwright happy-path form test using a non-production/mock backend.
6. Add privacy copy and consent appropriate for collecting personal data.
7. Initialize Git and commit the reviewed baseline.
8. Add deployment SPA rewrites and verify production CORS.

Not recommended now:

- Redux or Context for local state
- TanStack Query for this small request surface
- A generic form-builder abstraction
- A component barrel-export system
- Custom design-system packages
- Memoizing every component
- Moving to a feature-based architecture before more features exist

## 7. Refactored code

### API error handling

The Axios client no longer applies `Content-Type: application/json` to GET requests. Duplicate database messages are converted into a safe message:

```js
const serverMessage = error.response.data?.message || error.response.data?.Message

if (/duplicate|primary key/i.test(serverMessage ?? '')) {
  return 'A lead with these details already exists. Please use a different name, phone number, and email.'
}
```

Trade-off: matching backend text is defensive compatibility, not a replacement for a proper backend error code.

### Submission contract

```js
if (response.data?.status !== true) {
  throw new Error(response.data?.message || 'The enquiry could not be submitted.')
}
```

This prevents an unexpected/malformed HTTP 200 response from being shown as success.

### Mobile navigation focus

- The close button receives focus when the dialog opens.
- Closing or pressing Escape returns focus to the menu trigger.
- The overlay has dialog semantics and remains inert while closed.

Trade-off: this is a lightweight menu dialog, not a reusable focus-trap framework. For the current fixed set of links, it is sufficient and understandable.

### District loading

The form now distinguishes “no state selected” from “districts are loading,” while preserving stale-response protection.

### Improved source files

- `src/services/apiClient.js`
- `src/services/leadService.js`
- `src/components/layout/Navbar.jsx`
- `src/components/layout/MobileNavigation.jsx`
- `src/components/layout/Footer.jsx`
- `src/components/common/LeadForm.jsx`
- `src/components/common/PageLoader.jsx`
- `src/components/ui/FormField.jsx`
- `src/routes/AppRoutes.jsx`
- `src/pages/ProjectsPage.jsx`
- `src/pages/ProjectDetailPage.jsx`
- `src/pages/NotFoundPage.jsx`
- `src/pages/ContactPage.jsx`
- `src/pages/home/ServicesSection.jsx`
- `src/pages/home/ProjectsSection.jsx`
- `src/pages/home/ProcessSection.jsx`
- `src/pages/home/TestimonialsSection.jsx`
- `src/pages/home/FaqSection.jsx`
- `src/constants/siteContent.js`

### File-by-file disposition

| File | Review decision |
|---|---|
| `package.json` | Keep as is. Every runtime dependency has a real use. React type packages assist editor IntelliSense. |
| `package-lock.json` | Keep as is. Required for reproducible npm installs. |
| `vite.config.js` | Keep as is. Minimal React + Tailwind v4 configuration. |
| `eslint.config.js` | Keep as is. Appropriate React 19 hook/compiler coverage. |
| `index.html` | Keep as is. Correct language, viewport, basic SEO, theme, and OG tags. |
| `.gitignore` | Keep as is. Correctly excludes dependencies, builds, logs, and local env files. |
| `.env.example` | Keep as is. Documents both public API origins. |
| `src/main.jsx` | Keep as is. StrictMode and top-level error boundary are appropriate. |
| `src/App.jsx` | Keep as is. Global router, scroll behavior, routes, and toaster are concise. |
| `src/styles/globals.css` | Keep as is. Semantic Tailwind tokens and accessibility defaults are useful. |
| `src/constants/api.js` | Keep as is. Endpoint paths and fixed business configuration are correctly separated. |
| `src/constants/navigation.js` | Keep as is. Shared navigation is genuinely reused. |
| `src/constants/siteContent.js` | Changed email casing. Keep centralized content approach. |
| `src/utils/cn.js` | Keep as is. Small helper avoids repeated conditional class joining. |
| `src/utils/leadSchema.js` | Keep as is. Validation is readable and outside UI. |
| `src/hooks/useDocumentMeta.js` | Keep as is. It removes repeated document-side effects across five pages. |
| `src/services/apiClient.js` | Changed default headers and duplicate error handling. |
| `src/services/leadService.js` | Changed success contract. Keep response normalization and payload mapping. |
| `src/routes/AppRoutes.jsx` | Reformatted. Keep lazy route structure. |
| `src/routes/ScrollToTop.jsx` | Keep as is. Solves route/hash scroll behavior in one place. |
| `src/components/ui/Button.jsx` | Keep as is. Polymorphic rendering prevents duplicate button/link styling. |
| `src/components/ui/Container.jsx` | Keep as is. Consistent page width/padding is valid reuse. |
| `src/components/ui/FormField.jsx` | Reformatted. Keep shared label/error/ARIA behavior. |
| `src/components/ui/Logo.jsx` | Keep as is. One brand link source is appropriate. |
| `src/components/ui/SectionHeading.jsx` | Keep as is. Repeated section hierarchy justifies it. |
| `src/components/common/ErrorBoundary.jsx` | Keep as is. React error boundaries still require a class without another library. |
| `src/components/common/LeadForm.jsx` | Changed readability and district loading. Keep orchestration in the form; payload logic remains in services. |
| `src/components/common/PageLoader.jsx` | Reformatted. Keep as is functionally. |
| `src/components/common/ProjectCard.jsx` | Keep as is. Reused on home and projects pages. |
| `src/components/common/Reveal.jsx` | Keep as is. Centralizes reduced-motion behavior for repeated animations. |
| `src/components/layout/Navbar.jsx` | Changed focus return and Escape behavior. |
| `src/components/layout/MobileNavigation.jsx` | Changed dialog semantics and initial focus. |
| `src/components/layout/Footer.jsx` | Reformatted and marked decorative icons. |
| `src/components/layout/SiteLayout.jsx` | Keep as is. Correct use of Outlet and shared chrome. |
| `src/pages/HomePage.jsx` | Keep as is. It is a clean composition root. |
| `src/pages/ContactPage.jsx` | Keep as is structurally; decorative contact icons are now hidden from assistive technology. |
| `src/pages/ProjectsPage.jsx` | Reformatted. Keep data-driven rendering. |
| `src/pages/ProjectDetailPage.jsx` | Reformatted and improved icon semantics. Keep data lookup at page level. |
| `src/pages/NotFoundPage.jsx` | Reformatted. Keep as is functionally. |
| `src/pages/home/HeroSection.jsx` | Keep as is. Hero-specific animation belongs here. |
| `src/pages/home/AboutSection.jsx` | Keep as is. Static section composition is clear. |
| `src/pages/home/ServicesSection.jsx` | Reformatted. Keep icon-from-data approach at this scale. |
| `src/pages/home/ProjectsSection.jsx` | Reformatted and improved icon semantics. |
| `src/pages/home/ProcessSection.jsx` | Reformatted. Keep as is functionally. |
| `src/pages/home/TestimonialsSection.jsx` | Reformatted. Semantic figure/blockquote structure is good. |
| `src/pages/home/FaqSection.jsx` | Reformatted. Native details/summary is the correct simple solution. |
| `src/pages/home/ContactCtaSection.jsx` | Keep as is. Small focused CTA section. |
| `public/favicon.svg` | Keep as is. It is actively referenced. |
| `README.md` and `docs/*` | Keep and update with code changes. They materially support handoff. |

## 8. Final project score

**8.4/10**

Breakdown:

- Architecture: 8.8
- Readability: 8.5 after refactor
- API separation: 9.0
- Accessibility: 8.1
- Performance: 8.2
- Testing: 5.5
- Production readiness: 7.7 pending approved content, successful CRM acceptance test, CORS/deployment verification, and automated tests

## 9. Senior developer interview questions

1. Why did you choose local state instead of Redux or Context?
2. Why are there two Axios clients?
3. How do you normalize inconsistent backend response shapes?
4. Why do select IDs need number conversion?
5. How do you prevent stale district responses?
6. What happens if one master API fails in `Promise.all`?
7. Why is Zod validation not sufficient for security?
8. How does route-level code splitting work here?
9. Why is `Content-Type` not forced globally anymore?
10. How does the mobile menu manage keyboard focus?
11. What does the error boundary catch, and what does it not catch?
12. Why is the active lookup Promise cached?
13. How would you test duplicate-lead behavior?
14. How would you handle production CORS failure?
15. When would you introduce TanStack Query or a feature-first folder structure?
16. Which current values are placeholders and must be approved?
17. How would you add automated tests without coupling them to production CRM?

## 10. How to explain the implementation in a code review

Use this sequence:

1. Start with product scope: marketing site plus CRM lead capture.
2. Show the folder boundaries and explain that each exists because it owns a real responsibility.
3. Show `AppRoutes` and `SiteLayout` to explain routing and lazy loading.
4. Show `siteContent` and one mapped section to explain data-driven UI.
5. Walk through `LeadForm → leadSchema → leadService → apiClient`.
6. Explain the two backend origins and response normalization.
7. Demonstrate state-to-district dependency and stale-response protection.
8. Explain fixed payload values and unique fields.
9. Show pending, retry, success, duplicate, and failure states.
10. Close with honest limitations and the test/deployment plan.

Suggested summary:

> I kept the architecture intentionally small. Pages compose UI, reusable primitives handle repeated presentation, services own backend contracts, and Zod owns validation. I avoided global state and generic abstractions because the current feature set does not require them. The main complexity is the CRM integration: it uses two API origins, inconsistent master response shapes, fixed workflow fields, and a dependent district request. Those details are isolated from the UI. The review improved failure handling, accessibility, readability, and removed dead scaffold code without rewriting working architecture.

## Validation evidence

- `npm.cmd run lint`: passed with zero errors
- `npm.cmd run build`: passed
- Production build completed in approximately 428 ms during review
- No empty source folders remain
- No references to removed scaffold assets remain

The repository is not currently initialized as a Git repository, so this review could not include a commit diff or blame/history analysis.
