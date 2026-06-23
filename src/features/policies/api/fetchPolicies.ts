import type {
  PoliciesResponse,
  Policy,
} from "@/features/policies/types/policy";

const POLICIES_ENDPOINT = "/api/policies";

function isPoliciesResponse(data: unknown): data is PoliciesResponse {
  return (
    typeof data === "object" &&
    data !== null &&
    "policies" in data &&
    Array.isArray((data as PoliciesResponse).policies)
  );
}

export async function fetchPolicies(): Promise<Policy[]> {
  const response = await fetch(POLICIES_ENDPOINT, {
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch policies: ${response.status}`);
  }

  const data = (await response.json()) as unknown;

  if (!isPoliciesResponse(data)) {
    throw new Error("Failed to fetch policies: invalid response shape");
  }

  return data.policies;
}
