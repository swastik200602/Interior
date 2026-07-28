# Interior Haven — Developer Handbook

Ye handbook project ko sirf run karne ke liye nahi, balki samajhne aur explain karne ke liye hai. Isse order mein padho aur har section ke baad related source file kholkar dekho.

## 1. Project ko 30 seconds mein kaise explain karein

> Interior Haven React 19 aur Vite par built responsive interior-design website hai. Marketing pages reusable, data-driven components se compose hote hain. React Router route-level lazy loading handle karta hai. Contact page React Hook Form aur Zod se validate hota hai. Master dropdown data Axios services ke through ASP.NET Core APIs se aata hai, state selection par dependent district API call hoti hai, aur valid form data service layer mein CRM payload mein transform hokar `PostLeadDetail` endpoint par submit hota hai. Tailwind v4 semantic design tokens, Framer Motion animations, error boundary, toast feedback, SEO metadata, and accessibility basics bhi implemented hain.

Is introduction mein product, architecture, API flow, and quality features cover ho jaate hain.

## 2. Senior ko demo dene ka recommended order

1. Homepage desktop view dikhao.
2. Browser width mobile karke responsive Navbar dikhao.
3. Services aur projects data-driven hone ka example dikhao.
4. `/projects` aur project-detail navigation dikhao.
5. Direct invalid URL se 404 behavior dikhao.
6. `/contact` par master dropdown loading dikhao.
7. State change karke district dependency dikhao.
8. Invalid values submit karke Zod errors dikhao.
9. Unique test lead submit karke toast aur Network request dikhao.
10. Source code mein `LeadForm → leadSchema → leadService → apiClient` flow dikhao.
11. `npm run lint` and `npm run build` output dikhao.

Demo se pehle CRM test values unique ready rakho. Existing `LeadName`, mobile, ya email use mat karna.

## 3. Application start hone ka flow

### `src/main.jsx`

Yahan React DOM root create hota hai. `StrictMode` development mein unsafe patterns aur side effects identify karne mein help karta hai. Entire application `ErrorBoundary` ke andar render hoti hai.

### `src/App.jsx`

Yahan global application providers hain:

- `BrowserRouter`: URL-based routing
- `ScrollToTop`: route change scroll behavior
- `AppRoutes`: route definitions
- `Toaster`: global notifications

Rule: global providers entry ke paas rakho, page-specific state yahan mat rakho.

### `src/routes/AppRoutes.jsx`

Pages `lazy()` se import hote hain. Initial bundle ko unnecessary page code download nahi karna padta. `Suspense` page chunk load hone tak loader show karta hai.

`SiteLayout` parent route hai. Isliye Navbar/Footer har page mein manually repeat nahi karne padte.

## 4. React component thinking

Project mein teen component levels hain.

### UI components

Examples: `Button`, `Container`, `FormField`.

Inka purpose generic visual behavior hai. Inko CRM, projects, ya business rules ka knowledge nahi hona chahiye.

### Common components

Examples: `ProjectCard`, `LeadForm`, `Reveal`.

Ye application-specific reuse provide karte hain. `ProjectCard` project object samajhta hai, lekin entire page layout control nahi karta.

### Page/section components

Examples: `HomePage`, `HeroSection`, `ContactPage`.

Pages sections compose karte hain. Sections content arrange karte hain. Backend payload construction service layer mein rehta hai.

### Senior-level rule

Component split line count dekhkar nahi, responsibility dekhkar karo. Ek 80-line component with three unrelated responsibilities problematic ho sakta hai; ek cohesive 150-line form orchestration component acceptable ho sakta hai.

## 5. Data-driven UI ka concept

`src/constants/siteContent.js` mein services, projects, testimonials, FAQs, process steps, and studio details arrays/objects ke form mein stored hain.

Component pattern:

```jsx
{PROJECTS.map((project) => (
  <ProjectCard key={project.slug} project={project} />
))}
```

