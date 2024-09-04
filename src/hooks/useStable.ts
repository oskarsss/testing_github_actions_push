import { useRef } from 'react';

export const useStableArray = <T>(array?: T[]): T[] => {
    const stableArray = useRef([]);

    return array || stableArray.current;
};

export const useStableObject = <T>(object?: T) => {
    const stableObject = useRef({});

    return object || stableObject.current;
};
