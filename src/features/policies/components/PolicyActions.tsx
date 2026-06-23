export function PolicyActions({ policyNumber }: { policyNumber: string }) {
  const handleClaimClick = () => {
    console.info(`Claim started for policy ${policyNumber}`);
  };

  const handleManageClick = () => {
    console.info(`Manage policy ${policyNumber}`);
  };

  return (
    <div className="policy-actions" aria-label={`Actions for ${policyNumber}`}>
      <button
        className="policy-button policy-button-primary"
        onClick={handleClaimClick}
        type="button"
      >
        Make a claim
      </button>
      <button
        className="policy-button policy-button-secondary"
        onClick={handleManageClick}
        type="button"
      >
        Manage my policy
      </button>
    </div>
  );
}
