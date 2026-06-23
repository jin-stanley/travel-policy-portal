type IconProps = {
  className?: string;
};

export function ExternalLinkIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      height="16"
      viewBox="0 0 16 16"
      width="16"
    >
      <path
        d="M6.5 3.5H4.25A1.75 1.75 0 0 0 2.5 5.25v6.5c0 .97.78 1.75 1.75 1.75h6.5c.97 0 1.75-.78 1.75-1.75V9.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
      <path
        d="M9 2.5h4.5V7"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
      <path
        d="m7 9 6.25-6.25"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
    </svg>
  );
}

export function ChevronLeftIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      height="18"
      viewBox="0 0 18 18"
      width="18"
    >
      <path
        d="m11 4.5-4.5 4.5L11 13.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.25"
      />
    </svg>
  );
}

export function ChevronRightIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      height="18"
      viewBox="0 0 18 18"
      width="18"
    >
      <path
        d="m7 4.5 4.5 4.5L7 13.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.25"
      />
    </svg>
  );
}
