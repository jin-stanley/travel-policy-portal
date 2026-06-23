import {
  POLICY_COPY,
  POLICY_PAGE_SIZE_OPTIONS,
  type PolicyPageSize,
} from "@/features/policies/constants/policyConstants";

type PolicyPageSizeSelectProps = {
  pageSize: PolicyPageSize;
  setPageSize: (pageSize: PolicyPageSize) => void;
};

export function PolicyPageSizeSelect({
  pageSize,
  setPageSize,
}: PolicyPageSizeSelectProps) {
  return (
    <div className="policy-page-size">
      <span id="page-size-label">{POLICY_COPY.page.pageSizePrefix}</span>
      <div
        aria-labelledby="page-size-label"
        className="policy-page-size-options"
        role="radiogroup"
      >
        {POLICY_PAGE_SIZE_OPTIONS.map((option) => (
          <button
            aria-checked={pageSize === option}
            className="policy-page-size-option"
            data-active={pageSize === option}
            key={option}
            onClick={() => setPageSize(option)}
            role="radio"
            type="button"
          >
            {option}
          </button>
        ))}
      </div>
      <span>{POLICY_COPY.page.pageSizeSuffix}</span>
    </div>
  );
}
