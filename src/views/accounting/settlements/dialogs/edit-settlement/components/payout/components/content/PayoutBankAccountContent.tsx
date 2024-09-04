import PayoutBankAccountFrom from '@/views/accounting/settlements/dialogs/edit-settlement/components/payout/components/content/PayoutBankAccountFrom';
import PayoutBankAccountTo from '@/views/accounting/settlements/dialogs/edit-settlement/components/payout/components/content/PayoutBankAccountTo';
import BankAccountsGrpcService from '@/@grpcServices/services/bank-accounts.service';
import { BankAccountModel_Entity_Type } from '@proto/models/model_bank_account';
import { useStableArray } from '@/hooks/useStable';
import { useEditSettlementContext } from '@/views/accounting/settlements/dialogs/edit-settlement/EditSettlement';

const {
    ENTITY_TYPE_UNSPECIFIED,
    ENTITY_TYPE_VENDOR,
    ENTITY_TYPE_DRIVER
} =
    BankAccountModel_Entity_Type;

type Props = {
    bankAccountId: string;
};

export default function PayoutBankAccountContent({ bankAccountId }: Props) {
    const { settlement } = useEditSettlementContext();
    const bankAccountsResult = BankAccountsGrpcService.useGetBankAccountsQuery({
        filterByEntityType: ENTITY_TYPE_UNSPECIFIED
    });

    const bankAccounts = useStableArray(bankAccountsResult.data?.bankAccounts);

    const bankAccountFrom = bankAccounts.find(
        (bankAccount) => bankAccount.bankAccountId === bankAccountId
    );
    const bankAccountTo = bankAccounts.find((bankAccount) => {
        if (settlement?.vendorId && bankAccount.entityType === ENTITY_TYPE_VENDOR) {
            return bankAccount.entityId === settlement.vendorId;
        }
        if (settlement?.driverId && bankAccount.entityType === ENTITY_TYPE_DRIVER) {
            return bankAccount.entityId === settlement.driverId;
        }
        return false;
    });

    return (
        <>
            <PayoutBankAccountFrom bankAccount={bankAccountFrom} />
            <PayoutBankAccountTo bankAccount={bankAccountTo} />
        </>
    );
}
