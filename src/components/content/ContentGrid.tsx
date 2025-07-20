import { useCallback } from 'react';
import { ContentItem } from '@/types/ContentItem';
import ContentItemCard from './ContentItemCard';

interface ContentGridProps {
    items: ContentItem[];
    onSelect: (item: ContentItem) => void;
}

const ContentGrid: React.FC<ContentGridProps> = ({ items, onSelect }) => {
    const handleSelect = useCallback(
        (item: ContentItem) => () => onSelect(item),
        [onSelect]
    );

    return (
        <ul
            className="overflow-x-auto flex gap-4 py-4 scroll-smooth scroll-snap-x scrollbar-hide"
            role="list"
            aria-label="Trending Content"
        >
            {items.map((item, index) => (
                <li key={item.id} className="scroll-snap-start">
                    <ContentItemCard
                        item={item}
                        isPriorityLoaded={index < 6}
                        onClick={handleSelect(item)}
                    />
                </li>
            ))}
        </ul>
    );
};

export default ContentGrid;
