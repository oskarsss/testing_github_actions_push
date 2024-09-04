import { useState } from 'react';
import Container from '@/views/settings/components/Container/Container';
import { TabsValue } from '@/views/settings/components/tabs/SettingsHeaderTabs';
import Header from '@/views/settings/tabs/Loads/InvoiceItemCategories/components/Header';
import LoadInvoiceItemCategoriesGrpcService from '@/@grpcServices/services/loads-service/load-invoice-item-categories.service';
import { useStableArray } from '@/hooks/useStable';
import { useFilteredDeletedRows } from '@/views/settings/components/tabs/filteredDeletedRowsHook';
import Table from './components/Table';

export default function InvoiceItemCategories() {
    const [value, setValue] = useState<TabsValue>(TabsValue.CURRENT);
    const {
        data,
        isLoading
    } =
        LoadInvoiceItemCategoriesGrpcService.useGetInvoiceItemCategoriesQuery({});

    const categories = useStableArray(data?.invoiceItemCategories);
    const filteredCategories = useFilteredDeletedRows(categories, value);

    return (
        <Container>
            <Header
                value={value}
                setValue={setValue}
                categories={categories}
            />

            <Table
                categories={filteredCategories}
                isLoading={isLoading}
            />
        </Container>
    );
}
