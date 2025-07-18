import useSWR from "swr";
import { ContentItem } from "@/types/ContentItem";
import { useCallback, useState, useEffect } from "react";

export function useTrending(page: number) {
  const fetcher = useCallback((url: string) => fetch(url).then((res) => res.json()), []);
  const [isFakeLoading, setIsFakeLoading] = useState(true);

  const { data, error, isLoading } = useSWR<{
    categories: { trending: ContentItem[] };
  }>(`/api/content?page=${page}`, fetcher);

  useEffect(() => {
    setIsFakeLoading(true);

    const timeout = setTimeout(() => {
      setIsFakeLoading(false);
    }, 1000); // Simulated 1 second delay

    return () => clearTimeout(timeout);
  }, [page]);

  return {
    trending: data?.categories.trending ?? [],
    isLoading: isLoading || isFakeLoading,
    isError: error,
  };
}