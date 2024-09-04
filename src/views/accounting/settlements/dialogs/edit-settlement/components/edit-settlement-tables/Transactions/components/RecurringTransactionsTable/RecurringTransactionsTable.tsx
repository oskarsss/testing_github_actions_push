import { useEditSettlementContext } from '@/views/accounting/settlements/dialogs/edit-settlement/EditSettlement';
import Stack from '@mui/material/Stack';
import EditDialogTable from '@/views/accounting/settlements/dialogs/edit-settlement/ui-elements/edit-settlement-table/EditSettlementTable';
import { useEditRecurringTransactionDialog } from '@/views/accounting/recurring-transactions/menus/RecurringTransactionsMenu/Edit/hooks';
import recurring_transactions_columns from '@/views/accounting/settlements/dialogs/edit-settlement/components/edit-settlement-tables/RecurringTransaction/columns';
import { PropsForAction } from '@/views/accounting/settlements/dialogs/edit-settlement/ui-elements/edit-settlement-table/types';
import SettlementsTypes from '@/store/accounting/settlements/types';
import { useMemo } from 'react';
import { formatAmountFormattingToNumber } from '@/utils/formatting';
import { useGetCountTotalsRecurring } from '@/store/accounting/settlements/hooks/recurring-transactions';
import RecurringTransactionsTableHeader from './RecurringTransactionsTableHeader';

export default function RecurringTransactionsTable() {
    const getCountTotalsRecurring = useGetCountTotalsRecurring();
    const editRecurringTransaction = useEditRecurringTransactionDialog();

    const {
        settlement,
        selectedSettlementParams
    } = useEditSettlementContext();

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
        default:
            break;
        }
    };

    return (
        <Stack
            flexDirection="column"
            alignItems="flex-start"
            gap="10px"
            height="100%"
            width="100%"
        >
            <RecurringTransactionsTableHeader />

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
