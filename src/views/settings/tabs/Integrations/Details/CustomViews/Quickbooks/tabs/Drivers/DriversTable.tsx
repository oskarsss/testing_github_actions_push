import React from 'react';
import { RowClickAction } from '@/views/settings/components/Table/types';
import IntegrationDetailsTable from '@/views/settings/tabs/Integrations/Details/components/Table/IntegrationDetailsTable';
import { columns } from '@/views/settings/tabs/Integrations/Details/CustomViews/Quickbooks/tabs/Drivers/columns';
import { useEditDriverQBDialog } from '@/views/settings/tabs/Integrations/Details/CustomViews/Quickbooks/dialogs/EditDriverQBDialog';
import { DriverTabData } from '@/views/settings/tabs/Integrations/Details/CustomViews/Quickbooks/types';

type Props = {
    data: DriverTabData[];
    loading: boolean;
};

export default function DriversTable({
    data,
    loading
}: Props) {
    const editDriverDialog = useEditDriverQBDialog();

    const onClickRow: RowClickAction<DriverTabData> = (event, row) => {
        event.preventDefault();
        event.stopPropagation();
        editDriverDialog.open({
            quickbooksId  : row.quickbooks_id,
            driverId      : row.driverId,
            driverFullName: `${row.firstName} ${row.lastName || ''}`
        });
    };

    return (
        <IntegrationDetailsTable
            onClickRow={onClickRow}
            keyField="driverId"
            items={data}
            loading={loading}
            columns={columns}
        />
    );
}
