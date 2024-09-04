import { memo } from 'react';
import { Tooltip } from '@mui/material';
import type { TooltipProps } from '@mui/material/Tooltip/Tooltip';
import LoadsIds from './LoadsIds';

type Props = Omit<TooltipProps, 'title'> & {
    loads: { loadId: string; friendlyId: string }[];
};

function LoadsTooltip({
    loads,
    children
}: Props) {
    return (
        <Tooltip
            placement="top"
            title={<LoadsIds loads={loads} />}
            disableHoverListener={!loads.length}
        >
            {children}
        </Tooltip>
    );
}

export default memo(LoadsTooltip);
