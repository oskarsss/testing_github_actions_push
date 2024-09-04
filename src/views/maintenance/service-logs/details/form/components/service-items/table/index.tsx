import { memo, useMemo } from 'react';
import columns from '@/views/maintenance/service-logs/details/form/components/service-items/table/columns';
import ServiceLogItemGrpcService from '@/@grpcServices/services/maitenance-service/service-log-item.service';
import MiniTableNoItems from '@/@core/ui-kits/basic/mini-table/components/MiniTableNoItems';
import TotalsRow from '@/@core/ui-kits/basic/mini-table/components/TotalsRow';
import MiniTable from '@/@core/ui-kits/basic/mini-table/MiniTable';
import type { MiniTableExecuteActionType } from '@/@core/ui-kits/basic/mini-table/MiniTable.types';
import type { ServiceLogItemModel_ItemRead } from '@proto/models/model_service_log_item';
import getFormattedAmountOfMoney from '@/utils/get-formatted-amount-of-money';
import { Stack } from '@mui/material';
import { useConfirm } from '@/@core/components/confirm-dialog';
import { useServiceLogItemTypesMap } from '@/store/hash_maps/hooks';
import { useEditServiceLogItemDialog } from '@/views/maintenance/service-logs/modals/service-log-item/EditServiceLogItem';

type Props = {
    serviceLogId: string;
    totalAmount: number;
};

function Table({
    serviceLogId,
    totalAmount
}: Props) {
    const serviceLogItemTypes = useServiceLogItemTypesMap();
    const editServiceLogItemDialog = useEditServiceLogItemDialog();
    const confirmDialog = useConfirm();
    const {
        data,
        isError
    } = ServiceLogItemGrpcService.useGetServiceLogItemsQuery({
        serviceLogId
    });
    const [deleteItem] = ServiceLogItemGrpcService.useDeleteServiceLogItemMutation();

    const confirm = (serviceLogItemId: string) => {
        confirmDialog({
            title           : 'maintenance:service_logs.modals.delete_item.title',
            body            : 'maintenance:service_logs.modals.delete_item.description',
            confirm_text    : 'common:button.delete',
            max_width_dialog: '400px',
            onConfirm       : () =>
                deleteItem({
                    serviceLogId,
                    serviceLogItemId
                }).unwrap()
        });
    };

    const formattedItems = useMemo(
        () =>
            data?.baseItem.map((item) => ({
                ...item,
                itemTypeName: serviceLogItemTypes[item.itemTypeId]?.name
            })),
        [data?.baseItem, serviceLogItemTypes]
    );

    if (isError || !formattedItems) {
        return <MiniTableNoItems colSpan={columns.length} />;
    }

    const executeAction: MiniTableExecuteActionType<ServiceLogItemModel_ItemRead> = (
        name,
        props
    ) => {
        switch (name) {
        case 'edit':
            editServiceLogItemDialog.open({
                serviceLogId,
                serviceLogItem: props.row
            });
            break;
        case 'delete':
            confirm(props.row.serviceLogItemId);
            break;
        default:
            break;
        }
    };

    return (
        <Stack
            paddingTop="12px"
            width="100%"
        >
            <MiniTable
                columns={columns}
                turnOffBorder
                rows={formattedItems}
                elementKey="serviceLogItemId"
                executeAction={executeAction}
                ComponentAfterContent={(
                    <TotalsRow
                        without_border
                        columns={columns}
                        info_config={{
                            total: getFormattedAmountOfMoney(totalAmount)
                        }}
                    />
                )}
            />
        </Stack>
    );
}

export default memo(Table);
