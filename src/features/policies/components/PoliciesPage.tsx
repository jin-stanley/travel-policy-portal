"use client";

import { PolicyList } from "@/features/policies/components/PolicyList";
import { PoliciesProvider } from "@/features/policies/context/PoliciesContext";

export function PoliciesPage() {
  return (
    <PoliciesProvider>
      <main className="policy-shell">
        <div className="policy-shell-inner">
          <header className="policy-page-header">
            <p className="policy-page-kicker">Travel insurance</p>
            <h1>My policies</h1>
          </header>

          <PolicyList />
        </div>
      </main>
    </PoliciesProvider>
  );
}
