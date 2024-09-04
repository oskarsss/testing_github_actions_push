import BankAccountsGrpcService from '@/@grpcServices/services/bank-accounts.service';
import { BankAccountModel_Entity_Type } from '@proto/models/model_bank_account';
import { useStableArray } from '@/hooks/useStable';
import IntegrationQuickbooksGrpcService from '@/@grpcServices/services/intergrations-quickbooks.service';
import { QuickBooksModel_Account_Type } from '@proto/models/model_quickbooks';
import { useMemo } from 'react';
import { createMapQuickbooks } from '@/views/settings/tabs/Integrations/Details/CustomViews/Quickbooks/utils';

export const useQbBankAccountFiltered = () => {
    const accountsResult = IntegrationQuickbooksGrpcService.useGetAccountsQuickbooksQuery({
        filterByType: QuickBooksModel_Account_Type.UNSPECIFIED
    });

    const accounts = useStableArray(accountsResult.data?.accounts);

    const accountsFilter = accounts.filter(
        (i) => i.accountType === 'Bank' && i.accountSubType === 'Checking'
    );

    return {
        accountsFilter,
        loading: accountsResult.isLoading
    };
};

export const useBankAccountsQBItems = () => {
    const bankAccountsResult = BankAccountsGrpcService.useGetBankAccountsQuery({
        filterByDeleted   : { deleted: false },
        filterByEntityType: BankAccountModel_Entity_Type.ENTITY_TYPE_COMPANY
    });

    const {
        accountsFilter,
        loading
    } = useQbBankAccountFiltered();

    const bankAccounts = useStableArray(bankAccountsResult.data?.bankAccounts);

    const data = useMemo(() => {
        const qbAccountsMap = createMapQuickbooks(accountsFilter, 'systemBankAccountIds');
        return bankAccounts.map((bankAccount) => ({
            ...bankAccount,
            quickbooks_id  : qbAccountsMap[bankAccount.bankAccountId]?.quickbooksAccountId || '',
            quickbooks_name: qbAccountsMap[bankAccount.bankAccountId]?.name || ''
        }));
    }, [bankAccounts, accountsFilter]);

    return {
        data,
        loading: bankAccountsResult.isLoading || loading
    };
};
