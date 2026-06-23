import type { Policy } from "@/features/policies/types/policy";

export const POLICIES_PER_PAGE = 3;
export const POLICY_PAGE_SIZE_OPTIONS = [3, 6, 9] as const;

export type PolicyPageSize = (typeof POLICY_PAGE_SIZE_OPTIONS)[number];

export function getActivePolicies(policies: Policy[]) {
  return policies.filter((policy) => policy.status === "Active");
}

export function sortPoliciesByStartDate(policies: Policy[]) {
  return [...policies].sort(
    (firstPolicy, secondPolicy) =>
      new Date(firstPolicy.policyStart).getTime() -
      new Date(secondPolicy.policyStart).getTime(),
  );
}

export function getVisiblePolicies(policies: Policy[]) {
  return sortPoliciesByStartDate(getActivePolicies(policies));
}

export function paginatePolicies(
  policies: Policy[],
  page: number,
  pageSize = POLICIES_PER_PAGE,
) {
  const startIndex = (page - 1) * pageSize;

  return policies.slice(startIndex, startIndex + pageSize);
}

export function getTotalPages(totalItems: number, pageSize = POLICIES_PER_PAGE) {
  return Math.max(1, Math.ceil(totalItems / pageSize));
}
