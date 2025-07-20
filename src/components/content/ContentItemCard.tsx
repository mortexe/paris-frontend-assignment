import { ContentItem } from '@/types/ContentItem';
import Image from 'next/image';
import { useWatchHistory } from '@/context/WatchHistoryContext';
import ProgressBar from '@/components/shared/ProgressBar';
import { useState } from 'react';
import Skeleton from '@/components/shared/Skeleton';

interface ContentItemCardProps {
    item: ContentItem;
    isPriorityLoaded: boolean;
    onClick: () => void;
}

const ContentItemCard: React.FC<ContentItemCardProps> = ({
    item,
    isPriorityLoaded,
    onClick
}) => {
    const { getProgress } = useWatchHistory();
    const progress = getProgress(String(item.id));
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const [imageFailed, setImageFailed] = useState(false);

    return (
        <button
            onClick={onClick}
            className="relative w-full sm:w-[250px] lg:w-[250px] h-[350px] rounded-xl overflow-hidden
                 hover:scale-[1.02] transition cursor-pointer
                 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            aria-label={`Open details for ${item.title}`}
        >
            {!isImageLoaded && (
                <div className="absolute inset-0 -z-10">
                    <Skeleton count={1} className="w-full h-full" animated={!imageFailed} />
                </div>
            )}

            <Image
                src={item.thumbnail}
                alt={`Poster of ${item.title}`}
                fill
                className="object-cover absolute inset-0 -z-10"
                sizes="(max-width: 768px) 100vw, 768px"
                priority={isPriorityLoaded}
                onLoad={() => setIsImageLoaded(true)}
                onError={() => setImageFailed(true)}
            />

            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/90 to-transparent text-white p-3 z-10 space-y-1">
                <div>
                    <h3 className="text-sm font-semibold">{item.title}</h3>
                    <p className="text-xs">
                        {item.year} • {item.rating}/10
                    </p>
                </div>

                <ProgressBar progress={progress} />
            </div>
        </button>
    );
};

export default ContentItemCard;
