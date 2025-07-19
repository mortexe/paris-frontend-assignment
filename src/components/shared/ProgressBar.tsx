import React from "react";

interface ProgressBarProps {
    progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
    if (progress <= 0) return null;

    return (
        <div
            className="w-full h-1 bg-gray-700 rounded overflow-hidden"
            aria-label={`${progress}% watched`}
        >
            <div
                className="bg-white h-full"
                style={{ width: `${progress}%` }}
            />
        </div>
    );
};

export default ProgressBar;
