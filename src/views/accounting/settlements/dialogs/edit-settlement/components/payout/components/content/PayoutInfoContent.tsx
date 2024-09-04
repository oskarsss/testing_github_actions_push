import PayoutComponents from '@/views/accounting/settlements/dialogs/edit-settlement/components/payout/components/PayoutComponents';
import PayoutPaymentTypeChipSelect from '@/@core/fields/chip-select/PayoutPaymentTypeChipSelect';
import PayoutStatusChipSelect from '@/@core/fields/chip-select/PayoutStatusChipSelect';
import { PayoutModel } from '@proto/models/model_payout';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { useEditSettlementContext } from '@/views/accounting/settlements/dialogs/edit-settlement/EditSettlement';

type Props = {
    payout: PayoutModel;
};

export default function PayoutInfoContent({ payout }: Props) {
    const { t } = useAppTranslation();
    const { quickBooksBillPayments } = useEditSettlementContext();

    const isCreateQBPayment = quickBooksBillPayments?.find(
        (payment) => payment.systemPayoutId === payout?.payoutId
    );

    return (
        <PayoutComponents.ContentTabContainer>
            <PayoutComponents.ContentTabTitle>
                {t('modals:settlements.edit_settlement.payout.labels.info')}
            </PayoutComponents.ContentTabTitle>
            <PayoutComponents.ContentTabDivider />
            <PayoutComponents.ContentTabRow>
                <PayoutComponents.ContentTabText>
                    {t('common:amount')}
                </PayoutComponents.ContentTabText>
                <PayoutComponents.ContentTabText color="primary">
                    {payout.amountFormatted}
                </PayoutComponents.ContentTabText>
            </PayoutComponents.ContentTabRow>

            <PayoutComponents.ContentTabRow>
                <PayoutComponents.ContentTabText>
                    {t('modals:settlements.edit_settlement.payout.labels.payment')}
                </PayoutComponents.ContentTabText>
                <PayoutPaymentTypeChipSelect
                    is_changing={!isCreateQBPayment}
                    size="small"
                    {...payout}
                />
            </PayoutComponents.ContentTabRow>

            <PayoutComponents.ContentTabRow>
                <PayoutComponents.ContentTabText>
                    {t('common:status')}
                </PayoutComponents.ContentTabText>
                <PayoutComponents.ContentTabText>
                    <PayoutStatusChipSelect
                        size="small"
                        payoutStatus={payout.status}
                        payoutId={payout.payoutId}
                        is_changing={!isCreateQBPayment}
                    />
                </PayoutComponents.ContentTabText>
            </PayoutComponents.ContentTabRow>

            <PayoutComponents.ContentTabRow>
                <PayoutComponents.ContentTabText>
                    {t('modals:settlements.edit_settlement.payout.labels.referenceId')}
                </PayoutComponents.ContentTabText>
                <PayoutComponents.ContentTabText>
                    {payout.referenceId}
                </PayoutComponents.ContentTabText>
            </PayoutComponents.ContentTabRow>
        </PayoutComponents.ContentTabContainer>
    );
}
