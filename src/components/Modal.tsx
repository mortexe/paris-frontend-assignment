import { useEffect, useCallback } from "react";
import { ContentItem } from "@/types/ContentItem";

interface ModalProps {
    item: ContentItem | null;
    onClose: () => void;
}

export default function Modal({ item, onClose }: ModalProps) {
    const handleKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            }
        },
        [onClose]
    );

    useEffect(() => {
        if (item) {
            document.addEventListener("keydown", handleKeyDown);
        }
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [item, handleKeyDown]);

    if (!item) return null;

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <div className="bg-white p-6 rounded-lg max-w-md w-full relative">
                <button
                    onClick={onClose}
                    aria-label="Close modal"
                    className="absolute top-2 right-2 text-gray-500 hover:text-black text-2xl leading-none"
                >
                    &times;
                </button>

                <img
                    src={item.thumbnail}
                    alt={`${item.title} poster`}
                    className="w-full h-64 object-cover rounded mb-4"
                />

                <h2 id="modal-title" className="text-xl font-bold mb-2">
                    {item.title}
                </h2>

                <p id="modal-description" className="text-sm text-gray-700 mb-4">
                    {item.description ?? "No description available"}
                </p>

                <p className="text-sm text-gray-500 mb-1">Year: {item.year}</p>
                <p className="text-sm text-gray-500 mb-1">Rating: {item.rating}/10</p>
                <p className="text-sm text-gray-500">
                    Cast: {item.cast.join(", ")}
                </p>
            </div>
        </div>
    );
}