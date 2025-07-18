import { ContentItem } from "@/types/ContentItem";
import ContentItemCard from "./ContentItem";
import { useCallback } from "react";

export default function ContentGrid({
  items,
  onSelect,
}: {
  items: ContentItem[];
  onSelect: (item: ContentItem) => void;
}) {
  const handleSelect = useCallback(
    (item: ContentItem) => () => onSelect(item),
    [onSelect]
  );

  return (
    <ul className="overflow-x-auto flex gap-4 py-4" role="list" aria-label="Trending Content">
      {items.map((item) => (
        <li key={item.id}>
          <ContentItemCard item={item} onClick={handleSelect(item)} />
        </li>
      ))}
    </ul>
  );
}