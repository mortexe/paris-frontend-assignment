import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "ZenithFlix",
    description: "Created by Paris Ltd",
};

interface RootLayoutProps {
    children: React.ReactNode;
}

import { WatchHistoryProvider } from "@/context/WatchHistoryContext";

const RootLayout: React.FC<RootLayoutProps> =({ children }: { children: React.ReactNode }) => {
    return (
        <html lang="en">
            <body>
                <WatchHistoryProvider>
                    {children}
                </WatchHistoryProvider>
            </body>
        </html>
    );
}

export default RootLayout;