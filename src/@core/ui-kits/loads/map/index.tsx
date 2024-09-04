import GeneralMapStyled from '@/@core/components/general-map/GeneralMap.styled';
import LoadsGrpcService from '@/@grpcServices/services/loads-service/loads.service';
import { useInitializeMap } from '@/hooks/map-hooks/useInitializeMap';
import { useStableArray } from '@/hooks/useStable';
import { Stack, styled } from '@mui/material';
import { MapEvent } from 'mapbox-gl';
import React, { useCallback, useMemo } from 'react';
import FullScreenSwitch from '@/@core/components/general-map/general-map-controllers/FullScreenSwitch';
import { useLocationFleet } from '@/store/dispatch/scheduling/hooks';

import LoadInfoController from '@/@core/ui-kits/loads/loads-map/controllers/load-info-controller/LoadInfoController';
import { FlyToPoint } from '@/views/dispatch/orders/Details/sections/load-map/LoadMap';
import LoadFleetLocationController from '@/@core/ui-kits/loads/loads-map/controllers/load-fleet-location-controller/LoadFleetLocationController';
import AllDriversLayer from '@/@core/ui-kits/loads/loads-map/layers/LoadAllDriversLayer';
import { useAppSelector } from '@/store/hooks';
import { selectOrderDataMapStopsByOrderId } from '@/store/storage/orders/selectors';
import useAutoBounds, {
    PreparedMapStop,
    prepareMapStops,
    useStopsCoordinates
} from '@/views/dispatch/manifests/map/utils';
import EtaStatesLayer, {
    prepareEtaStates
} from '@/views/dispatch/manifests/map/layers/EtaStatesLayer';
import StopsPointersLayer from '@/views/dispatch/manifests/map/layers/stops/StopsPointersLayer';
import FromTruckToNextStopLayer from '@/views/dispatch/manifests/map/layers/FromTruckToNextStopLayer';
import TruckMarker from '@/views/dispatch/manifests/map/markers/TruckMarker';
import TrailerMarker from '@/views/dispatch/manifests/map/markers/TrailerMarker';
import DriverMarker from '@/views/dispatch/manifests/map/markers/DriverMarker';
import StopsMarkers from '@/views/dispatch/manifests/map/markers/StopsMarkers';
import StopsRouteLayer from '@/views/dispatch/manifests/map/layers/stops/StopsRouteLayer';
import ConnectEtaHistory from '@/views/dispatch/manifests/map/controllers/ConnectEtaHistory';
import createMap from '@/utils/create-map';
import ViewOnGoogleMaps from '../loads-map/controllers/ViewOnGoogleMaps';
import ShowOtherStopsController from './ShowLoadStopController';
import AutoFitFounds from '../loads-map/controllers/AutoFitFounds';
import WeatherController from '../loads-map/controllers/weather/WeatherController';
import SatelliteViewSwitch from '../loads-map/controllers/SatelliteViewSwitch';
import ShowAllDrivers from '../loads-map/controllers/ShowAllDrivers';

const loadMapFitBoundsOptions: mapboxgl.FitBoundsOptions = {
    padding    : { bottom: 40, top: 120, left: 80, right: 80 },
    speed      : 10,
    maxDuration: 1900
};

type MapSize = 'small' | 'large';

type Props = {
    loadId: string;
    isCompletedLoad: boolean;
    weatherControllerStorageKey: string;
    showOtherStop: boolean;
    setShowOtherStops: (value: boolean) => void;
    size?: MapSize;
    selectedStopId: string | null;
    setSelectedStopId: (id: string | null) => void;
    driverId: string;
    truckId: string;
    trailerId: string;
};

const ContainerControllers = styled('div')<{ size: MapSize }>(({
    theme,
    size
}) => ({
    position                      : 'absolute',
    top                           : 0,
    left                          : 0,
    width                         : '100%',
    height                        : '100%',
    overflow                      : 'hidden',
    padding                       : '12px',
    display                       : 'flex',
    flexDirection                 : 'row',
    justifyContent                : 'space-between',
    gap                           : '8px',
    pointerEvents                 : 'none',
    zIndex                        : 1200,
    [theme.breakpoints.down('xl')]: {
        ...(size === 'large' && {
            flexDirection: 'column'
        })
    }
}));

