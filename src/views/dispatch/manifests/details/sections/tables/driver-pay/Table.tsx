import MiniTable from '@/@core/ui-kits/basic/mini-table/MiniTable';
import TotalsRow from '@/@core/ui-kits/basic/mini-table/components/TotalsRow';
import AddItemButton from '@/@core/ui-kits/loads/add-item-button/AddItemButton';
import React from 'react';
import { ManifestModel_Driver_PayItem } from '@proto/models/model_manifest';
import { Stack } from '@mui/material';
import { useAddDriverPayItemDialog } from '@/views/dispatch/manifests/modals/driver-pay-items/AddDriverPayItem';
import { useEditManifestDriverPayItemMenu } from '@/views/dispatch/manifests/modals/driver-pay-items/EditDriverPayItem';
import { MiniTableExecuteActionType } from '@/@core/ui-kits/basic/mini-table/MiniTable.types';
import { usePermissions } from '@/store/app/hooks';
import { PERMISSIONS } from '@/models/permissions/permissions';
import columns from './columns';
import DriverPreview from './DriverPreview';

type Props = {
    payItems: ManifestModel_Driver_PayItem[];
    driverNet: string;
    driverId: string;
    settlementId: string;
    settlementFriendlyId: number;
    settlementCycleId: string;
    settlementPeriodId: string;
    manifestId: string;
    truckId: string;
};

export default function ManifestDriverPayItemsTable({
    payItems,
    driverNet,
    driverId,
    settlementId,
    settlementFriendlyId,
    settlementCycleId,
    settlementPeriodId,
    manifestId,
    truckId
}: Props) {
    const { hasPermission } = usePermissions();

    const addItemDialog = useAddDriverPayItemDialog();
    const editItemDialog = useEditManifestDriverPayItemMenu();

    const addItem = () => {
        addItemDialog.open({
            driverId,
            manifestId
        });
    };
    const canEdit = hasPermission(PERMISSIONS.EDIT_LOAD_DRIVER_PAY);

    const executeAction: MiniTableExecuteActionType<ManifestModel_Driver_PayItem> = (
        name,
        props
    ) => {
        if (canEdit) {
            editItemDialog.open({
                driverId,
                manifestId,
                truckId,
                item: props.row
            });
        }
    };

    return (
        <Stack
            direction="column"
            gap={5}
            sx={{
                border      : ({ palette }) => `1px solid ${palette.semantic.border.primary}`,
                borderRadius: '4px',
                padding     : '16px'
            }}
        >
            <DriverPreview
                manifestId={manifestId}
                driverId={driverId}
                settlementFriendlyId={settlementFriendlyId}
                settlementId={settlementId}
                settlementCycleId={settlementCycleId}
                settlementPeriodId={settlementPeriodId}
            />

            <MiniTable
                turnOffBorder
                fontSize="large"
                columns={columns}
                rows={payItems}
                elementKey="driverPayItemId"
                executeAction={executeAction}
                ComponentAfterContent={(
                    <TotalsRow
                        fontSize="large"
                        without_border
                        columns={columns}
                        info_config={{
                            total_amount : driverNet,
                            category_name: <AddItemButton onClick={addItem} />
                        }}
                    />
                )}
            />
        </Stack>
    );
}
