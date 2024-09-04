import ManifestsTypes from '@/store/dispatch/manifests/types';
import { useLocationFleet } from '@/store/dispatch/scheduling/hooks';
import { LoadModel_Stop_Type } from '@proto/models/model_load';
import {
    ManifestModel_LoadStop_Status,
    ManifestModel_ManifestStop_Status,
    ManifestModel_ManifestStop_Type,
    ManifestRouteModel_Stop
} from '@proto/models/model_manifest';
import { isEqual } from 'lodash';
import mapboxgl, { LngLatBoundsLike } from 'mapbox-gl';
import moment from 'moment-timezone';
import { useEffect, useMemo, useRef, useState } from 'react';

export type PreparedMapStop = {
    polylineToNextStop: string;
    stopId: string;
    sequence: number;
    lonLat: [number, number] | null;
    arrivesAtTime: string;
    arrivesAtDate: string;
    isCompleted: boolean;
    originType: ManifestsTypes.OriginType;
    type: ManifestModel_ManifestStop_Type | LoadModel_Stop_Type;
    status: ManifestModel_ManifestStop_Status | ManifestModel_LoadStop_Status;
    address: string;
    city: string;
    state: string;
    eta: number;
    lateness: number;
    earliness: number;
    loadId: string;
    arrivesAt: number;
    arrivedAt?: string;
    appointmentStartAt: string;
    markerDisplayTime: {
        month: string;
        day: string;
        time: string;
    };
};

export const prepareMapStops = (stops: ManifestRouteModel_Stop[]): PreparedMapStop[] =>
    stops.reduce((acc, stop) => {
        if (stop.stop?.loadStopId) {
            const loadStop = stop.stop;

            const isCompleted = loadStop.loadStopStatus === ManifestModel_LoadStop_Status.COMPLETED;
            const preparedStop: PreparedMapStop = {
                eta               : stop.eta,
                arrivedAt         : '',
                earliness         : stop.earliness,
                lateness          : stop.lateness,
                arrivesAt         : stop.arrivesAt,
                polylineToNextStop: stop.polylineToNextStop,
                stopId            : loadStop.loadStopId,
                sequence          : loadStop.sequence,
                arrivesAtTime     : moment(loadStop.appointmentStartAtLocal).format('HH:mm'),
                arrivesAtDate     : moment(loadStop.appointmentStartAtLocal).format('DD/MM'),
                loadId            : loadStop.loadId,
                isCompleted,
                // eslint-disable-next-line max-len
                lonLat            : loadStop.location ? [loadStop.location.lon, loadStop.location.lat] : null,
                originType        : ManifestsTypes.OriginType.LOAD,
                type              : loadStop.loadStopType,
                status            : loadStop.loadStopStatus,
                address           : loadStop.location?.address || '',
                state             : loadStop.location?.state || '',
                city              : loadStop.location?.city || '',
                appointmentStartAt: loadStop.appointmentStartAtLocal,
                markerDisplayTime : {
                    month: moment(loadStop.appointmentStartAtLocal).format('MMM'),
                    day  : moment(loadStop.appointmentStartAtLocal).format('D'),
                    time : moment(loadStop.appointmentStartAtLocal).format('H:mm')
                }
            };
            if (!isCompleted) {
                acc.push(preparedStop);
            }
        }

        if (stop.stop?.manifestStopId) {
            const manifestStop = stop.stop;

            const isCompleted =
                manifestStop.manifestStopStatus === ManifestModel_ManifestStop_Status.COMPLETED;

            const preparedStop: PreparedMapStop = {
                city              : manifestStop.location?.city || '',
                earliness         : stop.earliness,
                eta               : stop.eta,
                arrivesAt         : stop.arrivesAt,
                lateness          : stop.lateness,
                arrivedAt         : '',
                address           : manifestStop.location?.address || '',
                state             : manifestStop.location?.state || '',
                polylineToNextStop: stop.polylineToNextStop,
                loadId            : '',
                sequence          : manifestStop.sequence,
                stopId            : manifestStop.manifestStopId,
                lonLat            : manifestStop.location
                    ? [manifestStop.location.lon, manifestStop.location.lat]
                    : null,
                arrivesAtTime     : moment(manifestStop.appointmentStartAtLocal).format('HH:mm'),
                arrivesAtDate     : moment(manifestStop.appointmentStartAtLocal).format('DD/MM'),
                isCompleted,
                originType        : ManifestsTypes.OriginType.MANIFEST,
                type              : manifestStop.manifestStopType,
                status            : manifestStop.manifestStopStatus,
                appointmentStartAt: manifestStop.appointmentStartAtLocal,
                markerDisplayTime : {
                    month: moment(manifestStop.appointmentStartAtLocal).format('MMM'),
                    day  : moment(manifestStop.appointmentStartAtLocal).format('D'),
                    time : moment(manifestStop.appointmentStartAtLocal).format('H:mm')
                }
            };

            if (!isCompleted) {
                acc.push(preparedStop);
            }
        }

        return acc;
    }, [] as PreparedMapStop[]);

