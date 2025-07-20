'use client';

import React, { useEffect, useState } from 'react';

interface Toast {
    id: string;
    message: string;
    isLeaving?: boolean;
}

const ToastContainer: React.FC = () => {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const addToast = (message: string) => {
        const id = Date.now().toString();
        setToasts((prev) => [...prev, { id, message }]);
    };

    const removeToast = (id: string) => {
        setToasts((prev) =>
            prev.map((toast) =>
                toast.id === id ? { ...toast, isLeaving: true } : toast
            )
        );

        setTimeout(() => {
            setToasts((prev) => prev.filter((toast) => toast.id !== id));
        }, 300); // Match animation duration
    };

    useEffect(() => {
        const handleToastEvent = (event: CustomEvent<string>) => {
            addToast(event.detail);
        };
        window.addEventListener('app-toast', handleToastEvent as EventListener);

        return () => {
            window.removeEventListener(
                'app-toast',
                handleToastEvent as EventListener
            );
        };
    }, []);

    return (
        <div className="fixed top-4 right-4 z-50 space-y-2">
            {toasts.map((toast) => (
                <div
                    key={toast.id}
                    className={`toast-transition bg-red-500 text-white rounded-md px-4 py-2 shadow-md flex items-center justify-between ${
                        toast.isLeaving
                            ? 'animate-slide-out'
                            : 'animate-slide-in'
                    }`}
                >
                    <span>{toast.message}</span>
                    <button
                        className="ml-4 text-white font-bold cursor-pointer"
                        onClick={() => removeToast(toast.id)}
                    >
                        ×
                    </button>
                </div>
            ))}
        </div>
    );
};

export default ToastContainer;
