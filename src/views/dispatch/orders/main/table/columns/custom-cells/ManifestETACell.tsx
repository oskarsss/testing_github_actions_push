import React from 'react';
import { useManifestTruckRoute } from '@/store/streams/events/hooks';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { ManifestModel_Status, ManifestModel_Stop } from '@proto/models/model_manifest';
import {
    getFirstActiveStop,
    getPrepareStops
} from '@/@grpcServices/services/manifests-service/utils';
import { getLocalEta } from '@/utils/getLocatEta';
import { OrdersTableETACell } from '@/@core/ui-kits/loads/table';

type Props = {
    truckId?: string;
    manifestStatus: ManifestModel_Status;
    stops: ManifestModel_Stop[];
};

export default function ManifestETACell({
    truckId,
    manifestStatus,
    stops
}: Props) {
    const nextStop = getFirstActiveStop(stops);
    const { t } = useAppTranslation();
    const truck_route = useManifestTruckRoute(truckId);

    if (!nextStop) return null;

    const preparedStops = getPrepareStops([nextStop]);
    const nextStopId = preparedStops[0]?.stopId || '';
    const load_next_eta = truck_route?.find((stop) => stop.localeStopId === nextStopId);

    const localEta = getLocalEta(preparedStops);

    const nextEta = load_next_eta || localEta;

    const isLocalEta = Boolean(!load_next_eta && localEta);

    if (
        manifestStatus === ManifestModel_Status.IN_PROGRESS ||
        manifestStatus === ManifestModel_Status.ASSIGNED ||
        manifestStatus === ManifestModel_Status.PLANNING
    ) {
        return (
            <OrdersTableETACell
                earliness={nextEta.earliness}
                isLocalEta={isLocalEta}
                lateness={nextEta.lateness}
                eta={nextEta.eta}
            />
        );
    }

    return null;
}
