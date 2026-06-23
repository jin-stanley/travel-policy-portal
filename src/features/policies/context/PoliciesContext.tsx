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
} from "@/features/policies/utils/policyTransforms";

type PoliciesContextValue = {
  currentPagePolicies: Policy[];
  error: string | null;
  isLoading: boolean;
  page: number;
  pageSize: number;
  policies: Policy[];
  setPage: (page: number) => void;
  totalPages: number;
  visiblePolicies: Policy[];
};

const PoliciesContext = createContext<PoliciesContextValue | undefined>(
  undefined,
);

export function PoliciesProvider({ children }: { children: ReactNode }) {
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [page, setPageState] = useState(1);
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
    () => getTotalPages(visiblePolicies.length),
    [visiblePolicies.length],
  );

  const pageSize = POLICIES_PER_PAGE;

  const setPage = useCallback((nextPage: number) => {
    setPageState(Math.min(Math.max(nextPage, 1), totalPages));
  }, [totalPages]);

  const currentPagePolicies = useMemo(
    () => paginatePolicies(visiblePolicies, page, pageSize),
    [page, pageSize, visiblePolicies],
  );

  const value = useMemo(
    () => ({
      currentPagePolicies,
      error,
      isLoading,
      page,
      pageSize,
      policies,
      setPage,
      totalPages,
      visiblePolicies,
    }),
    [
      currentPagePolicies,
      error,
      isLoading,
      page,
      pageSize,
      policies,
      setPage,
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
