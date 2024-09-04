import React, { ReactNode, useCallback, useState } from 'react';
import Tooltip, { TooltipProps } from '@mui/material/Tooltip';
import { useResizeObserver } from '@/@core/ui-kits/basic/overflow-tooltip/useResizeObserver';

type Props = {
    children: ReactNode;
    textOverflow?: 'clip' | 'ellipsis';
    tooltipPlacement?: TooltipProps['placement'];
};

export default function OverflowTooltip({
    children,
    textOverflow = 'clip',
    tooltipPlacement
}: Props) {
    const [hoverStatus, setHover] = useState(false);

    const onResize = useCallback((entry: ResizeObserverEntry) => {
        const isOverflowing = entry.target.scrollWidth > entry.target.clientWidth;
        setHover(isOverflowing);
    }, []);

    const textElementRef = useResizeObserver(onResize);

    return (
        <Tooltip
            title={children}
            disableHoverListener={!hoverStatus}
            placement={tooltipPlacement}
        >
            <div
                ref={textElementRef}
                style={{
                    whiteSpace  : 'nowrap',
                    overflow    : 'hidden',
                    textOverflow: hoverStatus ? textOverflow : 'unset'
                }}
            >
                {children}
            </div>
        </Tooltip>
    );
}
