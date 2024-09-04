import Container from '@/views/settings/components/Container/Container';
import { useState } from 'react';
import { TabsValue } from '@/views/settings/components/tabs/SettingsHeaderTabs';
import { SettlementTransactionCategoryModel_Type } from '@proto/models/model_settlement.transaction_category';
import Header from './components/Header';
import Table from './components/Table';

export default function CreditCategories() {
    const [value, setValue] = useState<TabsValue>(TabsValue.CURRENT);

    return (
        <Container>
            <Header
                type={SettlementTransactionCategoryModel_Type.CREDIT}
                value={value}
                setValue={setValue}
            />

            <Table
                type={SettlementTransactionCategoryModel_Type.CREDIT}
                value={value}
            />
        </Container>
    );
}
