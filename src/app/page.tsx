"use client";

import { useState, useCallback, useMemo } from "react";
import { ContentItem } from "@/types/ContentItem";
import ContentGrid from "@/components/ContentGrid";
import Modal from "@/components/Modal";
import { useTrending } from "@/hooks/useTrending";

const page = 1;

export default function HomePage() {
    const [selected, setSelected] = useState<ContentItem | null>(null);

    const { trending, isLoading } = useTrending(page);

    const loadingSkeleton = useMemo(
        () =>
            Array.from({ length: 6 }).map((_, i) => (
                <div
                    key={i}
                    className="w-[250px] h-[350px] border bg-gray-200 rounded-lg animate-pulse"
                />
            )),
        []
    );

    const handleCloseModal = useCallback(() => setSelected(null), []);

    return (
        <main className="p-6">
            <h1 className="text-2xl font-bold mb-4">Trending Now</h1>

            {isLoading ? (
                <div className="flex gap-4">{loadingSkeleton}</div>
            ) : (
                <ContentGrid items={trending} onSelect={setSelected} />
            )}
            <Modal item={selected} onClose={handleCloseModal} />
        </main>
    );
}