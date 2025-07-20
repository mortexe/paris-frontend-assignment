import type { Metadata } from 'next';
import './globals.css';
import { WatchHistoryProvider } from '@/context/WatchHistoryContext';
import { ToastProvider } from '@/context/ToastContext';
import ToastContainer from '@/components/shared/ToastContainer';
import ErrorBoundary from '@/components/error/ErrorBoundary';
import GenericErrorFallback from '@/components/error/GenericErrorFallback';

export const metadata: Metadata = {
    title: 'ZenithFlix',
    description: 'Created by Paris Ltd'
};

interface RootLayoutProps {
    children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
    return (
        <html lang="en">
            <body>
                <ErrorBoundary fallback={<GenericErrorFallback />}>
                    <ToastProvider>
                        <WatchHistoryProvider>
                            <ToastContainer />
                            {children}
                        </WatchHistoryProvider>
                    </ToastProvider>
                </ErrorBoundary>
            </body>
        </html>
    );
};

export default RootLayout;
