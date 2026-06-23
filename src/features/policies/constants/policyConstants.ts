export const POLICIES_ENDPOINT = "/api/policies";

export const DEFAULT_POLICIES_PER_PAGE = 3;
export const POLICY_PAGE_SIZE_OPTIONS = [3, 6, 9] as const;

export type PolicyPageSize = (typeof POLICY_PAGE_SIZE_OPTIONS)[number];

export const POLICY_COPY = {
  actions: {
    claim: "Make a claim",
    manage: "Manage my policy",
    retry: "Try again",
  },
  documents: {
    certificate: "Certificate of Insurance",
    pds: "View PDS",
  },
  errors: {
    invalidResponse: "Failed to fetch policies: invalid response shape",
    loadFallback: "Unable to load policies.",
    loadFailed: "Failed to fetch policies",
  },
  fields: {
    destination: "Destination",
    excess: "Excess",
    maxTripDuration: "Maximum trip duration",
    plan: "Plan",
    policyStartDate: "Policy start date",
    travelDate: "Travel date",
  },
  maxTripDurationValue: (days: number) => `Up to ${days} days`,
  page: {
    activePoliciesLabel: "Active policies",
    documentsLabel: "Documents for",
    empty: "No active policies found.",
    loading: "Loading policies...",
    pageSizePrefix: "Show",
    pageSizeSuffix: "per page",
    title: "My policies",
    topic: "Travel insurance",
  },
  policyNumberLabel: "Policy number",
} as const;

export const PLAN_DISPLAY_NAMES = {
  annual: "Annual Multi-trip",
  comprehensive: "International comprehensive",
} as const;
