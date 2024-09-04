import TooltipStyled from '@/@core/components/table-tooltips/ui-elements/TableTooltip.styled';
import { ReactNode } from 'react';

type Props = {
    title?: ReactNode;
    children: ReactNode;
};

export default function TableTooltip({
    title,
    children
}: Props) {
    return (
        <TooltipStyled.Tooltip
            disableInteractive
            title={title}
            sx={{ maxWidth: 'fit-content' }}
        >
            <div
                style={{
                    height     : '100%',
                    width      : '100%',
                    display    : 'flex',
                    alignItems : 'center',
                    paddingLeft: '10px'
                }}
            >
                {children}
            </div>
        </TooltipStyled.Tooltip>
    );
}
