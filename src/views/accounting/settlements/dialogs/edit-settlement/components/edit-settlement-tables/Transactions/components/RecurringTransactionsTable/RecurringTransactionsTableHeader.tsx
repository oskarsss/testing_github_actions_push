import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Stack from '@mui/material/Stack';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { useCreateRecurringTransactionDialog } from '@/views/accounting/recurring-transactions/menus/RecurringTransactionsMenu/Add/CreateRecurringTrasaction';
import { useEditSettlementContext } from '@/views/accounting/settlements/dialogs/edit-settlement/EditSettlement';

export default function RecurringTransactionsTableHeader() {
    const { t } = useAppTranslation();
    const createRecurringTransactionDialog = useCreateRecurringTransactionDialog();

    const {
        settlement,
        driver,
        selectedSettlementParams,
        isDisabledEdit
    } =
        useEditSettlementContext();

    const openAddRecurringTransactionDialog = () => {
        if (!driver) return;

        createRecurringTransactionDialog.open({
            category_type  : 'debit',
            setDialogStyled: true,
            category_id    : '',
            driver         : {
                id  : driver.driverId,
                name: `${driver.firstName} ${driver.lastName}`
            },
            settlementsParams: {
                cycleId     : selectedSettlementParams.cycle_id,
                periodId    : selectedSettlementParams.period_id,
                settlementId: settlement.settlementId
            },
            enableChangeType: true
        });
    };

    return (
        <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
            height="30px"
        >
            <Typography
                variant="body1"
                fontWeight="600"
                lineHeight="20px"
                display="flex"
                alignItems="center"
                justifyContent="space-between"
            >
                {t('modals:settlements.edit_settlement.tabs.transactions.table.header.title')}
            </Typography>

            <Button
                onClick={openAddRecurringTransactionDialog}
                startIcon={<AddIcon />}
                disabled={isDisabledEdit}
            >
                {t('common:button.add')}
            </Button>
        </Stack>
    );
}
