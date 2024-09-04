import DriversTypes from '@/store/fleet/drivers/types';
import React from 'react';
import { generateColumns } from '@/views/accounting/settlements/dialogs/create-settlement/components/Table/generateColumns';
import CreateSettlementsDriversTableHead from '@/views/accounting/settlements/dialogs/create-settlement/components/Table/CreateSettlementsDriversTableHead';
import CreateSettlementsDriversTableBody from '@/views/accounting/settlements/dialogs/create-settlement/components/Table/CreateSettlementsDriversTableBody';
import MiniTableStyled from '@/@core/ui-kits/basic/mini-table/MiniTable.styled';

type Props = {
    page: number;
    rowsPerPage: number;
    drivers: DriversTypes.ConvertedDriverRow[];
    selected: DriversTypes.ConvertedDriverRow[];
    setSelected: React.Dispatch<React.SetStateAction<DriversTypes.ConvertedDriverRow[]>>;
};

function CreateSettlementsDriversTable({
    page,
    rowsPerPage,
    drivers,
    selected,
    setSelected
}: Props) {
    return (
        <MiniTableStyled.Container>
            <MiniTableStyled.CommonTable
                size="small"
                width="100%"
                without_border
                stickyHeader
                sx={{
                    borderCollapse: 'initial'
                }}
            >
                <CreateSettlementsDriversTableHead
                    drivers={drivers}
                    selected={selected}
                    setSelected={setSelected}
                    columns={generateColumns}
                />
                <CreateSettlementsDriversTableBody
                    drivers={drivers}
                    selected={selected}
                    setSelected={setSelected}
                    columns={generateColumns}
                    page={page}
                    rowsPerPage={rowsPerPage}
                />
            </MiniTableStyled.CommonTable>
        </MiniTableStyled.Container>
    );
}

export default CreateSettlementsDriversTable;
