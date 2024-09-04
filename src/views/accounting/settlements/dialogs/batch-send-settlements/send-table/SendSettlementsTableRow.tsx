import MiniTableStyled from '@/@core/ui-kits/basic/mini-table/MiniTable.styled';
import React from 'react';
import { useWatch } from 'react-hook-form';
import { SettlementSendBatchPreviewReply_Preview } from '@proto/settlements';
import columns from './columns';
import { useBatchSendSettlementsForm } from '../BatchSendSettlements';

type Props = {
    row: SettlementSendBatchPreviewReply_Preview;
    rowIndex: number;
    setSelectedRow: (value: string) => void;
    isSelected: boolean;
};

function SendSettlementsTableRow({
    row,
    rowIndex,
    isSelected,
    setSelectedRow
}: Props) {
    const { control } = useBatchSendSettlementsForm();
    const email = useWatch({
        control,
        name: `sends.${rowIndex}.email`
    });
    const phone = useWatch({
        control,
        name: `sends.${rowIndex}.phoneNumber`
    });

    const isValid = email || phone;
    return (
        <MiniTableStyled.Row
            key={row.settlementId}
            without_border
            hover
            row_size="normal"
            onClick={() => setSelectedRow(row.settlementId)}
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

export default SendSettlementsTableRow;
