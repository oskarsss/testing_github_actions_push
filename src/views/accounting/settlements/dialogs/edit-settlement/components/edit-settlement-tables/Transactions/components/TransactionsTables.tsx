import Stack from '@mui/material/Stack';
import TransactionTable from '@/views/accounting/settlements/dialogs/edit-settlement/components/edit-settlement-tables/Transactions/components/TransactionTable/TransactionTable';
import RecurringTransactionsTable from '@/views/accounting/settlements/dialogs/edit-settlement/components/edit-settlement-tables/Transactions/components/RecurringTransactionsTable/RecurringTransactionsTable';

export default function TransactionsTables() {
    return (
        <Stack
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            gap="25px"
            height="100%"
        >
            <TransactionTable />

            <RecurringTransactionsTable />
        </Stack>
    );
}
