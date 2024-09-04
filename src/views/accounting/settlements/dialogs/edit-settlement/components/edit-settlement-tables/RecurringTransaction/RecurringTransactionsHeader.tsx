import React from 'react';
import { Button, Stack } from '@mui/material';
import { useCreateRecurringTransactionDialog } from '@/views/accounting/recurring-transactions/menus/RecurringTransactionsMenu/Add/CreateRecurringTrasaction';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import EditSettlement from '../../../styled';
import EditSettlementIcons from '../../../edit-settlement-icons';
import { useEditSettlementContext } from '../../../EditSettlement';

type Props = {
    driver_id: string;
    settlement_id?: string;
    first_name: string;
    isDisabledEdit?: boolean;
};

export default function RecurringTransactionsHeader({
    driver_id,
    first_name,
    settlement_id,
    isDisabledEdit = false
}: Props) {
    const { selectedSettlementParams } = useEditSettlementContext();
    const createRecurringTransaction = useCreateRecurringTransactionDialog();
    const { t } = useAppTranslation();

    const addRecurringTransaction = (type: 'credit' | 'debit') => {
        createRecurringTransaction.open({
            category_id  : '',
            category_type: type,
            driver       : {
                id  : driver_id,
                name: first_name
            },
            setDialogStyled  : true,
            settlement_id,
            settlementsParams: {
                cycleId     : selectedSettlementParams.cycle_id,
                periodId    : selectedSettlementParams.period_id,
                settlementId: settlement_id ?? ''
            }
        });
    };

    const addCreditRecurringTransaction = () => addRecurringTransaction('credit');
    const addDebitRecurringTransaction = () => addRecurringTransaction('debit');

    return (
        <EditSettlement.SectionHeader
            Icon={<EditSettlementIcons.Section.RecurringTransaction />}
            title="modals:settlements.edit_settlement.tabs.recurring.header.title"
        >
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
                    disabled={isDisabledEdit}
                    onClick={addCreditRecurringTransaction}
                    size="small"
                    sx={{
                        textTransform: 'uppercase',
                        color        : '#039855'
                    }}
                >
                    {t(
                        'modals:settlements.edit_settlement.tabs.recurring.header.buttons.add_credit'
                    )}
                </Button>

                <Button
                    disabled={isDisabledEdit}
                    variant="text"
                    startIcon={(
                        <EditSettlementIcons.Overview.Debits
                            disabled={isDisabledEdit}
                            isSelected={false}
                        />
                    )}
                    onClick={addDebitRecurringTransaction}
                    size="small"
                    sx={{
                        textTransform: 'uppercase',
                        color        : '#D92D20',
                        fontSize     : '12px',
                        lineHeight   : '18px',
                        fontWeight   : 600
                    }}
                >
                    {t(
                        'modals:settlements.edit_settlement.tabs.recurring.header.buttons.add_debit'
                    )}
                </Button>
            </Stack>
        </EditSettlement.SectionHeader>
    );
}
