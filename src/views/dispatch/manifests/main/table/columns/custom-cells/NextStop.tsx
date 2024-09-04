import {
    getFirstActiveStop,
    getPrepareStops
} from '@/@grpcServices/services/manifests-service/utils';
import { useMemo } from 'react';
import { ManifestModel_Manifest } from '@proto/models/model_manifest';
import { OrdersTableTextCell } from '@/@core/ui-kits/loads/table';
import { OrdersTableStopCell } from '@/@core/ui-kits/loads/table/custom-cell';

type Props = {
    row: ManifestModel_Manifest;
};

export default function NextStop({ row }: Props) {
    const nextStop = useMemo(() => {
        const nextActiveStop = getFirstActiveStop(row.stops);
        if (!nextActiveStop) return null;
        return getPrepareStops([nextActiveStop])[0];
    }, [row.stops]);

    if (!nextStop) {
        return (
            <OrdersTableTextCell
                title="-"
                description=""
            />
        );
    }

    return (
        <OrdersTableStopCell
            city={nextStop.location?.city || '-'}
            state={nextStop.location?.state || ''}
            time={nextStop?.appointmentStartAtLocal}
        />
    );
}
