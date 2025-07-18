import React from "react";

interface SkeletonProps {
    count?: number;
    className?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({ count = 6, className }) => {
    return (
        <>
            {Array.from({ length: count }).map((_, i) => (
                <div
                    key={i}
                    className={`w-[250px] h-[350px] bg-gray-200 rounded-lg animate-pulse ${className || ""}`}
                    aria-hidden="true"
                />
            ))}
        </>
    );
};

export default Skeleton;