export const preparePrefetchedMapStops = (
    stops: ManifestsTypes.AnyPreparedStop[]
): PreparedMapStop[] =>
    stops.reduce((acc, stop) => {
        const needToPrepare =
            stop.originType === ManifestsTypes.OriginType.MANIFEST
                ? ![
                    ManifestModel_ManifestStop_Status.COMPLETED,
                    ManifestModel_ManifestStop_Status.CANCELLED
                ].includes(stop.manifestStopStatus)
                : ![
                    ManifestModel_LoadStop_Status.COMPLETED,
                    ManifestModel_LoadStop_Status.CANCELLED,
                    ManifestModel_LoadStop_Status.TONU
                ].includes(stop.loadStopStatus as ManifestModel_LoadStop_Status);

        if (needToPrepare) {
            const preparedStop: PreparedMapStop = {
                arrivedAt         : stop.arrivedAt,
                eta               : 0,
                earliness         : 0,
                lateness          : 0,
                arrivesAt         : 0,
                polylineToNextStop: '',
                stopId            : stop.stopId,
                sequence          : stop.sequence,
                arrivesAtTime     : moment(stop.appointmentStartAtLocal).format('HH:mm'),
                arrivesAtDate     : moment(stop.appointmentStartAtLocal).format('DD/MM'),
                loadId            : stop.loadId,
                isCompleted:
                    stop.manifestStopStatus === ManifestModel_ManifestStop_Status.COMPLETED,
                // eslint-disable-next-line max-len
                lonLat    : stop.location ? [stop.location.lon, stop.location.lat] : null,
                originType: stop.originType,

                type              : stop.manifestStopType || stop.loadStopType,
                appointmentStartAt: stop.appointmentStartAtLocal,

                status           : stop.manifestStopStatus || stop.loadStopStatus,
                address          : stop.location?.address || '',
                state            : stop.location?.state || '',
                city             : stop.location?.city || '',
                markerDisplayTime: {
                    month: moment(stop.appointmentStartAtLocal).format('MMM'),
                    day  : moment(stop.appointmentStartAtLocal).format('D'),
                    time : moment(stop.appointmentStartAtLocal).format('H:mm')
                }
            };
            acc.push(preparedStop);
        }
        return acc;
    }, [] as PreparedMapStop[]);

export const prepareCompletedMapStops = (
    stops: ManifestsTypes.AnyPreparedStop[]
): PreparedMapStop[] =>
    stops.reduce((acc, stop) => {
        const needToPrepare =
            stop.originType === ManifestsTypes.OriginType.MANIFEST
                ? [
                    ManifestModel_ManifestStop_Status.COMPLETED,
                    ManifestModel_ManifestStop_Status.CANCELLED,
                    ManifestModel_ManifestStop_Status.COMPLETED
                ].includes(stop.manifestStopStatus)
                : [
                    ManifestModel_LoadStop_Status.COMPLETED,
                    ManifestModel_LoadStop_Status.CANCELLED,
                    ManifestModel_LoadStop_Status.TONU,
                    ManifestModel_LoadStop_Status.COMPLETED
                ].includes(stop.loadStopStatus);

        if (needToPrepare) {
            const preparedStop: PreparedMapStop = {
                arrivedAt         : stop.arrivedAt,
                eta               : 0,
                earliness         : 0,
                lateness          : 0,
                arrivesAt         : 0,
                polylineToNextStop: '',
                stopId            : stop.stopId,
                sequence          : stop.sequence,
                arrivesAtTime     : moment(stop.appointmentStartAtLocal).format('HH:mm'),
                arrivesAtDate     : moment(stop.appointmentStartAtLocal).format('DD/MM'),
                loadId            : stop.loadId,
                isCompleted:
                    stop.manifestStopStatus === ManifestModel_ManifestStop_Status.COMPLETED,
                // eslint-disable-next-line max-len
                lonLat    : stop.location ? [stop.location.lon, stop.location.lat] : null,
                originType: stop.originType,

                type              : stop.loadStopType || stop.manifestStopType,
                appointmentStartAt: stop.appointmentStartAtLocal,

                status           : stop.loadStopStatus || stop.manifestStopStatus,
                address          : stop.location?.address || '',
                state            : stop.location?.state || '',
                city             : stop.location?.city || '',
                markerDisplayTime: {
                    month: moment(stop.appointmentStartAtLocal).format('MMM'),
                    day  : moment(stop.appointmentStartAtLocal).format('D'),
                    time : moment(stop.appointmentStartAtLocal).format('H:mm')
                }
            };
            acc.push(preparedStop);
        }
        return acc;
    }, [] as PreparedMapStop[]);

