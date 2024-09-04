import SettlementsTypes from '@/store/accounting/settlements/types';
import { useEditSettlementDialog } from '@/views/accounting/settlements/dialogs/edit-settlement/EditSettlement';
import { Box, Stack, Typography } from '@mui/material';
import { menuHookFabric } from '@/utils/menu-hook-fabric';
import EditSettlementIcons from '@/views/accounting/settlements/dialogs/edit-settlement/edit-settlement-icons';
import MenuComponents from '@/@core/ui-kits/menus';
import MiniTable from '@/@core/ui-kits/basic/mini-table/MiniTable';
import { MiniTableExecuteActionType } from '@/@core/ui-kits/basic/mini-table/MiniTable.types';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { useMemo } from 'react';
import moment from 'moment-timezone';
import { useEditRecurringTransactionsMenu } from '../Edit/hooks';
import columns from './columns';

type Props = {
    transactions: SettlementsTypes.RecurringTransactions.Transaction[];
    totalChargedFormatting: string;
};

export const useTransactionsHistoryTable = menuHookFabric(TransactionsHistoryTable, {
    keepMounted: false
});

function TransactionsHistoryTable({
    transactions,
    totalChargedFormatting
}: Props) {
    const { t } = useAppTranslation();

    const editSettlementDialog = useEditSettlementDialog();
    const editRecurringTransactionsMenu = useEditRecurringTransactionsMenu(true);

    const executeAction: MiniTableExecuteActionType<
        SettlementsTypes.RecurringTransactions.Transaction
    > = (name, props) => {
        editSettlementDialog.open({
            settlement_id: props.row.settlementId,
            cycle_id     : props.row.cycleId,
            period_id    : props.row.periodId
        });
        editRecurringTransactionsMenu.close();
    };

    const transactionsHistory = useMemo(() => {
        const formatFunction = new Intl.NumberFormat('en-US', {
            style   : 'currency',
            currency: 'USD'
        }).format;

        let totalCharged = 0;
        return transactions
            .toSorted((a, b) => moment(a.periodStartDatetime).diff(moment(b.periodStartDatetime)))
            .map((transaction) => {
                totalCharged += transaction.amount;
                return {
                    ...transaction,
                    totalAmountFormatted: formatFunction(totalCharged)
                };
            });
    }, [transactions]);

    return (
        <Box
            width="700px"
            padding="20px"
        >
            <MenuComponents.FormHeader
                text="modals:recurring_transactions.table.title"
                translateOptions={{
                    transactionsAmount: transactions.length,
                    total_charged     : totalChargedFormatting
                }}
            />

            <MiniTable<SettlementsTypes.RecurringTransactions.Transaction>
                columns={columns}
                rows={transactionsHistory}
                turnOffBorder
                fontSize="large"
                elementKey="transactionId"
                executeAction={executeAction}
                emptyStateContent={(
                    <Stack
                        justifyContent="space-between"
                        alignItems="center"
                        padding="16px"
                    >
                        <EditSettlementIcons.Table.Transactions />

                        <Typography
                            fontSize="16px"
                            fontWeight={500}
                            variant="body2"
                        >
                            {t('modals:recurring_transactions.table.empty_state')}
                        </Typography>
                    </Stack>
                )}
            />
        </Box>
    );
}
