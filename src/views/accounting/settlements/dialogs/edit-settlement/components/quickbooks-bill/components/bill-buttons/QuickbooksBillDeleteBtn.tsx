import SettlementIconButton from '@/views/accounting/settlements/dialogs/edit-settlement/components/edit-settlement-actions/SettlementIconButton';
import VectorIcons from '@/@core/icons/vector_icons';
import IntegrationQuickbooksGrpcService from '@/@grpcServices/services/intergrations-quickbooks.service';
import { useEditSettlementContext } from '@/views/accounting/settlements/dialogs/edit-settlement/EditSettlement';
import { useConfirm } from '@/@core/components/confirm-dialog';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import Tooltip from '@mui/material/Tooltip';

export default function QuickbooksBillDeleteBtn() {
    const {
        selectedSettlementParams,
        quickBooksBillPayments
    } = useEditSettlementContext();
    const confirm = useConfirm();
    const { t } = useAppTranslation('modals');

    const [deleteBill, deleteState] =
        IntegrationQuickbooksGrpcService.useDeleteBillQuickbooksMutation();

    const billPaymentCreated = !!quickBooksBillPayments?.[0];

    const onClick = () => {
        confirm({
            title       : 'modals:settlements.edit_settlement.qb_bill.buttons.delete.confirm.title',
            body        : 'modals:settlements.edit_settlement.qb_bill.buttons.delete.confirm.body',
            confirm_text: 'common:button.delete',
            onConfirm   : () =>
                deleteBill({
                    settlements: [
                        {
                            cycleId     : selectedSettlementParams.cycle_id,
                            periodId    : selectedSettlementParams.period_id,
                            settlementId: selectedSettlementParams.settlement_id
                        }
                    ]
                })
        });
    };
    return (
        <Tooltip
            disableHoverListener={!billPaymentCreated}
            title={t('settlements.edit_settlement.qb_bill.buttons.delete.disabled_tooltip')}
        >
            <span style={{ display: 'flex' }}>
                <SettlementIconButton
                    onClick={onClick}
                    disabled={deleteState.isLoading || billPaymentCreated}
                >
                    <VectorIcons.TrashIcon />
                </SettlementIconButton>
            </span>
        </Tooltip>
    );
}
