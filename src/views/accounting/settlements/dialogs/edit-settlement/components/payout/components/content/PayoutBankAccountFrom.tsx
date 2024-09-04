import PayoutComponents from '@/views/accounting/settlements/dialogs/edit-settlement/components/payout/components/PayoutComponents';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { BankAccount } from '@proto/bank_accounts';
import BankAccountNumber from '@/views/accounting/settlements/dialogs/edit-settlement/components/payout/components/BankAccountNumber';

type Props = {
    bankAccount: BankAccount | undefined;
};

export default function PayoutBankAccountFrom({ bankAccount }: Props) {
    const { t } = useAppTranslation('modals');

    return (
        <PayoutComponents.ContentTabContainer>
            <PayoutComponents.ContentTabTitle>
                {t('settlements.edit_settlement.payout.labels.info')}
            </PayoutComponents.ContentTabTitle>
            <PayoutComponents.ContentTabDivider />
            <PayoutComponents.ContentTabRow>
                <PayoutComponents.ContentTabText>
                    {t('settlements.edit_settlement.payout.labels.bank')}
                </PayoutComponents.ContentTabText>
                {bankAccount ? (
                    <BankAccountNumber
                        lastFour={bankAccount.lastFour}
                        bankAccountId={bankAccount.bankAccountId}
                    />
                ) : (
                    '-'
                )}
            </PayoutComponents.ContentTabRow>
            <PayoutComponents.ContentTabRow>
                <PayoutComponents.ContentTabText>
                    {t('settlements.edit_settlement.payout.labels.name')}
                </PayoutComponents.ContentTabText>
                <PayoutComponents.ContentTabText
                    noWrap
                    color="secondary"
                    textTransform="uppercase"
                >
                    {bankAccount?.bankName || '-'}
                </PayoutComponents.ContentTabText>
            </PayoutComponents.ContentTabRow>
        </PayoutComponents.ContentTabContainer>
    );
}