Benefits:

- Repeated JSX reduce hota hai.
- Content ek place se update hota hai.
- Same project data listing aur detail page dono use karte hain.
- Future CMS migration easier hoti hai.

`key={project.slug}` React ko list items consistently identify karne deta hai. Array index stable identity ke liye preferred nahi hai.

## 6. Routing ko kaise samjhein

### Static route

```text
/projects
```

Fixed page render karta hai.

### Dynamic route

```text
/projects/:projectSlug
```

`:projectSlug` variable URL segment hai. `useParams()` value read karta hai. Page `PROJECTS.find()` se matching project locate karta hai.

Example:

```text
/projects/olive-house
```

No match par user `/not-found` par redirect hota hai.

### `Link` versus `<a>`

- Internal routes ke liye React Router `Link` use karo.
- External URLs, `mailto:`, aur `tel:` ke liye `<a>` use karo.

Internal `<a href>` full document reload karta hai. `Link` SPA navigation preserve karta hai.

## 7. Tailwind design system ko kaise explain karein

`globals.css` mein colors raw utility usage ke bajay semantic tokens hain:

```text
primary
background
surface
foreground
muted
border
destructive
```

Why semantic naming?

`bg-primary` action purpose batata hai. `bg-orange-700` implementation color batata hai. Brand color badalne par semantic approach mein theme update hoti hai, every component nahi.

`Container` maximum width aur page padding standardize karta hai. Without it every section different alignment use kar sakta tha.

## 8. Form architecture — sabse important section

Form ko four responsibilities mein divide kiya gaya hai:

```text
LeadForm.jsx      → orchestration and user interaction
leadSchema.js     → validation rules
leadService.js    → backend data/payload mapping
apiClient.js      → HTTP configuration and common errors
```

### React Hook Form kya karta hai?

- Input registration
- Current field values
- Validation integration
- Error state
- Submit state
- Reset

Inputs mostly uncontrolled rehte hain, so every keystroke par entire form state re-render karna necessary nahi.

### Zod kya karta hai?

Form ka data contract define karta hai. Example:

```js
contactNo: z.string().regex(/^[6-9]\d{9}$/)
```

Iska meaning mobile string hona chahiye, first digit 6–9, total 10 digits.

`zodResolver` React Hook Form aur Zod ko connect karta hai.

### `noValidate` kyun hai?

Browser ki inconsistent native messages disable karke consistent Zod messages use kiye jaate hain. Accessibility manually labels, errors, `aria-invalid`, and `aria-describedby` se preserve hoti hai.

## 9. Master API flow

Contact form mount hone par `getLeadLookups()` call hota hai.

Five APIs parallel chalti hain:

```js
Promise.all([
  states,
  leadTypes,
  industries,
  companies,
  sources,
])
```

Sequential requests slow hote. In requests ke beech dependency nahi hai, so parallel execution correct hai.

### Do Axios clients kyun?

Backend endpoints do origins par hain:

- `crmsoftapi.coteriesoft.com`
- `crmapp.coteriesoft.in`

Ek hardcoded full URL every service method mein repeat karne ke bajay two configured clients use kiye gaye hain.

### Response normalizer kyun?

Backend responses inconsistent hain:

- `data: []`
- `data: { result: [] }`
- `stateID`
- `districtId`
- `leadtype`
- `industryTypes`

UI ko ye inconsistencies nahi pata honi chahiye. Service stable options return karti hai:

```js
{ value: '1', label: 'Person' }
```

This is an anti-corruption layer: backend-specific shape ko frontend-friendly contract mein convert karna.

## 10. Dependent district dropdown

State selection event ka flow:

1. React Hook Form selected state save karta hai.
2. Existing district selection reset hoti hai.
3. Old district options clear hote hain.
4. Selected `StateId` ke saath district API call hoti hai.
5. Latest response options update karti hai.

`districtRequest` counter race condition prevent karta hai.

