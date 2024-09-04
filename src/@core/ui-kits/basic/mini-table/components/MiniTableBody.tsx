import MiniTableCells from '@/@core/ui-kits/basic/mini-table/components/MiniTableCells';
import MiniTableStyled, { FontSize } from '@/@core/ui-kits/basic/mini-table/MiniTable.styled';
import { MouseEvent, ReactElement, ReactNode, useCallback, useState } from 'react';
import {
    MiniTableColumnType,
    MiniTableExecuteActionType
} from '@/@core/ui-kits/basic/mini-table/MiniTable.types';
import MiniTableNoItems from '@/@core/ui-kits/basic/mini-table/components/MiniTableNoItems';
import TableBody from '@mui/material/TableBody';
import type { IntlMessageKey } from '@/@types/next-intl';

type Props<Row extends Record<string, any>> = {
    rows: Row[];
    elementKey: keyof Row;
    columns: MiniTableColumnType[];
    executeAction: MiniTableExecuteActionType<Row>;
    ComponentAfterContent?: ReactNode;
    turnOffBorder?: boolean;
    fontSize?: FontSize;
    emptyStateText?: IntlMessageKey | ReactElement;
    emptyStateContent?: ReactNode;
};

export default function MiniTableBody<Row extends Record<string, any>>({
    rows,
    elementKey,
    columns,
    executeAction,
    ComponentAfterContent,
    turnOffBorder,
    fontSize,
    emptyStateText,
    emptyStateContent
}: Props<Row>) {
    const [selectedRowKey, setSelectedRowKey] = useState('');

    const onClick = useCallback(
        (event: MouseEvent<HTMLTableCellElement>, column: MiniTableColumnType<Row>, row: Row) => {
            setSelectedRowKey(row[elementKey]);
            if (column.onClick) {
                column.onClick(row, {
                    executeAction,
                    event
                });
            }
        },
        [elementKey, executeAction]
    );

    return (
        <TableBody>
            {!rows.length ? (
                <MiniTableNoItems
                    colSpan={columns.length}
                    text={emptyStateText}
                    customNoItemContent={emptyStateContent}
                />
            ) : (
                rows.map((row) => (
                    <MiniTableStyled.Row
                        key={row[elementKey]}
                        without_border={turnOffBorder}
                        hover
                        row_size="normal"
                        isSelected={selectedRowKey === row[elementKey]}
                    >
                        <MiniTableCells
                            fontSize={fontSize}
                            columns={columns}
                            row={row}
                            onClickCell={onClick}
                        />
                    </MiniTableStyled.Row>
                ))
            )}

            {ComponentAfterContent}
        </TableBody>
    );
}
