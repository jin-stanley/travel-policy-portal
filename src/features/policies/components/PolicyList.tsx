"use client";

import { PolicyCard } from "@/features/policies/components/PolicyCard";
import { PolicyPageSizeSelect } from "@/features/policies/components/PolicyPageSizeSelect";
import { PolicyPagination } from "@/features/policies/components/PolicyPagination";
import { usePolicies } from "@/features/policies/context/PoliciesContext";

export function PolicyList() {
  const {
    currentPagePolicies,
    error,
    isLoading,
    page,
    pageSize,
    setPage,
    setPageSize,
    totalPages,
    visiblePolicies,
  } = usePolicies();

  if (isLoading) {
    return (
      <div className="policy-state" role="status">
        Loading policies...
      </div>
    );
  }

  if (error) {
    return (
      <div className="policy-state policy-state-error" role="alert">
        {error}
      </div>
    );
  }

  if (visiblePolicies.length === 0) {
    return <div className="policy-state">No active policies found.</div>;
  }

  return (
    <section className="policy-list" aria-label="Active policies">
      <div className="policy-list-toolbar">
        <p>
          Showing {currentPagePolicies.length} of {visiblePolicies.length} active
          policies
        </p>
        <PolicyPageSizeSelect pageSize={pageSize} setPageSize={setPageSize} />
      </div>

      <div className="policy-cards">
        {currentPagePolicies.map((policy) => (
          <PolicyCard key={policy.policyNumber} policy={policy} />
        ))}
      </div>

      <PolicyPagination page={page} setPage={setPage} totalPages={totalPages} />
    </section>
  );
}