export const useStopsCoordinates = (preparedStops: PreparedMapStop[]) =>
    useMemo(() => {
        const coordinatesList = preparedStops.reduce((acc, stop) => {
            if (stop.lonLat) {
                acc.push({
                    lon: stop.lonLat[0],
                    lat: stop.lonLat[1]
                });
            }
            return acc;
        }, [] as { lon: number; lat: number }[]);

        const coordinatesBounds =
            coordinatesList.length >= 2
                ? coordinatesList.reduce(
                    (acc, coord) => acc.extend([coord.lon, coord.lat]),
                    new mapboxgl.LngLatBounds()
                )
                : null;

        const stopsCoordinates: LngLatBoundsLike | null =
            coordinatesList.length > 2
                ? [coordinatesList[0], coordinatesList[coordinatesList.length - 1]]
                : null;

        const stringifiedCoordinates = coordinatesList.map((coord) => `${coord.lat},${coord.lon}`);

        return { stopsCoordinates, stringifiedCoordinates, coordinatesList, coordinatesBounds };
    }, [preparedStops]);

type Params = {
    completedStops: PreparedMapStop[];
    activeStops: PreparedMapStop[];
    driverId: string;
    truckId: string;
    isCompleted: boolean;
    map: mapboxgl.Map | null;
    disableOperations: boolean;
    uniqueId: string;
};

export default function useAutoBounds({
    completedStops,
    driverId,
    truckId,
    isCompleted,
    activeStops,
    map,
    disableOperations,
    uniqueId
}: Params) {
    const fleetLocation = useLocationFleet(driverId, truckId);
    const [bounceOnce, setBounceOnce] = useState(false);
    const [isAutoFitBounds, setIsAutoFitBounds] = useState(false);
    const currentCoordinates = useRef<unknown>(null);

    const [activeBounds, coordinates] = useMemo(() => {
        const coordinates: [number, number][] = [];

        if (!isCompleted) {
            if (fleetLocation.type) {
                coordinates.push([fleetLocation.lon, fleetLocation.lat]);
            }
            activeStops.forEach((stop) => {
                if (stop.lonLat) {
                    coordinates.push([stop.lonLat[0], stop.lonLat[1]]);
                }
            });
        } else {
            completedStops.forEach((stop) => {
                if (stop.lonLat) {
                    coordinates.push([stop.lonLat[0], stop.lonLat[1]]);
                }
            });
        }
        const bounds =
            coordinates.length >= 2
                ? coordinates.reduce((acc, coord) => {
                    acc.extend(coord);
                    return acc;
                }, new mapboxgl.LngLatBounds())
                : null;
        return [bounds, coordinates] as const;
    }, [
        fleetLocation.lat,
        fleetLocation.lon,
        fleetLocation.type,
        isCompleted,
        completedStops,
        activeStops
    ]);

    useEffect(() => {
        if (activeBounds && map && !isEqual(currentCoordinates.current, coordinates)) {
            if (isAutoFitBounds) {
                currentCoordinates.current = coordinates;
                map.fitBounds(activeBounds, {
                    padding    : { bottom: 40, top: 120, left: 80, right: 80 },
                    speed      : 8,
                    maxDuration: 1900
                });
            }
            if (map && disableOperations && !isAutoFitBounds && !bounceOnce) {
                currentCoordinates.current = coordinates;
                map.fitBounds(activeBounds, {
                    padding    : { bottom: 40, top: 120, left: 80, right: 80 },
                    speed      : 8,
                    maxDuration: 1900,
                    linear     : true
                });
                setBounceOnce(true);
            }
        }
    }, [
        activeBounds,
        disableOperations,
        isAutoFitBounds,
        isCompleted,
        map,
        bounceOnce,
        coordinates
    ]);

    useEffect(() => {
        if (activeBounds && isAutoFitBounds && map) {
            map.fitBounds(activeBounds, {
                padding    : { bottom: 40, top: 120, left: 80, right: 80 },
                speed      : 8,
                maxDuration: 1900
            });
        }
    }, [isAutoFitBounds]);

    useEffect(() => {
        setBounceOnce(false);
        if (isCompleted || !fleetLocation.type) {
            setIsAutoFitBounds(false);
        } else {
            setIsAutoFitBounds(true);
        }
    }, [isCompleted, fleetLocation.type, uniqueId]);

    return [isAutoFitBounds, setIsAutoFitBounds] as const;
}
