"use client";

import type { MouseEvent } from "react";

import { ExternalLinkIcon } from "@/features/policies/components/Icons";

export function PolicyLinks({ policyNumber }: { policyNumber: string }) {
  const handleDocumentClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    console.info(`Document requested for policy ${policyNumber}`);
  };

  return (
    <nav className="policy-links" aria-label={`Documents for ${policyNumber}`}>
      <a className="policy-document-link" href="#" onClick={handleDocumentClick}>
        <ExternalLinkIcon className="policy-document-icon" />
        <span>View PDS</span>
      </a>
      <a className="policy-document-link" href="#" onClick={handleDocumentClick}>
        <ExternalLinkIcon className="policy-document-icon" />
        <span>Certificate of Insurance</span>
      </a>
    </nav>
  );
}
