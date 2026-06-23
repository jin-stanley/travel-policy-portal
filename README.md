# Travel Policy Portal

A responsive policy management portal for active travel insurance policies.

The goal of this project is to keep a small UI task structured like a real application: data comes from an API boundary, business rules live outside the components, shared state is isolated, and the UI layer stays focused on rendering and accessibility.

## What It Does

- Fetches policy data from `GET /api/policies`.
- Shows active policies only.
- Sorts visible policies by `policyStart` in ascending order.
- Displays different details for `Single Trip` and `Annual` policies.
- Paginates policies and lets the user choose 3, 6, or 9 cards per page.
- Handles loading, empty, and error states.
- Provides accessible buttons, links, pagination, and page-size controls.
- Matches the supplied desktop/mobile card layout closely without overbuilding the app.

## Tech Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS runtime with feature-scoped CSS
- Vercel deployment

## Data Flow

```txt
mock policy data
  -> Next.js route handler: /api/policies
  -> fetchPolicies()
  -> PoliciesContext
  -> pure policy helpers
  -> policy UI components
```

The UI does not import mock data directly. It talks to a fetcher, and the fetcher talks to an HTTP endpoint. That keeps the mock replaceable with a real backend without changing the component layer.

## Why This Structure

### API boundary

The provided JSON is served through a Next.js route handler instead of being imported directly by the UI. This makes the app behave like a production frontend: components depend on an API contract, not a local fixture.

`fetchPolicies()` owns HTTP concerns:

- endpoint path
- request headers
- non-OK responses
- response shape validation

### Context over heavier state libraries

The app has one small shared state area: policies, loading/error state, current page, and page size. React Context is enough for this scope and avoids adding a state library that would be disproportionate for the task.

### Pure helpers for business rules

Filtering, sorting, pagination, date formatting, currency formatting, and display mapping are kept in utility files. This keeps JSX clean and makes the important rules easy to test or debug.

Examples:

- `getVisiblePolicies()` filters active policies and sorts by start date.
- `paginatePolicies()` slices the current page.
- `getPolicyDetailRows()` maps `Single Trip` and `Annual` policies into display rows.

### Constants for copy and configuration

User-facing labels, endpoint paths, pagination options, and display names live in `policyConstants.ts`. This avoids scattering strings and magic numbers across components.

Mock policy records remain as data fixtures because they represent the API response payload.

### Feature-scoped styling

Global CSS only defines base app tokens and focus behavior. Policy-specific layout and component styles live beside the policy feature in `features/policies/styles/policies.css`, so UI changes are easier to locate.

## Project Structure

```txt
src/
  app/
    api/policies/route.ts       # Mock backend endpoint
    globals.css                 # App-wide tokens and base styles
    page.tsx                    # Page entry point

  features/policies/
    api/fetchPolicies.ts        # Frontend API client
    components/                 # Policy list UI
    constants/policyConstants.ts
    context/PoliciesContext.tsx
    data/mockPolicies.ts        # Mock API response data
    styles/policies.css         # Policy feature styles
    types/policy.ts             # Domain types
    utils/                      # Formatting and business helpers
```

## Business Rules

- Only policies with `status: "Active"` are rendered.
- Active policies are sorted by `policyStart` ascending.
- `Single Trip` policies show a travel date range.
- `Annual` policies show policy start date and maximum trip duration.
- Pagination defaults to 3 policies per page and supports 3, 6, or 9.

## Error Handling

The fetcher validates the response shape before returning data. If the API fails or returns an unexpected structure, the UI shows an error state with a retry action.

The request also supports aborting on unmount, so fetch state is not updated after the provider is removed.

## Accessibility

- Interactive controls use native `button` and `a` elements.
- Keyboard focus is visible through `:focus-visible`.
- Pagination exposes `aria-current`.
- Page-size options use a radio-group pattern.
- Document links prevent dummy hash navigation while preserving link semantics.

## Tradeoffs

- No external state library: Context is enough for this page.
- No runtime schema library: a lightweight response guard is sufficient for the mock API.
- No test framework: the task scope does not require tests, though the pure helper functions are shaped to be easy to test later.
- No URL state for pagination: page and page size are local UI state to keep the app simple.

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available Scripts

```bash
npm run dev
npm run lint
npm run build
```

## API

`GET /api/policies`

Returns:

```ts
type PoliciesResponse = {
  policies: Policy[];
};
```
