import MiniTableStyled from '@/@core/ui-kits/basic/mini-table/MiniTable.styled';
import MiniTableNoItems from '@/@core/ui-kits/basic/mini-table/components/MiniTableNoItems';
import React, { useState } from 'react';
import { Columns } from '@/views/settings/components/Table/types';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import { useAppTranslation } from '@/hooks/useAppTranslation';

type Props<Row> = {
    onClickRow: (event: React.MouseEvent<HTMLTableRowElement, MouseEvent>, row: Row) => void;
    items: Row[];
    keyField: keyof Row;
    loading: boolean;
    columns: Columns<Row>[];
};

export default function IntegrationDetailsTable<Row>({
    onClickRow,
    keyField,
    items,
    loading,
    columns
}: Props<Row>) {
    const { t } = useAppTranslation();
    const [selectedRow, setSelectedRow] = useState<number | null>(null);
    const onClickRowHandler =
        (row: Row, index: number) => (event: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => {
            onClickRow(event, row);
            setSelectedRow(index);
        };

    return (
        <MiniTableStyled.Container
            sx={{
                borderRadius: '8px',
                border      : (theme) => `1px solid ${theme.palette.semantic.border.secondary}`
            }}
        >
            <MiniTableStyled.CommonTable
                without_border
                stickyHeader
                sx={{ borderCollapse: 'separate' }}
            >
                <MiniTableStyled.HeaderRow without_border>
                    <TableRow sx={{ borderLeft: '0 !important', borderRight: '0 !important' }}>
                        {columns.map((col) => (
                            <MiniTableStyled.HeaderCell
                                key={col.field}
                                align={col.align}
                                width={col.minWidth}
                                size="small"
                                padding="normal"
                                height={23}
                                sx={{
                                    textTransform: 'none',
                                    borderBottom : (theme) =>
                                        `1px solid ${theme.palette.semantic.border.secondary}`,
                                    ...(col.sx || {})
                                }}
                            >
                                {t(col.headerName)}
                            </MiniTableStyled.HeaderCell>
                        ))}
                    </TableRow>
                </MiniTableStyled.HeaderRow>
                <TableBody>
                    {items.length === 0 && !loading && (
                        <MiniTableNoItems
                            colSpan={columns.length}
                            text="common:empty.no_items"
                        />
                    )}
                    {items.map((row, index) => (
                        <MiniTableStyled.Row
                            key={row[keyField] as string}
                            tabIndex={-1}
                            shadow={false}
                            selected={selectedRow === index}
                            hover
                            row_size="normal"
                            onContextMenu={onClickRowHandler(row, index)}
                            onClick={onClickRowHandler(row, index)}
                        >
                            {columns.map((col) => (
                                <MiniTableStyled.Cell
                                    key={col.field}
                                    min_width={col.minWidth}
                                    flex_start
                                    height="34px"
                                    color="#667085"
                                    padding="none"
                                    hasMaxWidth
                                    sx={col.sx}
                                >
                                    {col.renderCell(row, t)}
                                </MiniTableStyled.Cell>
                            ))}
                        </MiniTableStyled.Row>
                    ))}
                </TableBody>
            </MiniTableStyled.CommonTable>
        </MiniTableStyled.Container>
    );
}
