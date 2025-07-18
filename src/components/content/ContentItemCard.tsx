import { ContentItem } from "@/types/ContentItem";
import Image from "next/image";

interface ContentItemCardProps {
    item: ContentItem;
    onClick: () => void;
}

const ContentItemCard: React.FC<ContentItemCardProps> = ({ item, onClick }) => {
    return (
        <button
            onClick={onClick}
            className="relative w-full sm:w-[250px] lg:w-[250px] h-[350px] rounded-xl overflow-hidden
                 hover:scale-[1.02] transition cursor-pointer
                 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            aria-label={`Open details for ${item.title}`}
        >
            <Image
                src={item.thumbnail}
                alt={`Poster of ${item.title}`}
                fill
                className="object-cover absolute inset-0 -z-10"
            />

            <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-3 z-10">
                <h3 className="text-sm font-semibold">{item.title}</h3>
                <p className="text-xs">{item.year} • {item.rating}/10</p>
            </div>
        </button>
    );
};

export default ContentItemCard;