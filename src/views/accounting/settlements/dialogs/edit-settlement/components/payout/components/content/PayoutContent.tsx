import { Stack } from '@mui/material';
import { PayoutModel } from '@proto/models/model_payout';
import PayoutInfoContent from '@/views/accounting/settlements/dialogs/edit-settlement/components/payout/components/content/PayoutInfoContent';
import PayoutQuickbooks from '@/views/accounting/settlements/dialogs/edit-settlement/components/payout/components/payout-quickbooks/PayoutQuickbooks';
import PayoutBankAccountContent from '@/views/accounting/settlements/dialogs/edit-settlement/components/payout/components/content/PayoutBankAccountContent';
import { checkPayoutTypeForRequiredBankField } from '@/views/accounting/payouts/dialogs/helpers';

type Props = {
    payout: PayoutModel;
};

export default function PayoutContent({ payout }: Props) {
    const showBankAccount = checkPayoutTypeForRequiredBankField(payout.type);

    return (
        <Stack
            width="100%"
            gap="16px"
        >
            <PayoutInfoContent payout={payout} />
            {showBankAccount && <PayoutBankAccountContent bankAccountId={payout.bankAccountId} />}
            <PayoutQuickbooks payout={payout} />
        </Stack>
    );
}
