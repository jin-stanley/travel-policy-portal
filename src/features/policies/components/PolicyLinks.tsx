import { ExternalLinkIcon } from "@/features/policies/components/Icons";

export function PolicyLinks({ policyNumber }: { policyNumber: string }) {
  return (
    <nav className="policy-links" aria-label={`Documents for ${policyNumber}`}>
      <a className="policy-document-link" href="#pds">
        <ExternalLinkIcon className="policy-document-icon" />
        <span>View PDS</span>
      </a>
      <a className="policy-document-link" href="#certificate">
        <ExternalLinkIcon className="policy-document-icon" />
        <span>Certificate of Insurance</span>
      </a>
    </nav>
  );
}
