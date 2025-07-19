import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
    title: 'ZenithFlix',
    description: 'Created by Paris Ltd'
};

interface RootLayoutProps {
    children: React.ReactNode;
}

import { WatchHistoryProvider } from '@/context/WatchHistoryContext';

const RootLayout: React.FC<RootLayoutProps> = ({
    children
}: {
    children: React.ReactNode;
}) => {
    return (
        <html lang="en">
            <body>
                <WatchHistoryProvider>{children}</WatchHistoryProvider>
            </body>
        </html>
    );
};

export default RootLayout;
