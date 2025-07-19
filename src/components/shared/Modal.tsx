'use client';

import React, { useRef } from 'react';
import { useFocusTrap } from '@/hooks/useFocusTrap';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    ariaLabel?: string;
}

const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    children,
    ariaLabel
}) => {
    const modalRef = useRef<HTMLDivElement>(null);
    useFocusTrap(modalRef, onClose);

    if (!isOpen) return null;

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) onClose();
    };

    return (
        <div
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 overflow-auto"
            role="dialog"
            aria-modal="true"
            aria-label={ariaLabel ?? 'Dialog'}
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

                {children}
            </div>
        </div>
    );
};

export default Modal;
