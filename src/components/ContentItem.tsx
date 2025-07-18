import { ContentItem } from "@/types/ContentItem";
import Image from "next/image";

export default function ContentItemCard({ item, onClick }: {
    item: ContentItem;
    onClick: () => void;
}) {
    return (
        <button
            onClick={onClick}
            className="min-w-[200px] border rounded-xl bg-white p-3 shadow hover:scale-[1.02] transition"
            aria-label={`Open details for ${item.title}`}
        >
            <Image src={item.thumbnail} alt={`Poster of ${item.title}`} width={200} height={120} className="h-[250px] w-[200px] object-cover rounded" />
            <h3 className="mt-2 font-semibold">{item.title}</h3>
            <p className="text-sm text-gray-500">{item.year} • {item.rating}/10</p>
        </button>
    );
}