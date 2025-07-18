import React, { useEffect, useCallback } from "react";
import { ContentItem } from "@/types/ContentItem";
import Image from "next/image";

interface ModalProps {
    item: ContentItem | null;
    onClose: () => void;
}

export default function Modal({ item, onClose }: ModalProps) {
    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
    }, [onClose]);

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) onClose();
    };

    useEffect(() => {
        if (item) document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [item, handleKeyDown]);

    if (!item) return null;

    return (
        <div
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 overflow-auto"
            role="dialog"
            aria-modal="true"
            onClick={handleBackdropClick}
        >
            <div
                className="bg-white rounded-lg max-w-3xl w-full relative overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    aria-label="Close modal"
                    className="absolute top-2 right-2 text-gray-500 hover:text-black text-2xl z-10"
                >
                    &times;
                </button>

                <div className="relative w-full h-[500px] bg-gradient-to-r from-[#ff4e50]/20 via-[#f9d423]/20 to-[#24c6dc]/20">
                    <Image
                        src={item.thumbnail}
                        alt={`Poster of ${item.title}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 768px"
                        className="object-contain"
                    />
                </div>

                <div className="p-6">
                    <h2 className="text-2xl font-bold mb-2">{item.title}</h2>
                    <p className="text-gray-700 mb-4">{item.description}</p>
                    <p className="text-sm text-gray-500 mb-1">Year: {item.year}</p>
                    <p className="text-sm text-gray-500 mb-1">Rating: {item.rating}/10</p>
                    <p className="text-sm text-gray-500">Cast: {item.cast.join(", ")}</p>
                </div>
            </div>
        </div>
    );
}