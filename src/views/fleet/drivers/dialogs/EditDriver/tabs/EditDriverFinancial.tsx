import { useEditSettlementDialog } from '@/views/accounting/settlements/dialogs/edit-settlement/EditSettlement';
import DriversTypes from '@/store/fleet/drivers/types';
import { Stack } from '@mui/material';
import { EditSettlementTableView } from '@/views/accounting/settlements/dialogs/edit-settlement/ui-elements/edit-settlement-table/EditSettlementTable';
import recurring_transactions_columns from '@/views/accounting/settlements/dialogs/edit-settlement/components/edit-settlement-tables/RecurringTransaction/columns';
import SettlementsHistory from '@/views/accounting/settlements/dialogs/edit-settlement/components/settlements-history/SettlementsHistory';
import EditSettlement from '@/views/accounting/settlements/dialogs/edit-settlement/styled';
import EditSettlementIcons from '@/views/accounting/settlements/dialogs/edit-settlement/edit-settlement-icons';
import RecurringTransactionsHeader from '@/views/accounting/settlements/dialogs/edit-settlement/components/edit-settlement-tables/RecurringTransaction/RecurringTransactionsHeader';
import { useEditRecurringTransactionDialog } from '@/views/accounting/recurring-transactions/menus/RecurringTransactionsMenu/Edit/hooks';
import SettlementsTypes from '@/store/accounting/settlements/types';
import { PropsForAction } from '@/views/accounting/settlements/dialogs/edit-settlement/ui-elements/edit-settlement-table/types';
import SettlementsGrpcService from '@/@grpcServices/services/settlements-service/settlements.service';
import { useStableArray } from '@/hooks/useStable';
import SettlementRecurringTransactionGrpcService from '@/@grpcServices/services/settlements-service/settlement-recurring-transactions.service';
import { useMemo } from 'react';
import createMap from '@/utils/create-map';
import { useGetCountTotalsRecurring } from '@/store/accounting/settlements/hooks/recurring-transactions';

type Props = {
    driver: DriversTypes.Driver;
};

export default function EditTruckFinancial({ driver }: Props) {
    const editSettlementDialog = useEditSettlementDialog();
    const getCountTotalsRecurring = useGetCountTotalsRecurring();

    const onSelectSettlement = (settlement_id: string, period_id: string, cycle_id: string) => {
        editSettlementDialog.open({
            settlement_id,
            cycle_id,
            period_id
        });
    };
    const { data } = SettlementsGrpcService.useGetSettlementsQuery(
        { driverId: driver?.driverId || '' },
        { skip: !driver }
    );

    const { data: rtData } =
        SettlementRecurringTransactionGrpcService.useGetRecurringTransactionsQuery({
            driverId: driver.driverId
        });

    const recurringTransactions = useMemo(() => {
        if (!rtData) return [];
        const driverTransactionsMap = createMap(
            rtData.drivers[0]?.transactions || [],
            'recurringTransactionId'
        );

        return rtData.recurringTransactions.map((rt) => ({
            ...rt,
            chargedAmount:
                driverTransactionsMap[rt.recurringTransactionId]?.totalChargedFormatted || ''
        }));
    }, [rtData]);

    const totalsAssign = useMemo(() => {
        if (!rtData?.drivers[0]?.transactions) return undefined;

        const transactions = rtData.drivers[0].transactions.map((transaction) => ({
            amount       : transaction.amount,
            chargedAmount: transaction.totalCharged || 0
        }));

        return getCountTotalsRecurring(transactions);
    }, [getCountTotalsRecurring, rtData?.drivers]);

    const settlements = useStableArray(data?.settlements);

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
            direction="row"
            flex="1 1 0"
            padding="16px"
            gap="16px"
        >
            <Stack
                flex="1 1 0"
                direction="column"
            >
                <div style={{ marginBottom: '10px' }}>
                    <RecurringTransactionsHeader
                        driver_id={driver.driverId}
                        first_name={driver.firstName}
                    />
                </div>
                <EditSettlementTableView
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
                flex="1 1 0"
                direction="column"
                overflow="hidden"
            >
                <div style={{ marginBottom: '12px' }}>
                    <EditSettlement.SectionHeader
                        title="common:settlement_history"
                        Icon={<EditSettlementIcons.DriverSettlementHistory />}
                    />
                </div>
                <SettlementsHistory
                    other_settlements={settlements}
                    onSelectSettlement={onSelectSettlement}
                />
            </Stack>
        </Stack>
    );
}
