import { useCallback, useState, useEffect } from "react";
import useSWR from "swr";
import { ContentItem } from "@/types/ContentItem";

interface TrendingApiResponse {
  categories: {
    trending: ContentItem[];
  };
}

const useTrending = (page: number) => {
  const fetcher = useCallback(
      (url: string) => fetch(url).then((res) => res.json()),
      []
  );

  const [isFakeLoading, setIsFakeLoading] = useState(true);

  const { data, error, isLoading } = useSWR<TrendingApiResponse>(
      `/api/content?page=${page}`,
      fetcher
  );

  useEffect(() => {
    setIsFakeLoading(true);
    const timeout = setTimeout(() => setIsFakeLoading(false), 1000);
    return () => clearTimeout(timeout);
  }, [page]);

  return {
    trending: data?.categories.trending ?? [],
    isLoading: isLoading || isFakeLoading,
    isError: error,
  };
};

export default useTrending;