import { useCallback, useRef, WheelEvent } from 'react';

export function useHorizontalTabsScroll() {
    const tabsRef = useRef<HTMLDivElement | null>(null);

    const onWheelTabs = useCallback((e: WheelEvent<HTMLDivElement>): void => {
        if (tabsRef.current?.lastChild) {
            const lastChild = tabsRef.current.lastChild as HTMLElement;
            lastChild.scrollLeft += e.deltaY;
        }
    }, []);

    return { tabsRef, onWheelTabs };
}
