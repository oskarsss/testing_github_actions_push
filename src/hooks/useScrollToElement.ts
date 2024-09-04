/* eslint-disable max-len */

import React, { useCallback } from 'react';
import smoothScroll from '@/utils/smoothScroll';
import type { OverlayScrollbarsComponentRef } from 'overlayscrollbars-react';

export type ScrollToElement = (
    element?: HTMLElement | Element | null,
    disableScrollIfVisible?: boolean,
    offSetTop?: number
) => void;

function useScrollToElement(
    scrollContainer?: React.MutableRefObject<HTMLElement | null>
): ScrollToElement {
    return useCallback(
        (element, disableScrollIfVisible = true, offSetTop = -10) => {
            if (scrollContainer?.current) {
                if (element) {
                    const containerRect = scrollContainer.current.getBoundingClientRect();
                    const elementRect = element.getBoundingClientRect();
                    const isFullyVisible =
                        elementRect.top >= containerRect.top &&
                        elementRect.bottom <= containerRect.bottom;
                    if (disableScrollIfVisible ? isFullyVisible : false) return;
                    const currentScrollTop = scrollContainer.current.scrollTop;
                    const offset =
                        currentScrollTop + (elementRect.top - containerRect.top) + offSetTop;
                    smoothScroll(scrollContainer.current, offset);
                } else {
                    smoothScroll(scrollContainer.current, 0);
                }
            }
        },
        [scrollContainer]
    );
}

export default useScrollToElement;

export type OverlayScrollToElement = (
    element?: HTMLElement | Element | null,
    disableScrollIfVisible?: boolean,
    offSetTop?: number
) => void;

export function useOverlayScrollToElement(
    scrollContainerRef?: React.MutableRefObject<OverlayScrollbarsComponentRef | null>
): OverlayScrollToElement {
    return useCallback(
        (element, disableScrollIfVisible = true, offSetTop = -10) => {
            const scrollElement = scrollContainerRef?.current?.getElement();
            if (!scrollElement) return;
            const osInstance = scrollContainerRef?.current?.osInstance();
            if (!osInstance) return;
            let scrollTop = 0;

            if (element) {
                const rect = element.getBoundingClientRect();
                const containerRect = scrollElement.getBoundingClientRect();

                const isFullyVisible =
                    rect.top >= containerRect.top && rect.bottom <= containerRect.bottom;

                if (disableScrollIfVisible ? isFullyVisible : false) return;

                const viewPortScrollTop = osInstance.elements().viewport.scrollTop;
                scrollTop = viewPortScrollTop + (rect.top - containerRect.top) + offSetTop;
            }

            osInstance.elements().viewport?.scrollTo({ top: scrollTop, behavior: 'smooth' });
        },
        [scrollContainerRef]
    );
}
