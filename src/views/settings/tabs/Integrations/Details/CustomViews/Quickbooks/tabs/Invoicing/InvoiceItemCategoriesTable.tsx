import React from 'react';
import { RowClickAction } from '@/views/settings/components/Table/types';
import { columns } from '@/views/settings/tabs/Integrations/Details/CustomViews/Quickbooks/tabs/Invoicing/columns';
import { useEditInvoiceItemCategoryQBDialog } from '@/views/settings/tabs/Integrations/Details/CustomViews/Quickbooks/dialogs/EditInvoiceItemCategoryQBDialog';
import IntegrationDetailsTable from '@/views/settings/tabs/Integrations/Details/components/Table/IntegrationDetailsTable';
import { InvoiceTabData } from '@/views/settings/tabs/Integrations/Details/CustomViews/Quickbooks/types';

type Props = {
    data: InvoiceTabData[];
    loading: boolean;
};

export default function InvoiceItemCategoriesTable({
    data,
    loading
}: Props) {
    const editItemDialog = useEditInvoiceItemCategoryQBDialog();

    const onClickRow: RowClickAction<InvoiceTabData> = (event, row) => {
        event.preventDefault();
        event.stopPropagation();
        editItemDialog.open({
            invoiceItemCategoryId  : row.invoiceItemCategoryId,
            invoiceItemCategoryName: row.name,
            quickbooksId           : row.quickbooks_id
        });
    };

    return (
        <IntegrationDetailsTable
            onClickRow={onClickRow}
            keyField="invoiceItemCategoryId"
            items={data}
            loading={loading}
            columns={columns}
        />
    );
}
