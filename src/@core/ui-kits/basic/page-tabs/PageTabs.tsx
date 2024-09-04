import { Box } from '@mui/material';
import React, { PropsWithChildren, WheelEvent, useRef, useEffect } from 'react';
import PageTabsStyled from './PageTabs.styled';

export type PageTabsChangeAction<T extends string | number | object> = (
    event: React.SyntheticEvent,
    value: T
) => void;

type Props<T extends string | number | object> = PropsWithChildren<{
    value: T;
    onChange: PageTabsChangeAction<T>;
    isScrollable?: boolean;
    hideBorder?: boolean;
    showScrollBar?: boolean;
    scrollToSelectedTab?: boolean;
}>;

export default function PageTabs<T extends string | number | object>({
    value,
    onChange,
    isScrollable = false,
    hideBorder = false,
    children,
    showScrollBar = false,
    scrollToSelectedTab
}: Props<T>) {
    const containerRef = useRef<HTMLElement>();

    const hasValue = !!value;

    useEffect(() => {
        if (!scrollToSelectedTab || !hasValue) return;
        containerRef.current
            ?.querySelector('.MuiTab-root.Mui-selected')
            ?.scrollIntoView({ inline: 'center', behavior: 'instant' });
    }, [scrollToSelectedTab, hasValue]);

    const handleScroll = (e: WheelEvent<HTMLElement>) => {
        if (containerRef.current) {
            containerRef.current.scrollLeft += e.deltaY;
        }
    };
    return (
        <Box
            onWheel={handleScroll}
            ref={containerRef}
            sx={{
                ...(hideBorder ? {} : { borderBottom: 1, borderColor: 'divider' }),
                display : 'flex',
                flex    : '1 1 0',
                overflow: 'auto',

                ...(showScrollBar
                    ? {
                        '@supports (-moz-appearance:none)': {
                            scrollbarWidth: 'thin !important',
                            scrollbarColor: (theme) =>
                                `${theme.palette.mode === 'light' ? '#D0D5DD' : '#535252'} ${
                                    theme.palette.semantic.background.secondary
                                } !important`
                        },
                        '&::-webkit-scrollbar': {
                            width  : '4px !important',
                            height : '4px !important',
                            opacity: ' 1 !important'
                        },
                        '&::-webkit-scrollbar-thumb': {
                            backgroundColor: (theme) =>
                                `${
                                    theme.palette.mode === 'light' ? '#D0D5DD' : '#535252'
                                } !important`,
                            borderRadius: '16px !important',
                            width       : '4px !important'
                        },
                        '&::-webkit-scrollbar-track-piece:vertical': {
                            width          : '4px !important',
                            backgroundColor: (theme) =>
                                `${theme.palette.semantic.background.secondary} !important`
                        },
                        '&::-webkit-scrollbar-track-piece:horizontal': {
                            height         : '4px !important',
                            backgroundColor: (theme) =>
                                `${theme.palette.semantic.background.secondary} !important`
                        }
                    }
                    : {
                        scrollbarWidth        : 'none !important',
                        '&::-webkit-scrollbar': {
                            display: 'none'
                        }
                    })
            }}
        >
            <PageTabsStyled.Tabs
                value={value}
                onChange={onChange}
                variant={isScrollable ? 'scrollable' : 'standard'}
                scrollButtons={false}
            >
                {children}
            </PageTabsStyled.Tabs>
        </Box>
    );
}
