import TableEditorIcons from '@/@core/components/table/TableEditor/icons';
import Documents from '@/store/documents/types';
import { ExecuteAction } from '@/views/settings/components/Table/types';
import { IconButton } from '@mui/material';
import { DraggableProvided } from 'react-beautiful-dnd';
import MiniTableStyled from '@/@core/ui-kits/basic/mini-table/MiniTable.styled';
import { MiniTableColumnType } from '@/@core/ui-kits/basic/mini-table/MiniTable.types';
import { MouseEvent } from 'react';
import MiniTableCells from '@/@core/ui-kits/basic/mini-table/components/MiniTableCells';

type Props = {
    columns: MiniTableColumnType[];
    isEnableDrag: boolean;
    row: Documents.DocumentType;
    dragHandleProps: DraggableProvided['dragHandleProps'];
    executeAction: ExecuteAction<Documents.DocumentType>;
};

export default function TableRowContent({
    columns,
    isEnableDrag,
    row,
    dragHandleProps,
    executeAction
}: Props) {
    const clickHandler = (
        event: MouseEvent<HTMLTableCellElement>,
        column: MiniTableColumnType<Documents.DocumentType>,
        row: Documents.DocumentType
    ) => {
        event.stopPropagation();
        if (column.onClick) {
            column.onClick(row, {
                event,
                executeAction
            });
        }
    };

    return (
        <>
            {isEnableDrag && (
                <MiniTableStyled.Cell
                    padding="checkbox"
                    style={{
                        width: '30px'
                    }}
                >
                    <IconButton
                        {...dragHandleProps}
                        sx={{
                            cursor: 'grab !important'
                        }}
                        size="small"
                    >
                        <TableEditorIcons.ColumnName />
                    </IconButton>
                </MiniTableStyled.Cell>
            )}

            <MiniTableCells
                columns={columns}
                onClickCell={clickHandler}
                row={row}
                fontSize="medium"
            />
        </>
    );
}
