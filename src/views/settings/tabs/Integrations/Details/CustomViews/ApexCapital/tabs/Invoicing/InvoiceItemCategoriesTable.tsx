import React from 'react';
import { RowClickAction } from '@/views/settings/components/Table/types';
import IntegrationDetailsTable from '@/views/settings/tabs/Integrations/Details/components/Table/IntegrationDetailsTable';
import { InvoiceTabData } from '@/views/settings/tabs/Integrations/Details/CustomViews/ApexCapital/types';
import { useEditInvoiceItemCategoryApexDialog } from '@/views/settings/tabs/Integrations/Details/CustomViews/ApexCapital/dialogs/EditInvoiceItemCategoryApexDialog';
import { columns } from './columns';

type Props = {
    data: InvoiceTabData[];
    loading: boolean;
};

export default function InvoiceItemCategoriesTable({
    data,
    loading
}: Props) {
    const editItemDialog = useEditInvoiceItemCategoryApexDialog();

    const onClickRow: RowClickAction<InvoiceTabData> = (event, row) => {
        event.preventDefault();
        event.stopPropagation();
        editItemDialog.open({ row });
    };

    return (
        <IntegrationDetailsTable
            onClickRow={onClickRow}
            items={data}
            keyField="invoiceItemCategoryId"
            loading={loading}
            columns={columns}
        />
    );
}
