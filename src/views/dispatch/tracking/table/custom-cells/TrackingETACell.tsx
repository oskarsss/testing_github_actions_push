import { useManifestTruckRoute } from '@/store/streams/events/hooks';
import { LoadModel_Status } from '@proto/models/model_load';
import React from 'react';
import { getLocalEta } from '@/utils/getLocatEta';
import { LoadData_Load } from '@proto/loads';
import useOrderActiveManifest from '@/store/storage/orders/hooks/useOrderActiveManifest';
import { OrdersTableETACell } from '@/@core/ui-kits/loads/table';

type Props = {
    row: LoadData_Load;
};

export default function TrackingETACell({ row }: Props) {
    const {
        manifest,
        truckId
    } = useOrderActiveManifest(row);
    const truck_route = useManifestTruckRoute(truckId);
    const load_next_eta = truck_route?.find((stop) => stop.loadId === row.loadId);
    const localEta = getLocalEta(manifest?.stops || []);
    const loadStatus = row.status;
    const isLocalEta = Boolean(!load_next_eta && localEta);

    const eta = load_next_eta || localEta;

    if (
        loadStatus === LoadModel_Status.in_progress ||
        loadStatus === LoadModel_Status.assigned ||
        loadStatus === LoadModel_Status.pending
    ) {
        return (
            <OrdersTableETACell
                earliness={eta.earliness}
                isLocalEta={isLocalEta}
                lateness={eta.lateness}
                eta={eta.eta}
            />
        );
    }

    return null;
}
