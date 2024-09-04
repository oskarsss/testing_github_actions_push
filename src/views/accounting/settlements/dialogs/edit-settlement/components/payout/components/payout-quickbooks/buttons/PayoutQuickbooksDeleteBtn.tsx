import VectorIcons from '@/@core/icons/vector_icons';
import React from 'react';
import Tooltip from '@mui/material/Tooltip';
import { useConfirm } from '@/@core/components/confirm-dialog';
import IntegrationQuickbooksGrpcService from '@/@grpcServices/services/intergrations-quickbooks.service';
import SettlementIconButton from '@/views/accounting/settlements/dialogs/edit-settlement/components/edit-settlement-actions/SettlementIconButton';
import { useAppTranslation } from '@/hooks/useAppTranslation';

type Props = {
    payoutId: string;
};

export default function PayoutQuickbooksDeleteBtn({ payoutId }: Props) {
    const confirm = useConfirm();
    const { t } = useAppTranslation();

    const [onDelete, { isLoading }] =
        IntegrationQuickbooksGrpcService.useDeleteBillPaymentQuickbooksMutation();

    const onClickDelete = () => {
        confirm({
            title           : 'modals:settlements.edit_settlement.payout.quickbooks.button.delete.confirm.title',
            body            : 'modals:settlements.edit_settlement.payout.quickbooks.button.delete.confirm.body',
            max_width_dialog: '550px',
            onConfirm       : () => onDelete({ payoutId }),
            confirm_text    : 'common:button.delete'
        });
    };

    return (
        <Tooltip title={t('common:button.delete')}>
            <span style={{ display: 'flex' }}>
                <SettlementIconButton
                    disabled={isLoading}
                    onClick={onClickDelete}
                >
                    <VectorIcons.TrashIcon />
                </SettlementIconButton>
            </span>
        </Tooltip>
    );
}
