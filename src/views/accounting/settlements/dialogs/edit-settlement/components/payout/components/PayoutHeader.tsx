import EditSettlement from '@/views/accounting/settlements/dialogs/edit-settlement/styled';
import EditSettlementIcons from '@/views/accounting/settlements/dialogs/edit-settlement/edit-settlement-icons';
import PayoutComponents from '@/views/accounting/settlements/dialogs/edit-settlement/components/payout/components/PayoutComponents';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import VectorIcons from '@/@core/icons/vector_icons';
import { PayoutModel } from '@proto/models/model_payout';
import { useAddPayoutDialog } from '@/views/accounting/payouts/dialogs/AddPayoutDialog';
import { useEditSettlementContext } from '@/views/accounting/settlements/dialogs/edit-settlement/EditSettlement';
import { useEditPayoutDialog } from '@/views/accounting/payouts/dialogs/EditPayoutDialog';
import PayoutsGrpcService from '@/@grpcServices/services/payouts.service';
import { useConfirm } from '@/@core/components/confirm-dialog';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import Tooltip from '@mui/material/Tooltip';
import SettlementIconButton from '@/views/accounting/settlements/dialogs/edit-settlement/components/edit-settlement-actions/SettlementIconButton';

type Props = {
    payout?: PayoutModel;
};

export default function PayoutHeader({ payout }: Props) {
    const addPayoutDialog = useAddPayoutDialog();
    const editPayoutDialog = useEditPayoutDialog();
    const {
        settlement,
        quickBooksBillPayments
    } = useEditSettlementContext();
    const confirm = useConfirm();
    const { t } = useAppTranslation();
    const [deletePayout, { isLoading }] = PayoutsGrpcService.useDeletePayoutMutation();

    const openAddPayoutDialog = () => {
        const entityType = settlement.vendorId ? 'vendor' : 'driver';
        addPayoutDialog.open({
            entityType,
            entityId    : entityType === 'vendor' ? settlement.vendorId : settlement.driverId,
            settlementId: settlement.settlementId
        });
    };

    const openEditPayoutDialog = () => {
        if (!payout) return;
        editPayoutDialog.open({
            payoutId     : payout.payoutId,
            amount       : payout.amount,
            bankAccountId: payout.bankAccountId,
            type         : payout.type,
            referenceId  : payout.referenceId,
            status       : payout.status
        });
    };

    const onDeletePayout = () => {
        if (!payout) return;
        confirm({
            title       : 'modals:settlements.edit_settlement.payout.confirm.delete.title',
            body        : 'modals:settlements.edit_settlement.payout.confirm.delete.body',
            confirm_text: 'common:button.delete',
            onConfirm   : () => deletePayout({ payoutId: payout.payoutId })
        });
    };

    const isCreateQBPayment = quickBooksBillPayments?.find(
        (payment) => payment.systemPayoutId === payout?.payoutId
    );

    return (
        <PayoutComponents.HeaderContainer>
            <EditSettlement.SectionHeader
                title="modals:settlements.edit_settlement.payout.title"
                Icon={(
                    <EditSettlementIcons.Section.Payout
                        color="primary"
                        sx={{ fontSize: '24px' }}
                    />
                )}
            />
            <PayoutComponents.ControllersWrapper>
                <PayoutComponents.CreateButton
                    variant="contained"
                    color="primary"
                    onClick={openAddPayoutDialog}
                    startIcon={<AddIcon fontSize="small" />}
                >
                    {t('common:button.add')}
                </PayoutComponents.CreateButton>
                {payout && (
                    <>
                        <Tooltip
                            disableHoverListener={!isCreateQBPayment}
                            title={t(
                                'modals:settlements.edit_settlement.payout.tooltips.disabled_edit'
                            )}
                        >
                            <span style={{ display: 'flex' }}>
                                <SettlementIconButton
                                    onClick={openEditPayoutDialog}
                                    disabled={isLoading || !!isCreateQBPayment}
                                >
                                    <EditIcon />
                                </SettlementIconButton>
                            </span>
                        </Tooltip>

                        <Tooltip
                            disableHoverListener={!isCreateQBPayment}
                            title={t(
                                'modals:settlements.edit_settlement.payout.tooltips.disabled_delete'
                            )}
                        >
                            <span style={{ display: 'flex' }}>
                                <SettlementIconButton
                                    onClick={onDeletePayout}
                                    disabled={isLoading || !!isCreateQBPayment}
                                >
                                    <VectorIcons.TrashIcon />
                                </SettlementIconButton>
                            </span>
                        </Tooltip>
                    </>
                )}
            </PayoutComponents.ControllersWrapper>
        </PayoutComponents.HeaderContainer>
    );
}
