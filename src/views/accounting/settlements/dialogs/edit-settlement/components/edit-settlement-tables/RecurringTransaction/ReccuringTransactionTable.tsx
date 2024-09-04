import { Stack } from '@mui/material';
import SettlementRecurringTransactionGrpcService from '@/@grpcServices/services/settlements-service/settlement-recurring-transactions.service';
import SettlementsTypes from '@/store/accounting/settlements/types';
import { useEditRecurringTransactionDialog } from '@/views/accounting/recurring-transactions/menus/RecurringTransactionsMenu/Edit/hooks';
import { useMemo } from 'react';
import { formatAmountFormattingToNumber } from '@/utils/formatting';
import { useGetCountTotalsRecurring } from '@/store/accounting/settlements/hooks/recurring-transactions';
import EditDialogTable from '../../../ui-elements/edit-settlement-table/EditSettlementTable';
import recurring_transactions_columns from './columns';
import { PropsForAction } from '../../../ui-elements/edit-settlement-table/types';
import { useEditSettlementContext } from '../../../EditSettlement';
import RecurringTransactionsHeader from './RecurringTransactionsHeader';

type Props = {
    setMinHeight?: boolean;
};

export default function RecurringTransactionTable({ setMinHeight }: Props) {
    const getCountTotalsRecurring = useGetCountTotalsRecurring();
    const [deleteRecurringTransaction] =
        SettlementRecurringTransactionGrpcService.useDeleteRecurringTransactionMutation();

    const {
        settlement,
        isDisabledEdit,
        driver,
        selectedSettlementParams
    } =
        useEditSettlementContext();

    const editRecurringTransaction = useEditRecurringTransactionDialog();

    const totalsAssign = useMemo(() => {
        if (!settlement.driverRecurringTransactionsInfo?.recurringTransactions) return undefined;

        const transactions = settlement.driverRecurringTransactionsInfo.recurringTransactions.map(
            (transaction) => ({
                amount       : transaction.amount,
                chargedAmount: formatAmountFormattingToNumber(transaction.chargedAmount) || 0
            })
        );

        return getCountTotalsRecurring(transactions);
    }, [
        settlement.driverRecurringTransactionsInfo?.recurringTransactions,
        getCountTotalsRecurring
    ]);

    const executeAction = (
        name: string,
        props: PropsForAction<SettlementsTypes.CycleSettlementDetails.RecurringTransaction>
    ) => {
        switch (name) {
        case 'edit':
            editRecurringTransaction.open({
                category_id      : props.row.categoryId,
                id               : props.row.recurringTransactionId,
                setDialogStyled  : true,
                settlement_id    : settlement.settlementId,
                settlementsParams: {
                    cycleId     : selectedSettlementParams.cycle_id,
                    periodId    : selectedSettlementParams.period_id,
                    settlementId: settlement.settlementId
                }
            });
            break;
        case 'delete':
            deleteRecurringTransaction({
                settlementId          : settlement.settlementId,
                recurringTransactionId: props.row.recurringTransactionId
            });
            break;
        default:
            return null;
        }
    };
    return (
        <Stack
            direction="column"
            spacing={1}
            flex={!setMinHeight ? '1 1 0' : '1 1 200px'}
        >
            <RecurringTransactionsHeader
                driver_id={driver?.driverId || ''}
                first_name={driver?.firstName || ''}
                settlement_id={settlement.settlementId}
                isDisabledEdit={isDisabledEdit}
            />
            <EditDialogTable
                sectionName="driverRecurringTransactionsInfo"
                columnsConfig={recurring_transactions_columns}
                executeAction={executeAction}
                turnOffAssignInfo
                totalsAssign={totalsAssign}
            />
        </Stack>
    );
}
