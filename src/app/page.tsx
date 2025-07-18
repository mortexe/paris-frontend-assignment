"use client";

import { useState, useCallback, useMemo } from "react";
import { ContentItem } from "@/types/ContentItem";
import ContentGrid from "@/components/ContentGrid";
import Modal from "@/components/Modal";
import { useTrending } from "@/hooks/useTrending";

export default function HomePage() {
    const [page, setPage] = useState(1);
    const [selected, setSelected] = useState<ContentItem | null>(null);

    const { trending, pagination, isLoading } = useTrending(page);

    const loadingSkeleton = useMemo(
        () =>
            Array.from({ length: 6 }).map((_, i) => (
                <div
                    key={i}
                    className="w-[200px] h-[250px] bg-gray-200 rounded-lg animate-pulse"
                />
            )),
        []
    );

    const handlePreviousPage = useCallback(() => setPage((page) => page - 1), []);
    const handleNextPage = useCallback(() => setPage((page) => page + 1), []);

    const handleCloseModal = useCallback(() => setSelected(null), []);

    return (
        <main className="p-6">
            <h1 className="text-2xl font-bold mb-4">Trending Now</h1>

            {isLoading ? (
                <div className="flex gap-4">{loadingSkeleton}</div>
            ) : (
                <ContentGrid items={trending} onSelect={setSelected} />
            )}

            <div className="mt-4 flex items-center gap-2">
                <button
                    onClick={handlePreviousPage}
                    disabled={page === 1}
                    className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
                >
                    Previous
                </button>

                <span>Page {page}</span>

                <button
                    onClick={handleNextPage}
                    disabled={!pagination?.hasNext}
                    className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>

            <Modal item={selected} onClose={handleCloseModal} />
        </main>
    );
}