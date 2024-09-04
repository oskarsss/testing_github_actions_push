/* eslint-disable array-callback-return */
/* eslint-disable max-len */

import DialogComponents from '@/@core/ui-kits/common-dialog';
import DriversTypes from '@/store/fleet/drivers/types';
import { hookFabric } from '@/utils/dialog-hook-fabric';
import React, { FormEvent, useMemo, useState } from 'react';
import SettlementsGrpcService from '@/@grpcServices/services/settlements-service/settlements.service';
import {
    useAllSettlements,
    useSettlementCycleId,
    useSettlementPeriodId
} from '@/store/accounting/settlements/hooks/settlements';
import { useStableArray } from '@/hooks/useStable';
import { useMainDrivers } from '@/store/fleet/drivers/hooks';
import CreateSettlementHeader from '@/views/accounting/settlements/dialogs/create-settlement/components/CreateSettlementHeader';
import CreateSettlementsDriversTablePagination from '@/views/accounting/settlements/dialogs/create-settlement/components/Table/CreateSettlementsDriversTablePagination';
import { Stack } from '@mui/material';
import CreateSettlementsDriversTable from './components/Table/CreateSettlementsDriversTable';

export const useCreateSettlementDialog = hookFabric(CreateSettlementDialog, (props) => (
    <DialogComponents.DialogWrapper
        maxWidth="800px"
        DialogProps={{
            sx: {
                overflow: 'hidden'
            }
        }}
        turnOffCloseButton
        {...props}
    />
));

function CreateSettlementDialog() {
    const { driversList } = useMainDrivers();

    const cycle_id = useSettlementCycleId();
    const period_id = useSettlementPeriodId();
    const createSettlementDialog = useCreateSettlementDialog(true);
    const [trigger, { isLoading }] = SettlementsGrpcService.useCreateSettlementsMutation();

    const [search, setSearch] = useState('');
    const [selected, setSelected] = useState<DriversTypes.ConvertedDriverRow[]>([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const { data: settlementsData } = useAllSettlements();
    const settlements = useStableArray(settlementsData?.settlements);

    const driverWithSettlementsMap = useMemo(() => {
        if (!driversList.length) return null;
        return driversList.reduce((acc, driver) => {
            if (settlements.some((settlement) => settlement.driverId === driver.driverId)) {
                acc[driver.driverId] = true;
            } else {
                acc[driver.driverId] = false;
            }
            return acc;
        }, {} as Record<string, boolean>);
    }, [settlements, driversList]);

    const createSettlement = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        trigger({
            settlements: selected.map((driver) => ({
                driverId: driver.driverId,
                cycleId : cycle_id,
                periodId: period_id
            }))
        }).then(() => {
            createSettlementDialog.close();
        });
    };

    const drivers_options = useMemo(() => {
        if (!driversList || !driverWithSettlementsMap) return [];
        return driversList.filter(
            (driver) =>
                driver.status !== 'deleted' &&
                driver.settlementCycleId === cycle_id &&

                // driver.truck_primary_driver &&
                `${driver.firstName} ${driver.lastName} ${driver.truck?.referenceId || ''}`
                    .toLowerCase()
                    .includes(search.toLowerCase()) &&
                !driverWithSettlementsMap[driver.driverId]
        );
    }, [driversList, cycle_id, search, driverWithSettlementsMap]);

    const handleChangeSearch = (search: string) => {
        setSearch(search);
        setPage(0);
    };

    return (
        <DialogComponents.Form
            onSubmit={createSettlement}
            style={{
                display      : 'flex',
                flexDirection: 'column'
            }}
        >
            <CreateSettlementHeader
                search={search}
                setSearch={handleChangeSearch}
            />

            <Stack
                minHeight="400px"
                maxHeight="400px"
                justifyContent="space-between"
            >
                <CreateSettlementsDriversTable
                    page={page}
                    rowsPerPage={rowsPerPage}
                    selected={selected}
                    setSelected={setSelected}
                    drivers={drivers_options}
                />

                <CreateSettlementsDriversTablePagination
                    count={drivers_options.length}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    setPage={setPage}
                    setRowsPerPage={setRowsPerPage}
                />
            </Stack>

            <DialogComponents.ActionsWrapper>
                <DialogComponents.CancelButton onCancel={createSettlementDialog.close} />
                <DialogComponents.SubmitButton
                    loading={isLoading}
                    disabled={!selected.length}
                    text="modals:settlements.create_settlement.buttons.submit"
                    translationOptions={{ count: selected.length }}
                />
            </DialogComponents.ActionsWrapper>
        </DialogComponents.Form>
    );
}
