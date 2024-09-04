/* eslint-disable max-len */
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Button, useTheme } from '@mui/material';
import EditSettlementIcons from '@/views/accounting/settlements/dialogs/edit-settlement/edit-settlement-icons';
import EditDialogTable from '@/views/accounting/settlements/dialogs/edit-settlement/ui-elements/edit-settlement-table/EditSettlementTable';
import { PropsForAction } from '@/views/accounting/settlements/dialogs/edit-settlement/ui-elements/edit-settlement-table/types';
import SettlementsTypes from '@/store/accounting/settlements/types';
import { useEditTransactionDialog } from '@/views/accounting/settlements/dialogs/edit-settlement/components/edit-settlement-tables/Transactions/dialogs/EditTransactionDialog';
import { useCreateTransactionDialog } from '@/views/accounting/settlements/dialogs/edit-settlement/components/edit-settlement-tables/Transactions/dialogs/AddTransactionDialog';
import { useEditSettlementContext } from '@/views/accounting/settlements/dialogs/edit-settlement/EditSettlement';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import transaction_regular_columns from './transaction_regular_columns';

export default function TransactionTable() {
    const { palette } = useTheme();
    const { t } = useAppTranslation();
    const {
        settlement,
        selectedSettlementParams,
        isDisabledEdit
    } = useEditSettlementContext();

    const editTransactionMenu = useEditTransactionDialog();
    const createTransactionMenu = useCreateTransactionDialog();

    const addTransaction = (type: 'credit' | 'debit') => {
        createTransactionMenu.open({
            settlement_id: settlement.settlementId,
            type,
            cycle_id     : selectedSettlementParams.cycle_id,
            period_id    : selectedSettlementParams.period_id
        });
    };

    const addDebit = () => addTransaction('debit');
    const addCredit = () => addTransaction('credit');

    const executeAction = (
        name: string,
        props: PropsForAction<SettlementsTypes.CycleSettlementDetails.Transaction>
    ) => {
        switch (name) {
        case 'edit':
            editTransactionMenu.open({
                settlement_id: settlement.settlementId,
                item         : props.row,
                cycle_id     : selectedSettlementParams.cycle_id,
                period_id    : selectedSettlementParams.period_id
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
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                width="100%"
            >
                <Typography
                    variant="body1"
                    fontWeight="600"
                    lineHeight="20px"
                >
                    {t('modals:settlements.edit_settlement.tabs.transactions.table.header.title_2')}
                </Typography>

                <Stack
                    direction="row"
                    spacing={2}
                >
                    <Button
                        variant="text"
                        startIcon={(
                            <EditSettlementIcons.Overview.Credits
                                disabled={isDisabledEdit}
                                isSelected={false}
                            />
                        )}
                        onClick={addCredit}
                        size="small"
                        disabled={isDisabledEdit}
                        sx={{
                            textTransform: 'uppercase',
                            color        : palette.semantic.text.success
                        }}
                    >
                        {t(
                            'modals:settlements.edit_settlement.tabs.transactions.header.buttons.add_credit'
                        )}
                    </Button>

                    <Button
                        variant="text"
                        startIcon={(
                            <EditSettlementIcons.Overview.Debits
                                disabled={isDisabledEdit}
                                isSelected={false}
                            />
                        )}
                        onClick={addDebit}
                        size="small"
                        disabled={isDisabledEdit}
                        sx={{
                            textTransform: 'uppercase',
                            color        : palette.semantic.text.error,
                            fontSize     : '12px',
                            lineHeight   : '18px',
                            fontWeight   : 600
                        }}
                    >
                        {t(
                            'modals:settlements.edit_settlement.tabs.transactions.header.buttons.add_debit'
                        )}
                    </Button>
                </Stack>
            </Stack>

            <EditDialogTable
                sectionName="transactionsInfo"
                columnsConfig={transaction_regular_columns}
                executeAction={executeAction}
                turnOffAssignInfo
            />
        </Stack>
    );
}
