import { NextRequest } from "next/server";
import { ContentItem } from "@/types/ContentItem";

const totalItems = 20;
const perPage = 10;

const allTrendingItems: ContentItem[] = Array.from({ length: totalItems }, (_, i) => ({
    id: i + 1,
    title: `Movie ${i + 1}`,
    year: 2000 + (i % 25),
    genre: ["Sci-Fi", "Adventure"],
    rating: parseFloat((Math.random() * 2 + 7).toFixed(1)),
    thumbnail: `https://some-placeholder.com/100x120/${i}`,
    duration: 100 + (i % 40),
    description: `This is a description for Movie ${i + 1}.`,
    cast: ["Actor A", "Actor B"],
    watchProgress: Math.floor(Math.random() * 100),
}));

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const start = (page - 1) * perPage;
    const end = start + perPage;
    const contentSlice = allTrendingItems.slice(start, end);

    return Response.json({
        content: contentSlice,
        pagination: {
            currentPage: page,
            totalPages: Math.ceil(totalItems / perPage),
            hasNext: end < totalItems,
            totalItems,
        },
        categories: {
            trending: contentSlice,
            forYou: [],
            newReleases: [],
        },
    });
}