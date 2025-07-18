"use client";

import { useState, useCallback } from "react";
import { ContentItem } from "@/types/ContentItem";
import ContentGrid from "@/components/content/ContentGrid";
import Modal from "@/components/shared/Modal";
import useTrending from "@/hooks/useTrending";
import Skeleton from "@/components/shared/Skeleton";

const page = 1;

const HomePage: React.FC = () => {
    const [selected, setSelected] = useState<ContentItem | null>(null);
    const { trending, isLoading } = useTrending(page);

    const handleCloseModal = useCallback(() => setSelected(null), []);

    return (
        <main className="p-6">
            <h1 className="text-2xl font-bold mb-4">Trending Now</h1>

            {isLoading ? (
                <div className="flex gap-4">
                    <Skeleton />
                </div>
            ) : (
                <ContentGrid items={trending} onSelect={setSelected} />
            )}

            <Modal item={selected} onClose={handleCloseModal} />
        </main>
    );
};

export default HomePage;