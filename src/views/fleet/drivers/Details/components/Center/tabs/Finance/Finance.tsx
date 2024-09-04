/* eslint-disable max-len */

import SettlementsTypes from '@/store/accounting/settlements/types';
import DriversTypes from '@/store/fleet/drivers/types';
import { useEditRecurringTransactionDialog } from '@/views/accounting/recurring-transactions/menus/RecurringTransactionsMenu/Edit/hooks';
import { useEditSettlementDialog } from '@/views/accounting/settlements/dialogs/edit-settlement/EditSettlement';
import EditSettlementIcons from '@/views/accounting/settlements/dialogs/edit-settlement/edit-settlement-icons';
import { EditSettlementTableView } from '@/views/accounting/settlements/dialogs/edit-settlement/ui-elements/edit-settlement-table/EditSettlementTable';
import { PropsForAction } from '@/views/accounting/settlements/dialogs/edit-settlement/ui-elements/edit-settlement-table/types';
import RecurringTransactionsHeader from '@/views/accounting/settlements/dialogs/edit-settlement/components/edit-settlement-tables/RecurringTransaction/RecurringTransactionsHeader';
import recurring_transactions_columns from '@/views/accounting/settlements/dialogs/edit-settlement/components/edit-settlement-tables/RecurringTransaction/columns';
import SettlementsHistory from '@/views/accounting/settlements/dialogs/edit-settlement/components/settlements-history/SettlementsHistory';
import EditSettlement from '@/views/accounting/settlements/dialogs/edit-settlement/styled';
import { Stack } from '@mui/material';
import SettlementsGrpcService from '@/@grpcServices/services/settlements-service/settlements.service';
import { useStableArray } from '@/hooks/useStable';
import SettlementRecurringTransactionGrpcService from '@/@grpcServices/services/settlements-service/settlement-recurring-transactions.service';
import { useMemo } from 'react';
import createMap from '@/utils/create-map';
import { useGetCountTotalsRecurring } from '@/store/accounting/settlements/hooks/recurring-transactions';

type Props = {
    driver: DriversTypes.Driver;
};

export default function Finance({ driver }: Props) {
    const getCountTotalsRecurring = useGetCountTotalsRecurring();
    const editSettlementDialog = useEditSettlementDialog();
    const getSettlementsState = SettlementsGrpcService.useGetSettlementsQuery({
        driverId: driver.driverId
    });

    const settlements = useStableArray(getSettlementsState.data?.settlements);
    const getRecurringTransactionsState =
        SettlementRecurringTransactionGrpcService.useGetRecurringTransactionsQuery({
            driverId: driver.driverId
        });

    const recurringTransactions = useMemo(() => {
        if (!getRecurringTransactionsState.data) return [];
        const driverTransactionsMap = createMap(
            getRecurringTransactionsState.data.drivers[0]?.transactions || [],
            'recurringTransactionId'
        );

        return getRecurringTransactionsState.data.recurringTransactions.map((rt) => ({
            ...rt,
            chargedAmount:
                driverTransactionsMap[rt.recurringTransactionId]?.totalChargedFormatted || ''
        }));
    }, [getRecurringTransactionsState.data]);

    const totalsAssign = useMemo(() => {
        if (!getRecurringTransactionsState.data?.drivers[0]?.transactions) return undefined;

        const transactions = getRecurringTransactionsState.data.drivers[0].transactions.map(
            (transaction) => ({
                amount       : transaction.amount,
                chargedAmount: transaction.totalCharged || 0
            })
        );

        return getCountTotalsRecurring(transactions);
    }, [getCountTotalsRecurring, getRecurringTransactionsState.data?.drivers]);

    const onSelectSettlement = (settlement_id: string, period_id: string, cycle_id: string) => {
        editSettlementDialog.open({
            settlement_id,
            cycle_id,
            period_id
        });
    };

    const [deleteRecurringTransaction] =
        SettlementRecurringTransactionGrpcService.useDeleteRecurringTransactionMutation();

    const editRecurringTransaction = useEditRecurringTransactionDialog();

    const executeAction = (
        name: string,
        props: PropsForAction<SettlementsTypes.CycleSettlementDetails.RecurringTransaction>
    ) => {
        switch (name) {
        case 'edit':
            editRecurringTransaction.open({
                category_id    : props.row.categoryId,
                id             : props.row.recurringTransactionId,
                setDialogStyled: true,
                driver_id      : driver.driverId
            });

            break;
        case 'delete':
            deleteRecurringTransaction({
                recurringTransactionId: props.row.recurringTransactionId,
                driverId              : driver.driverId
            });
            break;
        default:
            return null;
        }
    };

    return (
        <Stack
            direction="column"
            padding="16px"
            gap="16px"
        >
            <Stack
                flex="1 1 300px"
                direction="column"
            >
                <RecurringTransactionsHeader
                    driver_id={driver.driverId}
                    first_name={driver.firstName}
                />
                <EditSettlementTableView
                    style={{
                        paddingTop: '10px'
                    }}
                    columnsConfig={recurring_transactions_columns}
                    executeAction={executeAction}
                    sectionName="driverRecurringTransactionsInfo"
                    assigned={recurringTransactions}
                    unassigned={[]}
                    isDisabledEdit={false}
                    isEmptySection={!recurringTransactions.length}
                    totalsAssign={totalsAssign}
                />
            </Stack>
            <Stack
                flex="1 1 300px"
                direction="column"
            >
                <EditSettlement.SectionHeader
                    title="common:settlement_history"
                    Icon={<EditSettlementIcons.DriverSettlementHistory />}
                />
                <SettlementsHistory
                    other_settlements={settlements}
                    onSelectSettlement={onSelectSettlement}
                />
            </Stack>
        </Stack>
    );
}
