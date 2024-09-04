import PayoutComponents from '@/views/accounting/settlements/dialogs/edit-settlement/components/payout/components/PayoutComponents';
import React, { useMemo } from 'react';
import { Tooltip } from '@mui/material';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { useEditSettlementContext } from '@/views/accounting/settlements/dialogs/edit-settlement/EditSettlement';
import { IntegrationProvider } from '@proto/integrations';
import ProviderLogo from '@/views/settings/tabs/Integrations/components/ProviderLogo';
import { PayoutModel, PayoutModel_Status } from '@proto/models/model_payout';
import PayoutQuickbooksVoidBtn from '@/views/accounting/settlements/dialogs/edit-settlement/components/payout/components/payout-quickbooks/buttons/PayoutQuickbooksVoidBtn';
import PayoutQuickbooksDeleteBtn from '@/views/accounting/settlements/dialogs/edit-settlement/components/payout/components/payout-quickbooks/buttons/PayoutQuickbooksDeleteBtn';
import PayoutQuickbooksCreateBtn from '@/views/accounting/settlements/dialogs/edit-settlement/components/payout/components/payout-quickbooks/buttons/PayoutQuickbooksCreateBtn';
import { useQbBankAccountFiltered } from '@/views/settings/tabs/Integrations/Details/CustomViews/Quickbooks/tabs/BankAccounts/hook';
import withIntegrationProvider from '@/views/settings/tabs/Integrations/components/withIntegrationProvider';
import PayoutQuickbooksSyncBtn from '@/views/accounting/settlements/dialogs/edit-settlement/components/payout/components/payout-quickbooks/buttons/PayoutQuickbooksSyncBtn';

type Props = {
    payout: PayoutModel;
    provider: IntegrationProvider;
};

const PayoutQuickbooks = withIntegrationProvider(PayoutQuickbooksComponent, 'QUICKBOOKS');

function PayoutQuickbooksComponent({
    payout,
    provider
}: Props) {
    const { t } = useAppTranslation('modals');

    const {
        quickBooksBill,
        quickBooksBillPayments
    } = useEditSettlementContext();
    const { accountsFilter } = useQbBankAccountFiltered();

    const validation = useMemo(() => {
        if (payout.status !== PayoutModel_Status.SUCCEEDED) {
            return t('settlements.edit_settlement.payout.quickbooks.validation.payment_status');
        }

        if (!payout.bankAccountId) {
            return t('settlements.edit_settlement.payout.quickbooks.validation.bank_account');
        }

        if (!quickBooksBill) {
            return t('settlements.edit_settlement.payout.quickbooks.validation.qb_bill');
        }

        if (accountsFilter.length) {
            const isConnectedSystemBanAccount = accountsFilter.some((account) =>
                account.systemBankAccountIds.includes(payout.bankAccountId));

            if (!isConnectedSystemBanAccount) {
                return t(
                    'settlements.edit_settlement.payout.quickbooks.validation.bank_account_not_connected'
                );
            }
        }

        return '';
    }, [payout.bankAccountId, payout.status, quickBooksBill, accountsFilter]);

    const quickBooksBillPayment = quickBooksBillPayments?.find(
        (payment) => payment.systemPayoutId === payout?.payoutId
    );

    return (
        <PayoutComponents.ContentTabContainer>
            <PayoutComponents.ContentTabRow sx={{ marginBottom: '5px' }}>
                <ProviderLogo
                    srcLightMode={provider.darkLogoUrl}
                    srcDarkMode={provider.lightLogoUrl}
                    height="27px"
                />
                {!quickBooksBillPayment && (
                    <Tooltip title={validation}>
                        <span>
                            <PayoutQuickbooksCreateBtn
                                disabled={!!validation}
                                payoutId={payout.payoutId}
                            />
                        </span>
                    </Tooltip>
                )}
                {quickBooksBillPayment && (
                    <PayoutComponents.ControllersWrapper>
                        <PayoutQuickbooksSyncBtn payoutId={payout.payoutId} />
                        <PayoutQuickbooksVoidBtn payoutId={payout.payoutId} />
                        <PayoutQuickbooksDeleteBtn payoutId={payout.payoutId} />
                    </PayoutComponents.ControllersWrapper>
                )}
            </PayoutComponents.ContentTabRow>
            <PayoutComponents.ContentTabDivider />
            <PayoutComponents.ContentTabRow>
                <PayoutComponents.ContentTabText>
                    {t('settlements.edit_settlement.payout.quickbooks.total_amount')}
                </PayoutComponents.ContentTabText>
                <PayoutComponents.ContentTabText color="primary">
                    {quickBooksBillPayment?.totalAmountFormatted || '-'}
                </PayoutComponents.ContentTabText>
            </PayoutComponents.ContentTabRow>
            <PayoutComponents.ContentTabRow>
                <PayoutComponents.ContentTabText>
                    {t('settlements.edit_settlement.payout.quickbooks.doc_number')}
                </PayoutComponents.ContentTabText>
                <PayoutComponents.ContentTabText color="secondary">
                    {quickBooksBillPayment?.docNumber || '-'}
                </PayoutComponents.ContentTabText>
            </PayoutComponents.ContentTabRow>
        </PayoutComponents.ContentTabContainer>
    );
}

export default PayoutQuickbooks;
