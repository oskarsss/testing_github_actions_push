import CancelIcon from '@mui/icons-material/Cancel';
import Tooltip from '@mui/material/Tooltip';
import React from 'react';
import IntegrationQuickbooksGrpcService from '@/@grpcServices/services/intergrations-quickbooks.service';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { useConfirm } from '@/@core/components/confirm-dialog';
import SettlementIconButton from '@/views/accounting/settlements/dialogs/edit-settlement/components/edit-settlement-actions/SettlementIconButton';

type Props = {
    payoutId: string;
};

export default function PayoutQuickbooksVoidBtn({ payoutId }: Props) {
    const { t } = useAppTranslation();
    const confirm = useConfirm();
    const [onVoid, { isLoading }] =
        IntegrationQuickbooksGrpcService.useVoidBillPaymentQuickbooksMutation();

    const onClickVoid = () => {
        confirm({
            title           : 'modals:settlements.edit_settlement.payout.quickbooks.button.void.confirm.title',
            body            : 'modals:settlements.edit_settlement.payout.quickbooks.button.void.confirm.body',
            max_width_dialog: '550px',
            onConfirm       : () => onVoid({ payoutId }),
            confirm_text    : 'common:button.void'
        });
    };

    return (
        <Tooltip title={t('common:button.void')}>
            <span style={{ display: 'flex' }}>
                <SettlementIconButton
                    onClick={onClickVoid}
                    disabled={isLoading}
                >
                    <CancelIcon />
                </SettlementIconButton>
            </span>
        </Tooltip>
    );
}
