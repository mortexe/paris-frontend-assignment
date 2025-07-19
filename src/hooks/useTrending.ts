import { useCallback, useState, useEffect } from 'react';
import useSWR from 'swr';
import { ContentItem } from '@/types/ContentItem';
import { useWatchHistory } from '@/context/WatchHistoryContext';
import { getLocalizedMessage } from '@/shared/i18n';
import { useToast } from '@/context/ToastContext'; // Import Toast

interface TrendingApiResponse {
    categories: {
        trending: ContentItem[];
    };
}

const useTrending = (page: number) => {
    const { triggerToast } = useToast();

    const fetcher = useCallback(
        (url: string) => fetch(url).then((res) => res.json()),
        []
    );

    const [isFakeLoading, setIsFakeLoading] = useState(true);
    const { addOrUpdate, getProgress } = useWatchHistory();

    const { data, error, isLoading } = useSWR<TrendingApiResponse>(
        `/api/content?page=${page}`,
        fetcher
    );

    const errorMessage = error?.status === 404
        ? getLocalizedMessage('error.noContent')
        : error?.status === 500
            ? getLocalizedMessage('error.server')
            : error
                ? getLocalizedMessage('error.network')
                : null;

    useEffect(() => {
        if (errorMessage) {
            triggerToast(errorMessage);
        }
    }, [errorMessage, triggerToast]);

    // sync loaded movies watchProgress with localStorage
    useEffect(() => {
        if (!data?.categories.trending) return;

        data.categories.trending.forEach((item) => {
            const localProgress = getProgress(String(item.id));
            if (localProgress === 0 && item.watchProgress > 0) {
                addOrUpdate(String(item.id), item.watchProgress);
            }
        });
    }, [data, getProgress, addOrUpdate]);

    useEffect(() => {
        setIsFakeLoading(true);
        const timeout = setTimeout(() => setIsFakeLoading(false), 1000);
        return () => clearTimeout(timeout);
    }, [page]);

    return {
        trending: data?.categories.trending ?? [],
        isLoading: isLoading || isFakeLoading,
        error: errorMessage,
    };
};

export default useTrending;