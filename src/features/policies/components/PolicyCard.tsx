import { PolicyActions } from "@/features/policies/components/PolicyActions";
import { PolicyLinks } from "@/features/policies/components/PolicyLinks";
import type { Policy } from "@/features/policies/types/policy";
import { getPolicyDetailRows } from "@/features/policies/utils/policyDisplay";

export function PolicyCard({ policy }: { policy: Policy }) {
  const { leftRows, rightRows } = getPolicyDetailRows(policy);

  return (
    <article className="policy-card">
      <div className="policy-card-main">
        <div className="policy-card-content">
          <h2 className="policy-number">
            <span>Policy number:</span>{" "}
            <strong>{policy.policyNumber}</strong>
          </h2>

          <div className="policy-detail-grid">
            <dl className="policy-detail-column">
              {leftRows.map((row) => (
                <div className="policy-detail-row" key={row.label}>
                  <dt>{row.label}:</dt>
                  <dd>{row.value}</dd>
                </div>
              ))}
            </dl>

            <dl className="policy-detail-column policy-detail-column-secondary">
              {rightRows.map((row) => (
                <div className="policy-detail-row" key={row.label}>
                  <dt>{row.label}:</dt>
                  <dd>{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <PolicyLinks policyNumber={policy.policyNumber} />
        </div>

        <PolicyActions policyNumber={policy.policyNumber} />
      </div>
    </article>
  );
}
