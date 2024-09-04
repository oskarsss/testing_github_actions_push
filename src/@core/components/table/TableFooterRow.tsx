import TableTypes from '@/@core/components/table/types';
import { useTheme } from '@mui/material';
import { getColumn } from './table_config';

type Props = {
    columns: TableTypes.CustomColumns;
    totals: TableTypes.Totals;
    col: TableTypes.ViewColumn;
    mode: 'light' | 'dark';
};

export default function TableFooterRow({
    columns,
    totals,
    col,
    mode
}: Props) {
    const { palette } = useTheme();
    const column = getColumn(col, columns);
    if (!column) {
        // eslint-disable-next-line no-throw-literal
        throw `${col.columnId} not found`;
    }

    return (
        <div
            style={{
                fontSize: '0.875rem',

                display: 'flex',

                flexDirection : 'row',
                justifyContent: 'flex-start',
                alignItems    : 'center',
                fontWeight    : 600,
                borderLeft    : '1px solid #d4d3d524',
                paddingLeft   : '15px',
                margin        : 0,
                width         : col.width ? col.width : column.width,
                minWidth      : col.width ? col.width : column.width,
                maxWidth      : col.width ? col.width : column.width,
                borderRight   : col.borderRight
                    ? `2px solid ${palette.semantic.border.secondary}`
                    : 'none'
            }}
        >
            <p
                style={{
                    textOverflow : 'ellipsis',
                    verticalAlign: 'middle',

                    overflow: 'hidden'
                }}
            >
                {/* eslint-disable-next-line no-prototype-builtins */}
                {totals && totals.hasOwnProperty(col.columnId) ? `${totals[col.columnId]}` : ''}
            </p>
        </div>
    );
}
