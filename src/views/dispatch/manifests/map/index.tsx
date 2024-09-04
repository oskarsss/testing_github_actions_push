import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import GeneralMapStyled from '@/@core/components/general-map/GeneralMap.styled';
import { useInitializeMap } from '@/hooks/map-hooks/useInitializeMap';
import ManifestsGrpcService from '@/@grpcServices/services/manifests-service/manifests.service';
import { ManifestModel_Status } from '@proto/models/model_manifest';
import { MapEvent } from 'mapbox-gl';
import { Stack, styled } from '@mui/material';
import FullScreenSwitch from '@/@core/components/general-map/general-map-controllers/FullScreenSwitch';
import WeatherLayer from '@/@core/components/general-map/general-map-layers/WeatherLayer';
import WeatherController from '@/@core/ui-kits/loads/loads-map/controllers/weather/WeatherController';
import SatelliteViewSwitch from '@/@core/ui-kits/loads/loads-map/controllers/SatelliteViewSwitch';
import { useLocationFleet } from '@/store/dispatch/scheduling/hooks';
import AutoFitFounds from '@/@core/ui-kits/loads/loads-map/controllers/AutoFitFounds';
import ShowAllDrivers from '@/@core/ui-kits/loads/loads-map/controllers/ShowAllDrivers';
import LoadInfoController from '@/@core/ui-kits/loads/loads-map/controllers/load-info-controller/LoadInfoController';
import { FlyToPoint } from '@/views/dispatch/orders/Details/sections/load-map/LoadMap';
import LoadFleetLocationController from '@/@core/ui-kits/loads/loads-map/controllers/load-fleet-location-controller/LoadFleetLocationController';
import ViewOnGoogleMaps from '@/@core/ui-kits/loads/loads-map/controllers/ViewOnGoogleMaps';
import createMap from '@/utils/create-map';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { ManifestsActions } from '@/store/dispatch/manifests/slice';
import AllDriversLayer from '@/@core/ui-kits/loads/loads-map/layers/LoadAllDriversLayer';
import { selectSelectedManifestMapStops } from '@/store/dispatch/manifests/selectors';
import TruckMarker from './markers/TruckMarker';
import DriverMarker from './markers/DriverMarker';
import TrailerMarker from './markers/TrailerMarker';
import StopsRouteLayer from './layers/stops/StopsRouteLayer';
import FromTruckToNextStopLayer from './layers/FromTruckToNextStopLayer';
import StopsPointersLayer from './layers/stops/StopsPointersLayer';
import EtaStatesLayer, { prepareEtaStates } from './layers/EtaStatesLayer';
import ConnectEtaHistory from './controllers/ConnectEtaHistory';
import useAutoBounds, { PreparedMapStop, prepareMapStops, useStopsCoordinates } from './utils';
import StopsMarkers from './markers/StopsMarkers';

type MapSize = 'small' | 'large';

type Props = {
    manifestId: string;
    truckId: string;
    driverId: string;
    manifestStatus?: ManifestModel_Status;
    trailerId: string;
    size?: MapSize;
};

const loadMapFitBoundsOptions: mapboxgl.FitBoundsOptions = {
    padding    : { bottom: 40, top: 120, left: 80, right: 80 },
    speed      : 10,
    maxDuration: 1900
};

const ContainerControllers = styled('div')<{ size: MapSize }>(({
    theme,
    size
}) => ({
    position      : 'absolute',
    top           : 0,
    left          : 0,
    width         : '100%',
    height        : '100%',
    overflow      : 'hidden',
    padding       : '12px',
    display       : 'flex',
    flexDirection : 'row',
    justifyContent: 'space-between',
    gap           : '8px',
    pointerEvents : 'none',
    zIndex        : 1200,

    ...(size === 'large' && {
        flexDirection: 'column'
    })
}));

