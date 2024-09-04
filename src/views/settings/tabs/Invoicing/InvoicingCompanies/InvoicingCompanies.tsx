import SettingIcons from '@/views/settings/icons/icons';
import React, { useState } from 'react';
import Loading from '@/@core/components/page/Loading';
import SettingsHeaderTabs, { TabsValue } from '@/views/settings/components/tabs/SettingsHeaderTabs';
import { Stack } from '@mui/material';
import SettingsHeader from '@/views/settings/components/Header/SettingsHeader';
import InvoicingCompanyGrpcService from '@/@grpcServices/services/settings-service/invoicing-company.service';
import { useStableArray } from '@/hooks/useStable';
import { useFilteredDeletedRows } from '@/views/settings/components/tabs/filteredDeletedRowsHook';
import { useCreateInvoicingCompanyDialog } from '@/views/settings/tabs/Invoicing/InvoicingCompanies/dialogs/CreateInvoicingCompany';
import InvoicingCompaniesItem from '@/views/settings/tabs/Invoicing/InvoicingCompanies/components/InvoicingCompaniesItem';

export default function InvoicingCompanies() {
    const [value, setValue] = useState<TabsValue>(TabsValue.CURRENT);
    const createInvoicingCompanyDialog = useCreateInvoicingCompanyDialog();

    const {
        data,
        isLoading
    } = InvoicingCompanyGrpcService.useGetInvoicingCompaniesQuery({});

    const invoicingCompanies = useStableArray(data?.invoicingCompany);
    const invoicingCompaniesFiltered = useFilteredDeletedRows(invoicingCompanies, value);

    const onCreateInvoicingCompany = () => {
        createInvoicingCompanyDialog.open({});
    };

    return (
        <Stack gap="28px">
            <SettingsHeader
                title="settings:navigation.invoicing.invoicing_companies"
                icon={<SettingIcons.Invoicing />}
                onClick={onCreateInvoicingCompany}
                children_left_side={(
                    <SettingsHeaderTabs
                        value={value}
                        setValue={setValue}
                        categories={invoicingCompanies}
                    />
                )}
            />
            {isLoading && <Loading />}
            {invoicingCompaniesFiltered.map((row) => (
                <InvoicingCompaniesItem
                    key={row.invoicingCompanyId}
                    row={row}
                />
            ))}
        </Stack>
    );
}
