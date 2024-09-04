import SettlementsTypes from '@/store/accounting/settlements/types';
import EditSettlementIcons from '@/views/accounting/settlements/dialogs/edit-settlement/edit-settlement-icons';
import { Button, Stack, Typography } from '@mui/material';
import { MouseEvent } from 'react';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { useTransactionsHistoryTable } from './TransactionsHistoryTable';

type Props = {
    transactions: SettlementsTypes.RecurringTransactions.Transaction[];
    totalChargedFormatting?: string;
};

export default function TotalLine({
    transactions,
    totalChargedFormatting = ''
}: Props) {
    const { t } = useAppTranslation();
    const transactionsHistoryTableMenu = useTransactionsHistoryTable();

    const handleClick = (event: MouseEvent<HTMLElement>) => {
        transactionsHistoryTableMenu.open({
            transactions,
            totalChargedFormatting
        })(event);
    };
    return (
        <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
        >
            <Stack direction="row">
                <Typography
                    variant="body1"
                    fontSize={16}
                    color="textSecondary"
                    fontWeight={400}
                >
                    {t('modals:recurring_transactions.total_line.total_charged')}&nbsp;
                </Typography>
                <Typography
                    variant="body1"
                    fontSize={16}
                    color="textSecondary"
                    fontWeight={500}
                >
                    {totalChargedFormatting}
                </Typography>
            </Stack>
            <Button
                onClick={handleClick}
                startIcon={<EditSettlementIcons.DriverSettlementHistory />}
                variant="text"
            >
                {t('modals:recurring_transactions.total_line.transactions_history')}
            </Button>
        </Stack>
    );
}