function ManifestsMap({
    manifestId,
    truckId,
    driverId,
    manifestStatus,
    trailerId,
    size = 'small'
}: Props) {
    const cachedStops = useAppSelector(selectSelectedManifestMapStops);

    const mapWrapper = useRef<HTMLDivElement | null>(null);

    const [connected, setConnect] = useState(false);
    const [showAllDrivers, setShowAllDrivers] = useState(false);

    const [isSatellite, setSatellite] = useState(false);
    const [popupStopData, setPopupStopData] = useState<PreparedMapStop | null>(null);

    const dispatch = useAppDispatch();

    const setSelectedStopId = (stopId: string | null) => {
        dispatch(ManifestsActions.SetSelectedStopId(stopId));
    };

    const selectedStopId = useAppSelector((state) => state.manifests.map.selectedStopId);

    const { map } = useInitializeMap({
        mapWrapper
    });

    const isCompletedManifest = manifestStatus === ManifestModel_Status.DELIVERED;
    const fleetLocation = useLocationFleet(driverId, truckId);

    const disableOperations = useMemo(
        () => isCompletedManifest || !fleetLocation.type,
        [fleetLocation, isCompletedManifest]
    );

    const {
        currentData,
        stops
    } = ManifestsGrpcService.useRetrieveManifestTruckRouteQuery(
        { manifestId },
        {
            pollingInterval : 5000,
            skip            : !manifestId,
            selectFromResult: (result) => ({
                ...result,
                stops: prepareMapStops(result?.data?.stops || [])
            })
        }
    );

    const { preparedEtaStates } = ManifestsGrpcService.useGetManifestTruckEtaStatesQuery(
        {
            manifestId
        },
        {
            skip            : !manifestId,
            ...(!isCompletedManifest && { pollingInterval: 60000 }),
            selectFromResult: (result) => ({
                ...result,
                preparedEtaStates: prepareEtaStates(result?.data?.etaStates || [])
            })
        }
    );

    const {
        activeStops,
        completedStops,
        stopsList,
        stopsMap
    } = useMemo(() => {
        const activeStops = currentData ? stops : cachedStops.filter((stop) => !stop.isCompleted);
        const completedStops = (cachedStops ?? stops).filter((stop) => stop.isCompleted);

        const stopsList = [...activeStops, ...completedStops];
        const stopsMap = createMap(stopsList, 'stopId');

        return {
            stopsList,
            stopsMap,
            activeStops,
            completedStops
        };
    }, [currentData, cachedStops, stops]);

    const {
        stringifiedCoordinates,
        coordinatesBounds
    } = useStopsCoordinates(stopsList);

    const polylineFromTruckLocationToNextStop = useMemo(
        () =>
            currentData?.polylineFromTruckLocationToNextStop && truckId && !isCompletedManifest
                ? currentData.polylineFromTruckLocationToNextStop
                : '',
        [currentData?.polylineFromTruckLocationToNextStop, isCompletedManifest, truckId]
    );

    const [isAutoFitFounds, setIsAutoFitFounds] = useAutoBounds({
        disableOperations,
        driverId,
        isCompleted: isCompletedManifest,
        map,
        completedStops,
        activeStops,
        truckId,
        uniqueId   : manifestId
    });

    useEffect(() => {
        if (selectedStopId) {
            const selectedStop = stopsMap[selectedStopId];
            if (selectedStop && selectedStop.lonLat) {
                map?.flyTo({
                    center: [selectedStop.lonLat[0], selectedStop.lonLat[1]],
                    zoom  : 14,
                    speed : 14
                });
                setIsAutoFitFounds(false);
            }
        } else if (coordinatesBounds) {
            map?.fitBounds(coordinatesBounds, loadMapFitBoundsOptions);
        }
    }, [selectedStopId]);

    useEffect(() => {
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

    const handleChangeConnect = () => {
        setConnect((prev) => !prev);
    };

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
                    <TruckMarker
                        hide={isCompletedManifest}
                        map={map}
                        truckId={truckId}
                    />
                    <AllDriversLayer
                        map={map}
                        driverId={driverId}
                        showAllDrivers={showAllDrivers}
                    />
                    <DriverMarker
                        hide={isCompletedManifest}
                        driverId={driverId}
                        map={map}
                    />
                    <TrailerMarker
                        hide={isCompletedManifest}
                        map={map}
                        trailerId={trailerId}
                    />
                    <WeatherLayer
                        beforeLayer="route_polyline_to_next_stop"
                        map={map}
                        weatherStoreKey="manifests_page"
                    />
                    <EtaStatesLayer
                        connected={connected}
                        preparedEtaStates={preparedEtaStates}
                        map={map}
                    />
                    <StopsPointersLayer
                        map={map}
                        preparedStops={stopsList}
                    />

                    <FromTruckToNextStopLayer
                        map={map}
                        polyline={polylineFromTruckLocationToNextStop}
                    />
                    <StopsRouteLayer
                        map={map}
                        hide={isCompletedManifest || !truckId}
                        stops={activeStops}
                    />
                    <StopsMarkers
                        map={map}
                        selectedStopId={selectedStopId}
                        setPopupStopData={setPopupStopData}
                        setSelectedStopId={setSelectedStopId}
                        stopsList={stopsList}
                    />
                    {/* <StopMarkerPopup
                        map={map}
                        setPopupData={setPopupStopData}
                        popupData={popupStopData}
                    /> */}

                    <ContainerControllers size={size}>
                        {size === 'large' ? (
                            <LoadInfoController
                                truckId={truckId}
                                driverId={driverId}
                                trailerId={trailerId}
                                flyToPoint={flyToPoint}
                            />
                        ) : (
                            <LoadFleetLocationController
                                truckId={truckId}
                                driverId={driverId}
                                flyToPoint={flyToPoint}
                            />
                        )}
                        <Stack
                            direction="column"
                            spacing={2}
                            alignItems="flex-end"
                            flexGrow={1}
                            gap={2}
                            sx={(theme) => ({
                                ...(size === 'large' && {
                                    position     : 'relative',
                                    bottom       : 5,
                                    flexDirection: 'column-reverse'
                                })
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
                                    onChange={handleChangeConnect}
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
                                    ...(size === 'large' && {
                                        flexWrap: 'nowrap'
                                    })
                                })}
                            >
                                <WeatherController
                                    beforeLayer="route_polyline_to_next_stop"
                                    map={map}
                                    storageKey="manifests_page"
                                />
                                <AutoFitFounds
                                    truck_id={truckId}
                                    fleetLocation={fleetLocation}
                                    isAutoFitFounds={isAutoFitFounds}
                                    setIsAutoFitFounds={setIsAutoFitFounds}
                                />
                                <ViewOnGoogleMaps coordinates={stringifiedCoordinates} />
                            </Stack>
                        </Stack>
                    </ContainerControllers>
                </>
            )}
        </GeneralMapStyled.Map>
    );
}

export default memo(ManifestsMap);
