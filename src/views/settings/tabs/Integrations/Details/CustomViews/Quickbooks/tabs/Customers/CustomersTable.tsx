import React from 'react';
import { RowClickAction } from '@/views/settings/components/Table/types';
import IntegrationDetailsTable from '@/views/settings/tabs/Integrations/Details/components/Table/IntegrationDetailsTable';
import { columns } from '@/views/settings/tabs/Integrations/Details/CustomViews/Quickbooks/tabs/Customers/columns';
import { useEditCustomerQBDialog } from '@/views/settings/tabs/Integrations/Details/CustomViews/Quickbooks/dialogs/EditCustomerQBDialog';
import { CustomerTabData } from '@/views/settings/tabs/Integrations/Details/CustomViews/Quickbooks/types';

type Props = {
    data: CustomerTabData[];
    loading: boolean;
};

export default function CustomersTable({
    data,
    loading
}: Props) {
    const editCustomerDialog = useEditCustomerQBDialog();

    const onClickRow: RowClickAction<CustomerTabData> = (event, row) => {
        event.preventDefault();
        event.stopPropagation();
        editCustomerDialog.open({
            customerId  : row.customerId,
            customerName: row.name,
            quickbooksId: row.quickbooks_id
        });
    };

    return (
        <IntegrationDetailsTable
            onClickRow={onClickRow}
            keyField="customerId"
            items={data}
            loading={loading}
            columns={columns}
        />
    );
}