export default function LoadsMap({
    loadId,
    isCompletedLoad,
    weatherControllerStorageKey,
    showOtherStop,
    setShowOtherStops,
    size = 'small',
    selectedStopId,
    setSelectedStopId,
    driverId,
    truckId,
    trailerId
}: Props) {
    const cachedStops = useAppSelector(selectOrderDataMapStopsByOrderId(loadId));
    const {
        data,
        currentData,
        truckRouteStops
    } = LoadsGrpcService.useGetLoadTruckRouteQuery(
        {
            loadId
        },
        {
            pollingInterval : 3000,
            skip            : !loadId,
            selectFromResult: (result) => ({
                ...result,
                truckRouteStops: prepareMapStops(result?.data?.stops || [])
            })
        }
    );

    const [popupStopData, setPopupStopData] = React.useState<PreparedMapStop | null>(null);

    const etaStates = useStableArray(currentData?.etaStates || []);

    const mapWrapper = React.useRef<HTMLDivElement | null>(null);
    const [connected, setConnected] = React.useState(false);

    const [showAllDrivers, setShowAllDrivers] = React.useState(false);
    const [isSatellite, setSatellite] = React.useState(false);

    const fleetLocation = useLocationFleet(driverId, truckId);

    const disableOperations = useMemo(
        () => isCompletedLoad || !fleetLocation.type,
        [fleetLocation.type, isCompletedLoad]
    );

    const {
        activeStops,
        completedStops,
        stopsList,
        stopsMap,
        renderedStops,
        hasOtherStops
    } =
        useMemo(() => {
            const activeStops = currentData
                ? truckRouteStops
                : cachedStops.filter((stop) => !stop.isCompleted);
            const completedStops = (cachedStops ?? truckRouteStops).filter(
                (stop) => stop.isCompleted
            );

            const stopsList = [...completedStops, ...activeStops];
            const stopsMap = createMap(stopsList, 'stopId');

            const renderedStops = showOtherStop
                ? stopsList
                : stopsList.filter((stop) => stop.loadId === loadId);

            const hasOtherStops = stopsList.some((stop) => stop.loadId !== loadId);

            return {
                stopsList,
                stopsMap,
                activeStops,
                completedStops,
                renderedStops,
                hasOtherStops
            };
        }, [currentData, truckRouteStops, cachedStops, showOtherStop, loadId]);

    const preparedEtaStates = React.useMemo(() => prepareEtaStates(etaStates), [etaStates]);

    const polylineFromTruckLocationToNextStop = React.useMemo(
        () =>
            currentData?.polylineFromTruckLocationToFirstActiveStop && truckId && !isCompletedLoad
                ? currentData.polylineFromTruckLocationToFirstActiveStop
                : '',
        [currentData?.polylineFromTruckLocationToFirstActiveStop, isCompletedLoad, truckId]
    );

    const {
        stringifiedCoordinates,
        coordinatesBounds
    } = useStopsCoordinates(stopsList);

    const { map } = useInitializeMap({
        mapWrapper
    });

    const [isAutoFitFounds, setIsAutoFitFounds] = useAutoBounds({
        disableOperations,
        driverId,
        isCompleted: isCompletedLoad,
        map,
        completedStops,
        activeStops,
        truckId,
        uniqueId   : loadId
    });

    React.useEffect(() => {
        if (selectedStopId) {
            const selectedStop = stopsMap[selectedStopId];
            if (selectedStop && selectedStop.lonLat) {
                map?.flyTo({
                    center: [selectedStop.lonLat[0], selectedStop.lonLat[1]],
                    zoom  : 14,
                    speed : 14
                });
                console.debug('setIsAutoFitFounds selectedStopId', false);
                setIsAutoFitFounds(false);
            }
        } else if (coordinatesBounds) {
            map?.fitBounds(coordinatesBounds, loadMapFitBoundsOptions);
        }
    }, [selectedStopId]);

    React.useEffect(() => {
        if (isCompletedLoad) {
            setShowOtherStops(false);
        }
    }, [isCompletedLoad]);

    React.useEffect(() => {
        const zoomHandler = (
            e: MapEvent & {
                originalEvent?: MouseEvent | WheelEvent | TouchEvent;
            }
        ) => {
            if (e.originalEvent) {
                setIsAutoFitFounds(false);
            }
        };

        map?.on('movestart', zoomHandler);

        return () => {
            map?.off('movestart', zoomHandler);
        };
    }, [map]);

    const flyToPoint: FlyToPoint = useCallback(
        (lng, lat, zoom = 14) => {
            setIsAutoFitFounds(false);
            map?.flyTo({
                center  : { lng, lat },
                zoom,
                speed   : 16,
                duration: 200
            });
        },
        [map, setIsAutoFitFounds]
    );

    return (
        <GeneralMapStyled.Map ref={mapWrapper}>
            {map && (
                <>
                    <AllDriversLayer
                        map={map}
                        driverId={driverId}
                        showAllDrivers={showAllDrivers}
                    />
                    <DriverMarker
                        hide={isCompletedLoad}
                        driverId={driverId}
                        map={map}
                    />
                    <TrailerMarker
                        hide={isCompletedLoad}
                        map={map}
                        trailerId={trailerId}
                    />
                    <TruckMarker
                        hide={isCompletedLoad}
                        map={map}
                        truckId={truckId}
                    />
                    <EtaStatesLayer
                        connected
                        map={map}
                        preparedEtaStates={preparedEtaStates}
                    />

                    <FromTruckToNextStopLayer
                        map={map}
                        polyline={polylineFromTruckLocationToNextStop}
                    />
                    <StopsPointersLayer
                        map={map}
                        preparedStops={stopsList}
                    />
                    <StopsMarkers
                        map={map}
                        selectedStopId={selectedStopId}
                        setPopupStopData={setPopupStopData}
                        setSelectedStopId={setSelectedStopId}
                        stopsList={renderedStops}
                        mainLoadId={loadId}
                    />
                    <StopsRouteLayer
                        map={map}
                        hide={isCompletedLoad || !truckId}
                        stops={stopsList}
                    />
                    <ContainerControllers size={size}>
                        {size === 'small' ? (
                            <LoadFleetLocationController
                                truckId={truckId}
                                driverId={driverId}
                                flyToPoint={flyToPoint}
                            />
                        ) : (
                            <LoadInfoController
                                truckId={truckId}
                                driverId={driverId}
                                trailerId={trailerId}
                                flyToPoint={flyToPoint}
                                loadId={loadId}
                            />
                        )}
                        <Stack
                            direction="column"
                            spacing={2}
                            alignItems="flex-end"
                            flexGrow={1}
                            gap={1}
                            sx={(theme) => ({
                                [theme.breakpoints.down('xl')]: {
                                    ...(size === 'large' && {
                                        position     : 'relative',
                                        bottom       : 5,
                                        flexDirection: 'column-reverse'
                                    })
                                }
                            })}
                        >
                            <Stack
                                direction="row"
                                flexWrap="wrap"
                                justifyContent="flex-end"
                                gap={2}
                                sx={(theme) => ({
                                    [theme.breakpoints.down('xl')]: {
                                        ...(size === 'large' && {
                                            flexWrap: 'nowrap'
                                        })
                                    }
                                })}
                            >
                                <ViewOnGoogleMaps coordinates={stringifiedCoordinates} />

                                <ShowAllDrivers
                                    onClick={() => setShowAllDrivers((prev) => !prev)}
                                    showAllDrivers={showAllDrivers}
                                />
                                <SatelliteViewSwitch
                                    isSatellite={isSatellite}
                                    setSatellite={setSatellite}
                                    map={map}
                                />
                                <ConnectEtaHistory
                                    onChange={() => setConnected((prev) => !prev)}
                                    connected={connected}
                                />
                                <FullScreenSwitch
                                    mapRef={map}
                                    wrapRef={mapWrapper.current as HTMLDivElement}
                                />
                            </Stack>
                            <Stack
                                direction="column"
                                gap={2}
                                sx={(theme) => ({
                                    [theme.breakpoints.down('xl')]: {
                                        ...(size === 'large' && {
                                            flexWrap: 'nowrap'
                                        })
                                    }
                                })}
                            >
                                <WeatherController
                                    beforeLayer="route_polyline_to_next_stop"
                                    map={map}
                                    storageKey={weatherControllerStorageKey}
                                />
                                <AutoFitFounds
                                    truck_id={truckId}
                                    fleetLocation={fleetLocation}
                                    isAutoFitFounds={isAutoFitFounds}
                                    setIsAutoFitFounds={setIsAutoFitFounds}
                                />
                                <ShowOtherStopsController
                                    showOtherStops={hasOtherStops && showOtherStop}
                                    setShowOtherStops={setShowOtherStops}
                                    disabled={!hasOtherStops}
                                />
                            </Stack>
                        </Stack>
                    </ContainerControllers>
                </>
            )}
        </GeneralMapStyled.Map>
    );
}
