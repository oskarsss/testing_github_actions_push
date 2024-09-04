import React from 'react';
import { RowClickAction } from '@/views/settings/components/Table/types';
import IntegrationDetailsTable from '@/views/settings/tabs/Integrations/Details/components/Table/IntegrationDetailsTable';
import { columns } from '@/views/settings/tabs/Integrations/Details/CustomViews/Quickbooks/tabs/Brokers/columns';
import { useEditBrokerQBDialog } from '@/views/settings/tabs/Integrations/Details/CustomViews/Quickbooks/dialogs/EditBrokerQBDialog';
import { BrokerTabData } from '@/views/settings/tabs/Integrations/Details/CustomViews/Quickbooks/types';

type Props = {
    data: BrokerTabData[];
    loading: boolean;
};

export default function BrokersTable({
    data,
    loading
}: Props) {
    const editBrokerDialog = useEditBrokerQBDialog();

    const onClickRow: RowClickAction<BrokerTabData> = (event, row) => {
        event.preventDefault();
        event.stopPropagation();
        editBrokerDialog.open({
            brokerId    : row.brokerId,
            brokerName  : row.name,
            quickbooksId: row.quickbooks_id
        });
    };

    return (
        <IntegrationDetailsTable
            onClickRow={onClickRow}
            keyField="brokerId"
            items={data}
            loading={loading}
            columns={columns}
        />
    );
}
