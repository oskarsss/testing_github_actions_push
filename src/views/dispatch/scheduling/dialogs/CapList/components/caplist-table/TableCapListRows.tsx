import React from 'react';
import { filterTruckI } from '@/views/dispatch/scheduling/dialogs/CapList/helpers';
import MiniTableNoItems from '@/@core/ui-kits/basic/mini-table/components/MiniTableNoItems';
import TableBody from '@mui/material/TableBody';
import columns from '@/views/dispatch/scheduling/dialogs/CapList/components/caplist-table/columns';
import TableCapListRow from '@/views/dispatch/scheduling/dialogs/CapList/components/caplist-table/TableCapListRow';
import moment from 'moment-timezone';

type Props = {
    rows: filterTruckI[];
    onCopyRow: (row: filterTruckI) => void;
};

export default function TableCapListRows({
    rows,
    onCopyRow
}: Props) {
    const sortedRows = rows.sort((a, b) => moment(a.emptyAt).diff(moment(b.emptyAt)));
    console.debug('sortedRows', sortedRows);
    return (
        <TableBody>
            {!sortedRows.length ? (
                <MiniTableNoItems
                    colSpan={columns.length}
                    text="schedule:dialogs.cap_list.table.empty"
                />
            ) : (
                sortedRows.map((row) => (
                    <TableCapListRow
                        key={row.truckId}
                        row={row}
                        onCopyRow={onCopyRow}
                    />
                ))
            )}
        </TableBody>
    );
}
