import columns from '@/views/dispatch/scheduling/dialogs/CapList/components/caplist-table/columns';
import React from 'react';
import TableRow from '@mui/material/TableRow';
import MiniTableStyled from '@/@core/ui-kits/basic/mini-table/MiniTable.styled';
import { useAppTranslation } from '@/hooks/useAppTranslation';

export default function TableCapListHead() {
    const { t } = useAppTranslation();
    return (
        <MiniTableStyled.HeaderRow without_border>
            <TableRow>
                {columns.map((column) => (
                    <MiniTableStyled.HeaderCell
                        fontSize="medium"
                        key={column.field}
                        size="small"
                        padding="normal"
                        min_width={column.minWidth}
                        height={23}
                        is_text_align_left
                        sx={{
                            borderTop: (theme) =>
                                `1px solid ${theme.palette.semantic.border.secondary}`,
                            borderBottom: (theme) =>
                                `1px solid ${theme.palette.semantic.border.secondary}`
                        }}
                    >
                        {typeof column.headerName === 'string'
                            ? t(column.headerName)
                            : column.headerName}
                    </MiniTableStyled.HeaderCell>
                ))}
            </TableRow>
        </MiniTableStyled.HeaderRow>
    );
}
