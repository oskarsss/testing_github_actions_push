import React, { Dispatch, SetStateAction, useMemo } from 'react';
import { PreparedMapStop } from '../utils';
import StopMarkerPortal from './stop-marker';

type Props = {
    stopsList: PreparedMapStop[];
    map: mapboxgl.Map;
    selectedStopId: string | null;
    setSelectedStopId: (stopId: string | null) => void;
    setPopupStopData: Dispatch<SetStateAction<PreparedMapStop | null>>;
    mainLoadId?: string;
};

export default function StopsMarkers({
    stopsList,
    map,
    selectedStopId,
    setPopupStopData,
    setSelectedStopId,
    mainLoadId
}: Props) {
    const renderedStops = useMemo(
        () =>
            stopsList.reduce((acc, stop) => {
                if (stop.lonLat) {
                    const key = `${stop.lonLat}`;
                    acc[key] = {
                        stops: [...(acc[key]?.stops || []), stop],
                        lat  : stop.lonLat[1],
                        lon  : stop.lonLat[0],
                        ids  : [...(acc[key]?.ids || []), stop.stopId]
                    };
                }
                return acc;
                // eslint-disable-next-line max-len
            }, {} as Record<string, { stops: PreparedMapStop[]; lat: number; lon: number; ids: string[] }>),
        [stopsList]
    );

    return Object.entries(renderedStops).map(([key, stops]) => (
        <StopMarkerPortal
            key={key}
            map={map}
            selectedStopId={selectedStopId}
            setSelectedStopId={setSelectedStopId}
            stops={stops}
            setPopupData={setPopupStopData}
            mainLoadId={mainLoadId}
        />
    ));
}
