import Container from '@/views/settings/components/Container/Container';
import { useState } from 'react';
import { TabsValue } from '@/views/settings/components/tabs/SettingsHeaderTabs';
import BankAccountsGrpcService from '@/@grpcServices/services/bank-accounts.service';
import { useStableArray } from '@/hooks/useStable';
import { BankAccountModel_Entity_Type } from '@proto/models/model_bank_account';
import Preloader from '@/@core/ui-kits/basic/preloader/Preloader';
import BankAccountsTable from './components/Table/BankAccountsTable';
import BankAccountsHeader from './components/Header';

export default function BankAccounts() {
    const [value, setValue] = useState<TabsValue>(TabsValue.CURRENT);

    const {
        data,
        isLoading
    } = BankAccountsGrpcService.useGetBankAccountsQuery({
        filterByEntityType: BankAccountModel_Entity_Type.ENTITY_TYPE_COMPANY
    });

    const rows = useStableArray(data?.bankAccounts);

    return (
        <Container>
            <BankAccountsHeader
                value={value}
                setValue={setValue}
                categories={rows}
            />

            <BankAccountsTable
                rows={rows}
                isLoading={isLoading}
                selectedTab={value}
            />
        </Container>
    );
}
