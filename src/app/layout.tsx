import type { Metadata } from 'next';
import './globals.css';
import { WatchHistoryProvider } from '@/context/WatchHistoryContext';
import { ToastProvider } from '@/context/ToastContext';
import ToastContainer from "@/components/shared/ToastContainer";

export const metadata: Metadata = {
    title: 'ZenithFlix',
    description: 'Created by Paris Ltd',
};

interface RootLayoutProps {
    children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
    return (
        <html lang="en">
        <body>
        <ToastProvider>
            <WatchHistoryProvider>
                <ToastContainer />
                {children}
            </WatchHistoryProvider>
        </ToastProvider>
        </body>
        </html>
    );
};

export default RootLayout;