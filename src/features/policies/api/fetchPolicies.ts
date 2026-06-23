import type {
  PoliciesResponse,
  Policy,
} from "@/features/policies/types/policy";

const POLICIES_ENDPOINT = "/api/policies";

export async function fetchPolicies(): Promise<Policy[]> {
  const response = await fetch(POLICIES_ENDPOINT, {
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch policies: ${response.status}`);
  }

  const data = (await response.json()) as PoliciesResponse;

  return data.policies;
}
