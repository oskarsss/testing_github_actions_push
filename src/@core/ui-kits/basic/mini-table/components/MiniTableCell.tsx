import MiniTableStyled, { FontSize } from '@/@core/ui-kits/basic/mini-table/MiniTable.styled';
import { MiniTableColumnType } from '@/@core/ui-kits/basic/mini-table/MiniTable.types';
import { MouseEvent } from 'react';
import { useAppTranslation } from '@/hooks/useAppTranslation';

type Props<Row> = {
    column: MiniTableColumnType;
    onClickCell: (
        event: MouseEvent<HTMLTableCellElement>,
        column: MiniTableColumnType,
        row: Row
    ) => void;
    fontSize?: FontSize;
    row: Row;
};

export default function MiniTableCell<Row>({
    column,
    onClickCell,
    row,
    fontSize
}: Props<Row>) {
    const { t } = useAppTranslation();
    const click = (event: MouseEvent<HTMLTableCellElement>) => onClickCell(event, column, row);

    return (
        <MiniTableStyled.Cell
            fontSize={fontSize}
            sx={{
                ...(column.styles ?? {}),
                ...(column.getCellStyle ? column.getCellStyle(row) : {})
            }}
            flex_start={column.flex_start}
            color={column.color}
            isAmount={column.isAmount}
            min_width={column.minWidth}
            hasMaxWidth={column.hasMaxWidth}
            onClick={click}
            onContextMenu={click}
        >
            {column.renderCell(row, t)}
        </MiniTableStyled.Cell>
    );
}
