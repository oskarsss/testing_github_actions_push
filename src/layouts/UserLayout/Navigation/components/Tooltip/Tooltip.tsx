import Tooltip, { TooltipProps } from '@mui/material/Tooltip';

type Props = TooltipProps;

export default function TooltipComponent({
    title,
    children,
    placement = 'right',
    ...props
}: Props) {
    return (
        <Tooltip
            {...props}
            title={title}
            placement={placement}
            disableTouchListener
            arrow
            componentsProps={{
                popper: {
                    sx: {
                        filter: 'drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.15))'
                    }
                },
                tooltip: {
                    sx: {
                        backgroundColor: '#fff',
                        fontWeight     : 500,
                        fontSize       : 14,
                        lineHeight     : '1.5',
                        letterSpacing  : '0.15px',
                        color          : '#000',
                        padding        : '10px 18px'
                    }
                },
                arrow: {
                    sx: {
                        color: '#fff'
                    }
                }
            }}
        >
            {children}
        </Tooltip>
    );
}
