'use client';

import React from 'react';
import { getLocalizedMessage } from '@/shared/i18n';

interface GenericErrorFallbackProps {
    error?: Error;
}

const GenericErrorFallback: React.FC<GenericErrorFallbackProps> = ({
    error
}) => {
    return (
        <div className="flex flex-col items-center justify-center p-4 text-center">
            <h2 className="text-xl font-semibold text-red-600 mb-2">
                {getLocalizedMessage('error.unknown')}
            </h2>
            {error && (
                <pre className="text-sm text-gray-500 mb-2">
                    {error.message}
                </pre>
            )}
        </div>
    );
};

export default GenericErrorFallback;
