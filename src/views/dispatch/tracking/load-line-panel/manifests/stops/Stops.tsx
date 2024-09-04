import { ManifestModel_Manifest } from '@proto/models/model_manifest';
import { findLastIndex } from 'lodash';
import { isCompletedStop } from '@/utils/load-stops';
import React, { useMemo } from 'react';
import moment from 'moment-timezone';
import StopItem from '@/views/dispatch/tracking/load-line-panel/manifests/stops/StopsItem';

type Props = {
    stops: ManifestModel_Manifest['stops'];
    primaryDriverId: string;
    truckId: string;
};

function Stops({
    stops,
    primaryDriverId,
    truckId
}: Props) {
    const activeStopIdx = findLastIndex(stops, isCompletedStop);

    const percentageProgress = useMemo(() => {
        if (activeStopIdx === -1) return 0;
        const activeStop = stops[activeStopIdx];
        const nextStop = stops[activeStopIdx + 1];
        if (!nextStop) return 100;

        const startAt = moment.utc(activeStop.appointmentStartAtLocal);
        const endAt = moment.utc(nextStop.appointmentStartAtLocal);

        const now = moment.utc();

        if (now.isBefore(startAt)) return 0;
        if (now.isAfter(endAt)) return 100;

        const totalDuration = endAt.diff(startAt);
        const elapsedDuration = now.diff(startAt);

        return (elapsedDuration / totalDuration) * 100;
    }, [activeStopIdx, stops]);

    return stops.map((stop, idx) => (
        <StopItem
            key={stop.manifestStopId || stop.loadStopId}
            percentageProgress={percentageProgress}
            isLastStop={idx === stops.length - 1}
            stop={stop}
            driverId={primaryDriverId}
            isActiveStop={idx === activeStopIdx}
            truckId={truckId}
        />
    ));
}

export default Stops;
