import columns from '@/views/dispatch/scheduling/dialogs/CapList/components/caplist-table/columns';
import Tooltip from '@mui/material/Tooltip';
import React from 'react';
import { filterTruckI } from '@/views/dispatch/scheduling/dialogs/CapList/helpers';
import MiniTableStyled from '@/@core/ui-kits/basic/mini-table/MiniTable.styled';
import { useAppTranslation } from '@/hooks/useAppTranslation';

type Props = {
    row: filterTruckI;
    onCopyRow: (row: filterTruckI) => void;
};

export default function TableCapListRow({
    row,
    onCopyRow
}: Props) {
    const [hover, setHover] = React.useState(false);
    const { t } = useAppTranslation();

    const handleCopyRow = () => {
        if (!hover) return;
        onCopyRow(row);
    };

    const onMouseLeave = () => {
        setHover(false);
    };

    const onMouseEnter = (fieldName?: string) => () => {
        if (fieldName !== 'note') {
            setHover(true);
        }
    };

    return (
        <Tooltip
            title={t('schedule:dialogs.cap_list.table.copy_row')}
            key={row.truckId}
            open={hover}
            disableHoverListener
        >
            <MiniTableStyled.Row
                key={row.truckId}
                without_border
                hover
                row_size="normal"
                onClick={handleCopyRow}
            >
                {columns.map((column) => (
                    <MiniTableStyled.Cell
                        key={column.field}
                        fontSize="medium"
                        sx={{
                            ...(column.styles ?? {}),
                            ...(column.getCellStyle ? column.getCellStyle(row) : {})
                        }}
                        flex_start
                        color={column.color}
                        min_width={column.minWidth}
                        onMouseEnter={onMouseEnter(column.field)}
                        onMouseLeave={onMouseLeave}
                    >
                        {column.renderCell(row, t)}
                    </MiniTableStyled.Cell>
                ))}
            </MiniTableStyled.Row>
        </Tooltip>
    );
}
