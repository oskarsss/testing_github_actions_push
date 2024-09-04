import { MouseEvent } from 'react';
import { FontSize } from '@/@core/ui-kits/basic/mini-table/MiniTable.styled';
import MiniTableCell from './MiniTableCell';
import { MiniTableColumnType } from '../MiniTable.types';

type Props<Row> = {
    columns: MiniTableColumnType[];
    onClickCell: (
        event: MouseEvent<HTMLTableCellElement>,
        column: MiniTableColumnType,
        row: Row
    ) => void;
    fontSize?: FontSize;
    row: Row;
};

export default function MiniTableCells<Row>({
    columns,
    onClickCell,
    row,
    fontSize
}: Props<Row>) {
    return (
        <>
            {columns.map((column) => (
                <MiniTableCell
                    key={column.field}
                    column={column}
                    onClickCell={onClickCell}
                    row={row}
                    fontSize={fontSize}
                />
            ))}
        </>
    );
}
