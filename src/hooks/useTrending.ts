import useSWR from "swr";
import { ContentItem } from "@/types/ContentItem";
import { Pagination } from "@/types/pagination";
import { useCallback, useState, useEffect } from "react";

export function useTrending(page: number) {
  const fetcher = useCallback((url: string) => fetch(url).then((res) => res.json()), []);
  const [isFakeLoading, setIsFakeLoading] = useState(true);

  const { data, error, isLoading } = useSWR<{
    categories: { trending: ContentItem[] };
    pagination: Pagination;
  }>(`/api/content?page=${page}`, fetcher);

  // Introduce artificial loading delay
  useEffect(() => {
    setIsFakeLoading(true);

    const timeout = setTimeout(() => {
      setIsFakeLoading(false);
    }, 100000); // Simulated 1 second delay

    return () => clearTimeout(timeout);
  }, [page]);

  return {
    trending: data?.categories.trending ?? [],
    pagination: data?.pagination,
    isLoading: isLoading || isFakeLoading,
    isError: error,
  };
}