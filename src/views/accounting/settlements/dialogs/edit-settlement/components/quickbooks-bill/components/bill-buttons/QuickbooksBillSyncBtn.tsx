import { useEditSettlementContext } from '@/views/accounting/settlements/dialogs/edit-settlement/EditSettlement';
import { useConfirm } from '@/@core/components/confirm-dialog';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import IntegrationQuickbooksGrpcService from '@/@grpcServices/services/intergrations-quickbooks.service';
import VectorIcons from '@/@core/icons/vector_icons';
import { SettlementButton } from '@/views/accounting/settlements/dialogs/edit-settlement/components/edit-settlement-actions/SettlementIconButton';
import Tooltip from '@mui/material/Tooltip';

export default function QuickbooksBillSyncBtn() {
    const {
        selectedSettlementParams,
        quickBooksBillPayments
    } = useEditSettlementContext();
    const confirm = useConfirm();
    const { t } = useAppTranslation();

    const [syncBill, syncState] = IntegrationQuickbooksGrpcService.useSyncBillQuickbooksMutation();

    const billPaymentCreated = !!quickBooksBillPayments?.[0];

    const onClick = () => {
        if (billPaymentCreated) return;
        confirm({
            title       : 'modals:settlements.edit_settlement.qb_bill.buttons.sync.confirm.title',
            body        : 'modals:settlements.edit_settlement.qb_bill.buttons.sync.confirm.body',
            confirm_text: 'common:button.sync',
            onConfirm   : () =>
                syncBill({
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
            title={t('modals:settlements.edit_settlement.qb_bill.buttons.sync.disabled_tooltip')}
        >
            <span style={{ display: 'flex' }}>
                <SettlementButton
                    variant="outlined"
                    onClick={onClick}
                    disabled={syncState.isLoading || billPaymentCreated}
                    startIcon={<VectorIcons.SyncIcon />}
                >
                    {t('common:button.sync')}
                </SettlementButton>
            </span>
        </Tooltip>
    );
}
