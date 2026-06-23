import type { Policy } from "@/features/policies/types/policy";
import {
  PLAN_DISPLAY_NAMES,
  POLICY_COPY,
} from "@/features/policies/constants/policyConstants";
import { formatCurrency, formatDate } from "@/features/policies/utils/format";

type PolicyDetailRow = {
  label: string;
  value: string;
};

export function getDestinationText(policy: Policy) {
  return policy.destinations.map((destination) => destination.name).join(", ");
}

export function getPolicyDateRow(policy: Policy) {
  if (policy.type === "Annual") {
    return {
      label: POLICY_COPY.fields.policyStartDate,
      value: formatDate(policy.policyStart),
    };
  }

  return {
    label: POLICY_COPY.fields.travelDate,
    value: `${formatDate(policy.policyStart)} - ${formatDate(policy.policyEnd)}`,
  };
}

export function getPolicyPlanName(policy: Policy) {
  if (policy.type === "Annual") {
    return PLAN_DISPLAY_NAMES.annual;
  }

  if (policy.planName === "Comprehensive") {
    return PLAN_DISPLAY_NAMES.comprehensive;
  }

  return policy.planName;
}

export function getPolicyDetailRows(policy: Policy) {
  const dateRow = getPolicyDateRow(policy);
  const leftRows: PolicyDetailRow[] = [
    {
      label: POLICY_COPY.fields.destination,
      value: getDestinationText(policy),
    },
    dateRow,
  ];

  if (policy.type === "Annual") {
    leftRows.push({
      label: POLICY_COPY.fields.maxTripDuration,
      value: POLICY_COPY.maxTripDurationValue(policy.maxTripDuration),
    });
  }

  return {
    leftRows,
    rightRows: [
      {
        label: POLICY_COPY.fields.plan,
        value: getPolicyPlanName(policy),
      },
      {
        label: POLICY_COPY.fields.excess,
        value: formatCurrency(policy.excess),
      },
    ],
  };
}
