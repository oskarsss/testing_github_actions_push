/* eslint-disable no-nested-ternary */
import { useManifestTruckRoute } from '@/store/streams/events/hooks';
import React from 'react';
import { formatMinutes } from '@/utils/formatting';
import VectorIcons from '@/@core/icons/vector_icons';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import LoadStopComponents from '@/@core/ui-kits/loads/load-stop-time/components/LoadStopComponents';

type Props = {
    truck_id: string;
    stop_id: string;
};

const StopETALateEarly = ({
    truck_id,
    stop_id
}: Props) => {
    const truck_route = useManifestTruckRoute(truck_id);
    const load_next_eta = truck_route?.find((s) => s.localeStopId === stop_id);
    const { t } = useAppTranslation();

    if (!load_next_eta) {
        return null;
    }
    const isLate = load_next_eta?.lateness > 0 || load_next_eta?.earliness === 0;
    const isEarly = load_next_eta?.earliness > 0;

    if (!isLate && !isEarly) {
        return null;
    }

    const time = isLate ? load_next_eta.lateness : load_next_eta.earliness;
    const format_time = formatMinutes(time, t);
    const sign = isLate ? '+' : '';

    return (
        <LoadStopComponents.Button
            disabled
            startIcon={<VectorIcons.RushingTimeIcon />}
            color={isLate ? 'error' : 'success'}
        >
            <LoadStopComponents.TextWrapper>
                <LoadStopComponents.Text>
                    {t(isLate ? 'state_info:stop.late' : 'state_info:stop.early')}
                </LoadStopComponents.Text>
                <LoadStopComponents.Text textColor={isLate ? 'error' : 'success'}>
                    {`${
                        format_time && format_time !== t('common:not_provided') ? sign : ''
                    }${format_time}`}
                </LoadStopComponents.Text>
            </LoadStopComponents.TextWrapper>
        </LoadStopComponents.Button>
    );
};

export default StopETALateEarly;
