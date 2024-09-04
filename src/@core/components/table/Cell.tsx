import { getColumn } from '@/@core/components/table/table_config';
import { CellStyled } from '@/@core/components/table/styled/Row';
import { memo, MouseEvent, useMemo } from 'react';
import { useTableContext } from '@/@core/components/table/contexts/TableContext';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { TableActions } from '@/store/table/slice';
import TableTypes from '@/@core/components/table/types';
import { useTheme } from '@mui/material';

type Props = {
    unique_key: string;
    col: TableTypes.ViewColumn;
    columns: TableTypes.CustomColumns;
    row: TableTypes.Row;
    rowUniqueKey: string;
    isSticky?: boolean;
    rowHeight: number;
};
const Cell = ({
    unique_key,
    col,
    columns,
    row,
    rowUniqueKey,
    isSticky = false,
    rowHeight
}: Props) => {
    const { t } = useAppTranslation();
    const dispatch = useAppDispatch();

    const { onClick } = useTableContext();
    const theme = useTheme();

    const selected = useAppSelector((state) => state.table.selected_cell === unique_key);

    const setSelectedCell = () => {
        dispatch(TableActions.SelectCell(unique_key));
    };

    const setSelectedRow = () => {
        dispatch(TableActions.SelectRow(rowUniqueKey));
    };

    const cell = useMemo(() => {
        const cell_c = getColumn(col, columns);
        if (!cell_c) {
            // eslint-disable-next-line no-throw-literal
            throw `${col.name} not found`;
        }

        return cell_c;
    }, [col, columns]);

    const class_and_style = useMemo(
        () => ({
            className: `row-hover ${cell.getClassName ? cell.getClassName(row) : ''} ${
                selected ? 'cell-selected' : col.borderRight && 'cell'
            }`,
            style: {
                margin  : 0,
                width   : col.width ? col.width : cell.width,
                minWidth: col.width ? col.width : cell.width,
                maxWidth: col.width ? col.width : cell.width,
                ...cell.style,
                ...(cell.getCellStyle ? cell.getCellStyle(row, { selected, theme }) : {})
            }
        }),
        [cell, col, row, selected, theme]
    );

    const renderedCell = useMemo(
        () =>
            cell.renderCell(row, {
                executeAction: onClick,
                selected,
                t,
                rowHeight
            }),
        [cell, row, onClick, selected, t, rowHeight]
    );

    const onPressClick = (event: MouseEvent<unknown>) => {
        setSelectedCell();
        setSelectedRow();

        if (cell.onClick) {
            cell.onClick(row, {
                executeAction: onClick,
                col,
                event
            });
        }
    };

    const onContextMenu = (event: MouseEvent<unknown>) => {
        setSelectedCell();
        setSelectedRow();

        if (cell.onClick) {
            event.preventDefault();
            cell.onClick(row, {
                executeAction: onClick,
                col,
                event
            });
        }
    };

    return (
        <CellStyled
            isSticky={isSticky}
            className={class_and_style.className}
            style={class_and_style.style}
            onClick={onPressClick}
            onContextMenu={onContextMenu}
        >
            {renderedCell}
        </CellStyled>
    );
};

export default memo(Cell);
