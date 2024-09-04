/* eslint-disable no-param-reassign */
import { useEffect } from 'react';

export const useScrollList = (
    scrollRef?: HTMLElement | null,
    itemRef?: HTMLElement | null,
    scrollToItem = false
) => {
    useEffect(() => {
        if (scrollToItem) {
            if (scrollRef && itemRef) {
                const currentScroll = scrollRef.scrollTop;
                const containerHeight = scrollRef.clientHeight;
                const paperHeight = itemRef.clientHeight;
                const paperOffsetTop = itemRef.offsetTop;

                if (currentScroll > paperOffsetTop) {
                    scrollRef.scrollTop = paperOffsetTop;
                }

                if (currentScroll + containerHeight < paperOffsetTop + paperHeight) {
                    scrollRef.scrollTop = paperOffsetTop + paperHeight - containerHeight;
                }
            }
        }
    }, [scrollToItem, scrollRef, itemRef]);
};
