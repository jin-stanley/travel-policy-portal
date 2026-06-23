import { NextResponse } from "next/server";

import { mockPolicies } from "@/features/policies/data/mockPolicies";
import type { PoliciesResponse } from "@/features/policies/types/policy";

export async function GET() {
  const response: PoliciesResponse = {
    policies: mockPolicies,
  };

  return NextResponse.json(response);
}
