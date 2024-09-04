import React from 'react';
import { RowClickAction } from '@/views/settings/components/Table/types';
import IntegrationDetailsTable from '@/views/settings/tabs/Integrations/Details/components/Table/IntegrationDetailsTable';
import { EquipmentTabData } from '@/views/settings/tabs/Integrations/Details/CustomViews/ApexCapital/types';
import { useEditEquipmentTypeApexDialog } from '@/views/settings/tabs/Integrations/Details/CustomViews/ApexCapital/dialogs/EditEquipmentTypeApexDialog';
import { columns } from './columns';

type Props = {
    data: EquipmentTabData[];
    loading: boolean;
};

export default function EquipmentTypesTable({
    data,
    loading
}: Props) {
    const editItemDialog = useEditEquipmentTypeApexDialog();

    const onClickRow: RowClickAction<EquipmentTabData> = (event, row) => {
        event.preventDefault();
        event.stopPropagation();
        editItemDialog.open({ row });
    };

    return (
        <IntegrationDetailsTable
            onClickRow={onClickRow}
            keyField="equipmentTypeId"
            items={data}
            loading={loading}
            columns={columns}
        />
    );
}
