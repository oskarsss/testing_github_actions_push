import { LoadData_Load } from '@proto/loads';
import useOrderActiveManifest from '@/store/storage/orders/hooks/useOrderActiveManifest';
import { useTruckById } from '@/store/storage/trucks/hooks/common';
import { useDriverById } from '@/store/storage/drivers/hooks/common';
import { OrdersTableTextCell } from '@/@core/ui-kits/loads/table';
import { memo } from 'react';
import AssignTruckToLoad from './AssignTruckToLoad';

type Props = {
    row: LoadData_Load;
    isSelectedRow: boolean;
};

function TruckInfo({
    row,
    isSelectedRow
}: Props) {
    const {
        driverId,
        truckId,
        manifest
    } = useOrderActiveManifest(row);
    const driver = useDriverById(driverId);

    const truck = useTruckById(truckId);

    if (!truckId) {
        return (
            <AssignTruckToLoad
                loadId={row.loadId}
                stops={manifest?.stops || []}
                friendlyId={manifest?.friendlyId?.toString() ?? ''}
                manifestId={manifest?.manifestId ?? ''}
                isSelectedRow={isSelectedRow}
            />
        );
    }

    return (
        <OrdersTableTextCell
            title={truck?.referenceId || '-'}
            description={driver?.firstName || '-'}
        />
    );
}

export default memo(TruckInfo);
