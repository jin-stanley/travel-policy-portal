import type {
  PoliciesResponse,
  Policy,
} from "@/features/policies/types/policy";
import {
  POLICIES_ENDPOINT,
  POLICY_COPY,
} from "@/features/policies/constants/policyConstants";

function isPoliciesResponse(data: unknown): data is PoliciesResponse {
  return (
    typeof data === "object" &&
    data !== null &&
    "policies" in data &&
    Array.isArray((data as PoliciesResponse).policies)
  );
}

type FetchPoliciesOptions = {
  signal?: AbortSignal;
};

export async function fetchPolicies({
  signal,
}: FetchPoliciesOptions = {}): Promise<Policy[]> {
  const response = await fetch(POLICIES_ENDPOINT, {
    headers: {
      Accept: "application/json",
    },
    signal,
  });

  if (!response.ok) {
    throw new Error(`${POLICY_COPY.errors.loadFailed}: ${response.status}`);
  }

  const data = (await response.json()) as unknown;

  if (!isPoliciesResponse(data)) {
    throw new Error(POLICY_COPY.errors.invalidResponse);
  }

  return data.policies;
}