Example problem without protection:

```text
User selects Delhi → slow request A
User quickly selects Uttar Pradesh → fast request B
Request B completes and shows UP
Request A completes later and incorrectly replaces options with Delhi
```

Counter ensure karta hai ki only latest request state update kare.

## 11. Submission flow ko line-by-line samjho

### Step 1: User submits

`handleSubmit(onSubmit)` pehle Zod validation run karta hai. Invalid data ho to API call nahi hoti.

### Step 2: UI data service ko milta hai

Frontend values string form mein ho sakte hain because HTML selects strings return karte hain.

### Step 3: Payload mapping

`submitLead` IDs and numeric values ko `Number()` mein convert karta hai. Strings trim hoti hain. Backend PascalCase names construct hote hain.

### Step 4: Fixed fields merge

`LEAD_DEFAULTS` last mein spread hota hai:

```js
{
  ...userMappedFields,
  ...LEAD_DEFAULTS,
}
```

Isse required fixed CRM workflow values UI components mein scattered nahi hote.

### Step 5: Response handling

- Success: toast and form reset
- Response ka `status` exactly `true` na ho: service error throw karti hai
- HTTP/network/timeout error: Axios interceptor readable error banata hai

## 12. Duplicate error ka exact meaning

Observed message:

```text
Violation of PRIMARY KEY constraint 'PK_T_LeadDetails'
Duplicate key value is (Swastik Singh)
```

Interpretation:

1. Browser/Postman request API tak gayi.
2. API ne database INSERT execute kiya.
3. Database mein same primary/unique `LeadName` already present tha.
4. Database ne duplicate reject kiya.

Ye connection failure nahi hai. New unique name, email, and mobile use karo.

Senior ko ye bhi bata sakte ho: database primary key human-readable name par rakhna fragile design ho sakta hai. Usually internal numeric/UUID primary key and separate unique constraints clearer hote hain. Backend ownership ke bina frontend ise change nahi karega.

## 13. Loading and error-state thinking

Professional UI sirf happy path nahi hoti.

Implemented states:

- Page chunk loading
- Master dropdown loading
- Master API error with Retry
- District API error toast
- Form submitting state
- Successful submission toast
- Submission failure toast
- Unexpected render error boundary
- Unknown route 404

Senior review mein mention karo: “Every asynchronous operation needs visible pending, success, and failure behavior.”

## 14. Performance decisions

### Route-level lazy loading

Contact form libraries page chunk mein load hoti hain, homepage initial render mein necessarily nahi.

### Lookup Promise caching

React Strict Mode development mein mount behavior repeat kar sakta hai. Active lookup Promise cache duplicate master network calls prevent karta hai.

### Image loading

Hero image high priority hai. Project listing images lazy load hoti hain.

### Animation

`Reveal` viewport mein aane par once animate hota hai. Reduced-motion users ke liye initial animation disabled hai.

## 15. Accessibility decisions

Senior ko ye points explain karo:

- Form input ka visible label hai.
- Error text field se programmatically connected hai.
- Keyboard focus visible hai.
- Mobile menu closed state mein `inert` hai.
- Menu button actual `<button>` hai, clickable `<div>` nahi.
- Icons alone use hone par accessible label diya gaya hai.
- Semantic `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>` landmarks use hue hain.
- FAQ native `<details>` and `<summary>` use karta hai.
- Reduced motion support available hai.

## 16. SEO basics

`index.html` default title, description, theme color, and Open Graph metadata provide karta hai.

`useDocumentMeta` route change par:

- `document.title`
- description meta content

update karta hai.

Limitation: ye client-side SPA SEO hai. Highly competitive SEO ke liye SSR/prerendering consider karna hoga.

## 17. Error debug karne ka sequence

Jab form fail ho, random code changes mat karo. Is order mein diagnose karo.

### Step 1: Browser UI

Toast/error message note karo.

### Step 2: DevTools Network

