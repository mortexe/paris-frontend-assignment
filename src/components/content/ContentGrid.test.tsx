import { render, screen, fireEvent } from '@testing-library/react';
import ContentGrid from './ContentGrid';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ContentItem } from '@/types/ContentItem';
import * as WatchHistoryContext from '@/context/WatchHistoryContext';

const mockItems: ContentItem[] = [
    {
        id: 1,
        title: 'Movie Title 1',
        description: 'Description 1',
        thumbnail: '/test1.jpg',
        year: 2021,
        rating: 8,
        cast: ['Actor 1', 'Actor 2'],
        watchProgress: 50,
        duration: 150,
        genre: ['Action']
    },
    {
        id: 2,
        title: 'Movie Title 2',
        description: 'Description 2',
        thumbnail: '/test2.jpg',
        year: 2022,
        rating: 9,
        cast: ['Actor A', 'Actor B'],
        watchProgress: 80,
        duration: 150,
        genre: ['Action']
    }
];

beforeEach(() => {
    vi.spyOn(WatchHistoryContext, 'useWatchHistory').mockReturnValue({
        getProgress: vi.fn().mockImplementation(() => 50),
        addOrUpdate: vi.fn(),
        allHistory: []
    });
});

describe('ContentGrid', () => {
    it('renders all content items', () => {
        const mockOnSelect = vi.fn();
        render(<ContentGrid items={mockItems} onSelect={mockOnSelect} />);

        mockItems.forEach((item) => {
            expect(screen.getByText(item.title)).toBeInTheDocument();
        });
    });

    it('calls onSelect when an item is clicked', () => {
        const mockOnSelect = vi.fn();
        render(<ContentGrid items={mockItems} onSelect={mockOnSelect} />);

        fireEvent.click(screen.getByText('Movie Title 1'));
        expect(mockOnSelect).toHaveBeenCalledWith(mockItems[0]);

        fireEvent.click(screen.getByText('Movie Title 2'));
        expect(mockOnSelect).toHaveBeenCalledWith(mockItems[1]);
    });

    it('renders no items when items list is empty', () => {
        const mockOnSelect = vi.fn();
        render(<ContentGrid items={[]} onSelect={mockOnSelect} />);

        expect(screen.queryAllByRole('listitem')).toHaveLength(0);
    });

    it('renders list with role="list" and each item with role="listitem"', () => {
        const mockOnSelect = vi.fn();
        render(<ContentGrid items={mockItems} onSelect={mockOnSelect} />);

        expect(screen.getByRole('list')).toBeInTheDocument();
        expect(screen.getAllByRole('listitem')).toHaveLength(mockItems.length);
    });

    it('calls onSelect with the correct item object', () => {
        const mockOnSelect = vi.fn();
        render(<ContentGrid items={mockItems} onSelect={mockOnSelect} />);

        fireEvent.click(screen.getByText(mockItems[0].title));
        expect(mockOnSelect).toHaveBeenCalledTimes(1);
        expect(mockOnSelect).toHaveBeenCalledWith(mockItems[0]);
    });
});
