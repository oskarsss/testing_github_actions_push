/* eslint-disable no-plusplus */
import { useCallback, useLayoutEffect, useState } from 'react';

export const useVirtualized = ({
    itemCount,
    itemSize,
    overscanCount,
    enabled = true
}: {
    itemCount: number;
    itemSize: number;
    overscanCount: number;
    enabled?: boolean;
}) => {
    const initializeRenderedItems = useCallback(() => {
        const documentHeight = document.documentElement.clientHeight;
        const items: Record<number, number> = {};
        for (let i = 0; i < Math.ceil(documentHeight / itemSize) + overscanCount; i++) {
            items[i] = i * itemSize;
        }
        return items;
    }, [itemSize, overscanCount]);

    const [renderedOffset, setRenderedOffset] =
        useState<Record<number, number>>(initializeRenderedItems);

    useLayoutEffect(() => {
        if (!enabled) return;
        setRenderedOffset(initializeRenderedItems());
    }, [initializeRenderedItems, enabled]);

    const updateRenderedItems = useCallback(
        (scrollTop: number, containerHeight: number) => {
            if (!enabled) return;
            const startIndex = Math.max(0, Math.floor(scrollTop / itemSize) - overscanCount);
            const endIndex = Math.min(
                itemCount - 1,
                Math.ceil((scrollTop + containerHeight) / itemSize) + overscanCount
            );

            const newRenderedOffset: Record<number, number> = {};
            for (let i = startIndex; i <= endIndex; i++) {
                newRenderedOffset[i] = i * itemSize;
            }
            setRenderedOffset(newRenderedOffset);
        },
        [itemCount, itemSize, overscanCount, enabled]
    );

    const onScroll = useCallback(
        (event: { currentTarget: { scrollTop: number; clientHeight: number } }) => {
            const { scrollTop } = event.currentTarget;
            const containerHeight = event.currentTarget.clientHeight;
            updateRenderedItems(scrollTop, containerHeight);
        },
        [updateRenderedItems]
    );

    if (enabled) {
        return { renderedItems: renderedOffset, onScroll, fullSize: itemCount * itemSize };
    }

    return { renderedItems: null, onScroll: undefined, fullSize: undefined };
};
