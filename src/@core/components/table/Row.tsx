import React, { memo } from 'react';
import TableTypes from '@/@core/components/table/types';
import { SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles/createTheme';
import { useAppSelector } from '@/store/hooks';
import { Row } from './styled/Row';
import Cell from './Cell';

type Props = {
    row: TableTypes.Row & { invoice_status?: string; status?: string };
    cols: TableTypes.ViewColumn[];
    columns: TableTypes.CustomColumns;
    type: 'sticky' | 'sticky_right' | 'normal';
    index: number;
    sticky_background_enabled?: boolean;
    rowHeight: number;
    setCustomRowStyle?: SxProps<Theme>;
    isSticky?: boolean;
};
const RowComponent = ({
    row,
    cols,
    columns,
    type,
    index,
    sticky_background_enabled,
    rowHeight,
    setCustomRowStyle,
    isSticky = false
}: Props) => {
    const selected = useAppSelector((state) => state.table.selectedRow === row.unique_key);
    return (
        <Row
            customRowHeight={rowHeight}
            index={index}
            key={row.unique_key}
            sx={{
                ...setCustomRowStyle,
                ...(selected
                    ? {
                        backgroundColor: (theme) =>

                        // theme.palette.mode === 'light'
                        //     ? '#c7d5fa !important'
                        // :
                            `${theme.palette.semantic.actions.foreground.tertiary} !important`

                        // `${theme.palette.semantic.actions.foreground.tertiary} !important`
                    }
                    : {})
            }}
            className={
                sticky_background_enabled && type === 'sticky'
                    ? `sticky-row ${row.invoice_status ? row.invoice_status : row.status}`
                    : 'regular-row'
            }
        >
            {cols.map((col) => (
                <Cell
                    rowHeight={rowHeight}
                    isSticky={isSticky}
                    key={row.unique_key + col.columnId}
                    unique_key={row.unique_key + col.columnId}
                    rowUniqueKey={row.unique_key}
                    columns={columns}
                    col={col}
                    row={row}
                />
            ))}
        </Row>
    );
};

export default memo(RowComponent);
