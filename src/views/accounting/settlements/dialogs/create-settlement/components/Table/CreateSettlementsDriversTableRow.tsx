import type { MouseEvent } from 'react';
import DriversTypes from '@/store/fleet/drivers/types';
import { CreateSettlementsColumn } from '@/views/accounting/settlements/dialogs/create-settlement/components/Table/generateColumns';
import MiniTableStyled from '@/@core/ui-kits/basic/mini-table/MiniTable.styled';
import Checkbox from '@/@core/ui-kits/basic/checkbox/Checkbox';
import MiniTableCells from '@/@core/ui-kits/basic/mini-table/components/MiniTableCells';
import type { MiniTableColumnType } from '@/@core/ui-kits/basic/mini-table/MiniTable.types';

type Props = {
    row: DriversTypes.ConvertedDriverRow;
    columns: CreateSettlementsColumn[];
    onClickRow: (row: DriversTypes.ConvertedDriverRow) => void;
    isChecked: boolean;
    onEditDriver: (row: DriversTypes.ConvertedDriverRow) => void;
};

export default function CreateSettlementsDriversTableRow({
    row,
    columns,
    onClickRow,
    isChecked,
    onEditDriver
}: Props) {
    const handleClickCell = (event: MouseEvent, column: MiniTableColumnType) => {
        if (!['revenueType', 'cycle'].includes(column.field)) {
            return;
        }

        event.stopPropagation();

        onEditDriver(row);
    };

    return (
        <MiniTableStyled.Row
            without_border
            hover
            tabIndex={-1}
            onClick={() => onClickRow(row)}
            onContextMenu={(e) => {
                e.preventDefault();
                onClickRow(row);
            }}
            row_size="normal"
            key={row.driverId}
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
                <Checkbox checked={isChecked} />
            </MiniTableStyled.Cell>

            <MiniTableCells
                columns={columns}
                onClickCell={(event, column) => handleClickCell(event, column)}
                row={row}
                fontSize="large"
            />
        </MiniTableStyled.Row>
    );
}
