import VectorIcons from '@/@core/icons/vector_icons';
import { formatMinutes } from '@/utils/formatting';
import React from 'react';
import moment from 'moment-timezone';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import Badge from '@/@core/ui-kits/basic/badge/Badge';
import { EventsTypes } from '@/store/streams/events/slice';

type Props = {
    stop: EventsTypes.ManifestTruckRouteStops[0];
};

export default function ManifestStatusInProgressChips({ stop }: Props) {
    const { t } = useAppTranslation();
    const isLate = stop.lateness > 0 || stop.earliness === 0;
    const isEarly = stop.earliness > 0;

    const isLateArrived = stop.lateness >= 0 && stop.earliness === 0;
    const time = isLate ? stop.lateness : stop.earliness;

    const getArrivalTime = () => {
        const diff = moment(stop.arrivesAt).diff(moment(), 'minutes');
        return isLateArrived ? moment(stop.arrivesAt).format('MMM DD') : formatMinutes(diff, t);
    };

    const colorLocation: 'error' | 'blue_dark' = isLateArrived ? 'error' : 'blue_dark';
    const colorTime: 'error' | 'success' = isLate ? 'error' : 'success';

    return (
        <>
            <Badge
                variant="filled"
                size="small"
                icon={<VectorIcons.LocationIcon />}
                text={getArrivalTime()}
                utilityColor={colorLocation}
            />

            {!isLate && !isEarly ? null : (
                <Badge
                    variant="filled"
                    size="small"
                    icon={<VectorIcons.RushingTimeIcon />}
                    text={formatMinutes(time, t)}
                    utilityColor={colorTime}
                />
            )}
        </>
    );
}
