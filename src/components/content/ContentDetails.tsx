import { ContentItem } from '@/types/ContentItem';
import Image from 'next/image';
import ProgressBar from '@/components/shared/ProgressBar';
import { useWatchHistory } from '@/context/WatchHistoryContext';

const ContentDetails: React.FC<{ item: ContentItem }> = ({ item }) => {
    const { getProgress } = useWatchHistory();
    const watchProgress = getProgress(String(item.id));
    return (
        <>
            <div className="relative w-full h-[550px] bg-gradient-to-r from-[#ff4e50]/20 via-[#f9d423]/20 to-[#24c6dc]/20">
                <Image
                    src={item.thumbnail}
                    alt={`Poster of ${item.title}`}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 768px"
                />
                {watchProgress > 0 && (
                    <div className="absolute bottom-0 left-0 w-full px-6 pb-2 pt-1 backdrop-blur-sm">
                        <ProgressBar progress={watchProgress} />
                    </div>
                )}
            </div>

            <div className="bg-[#222831] p-6 text-white">
                <h2 className="text-2xl font-bold mb-2">{item.title}</h2>
                <p className="mb-4">
                    {item.description || 'No description available'}
                </p>
                <p className="text-sm text-gray-300 mb-1">Year: {item.year}</p>
                <p className="text-sm text-gray-300 mb-1">
                    Rating: {item.rating}/10
                </p>
                <p className="text-sm text-gray-300">
                    Cast: {item.cast?.join(', ') || 'Unknown Cast'}
                </p>
            </div>
        </>
    );
};

export default ContentDetails;
