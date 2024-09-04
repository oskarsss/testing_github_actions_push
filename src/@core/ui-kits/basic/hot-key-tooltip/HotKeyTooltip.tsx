import { styled } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import React from 'react';
import { HotKeyTooltipProps } from '@/@core/ui-kits/basic/hot-key-tooltip/types';
import HotKeyTooltipTitle from '@/@core/ui-kits/basic/hot-key-tooltip/components/HotKeyTooltipTitle';

const HotKeyTooltip = styled(
    ({
        className,
        children,
        title,
        hot_keys,
        modifier_keys,
        placement
    }: HotKeyTooltipProps) => (
        <Tooltip
            disableInteractive
            placement={placement}
            classes={{ popper: className }}
            title={(
                <HotKeyTooltipTitle
                    title={title}
                    modifier_keys={modifier_keys}
                    hot_keys={hot_keys}
                />
            )}
        >
            {children}
        </Tooltip>
    )
)({
    '& .MuiTooltip-tooltip': {
        padding        : '3px 6px !important',
        borderRadius   : '6px',
        color          : '#ffffff',
        backgroundColor: '#414452',
        fontSize       : '12px',
        fontWeight     : 600,
        display        : 'flex',
        alignItems     : 'center',
        justifyContent : 'space-between',
        gap            : '6px'
    }
});

export default HotKeyTooltip;