Request inspect karo:

- URL correct?
- Method POST?
- Status code?
- Payload fields correct?
- Response body kya hai?
- CORS error hai?

### Step 3: Postman comparison

Same unique payload Postman mein test karo.

- Postman fails → backend/payload/data issue
- Postman works, browser fails → CORS/frontend/env issue
- Both work → resolved

### Step 4: Environment

Check:

```text
VITE_API_BASE_URL
VITE_LOOKUP_API_BASE_URL
```

Environment change ke baad Vite restart karo.

### Step 5: Unique fields

Every test mein new values:

```text
LeadName
ContactNo
EmailId
```

## 18. Common errors and solutions

### `Missing script: dev`

Cause: wrong directory.

Fix:

```powershell
cd .\interior-frontend
npm.cmd run dev
```

### `npm.ps1 cannot be loaded`

Cause: PowerShell execution policy.

Fix:

```powershell
npm.cmd run dev
```

### Dropdowns keep loading/fail

Check API hosts, internet, CORS, server status, and Network response.

### District empty

Select valid state, inspect district request, and check returned data collection.

### Duplicate primary key

Use unique name, mobile, and email. Confirm old lead exists in CRM.

### Route works by clicking but refresh gives 404

Deployment host missing SPA rewrite to `index.html`.

### Images missing

Current images are remote. Check connectivity or replace with local approved assets.

## 19. Code change kahan karna hai?

| Requirement | File/location |
|---|---|
| Brand name/contact | `src/constants/siteContent.js`, `Logo.jsx`, metadata |
| Navigation links | `src/constants/navigation.js` |
| Colors/fonts | `src/styles/globals.css` |
| Projects/testimonials/FAQ | `src/constants/siteContent.js` |
| Route | `src/routes/AppRoutes.jsx` |
| API origin | `.env.local` |
| Endpoint path/fixed fields | `src/constants/api.js` |
| API payload/normalization | `src/services/leadService.js` |
| Validation | `src/utils/leadSchema.js` |
| Form layout/behavior | `src/components/common/LeadForm.jsx` |
| Global HTTP behavior | `src/services/apiClient.js` |

## 20. Senior developer ke likely questions

### Why did you not use Redux?

State mostly local hai: Navbar menu, form, lookups, districts. React Hook Form form state own karta hai. Global client state complexity justify nahi hui, so Redux unnecessary dependency hoti.

### Why are API calls not inside ContactPage?

Page composition and API contract separate responsibilities hain. Service layer reusable, testable, and backend changes ke liye isolated hai.

### Why two Axios instances?

Backend endpoints two different origins par hain. Separate clients base URL duplication prevent karte hain and shared timeout/error behavior provide karte hain.

### Why Zod when backend also validates?

Client validation fast UX deta hai; backend validation security and data integrity enforce karta hai. Dono required hain.

### Why convert IDs to Number?

HTML select values strings hote hain, while backend contract numeric IDs expect karta hai.

### Why cache lookup request?

Master data common aur stable hai. Promise caching duplicate Strict Mode requests reduce karta hai, while failure par cache reset Retry allow karta hai.

### Why use semantic Tailwind colors?

Components design intent use karte hain, palette implementation nahi. Theme changes localized rehte hain.

### Why React.lazy?

Pages initial route ke liye unnecessary JavaScript download nahi karte. Contact form dependencies separate chunk mein aa sakti hain.

### Why not put fixed fields in the form?

Users un fields ko control nahi karte. Fixed workflow configuration service/constants layer mein safer and clearer hai.

### How do you prevent stale district responses?

Monotonic request counter ref. Only latest request ID state update kar sakti hai.

### Is the frontend secure?

Frontend secrets protect nahi kar sakta. `VITE_*` public hain. Security backend validation, CORS, HTTPS, authorization, rate limiting, and safe database handling par depend karti hai.

## 21. Honest limitations kaise present karein

