"use client";

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { fetchPolicies } from "@/features/policies/api/fetchPolicies";
import type { Policy } from "@/features/policies/types/policy";
import {
  getTotalPages,
  getVisiblePolicies,
  paginatePolicies,
  POLICIES_PER_PAGE,
  type PolicyPageSize,
} from "@/features/policies/utils/policyTransforms";

type PoliciesContextValue = {
  currentPagePolicies: Policy[];
  error: string | null;
  isLoading: boolean;
  page: number;
  pageSize: PolicyPageSize;
  policies: Policy[];
  setPage: (page: number) => void;
  setPageSize: (pageSize: PolicyPageSize) => void;
  totalPages: number;
  visiblePolicies: Policy[];
};

const PoliciesContext = createContext<PoliciesContextValue | undefined>(
  undefined,
);

export function PoliciesProvider({ children }: { children: ReactNode }) {
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [page, setPageState] = useState(1);
  const [pageSize, setPageSizeState] =
    useState<PolicyPageSize>(POLICIES_PER_PAGE);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadPolicies() {
      try {
        setIsLoading(true);
        setError(null);

        const nextPolicies = await fetchPolicies();

        if (isMounted) {
          setPolicies(nextPolicies);
        }
      } catch (caughtError) {
        if (isMounted) {
          setError(
            caughtError instanceof Error
              ? caughtError.message
              : "Unable to load policies.",
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadPolicies();

    return () => {
      isMounted = false;
    };
  }, []);

  const visiblePolicies = useMemo(
    () => getVisiblePolicies(policies),
    [policies],
  );

  const totalPages = useMemo(
    () => getTotalPages(visiblePolicies.length, pageSize),
    [pageSize, visiblePolicies.length],
  );

  const safePage = Math.min(page, totalPages);

  const setPage = useCallback((nextPage: number) => {
    setPageState(Math.min(Math.max(nextPage, 1), totalPages));
  }, [totalPages]);

  const setPageSize = useCallback((nextPageSize: PolicyPageSize) => {
    setPageSizeState(nextPageSize);
    setPageState(1);
  }, []);

  const currentPagePolicies = useMemo(
    () => paginatePolicies(visiblePolicies, safePage, pageSize),
    [pageSize, safePage, visiblePolicies],
  );

  const value = useMemo(
    () => ({
      currentPagePolicies,
      error,
      isLoading,
      page: safePage,
      pageSize,
      policies,
      setPage,
      setPageSize,
      totalPages,
      visiblePolicies,
    }),
    [
      currentPagePolicies,
      error,
      isLoading,
      safePage,
      pageSize,
      policies,
      setPage,
      setPageSize,
      totalPages,
      visiblePolicies,
    ],
  );

  return (
    <PoliciesContext.Provider value={value}>
      {children}
    </PoliciesContext.Provider>
  );
}

export function usePolicies() {
  const context = useContext(PoliciesContext);

  if (!context) {
    throw new Error("usePolicies must be used within PoliciesProvider.");
  }

  return context;
}
