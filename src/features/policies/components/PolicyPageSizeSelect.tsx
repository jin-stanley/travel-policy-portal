"use client";

import type { PolicyPageSize } from "@/features/policies/utils/policyTransforms";
import { POLICY_PAGE_SIZE_OPTIONS } from "@/features/policies/utils/policyTransforms";

type PolicyPageSizeSelectProps = {
  pageSize: PolicyPageSize;
  setPageSize: (pageSize: PolicyPageSize) => void;
};

export function PolicyPageSizeSelect({
  pageSize,
  setPageSize,
}: PolicyPageSizeSelectProps) {
  return (
    <label className="policy-page-size">
      <span>Policies per page</span>
      <select
        aria-label="Policies per page"
        value={pageSize}
        onChange={(event) => setPageSize(Number(event.target.value) as PolicyPageSize)}
      >
        {POLICY_PAGE_SIZE_OPTIONS.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}
