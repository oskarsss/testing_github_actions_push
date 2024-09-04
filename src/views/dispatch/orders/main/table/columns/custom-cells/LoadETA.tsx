import React from 'react';
import { useManifestTruckRoute } from '@/store/streams/events/hooks';
import { LoadModel_Status } from '@proto/models/model_load';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { getLocalEta } from '@/utils/getLocatEta';
import { ManifestModel_Stop } from '@proto/models/model_manifest';
import { OrdersTableETACell } from '@/@core/ui-kits/loads/table';

type Props = {
    truckId?: string;
    loadStatus: LoadModel_Status;
    loadId: string;
    stops: ManifestModel_Stop[];
};

export default function LoadETA({
    truckId,
    loadStatus,
    loadId,
    stops
}: Props) {
    const { t } = useAppTranslation();
    const truck_route = useManifestTruckRoute(truckId || '');
    const load_next_eta = truck_route?.find((stop) => stop.loadId === loadId);
    const localEta = getLocalEta(stops);

    const eta = load_next_eta || localEta;

    const isLocalEta = Boolean(!load_next_eta && localEta);

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
