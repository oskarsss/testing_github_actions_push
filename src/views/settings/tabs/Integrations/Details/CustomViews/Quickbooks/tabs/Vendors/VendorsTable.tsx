import React from 'react';
import { RowClickAction } from '@/views/settings/components/Table/types';
import IntegrationDetailsTable from '@/views/settings/tabs/Integrations/Details/components/Table/IntegrationDetailsTable';
import { columns } from '@/views/settings/tabs/Integrations/Details/CustomViews/Quickbooks/tabs/Vendors/columns';
import { useEditVendorQBDialog } from '@/views/settings/tabs/Integrations/Details/CustomViews/Quickbooks/dialogs/EditVendorQBDialog';
import { VendorTabData } from '@/views/settings/tabs/Integrations/Details/CustomViews/Quickbooks/types';

type Props = {
    data: VendorTabData[];
    loading: boolean;
};

export default function VendorsTable({
    data,
    loading
}: Props) {
    const editVendorDialog = useEditVendorQBDialog();

    const onClickRow: RowClickAction<VendorTabData> = (event, row) => {
        event.preventDefault();
        event.stopPropagation();
        editVendorDialog.open({
            quickbooksId: row.quickbooks_id,
            vendorId    : row.vendorId,
            vendorName  : row.name
        });
    };

    return (
        <IntegrationDetailsTable
            onClickRow={onClickRow}
            keyField="vendorId"
            items={data}
            loading={loading}
            columns={columns}
        />
    );
}
