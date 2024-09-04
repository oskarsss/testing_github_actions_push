import PayoutComponents from '@/views/accounting/settlements/dialogs/edit-settlement/components/payout/components/PayoutComponents';
import React from 'react';
import { useEditSettlementContext } from '@/views/accounting/settlements/dialogs/edit-settlement/EditSettlement';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { useConfirm } from '@/@core/components/confirm-dialog';
import IntegrationQuickbooksGrpcService from '@/@grpcServices/services/intergrations-quickbooks.service';

type Props = {
    disabled: boolean;
    payoutId: string;
};

export default function PayoutQuickbooksCreateBtn({
    disabled,
    payoutId
}: Props) {
    const { t } = useAppTranslation();
    const confirm = useConfirm();
    const { selectedSettlementParams } = useEditSettlementContext();

    const [create, { isLoading }] =
        IntegrationQuickbooksGrpcService.useCreateBillPaymentQuickbooksMutation();

    const onClickCreate = () => {
        confirm({
            title           : 'modals:settlements.edit_settlement.payout.quickbooks.button.add.confirm.title',
            body            : 'modals:settlements.edit_settlement.payout.quickbooks.button.add.confirm.body',
            max_width_dialog: '550px',
            confirm_text    : 'common:button.create',
            onConfirm       : () =>
                create({
                    cycleId     : selectedSettlementParams.cycle_id,
                    periodId    : selectedSettlementParams.period_id,
                    settlementId: selectedSettlementParams.settlement_id,
                    payoutId
                })
        });
    };

    return (
        <PayoutComponents.CreateButton
            disabled={isLoading || disabled}
            onClick={onClickCreate}
            variant="contained"
            color="primary"
        >
            {t('common:button.create')}
        </PayoutComponents.CreateButton>
    );
}
