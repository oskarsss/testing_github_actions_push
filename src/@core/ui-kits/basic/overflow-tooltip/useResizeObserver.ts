import { useLayoutEffect, useRef } from 'react';

export const useResizeObserver = (callback: (entry: ResizeObserverEntry) => void) => {
    const targetRef = useRef(null);

    useLayoutEffect(() => {
        const observer = new ResizeObserver((entries) => {
            if (entries[0]) {
                callback(entries[0]);
            }
        });

        if (targetRef.current) {
            observer.observe(targetRef.current);
        }

        return () => {
            if (targetRef.current) {
                observer.unobserve(targetRef.current);
            }
        };
    }, [callback]);

    return targetRef;
};
