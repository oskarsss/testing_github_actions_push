import LoadOverviewStyled from '@/views/dispatch/orders/Details/sections/load-overview/LoadOverview.styled';
import React from 'react';
import HotKeyTooltip from '@/@core/ui-kits/basic/hot-key-tooltip/HotKeyTooltip';
import { HotKeyTooltipTitleProps } from '@/@core/ui-kits/basic/hot-key-tooltip/types';

type Props = {
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    color?: 'error' | 'primary';
    children: React.ReactNode;
    tooltipProps: HotKeyTooltipTitleProps;
};

export default function Button({
    onClick,
    color,
    disabled = false,
    children,
    tooltipProps
}: Props) {
    return (
        <HotKeyTooltip {...tooltipProps}>
            <LoadOverviewStyled.Button
                color={color}
                onClick={onClick}
                disabled={disabled}
            >
                {children}
            </LoadOverviewStyled.Button>
        </HotKeyTooltip>
    );
}
