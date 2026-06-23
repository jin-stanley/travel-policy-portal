"use client";

import { PolicyList } from "@/features/policies/components/PolicyList";
import { POLICY_COPY } from "@/features/policies/constants/policyConstants";
import { PoliciesProvider } from "@/features/policies/context/PoliciesContext";

export function PoliciesPage() {
  return (
    <PoliciesProvider>
      <main className="policy-shell">
        <div className="policy-shell-inner">
          <header className="policy-page-header">
            <p className="policy-page-kicker">{POLICY_COPY.page.topic}</p>
            <h1>{POLICY_COPY.page.title}</h1>
          </header>

          <PolicyList />
        </div>
      </main>
    </PoliciesProvider>
  );
}
