import { memo } from 'react';
import TableRow from '@mui/material/TableRow';
import MiniTableStyled, { FontSize } from '@/@core/ui-kits/basic/mini-table/MiniTable.styled';
import { MiniTableColumnType } from '@/@core/ui-kits/basic/mini-table/MiniTable.types';
import { useAppTranslation } from '@/hooks/useAppTranslation';

type Props = {
    turnOffBorder?: boolean;
    columns: MiniTableColumnType[];
    fontSize?: FontSize;
};

function MiniTableHeader({
    turnOffBorder,
    columns,
    fontSize
}: Props) {
    const { t } = useAppTranslation();
    return (
        <MiniTableStyled.HeaderRow without_border={turnOffBorder}>
            <TableRow
                sx={{
                    borderLeft : '0 !important',
                    borderRight: '0 !important',
                    borderTop  : (theme) => `1px solid ${theme.palette.semantic.border.primary}`
                }}
            >
                {columns.map((column) => (
                    <MiniTableStyled.HeaderCell
                        fontSize={fontSize}
                        style={column.styles ?? {}}
                        key={column.field}
                        size="small"
                        padding="normal"
                        min_width={column.minWidth}
                        max_width={column.maxWidth}
                        height={23}
                        is_text_align_left={column.flex_start}
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

export default memo(MiniTableHeader);
