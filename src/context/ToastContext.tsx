'use client';

import React, { createContext, useContext, ReactNode } from 'react';

interface ToastContextProps {
    triggerToast: (message: string) => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

interface ToastProviderProps {
    children: ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
    const triggerToast = (message: string) => {
        window.dispatchEvent(new CustomEvent('app-toast', { detail: message }));
    };

    return (
        <ToastContext.Provider value={{ triggerToast }}>
            {children}
        </ToastContext.Provider>
    );
};

export const useToast = (): ToastContextProps => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};
