import CreateSettlementsDriversTableRow from '@/views/accounting/settlements/dialogs/create-settlement/components/Table/CreateSettlementsDriversTableRow';
import { TableBody } from '@mui/material';
import React from 'react';
import DriversTypes from '@/store/fleet/drivers/types';
import { CreateSettlementsColumn } from '@/views/accounting/settlements/dialogs/create-settlement/components/Table/generateColumns';
import MiniTableNoItems from '@/@core/ui-kits/basic/mini-table/components/MiniTableNoItems';
import { useEditDriverDialog } from '@/views/fleet/drivers/dialogs/EditDriver/EditDriver';

type Props = {
    drivers: DriversTypes.ConvertedDriverRow[];
    columns: CreateSettlementsColumn[];
    selected: DriversTypes.ConvertedDriverRow[];
    page: number;
    rowsPerPage: number;
    setSelected: React.Dispatch<React.SetStateAction<DriversTypes.ConvertedDriverRow[]>>;
};

export default function CreateSettlementsDriversTableBody({
    drivers,
    columns,
    selected,
    page,
    rowsPerPage,
    setSelected
}: Props) {
    const onClickRow = (row: DriversTypes.ConvertedDriverRow) => {
        setSelected((prev) => {
            if (prev.some((item) => item.driverId === row.driverId)) {
                return prev.filter((item) => item.driverId !== row.driverId);
            }

            return [...prev, row];
        });
    };
    const { open } = useEditDriverDialog();

    const handleEditDriver = (row: DriversTypes.ConvertedDriverRow) => {
        open({ driver_id: row.driverId });
    };

    return (
        <TableBody>
            {drivers.length > 0 ? (
                drivers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                    <CreateSettlementsDriversTableRow
                        key={row.driverId}
                        row={row}
                        columns={columns}
                        onClickRow={onClickRow}
                        isChecked={selected.some((item) => item.driverId === row.driverId)}
                        onEditDriver={handleEditDriver}
                    />
                ))
            ) : (
                <MiniTableNoItems
                    colSpan={columns.length + 1}
                    text="common:empty.no_drivers"
                />
            )}
        </TableBody>
    );
}
