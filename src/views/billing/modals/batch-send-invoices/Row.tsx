import MiniTableStyled from '@/@core/ui-kits/basic/mini-table/MiniTable.styled';
import React from 'react';
import { Control, useWatch } from 'react-hook-form';
import columns from './columns';
import { FormValues, OrderFormValues } from '.';

type Props = {
    row: OrderFormValues;
    rowIndex: number;
    setSelectedRow: (value: string) => void;
    isSelected: boolean;
    control: Control<FormValues>;
};

function Row({
    row,
    rowIndex,
    isSelected,
    setSelectedRow,
    control
}: Props) {
    const email = useWatch({
        control,
        name: `orders.${rowIndex}.email`
    });

    const isValid = Boolean(email);
    return (
        <MiniTableStyled.Row
            key={row.orderId}
            without_border
            hover
            row_size="normal"
            onClick={() => setSelectedRow(row.orderId)}
            isSelected={isSelected}
        >
            {columns.map((column) => (
                <MiniTableStyled.Cell
                    fontSize="medium"
                    sx={{
                        ...(column.styles ?? {}),
                        ...(column.getCellStyle ? column.getCellStyle(row) : {}),
                        ...(!isValid && {
                            backgroundColor: (theme) =>
                                theme.palette.utility.foreground.error.tertiary,
                            borderTop: (theme) =>
                                `1px solid ${theme.palette.utility.foreground.error.primary}`,
                            borderBottom: (theme) =>
                                `1px solid ${theme.palette.utility.foreground.error.primary} !important`
                        })
                    }}
                    flex_start={column.flex_start}
                    color={column.color}
                    isAmount={column.isAmount}
                    min_width={column.minWidth}
                    hasMaxWidth={column.hasMaxWidth}
                    onClick={() => {}}
                    onContextMenu={() => {}}
                >
                    {column.renderCell(row, rowIndex)}
                </MiniTableStyled.Cell>
            ))}
        </MiniTableStyled.Row>
    );
}

export default Row;
