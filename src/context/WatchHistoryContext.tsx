"use client";

import { createContext, useContext, useCallback, useMemo, useState, useEffect } from "react";

type WatchHistoryEntry = {
    id: string;
    progress: number;
};

type WatchHistoryContextType = {
    getProgress: (id: string) => number;
    addOrUpdate: (id: string, progress: number) => void;
    allHistory: WatchHistoryEntry[];
};

const WatchHistoryContext = createContext<WatchHistoryContextType | undefined>(undefined);

const STORAGE_KEY = "watch_history";

export const WatchHistoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [history, setHistory] = useState<WatchHistoryEntry[]>([]);

    useEffect(() => {
        if (typeof window === "undefined") return;
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            const parsed = raw ? JSON.parse(raw) : [];
            setHistory(parsed);
        } catch {
            setHistory([]);
        }
    }, []);

    const getProgress = useCallback((id: string) => {
        return history.find((entry) => entry.id === id)?.progress ?? 0;
    }, [history]);

    const addOrUpdate = useCallback((id: string, progress: number) => {
        setHistory((prev) => {
            const updated = prev.filter((entry) => entry.id !== id);
            const newEntry = { id, progress: Math.min(100, Math.max(0, progress)) };
            const newHistory = [...updated, newEntry];
            localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
            return newHistory;
        });
    }, []);

    const value = useMemo(() => ({
        getProgress,
        addOrUpdate,
        allHistory: history
    }), [getProgress, addOrUpdate, history]);

    return (
        <WatchHistoryContext.Provider value={value}>
            {children}
        </WatchHistoryContext.Provider>
    );
};

export const useWatchHistory = () => {
    const context = useContext(WatchHistoryContext);
    if (!context) throw new Error("useWatchHistory must be used within a WatchHistoryProvider");
    return context;
};