interface SkeletonProps {
    count?: number;
    className?: string;
    animated?: boolean;
}

const Skeleton: React.FC<SkeletonProps> = ({ count = 6, className, animated = true }) => {
    return (
        <>
            {Array.from({ length: count }).map((_, i) => (
                <div
                    key={i}
                    className={`w-[250px] h-[350px] bg-gray-400 rounded-lg ${
                        animated ? 'animate-pulse' : ''
                    } ${className || ''}`}
                    aria-hidden="true"
                />
            ))}
        </>
    );
};

export default Skeleton;