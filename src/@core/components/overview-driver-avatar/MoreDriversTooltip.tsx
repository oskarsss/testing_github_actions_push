import Tooltip, { TooltipProps } from '@mui/material/Tooltip';
import MoreDriversTooltipTitle from '@/@core/components/overview-driver-avatar/ui-elements/MoreDriversTooltipTitle';

type Props = {
    children: TooltipProps['children'];
    driverIds: string[];
};

export default function MoreDriversTooltip({
    driverIds,
    children
}: Props) {
    return (
        <Tooltip
            placement="bottom-start"
            title={<MoreDriversTooltipTitle driverIds={driverIds} />}
            componentsProps={{
                tooltip: {
                    sx: {
                        backgroundColor: (theme) => theme.palette.semantic.background.white,
                        padding        : '3px 6px',
                        borderRadius   : '4px',
                        boxShadow:
                            '0px 4px 6px -2px rgba(16, 24, 40, 0.03), 0px 12px 16px -4px rgba(16, 24, 40, 0.08)'
                    }
                }
            }}
            slotProps={{
                popper: {
                    modifiers: [
                        {
                            name   : 'offset',
                            options: {
                                offset: [-6, -6]
                            }
                        }
                    ]
                }
            }}
        >
            {children}
        </Tooltip>
    );
}
