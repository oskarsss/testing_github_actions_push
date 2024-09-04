import MiniTableStyled from '@/@core/ui-kits/basic/mini-table/MiniTable.styled';
import EditButton from '@/views/accounting/settlements/dialogs/edit-settlement/ui-elements/edit-settlement-table/components/EditButton';
import { Column } from '@/views/accounting/settlements/dialogs/edit-settlement/ui-elements/edit-settlement-table/types';
import { MouseEvent } from 'react';
import { useTheme } from '@mui/material/styles';

type Props<Row> = {
    row: Row;
    columns: Column[];
    onClickCell: (event: MouseEvent<HTMLTableCellElement>, column: Column, row: Row) => void;
    executeAction: (action: string, {
        row,
        event
    }: { row: Row; event: MouseEvent }) => void;
    isDisabledEdit: boolean;
};

export default function EditSettlementCustomRow<Row>({
    columns,
    executeAction,
    onClickCell,
    row,
    isDisabledEdit
}: Props<Row>) {
    const colorText = useTheme().palette.semantic.text;
    return (
        <MiniTableStyled.Row
            hover
            row_size="normal"
        >
            {columns.map((column) => (
                <MiniTableStyled.Cell
                    key={column.field}
                    flex_start={column.flex_start}
                    padding="none"
                    color={column.color ? colorText[column.color] : undefined}
                    min_width={column.minWidth}
                    hasMaxWidth={column.hasMaxWidth}
                    sx={{
                        ...(column.cellStyles || {}),
                        position : 'relative',
                        '&:hover': {
                            '& .EditSettlementEditButton': {
                                display        : 'flex',
                                justifyContent : 'center',
                                visibility     : 'visible',
                                transition     : '0.3s',
                                justifyItems   : 'center',
                                backgroundColor: (theme) => theme.palette.semantic.background.white,
                                padding        : '4px'
                            }
                        }
                    }}
                    onClick={(event) => onClickCell(event, column, row)}
                >
                    {column.renderCell(row)}
                    {column.withEditButton && (
                        <EditButton
                            isDisabledEdit={isDisabledEdit}
                            onClick={(event) =>
                                executeAction('edit', {
                                    row,
                                    event
                                })}
                        />
                    )}
                </MiniTableStyled.Cell>
            ))}
        </MiniTableStyled.Row>
    );
}
