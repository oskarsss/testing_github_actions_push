import { useAppTranslation } from '@/hooks/useAppTranslation';
import EditSettlementIcons from '@/views/accounting/settlements/dialogs/edit-settlement/edit-settlement-icons';
import { Stack, Typography } from '@mui/material';

export default function TransactionsHistoryHeader() {
    const { t } = useAppTranslation();
    return (
        <Stack
            direction="row"
            gap="5px"
            alignItems="center"
        >
            <EditSettlementIcons.Section.Transactions />

            <Typography
                fontSize="18px"
                fontWeight={700}
                color="semantic.text.primary"
            >
                {t('common:profile.center.title.transactions_history')}
            </Typography>
        </Stack>
    );
}
