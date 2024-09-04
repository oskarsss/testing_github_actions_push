import { memo, useMemo } from 'react';
import { WarrantyItemGetReply_ItemWithRemains } from '@proto/vehicle_warranty.coverage_item';
import MiniTable from '@/@core/ui-kits/basic/mini-table/MiniTable';
import { MiniTableExecuteActionType } from '@/@core/ui-kits/basic/mini-table/MiniTable.types';
import { useStableArray } from '@/hooks/useStable';
import VehicleWarrantyCoverageItemGrpcService from '@/@grpcServices/services/vehicle-warranty-coverage-items.service';
import CoverageItemsTableNoItems from '@/@core/ui-kits/profiles/components/tabs/warranty/sections/warranty-details/coverage-items/coverage-items-table/CoverageItemsTableNoItems';
import { useUpdateCoverageItemDialog } from '@/@core/ui-kits/profiles/components/tabs/warranty/modals/coverage-item/UpdateCoverageItem';
import columns, { ConvertCoveredItem } from './columns';

type Props = {
    warrantyItems?: WarrantyItemGetReply_ItemWithRemains[];
};

function CoverageItemsTable({ warrantyItems }: Props) {
    const coverageItemUpdateDialog = useUpdateCoverageItemDialog();
    const [warrantyItemDelete] =
        VehicleWarrantyCoverageItemGrpcService.useWarrantyItemDeleteMutation();
    const items = useStableArray(warrantyItems);

    const executeAction: MiniTableExecuteActionType<ConvertCoveredItem> = (name, props) => {
        switch (name) {
        case 'edit':
            coverageItemUpdateDialog.open({
                vehicleWarrantyId: props.row.vehicleWarrantyId || '',
                coverageItem     : props.row
            });
            break;
        case 'delete':
            warrantyItemDelete({
                vehicleWarrantyId: props.row.vehicleWarrantyId || '',
                warrantyItemId   : props.row.warrantyItemId || ''
            });
            break;
        default:
            break;
        }
    };

    const convertCoveredItems: ConvertCoveredItem[] = useMemo(
        () =>
            items.map((item) => ({
                periodWeeksRemain       : item.periodWeeksRemain,
                distanceMilesRemain     : item.distanceMilesRemain,
                distanceKilometersRemain: item.distanceKilometersRemain,
                vehicleWarrantyId       : item.baseItem?.vehicleWarrantyId || '',
                warrantyItemId          : item.baseItem?.warrantyItemId || '',
                name                    : item.baseItem?.name || '',
                periodMonthsRange       : item.baseItem?.periodMonthsRange || 0,
                distanceMilesRange      : item.baseItem?.distanceMilesRange || 0,
                distanceKilometersRange : item.baseItem?.distanceKilometersRange || 0
            })),
        [items]
    );

    return (
        <MiniTable
            stickyHeader
            turnOffBorder
            columns={columns}
            rows={convertCoveredItems}
            elementKey="warrantyItemId"
            executeAction={executeAction}
            emptyStateContent={<CoverageItemsTableNoItems />}
        />
    );
}

export default memo(CoverageItemsTable);
