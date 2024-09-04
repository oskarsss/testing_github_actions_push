import { OrdersTableStopCell } from '@/@core/ui-kits/loads/table/custom-cell';
import { ManifestModel_Manifest } from '@proto/models/model_manifest';
import { memo } from 'react';

type Props = { row: ManifestModel_Manifest };

function ManifestOriginCell({ row }: Props) {
    const firstStop = row.stops[0];
    return (
        <OrdersTableStopCell
            city={firstStop?.location?.city || ''}
            state={firstStop?.location?.state || ''}
            time={firstStop?.appointmentStartAtLocal || ''}
        />
    );
}

export default memo(ManifestOriginCell);
