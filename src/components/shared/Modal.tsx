import React, { useRef } from "react";
import { ContentItem } from "@/types/ContentItem";
import Image from "next/image";
import { useFocusTrap } from "@/hooks/useFocusTrap";

interface ModalProps {
    item: ContentItem | null;
    onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ item, onClose }) => {
    const modalRef = useRef<HTMLDivElement>(null);

    useFocusTrap(modalRef, onClose);

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    if (!item) return null;

    return (
        <div
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 overflow-auto"
            role="dialog"
            aria-modal="true"
            onClick={handleBackdropClick}
        >
            <div
                ref={modalRef}
                className="bg-black rounded-lg max-w-3xl w-full relative overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    aria-label="Close modal"
                    className="absolute top-2 right-2 text-gray-500 hover:text-white text-2xl z-10 cursor-pointer"
                >
                    &times;
                </button>

                <div className="relative w-full h-[550px] bg-gradient-to-r from-[#ff4e50]/20 via-[#f9d423]/20 to-[#24c6dc]/20">
                    <Image
                        src={item.thumbnail}
                        alt={`Poster of ${item.title}`}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, 768px"
                    />
                </div>

                <div className="bg-[#222831] p-6 text-white">
                    <h2 className="text-2xl font-bold mb-2">{item.title}</h2>
                    <p className="mb-4">{item.description || "No description available"}</p>
                    <p className="text-sm text-gray-300 mb-1">Year: {item.year}</p>
                    <p className="text-sm text-gray-300 mb-1">Rating: {item.rating}/10</p>
                    <p className="text-sm text-gray-300">
                        Cast: {item.cast?.join(", ") || "Unknown Cast"}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Modal;