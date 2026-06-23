import { POLICY_COPY } from "@/features/policies/constants/policyConstants";

type PolicyActionsProps = {
  onClaim?: (policyNumber: string) => void;
  onManage?: (policyNumber: string) => void;
  policyNumber: string;
};

export function PolicyActions({
  onClaim,
  onManage,
  policyNumber,
}: PolicyActionsProps) {
  const handleClaimClick = () => {
    onClaim?.(policyNumber);
    console.info(`Claim started for policy ${policyNumber}`);
  };

  const handleManageClick = () => {
    onManage?.(policyNumber);
    console.info(`Manage policy ${policyNumber}`);
  };

  return (
    <div className="policy-actions" aria-label={`Actions for ${policyNumber}`}>
      <button
        className="policy-button policy-button-primary"
        onClick={handleClaimClick}
        type="button"
      >
        {POLICY_COPY.actions.claim}
      </button>
      <button
        className="policy-button policy-button-secondary"
        onClick={handleManageClick}
        type="button"
      >
        {POLICY_COPY.actions.manage}
      </button>
    </div>
  );
}