Professional developer limitations hide nahi karta. Explain:

- Content/contact details currently require business approval.
- Images remote placeholders hain.
- Automated unit/E2E test suite add nahi hui.
- Successful unique lead insertion must be confirmed in CRM.
- Backend duplicate response should ideally be a structured `409`.
- Production CORS and SPA rewrite deployment par verify honge.
- Client-side SPA SEO basic hai; SSR/prerendering future option hai.

Then solution direction batana important hai.

## 22. Suggested commit history

Git initialize karke logical commits use karo:

```text
chore: initialize React and Tailwind foundation
feat: add design system primitives and responsive layout
feat: build marketing homepage sections
feat: add project routes and portfolio pages
feat: integrate CRM master APIs and lead submission
feat: add validated dependent enquiry form
feat: add animations accessibility and SEO metadata
docs: add project documentation and developer handbook
```

Avoid messages like `changes`, `final`, or `code updated`.

## 23. Before presentation checklist

- [ ] Actual brand name consistent everywhere
- [ ] Actual email, phone, address approved
- [ ] No broken image
- [ ] Desktop and mobile navigation tested
- [ ] Every route opens
- [ ] Refreshing nested route works on deployed host
- [ ] New unique enquiry submitted successfully
- [ ] Lead visible in CRM
- [ ] Duplicate error behavior understood
- [ ] Browser console has no error
- [ ] `npm run lint` passes
- [ ] `npm run build` passes
- [ ] API `.env` values configured
- [ ] Demo test data prepared
- [ ] Sensitive client data removed from screenshots

## 24. Two-minute presentation script

> I built Interior Haven as a production-structured React 19 single-page application using Vite and Tailwind CSS v4. The UI is divided into reusable primitives, shared application components, layout components, and route-level pages. Marketing content is data-driven, so projects and repeated sections are easy to maintain.
>
> React Router handles dedicated Home, About, Services, Projects, Testimonials, FAQ, Contact, project-detail, and 404 routes. Pages are lazy loaded, and shared Navbar and Footer come from a parent layout route.
>
> The lead form uses React Hook Form for efficient form state and Zod for a single validation contract. API logic is not placed in the UI. Two Axios clients handle the backend’s two origins. The service layer normalizes inconsistent master response shapes into stable dropdown options and transforms form values into the ASP.NET CRM payload. State and district are dependent, and a request counter prevents stale district responses.
>
> The application includes loading, retry, success, failure, and duplicate-data behavior; responsive navigation; reduced-motion support; accessible form errors; SEO metadata; an error boundary; and route-level code splitting. ESLint and the production build pass. Final production acceptance consists of confirming a unique submitted lead in CRM, approving real brand content and images, and verifying CORS and SPA rewrites on the deployed domain.

## 25. Learning roadmap after this project

### First priority

1. Write unit tests for `leadSchema` and option normalization.
2. Write component tests for LeadForm errors and loading states.
3. Write Playwright test for a mocked successful enquiry.
4. Learn browser DevTools Network and Performance tabs deeply.

### Second priority

1. Learn accessible dialogs and focus trapping.
2. Learn image optimization with AVIF/WebP and responsive `srcset`.
3. Learn deployment rewrites, caching, environment configuration, and CORS.
4. Learn error monitoring and frontend observability.

### Third priority

1. Compare SPA, SSR, and static generation.
2. Learn TanStack Query when server-state complexity grows.
3. Learn TypeScript and model the API contracts.
4. Learn testing strategy, not just testing syntax.

## 26. Final mental model

Experienced frontend developers repeatedly ask:

1. Who owns this data?
2. Which layer should know this rule?
3. What happens while the operation is pending?
4. What happens when it fails?
5. Can keyboard and assistive-technology users operate it?
6. Can backend or design changes be isolated?
7. How will we verify it before deployment?

Interior Haven ka architecture inhi questions ko practical form mein answer karta hai.
