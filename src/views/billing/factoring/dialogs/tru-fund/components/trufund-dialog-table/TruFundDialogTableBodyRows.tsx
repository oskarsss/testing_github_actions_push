import MiniTableStyled from '@/@core/ui-kits/basic/mini-table/MiniTable.styled';
import Checkbox from '@/@core/ui-kits/basic/checkbox/Checkbox';
import React, { Dispatch, MouseEvent, SetStateAction } from 'react';
import {
    MiniTableColumnType,
    MiniTableExecuteActionType
} from '@/@core/ui-kits/basic/mini-table/MiniTable.types';
import MiniTableCells from '@/@core/ui-kits/basic/mini-table/components/MiniTableCells';
import {
    checkInvalidRow,
    TruFundInvoice
} from '@/views/billing/factoring/dialogs/tru-fund/helpers';
import columns from './columns';

type Props = {
    selected: TruFundInvoice[];
    setSelected: Dispatch<SetStateAction<TruFundInvoice[]>>;
    executeAction: MiniTableExecuteActionType<TruFundInvoice>;
    invoices: TruFundInvoice[];
};

export default function TruFundDialogTableBodyRows({
    invoices,
    selected,
    setSelected,
    executeAction
}: Props) {
    const onClickCell = (
        event: MouseEvent<HTMLTableCellElement>,
        column: MiniTableColumnType<TruFundInvoice>,
        row: TruFundInvoice
    ) => {
        if (column.onClick) {
            column.onClick(row, {
                executeAction,
                event
            });
        }
    };

    const onClickRow = (row: TruFundInvoice) => {
        if (checkInvalidRow(row)) return;
        setSelected((prev) => {
            if (prev.some((item) => item.loadId === row.loadId)) {
                return prev.filter((item) => item.loadId !== row.loadId);
            }
            return [...prev, row];
        });
    };

    const indexRowFirstError = invoices.findIndex((i) => i.hasErrors);

    return (
        <>
            {invoices.map((row, index) => (
                <MiniTableStyled.Row
                    key={row.loadId}
                    without_border
                    hover={!checkInvalidRow(row)}
                    sx={{
                        cursor: checkInvalidRow(row) ? 'default' : 'pointer',
                        td    : {
                            borderBottomColor: (theme) =>
                                indexRowFirstError > 0 && index + 1 === indexRowFirstError
                                    ? `${theme.palette.utility.foreground.warning.primary} !important`
                                    : undefined,
                            cursor: checkInvalidRow(row) ? 'default' : 'pointer'
                        }
                    }}
                    tabIndex={-1}
                    onClick={() => onClickRow(row)}
                    onContextMenu={(e) => {
                        e.preventDefault();
                        onClickRow(row);
                    }}
                    row_size="normal"
                >
                    <MiniTableStyled.Cell
                        align="left"
                        fontSize="large"
                        padding="checkbox"
                        hasMaxWidth
                        flex_start
                        min_width={40}
                        sx={{ padding: '0px 12px !important' }}
                    >
                        <Checkbox
                            checked={selected.some((i) => i.loadId === row.loadId)}
                            disabled={checkInvalidRow(row)}
                        />
                    </MiniTableStyled.Cell>

                    <MiniTableCells
                        columns={columns}
                        onClickCell={onClickCell}
                        row={row}
                        fontSize="large"
                    />
                </MiniTableStyled.Row>
            ))}
        </>
    );
}
