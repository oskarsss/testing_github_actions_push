import Table from '@/views/settings/tabs/Loads/DriverPayCategories/components/Table';
import Container from '@/views/settings/components/Container/Container';
import { useState } from 'react';
import { TabsValue } from '@/views/settings/components/tabs/SettingsHeaderTabs';
import Header from '@/views/settings/tabs/Loads/DriverPayCategories/components/Header';
import LoadDriverPayItemCategoriesGrpcService from '@/@grpcServices/services/loads-service/load-driver-pay-item-categories.service';
import { useStableArray } from '@/hooks/useStable';
import { useFilteredDeletedRows } from '@/views/settings/components/tabs/filteredDeletedRowsHook';

export default function DriverPayCategories() {
    const [value, setValue] = useState<TabsValue>(TabsValue.CURRENT);
    const {
        data,
        isLoading
    } =
        LoadDriverPayItemCategoriesGrpcService.useGetDriverPayItemCategoriesQuery({});

    const categories = useStableArray(data?.loadDriverPayItemCategories);
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
