# Travel Policy Portal

A responsive policy management portal for active travel insurance policies.

The application uses a small mock backend API to model the production data flow:

```txt
mock policy contract
  -> Next.js route handler at /api/policies
  -> frontend fetcher
  -> Policies Context
  -> policy list UI
```

## Tech Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS runtime with custom CSS tokens
- Vercel-ready deployment

## Features

- Fetches policies through an HTTP API route instead of importing mock data in UI code.
- Filters the list to active policies.
- Sorts active policies by policy start date in ascending order.
- Paginates policy cards and lets users choose how many policies to show per page.
- Displays different details for single-trip and annual multi-trip policies.
- Provides loading, empty, and error states.
- Uses semantic links and buttons with visible keyboard focus styles.
- Includes responsive desktop and mobile policy-card layouts.

## Project Structure

```txt
src/
  app/
    api/policies/route.ts      # Mock backend endpoint
    page.tsx                   # Page entry point
  features/policies/
    api/fetchPolicies.ts       # Frontend API client
    components/                # Policy list UI
    context/PoliciesContext.tsx
    data/mockPolicies.ts       # Mock backend data
    styles/policies.css        # Policy feature styles
    types/policy.ts            # Domain types
    utils/                     # Formatting and business helpers
```

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

The frontend only talks to this endpoint through `fetchPolicies()`, so replacing the mock route with a real backend would not require changes in the component layer.

## Business Rules

- Only policies with `status: "Active"` are rendered.
- Rendered policies are sorted by `policyStart` ascending.
- `Single Trip` policies show a travel-date range.
- `Annual` policies show the policy start date and maximum trip duration.
- Pagination defaults to three policies per page and supports 3, 6, or 9 policies per page.

## Implementation Notes

The application keeps layers intentionally small:

- The API route owns the mock response contract.
- The fetcher owns HTTP and response handling.
- Pure helpers own formatting, filtering, sorting, pagination, and policy display mapping.
- Context owns shared page state and derived data.
- Components focus on semantic markup and responsive presentation.
- Policy-specific CSS lives with the policy feature instead of in the app-wide stylesheet.
