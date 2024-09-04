import React from 'react';
import IntegrationQuickbooksGrpcService from '@/@grpcServices/services/intergrations-quickbooks.service';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { useConfirm } from '@/@core/components/confirm-dialog';
import { SettlementButton } from '@/views/accounting/settlements/dialogs/edit-settlement/components/edit-settlement-actions/SettlementIconButton';
import VectorIcons from '@/@core/icons/vector_icons';

type Props = {
    payoutId: string;
};

export default function PayoutQuickbooksSyncBtn({ payoutId }: Props) {
    const { t } = useAppTranslation();
    const confirm = useConfirm();
    const [syncBillPayment, { isLoading }] =
        IntegrationQuickbooksGrpcService.useSyncBillPaymentQuickbooksMutation();

    const onClickVoid = () => {
        confirm({
            title           : 'modals:settlements.edit_settlement.payout.quickbooks.button.sync.confirm.title',
            body            : 'modals:settlements.edit_settlement.payout.quickbooks.button.sync.confirm.body',
            max_width_dialog: '550px',
            onConfirm       : () => syncBillPayment({ payoutId }),
            confirm_text    : 'common:button.sync'
        });
    };

    return (
        <SettlementButton
            variant="outlined"
            onClick={onClickVoid}
            disabled={isLoading}
            startIcon={<VectorIcons.SyncIcon />}
        >
            {t('common:button.sync')}
        </SettlementButton>
    );
}
