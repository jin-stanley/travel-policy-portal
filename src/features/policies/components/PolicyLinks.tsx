"use client";

import type { MouseEvent } from "react";

import { ExternalLinkIcon } from "@/features/policies/components/Icons";
import { POLICY_COPY } from "@/features/policies/constants/policyConstants";

export function PolicyLinks({ policyNumber }: { policyNumber: string }) {
  const handleDocumentClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    console.info(`Document requested for policy ${policyNumber}`);
  };

  return (
    <nav
      className="policy-links"
      aria-label={`${POLICY_COPY.page.documentsLabel} ${policyNumber}`}
    >
      <a className="policy-document-link" href="#" onClick={handleDocumentClick}>
        <ExternalLinkIcon className="policy-document-icon" />
        <span>{POLICY_COPY.documents.pds}</span>
      </a>
      <a className="policy-document-link" href="#" onClick={handleDocumentClick}>
        <ExternalLinkIcon className="policy-document-icon" />
        <span>{POLICY_COPY.documents.certificate}</span>
      </a>
    </nav>
  );
}
