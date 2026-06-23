import type { Policy } from "@/features/policies/types/policy";
import { formatCurrency, formatDate } from "@/features/policies/utils/format";

export function getDestinationText(policy: Policy) {
  return policy.destinations.map((destination) => destination.name).join(", ");
}

export function getPolicyDateRow(policy: Policy) {
  if (policy.type === "Annual") {
    return {
      label: "Policy start date",
      value: formatDate(policy.policyStart),
    };
  }

  return {
    label: "Travel date",
    value: `${formatDate(policy.policyStart)} - ${formatDate(policy.policyEnd)}`,
  };
}

export function getPolicyPlanName(policy: Policy) {
  if (policy.type === "Annual") {
    return "Annual Multi-trip";
  }

  if (policy.planName === "Comprehensive") {
    return "International comprehensive";
  }

  return policy.planName;
}

export function getPolicyDetailRows(policy: Policy) {
  const dateRow = getPolicyDateRow(policy);
  const leftRows = [
    {
      label: "Destination",
      value: getDestinationText(policy),
    },
    dateRow,
  ];

  if (policy.type === "Annual") {
    leftRows.push({
      label: "Maximum trip duration",
      value: `Up to ${policy.maxTripDuration} days`,
    });
  }

  return {
    leftRows,
    rightRows: [
      {
        label: "Plan",
        value: getPolicyPlanName(policy),
      },
      {
        label: "Excess",
        value: formatCurrency(policy.excess),
      },
    ],
  };
}
