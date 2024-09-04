import { TruckTabData } from '@/views/settings/tabs/Integrations/Details/CustomViews/Quickbooks/types';
import IntegrationDetailsTable from '@/views/settings/tabs/Integrations/Details/components/Table/IntegrationDetailsTable';
import React from 'react';
import { columns } from '@/views/settings/tabs/Integrations/Details/CustomViews/Quickbooks/tabs/Trucks/columns';
import { useEditTruckQBDialog } from '@/views/settings/tabs/Integrations/Details/CustomViews/Quickbooks/dialogs/EditTrucksQBDialog';

type Props = {
    data: TruckTabData[];
    loading: boolean;
};

export default function TrucksTab({
    data,
    loading
}: Props) {
    const editTruckQBDialog = useEditTruckQBDialog();
    const onClickRow = (
        event: React.MouseEvent<HTMLTableRowElement, MouseEvent>,
        row: TruckTabData
    ) => {
        editTruckQBDialog.open({
            truckId      : row.truckId,
            quickbooksId : row.quickbooksId,
            truckFullName: `#${row.referenceId} ${row.make} ${row.model}`
        });
    };

    return (
        <IntegrationDetailsTable
            onClickRow={onClickRow}
            keyField="truckId"
            items={data}
            loading={loading}
            columns={columns}
        />
    );
}
