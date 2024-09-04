import React from 'react';
import { useManifestTruckRoute } from '@/store/streams/events/hooks';
import { formatMinutes } from '@/utils/formatting';
import VectorIcons from '@/@core/icons/vector_icons';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import LoadStopComponents from '@/@core/ui-kits/loads/load-stop-time/components/LoadStopComponents';
import StopsComponents from '@/@core/ui-kits/loads/load-stop/StopsComponents';

type Props = {
    truck_id: string;
    stop_id: string;
};

export default function StopETA({
    stop_id,
    truck_id
}: Props) {
    const truck_route = useManifestTruckRoute(truck_id);
    const { t } = useAppTranslation();
    const load_next_eta = truck_route?.find((s) => s.localeStopId === stop_id);
    if (!load_next_eta) {
        return null;
    }

    return (
        <>
            <LoadStopComponents.Button
                disabled
                startIcon={<VectorIcons.LocationIcon />}
                color="info"
            >
                <LoadStopComponents.TextWrapper>
                    <LoadStopComponents.Text>{t('state_info:stop.eta')}</LoadStopComponents.Text>

                    <LoadStopComponents.Text textColor="primary">
                        {formatMinutes(load_next_eta.eta, t)}
                    </LoadStopComponents.Text>
                </LoadStopComponents.TextWrapper>
            </LoadStopComponents.Button>
            <StopsComponents.StopItemTimeDivider />
        </>
    );
}
