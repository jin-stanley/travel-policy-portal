"use client";

import { PolicyCard } from "@/features/policies/components/PolicyCard";
import { PolicyPageSizeSelect } from "@/features/policies/components/PolicyPageSizeSelect";
import { PolicyPagination } from "@/features/policies/components/PolicyPagination";
import { POLICY_COPY } from "@/features/policies/constants/policyConstants";
import { usePolicies } from "@/features/policies/context/PoliciesContext";

export function PolicyList() {
  const {
    currentPagePolicies,
    error,
    isLoading,
    page,
    pageSize,
    reloadPolicies,
    setPage,
    setPageSize,
    totalPages,
    visiblePolicies,
  } = usePolicies();

  if (isLoading) {
    return (
      <div className="policy-state" role="status">
        {POLICY_COPY.page.loading}
      </div>
    );
  }

  if (error) {
    return (
      <div className="policy-state policy-state-error" role="alert">
        <p>{error}</p>
        <button
          className="policy-state-action"
          onClick={() => reloadPolicies()}
          type="button"
        >
          {POLICY_COPY.actions.retry}
        </button>
      </div>
    );
  }

  if (visiblePolicies.length === 0) {
    return <div className="policy-state">{POLICY_COPY.page.empty}</div>;
  }

  return (
    <section className="policy-list" aria-label={POLICY_COPY.page.activePoliciesLabel}>
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
