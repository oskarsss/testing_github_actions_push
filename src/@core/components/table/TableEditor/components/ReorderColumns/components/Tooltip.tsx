import { Box } from '@mui/material';
import TableEditorIcons from '@/@core/components/table/TableEditor/icons';
import React from 'react';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses, TooltipProps } from '@mui/material/Tooltip';
import { useAppTranslation } from '@/hooks/useAppTranslation';

const CustomWidthTooltip = styled(({
    className,
    children,
    ...props
}: TooltipProps) => (
    <Tooltip
        {...props}
        classes={{ popper: className }}
    >
        {children}
    </Tooltip>
))({
    [`& .${tooltipClasses.tooltip}`]: {
        maxWidth       : 500,
        marginRight    : '16px',
        color          : '#525164',
        width          : '172px',
        padding        : '16px',
        fontSize       : '14px',
        fontWeight     : 400,
        backgroundColor: '#FFFFFF',
        borderRadius   : '8px',
        filter         : 'drop-shadow(4px 4px 16px rgba(117, 135, 170, 0.2))'
    }
});
export default function TooltipComponent() {
    const { t } = useAppTranslation();
    return (
        <CustomWidthTooltip
            PopperProps={{
                disablePortal: true
            }}
            title={t('core:table.table_editor.columns.tooltips.reorder_columns')}
        >
            <Box
                my="auto"
                mr="5px"
            >
                <TableEditorIcons.Tooltip />
            </Box>
        </CustomWidthTooltip>
    );
}
