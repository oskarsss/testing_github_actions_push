import React, { PropsWithChildren } from 'react';

type Props = PropsWithChildren<{
    scrollRef: React.RefObject<HTMLElement | null>;
}>;

const ScrollContext = React.createContext<React.RefObject<HTMLElement | null> | null>(null);

export const useScrollContext = () => React.useContext(ScrollContext);

const ScrollProvider = ({
    scrollRef,
    children
}: Props) => (
    <ScrollContext.Provider value={scrollRef}>{children}</ScrollContext.Provider>
);

export default ScrollProvider;
