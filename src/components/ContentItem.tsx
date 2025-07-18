import {ContentItem} from "@/types/ContentItem";
import Image from "next/image";

export default function ContentItemCard({item, onClick}: {
    item: ContentItem;
    onClick: () => void;
}) {
    return (
        <button
            onClick={onClick}
            className="relative w-full sm:w-[250px] lg:w-[250px] h-[350px] rounded-xl overflow-hidden hover:scale-[1.02] transition"
            aria-label={`Open details for ${item.title}`}
        >
            <Image src={item.thumbnail}
                   alt={`Poster of ${item.title}`}
                   fill
                   className="object-cover"
                   sizes="(max-width: 640px) 100vw, 250px"
            />
        </button>
    );
}