/* eslint-disable no-inner-declarations */
/* eslint-disable no-nested-ternary */

import GeneralMapStyled from '@/@core/components/general-map/GeneralMap.styled';
import { useInitializeMap } from '@/hooks/map-hooks/useInitializeMap';
import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useController, useWatch } from 'react-hook-form';
import ManifestsTypes from '@/store/dispatch/manifests/types';
import { ManifestModel_ManifestStop_Status } from '@proto/models/model_manifest';
import moment from 'moment-timezone';
import mapboxgl from 'mapbox-gl';
import createMap from '@/utils/create-map';
import { Stack, styled, Typography } from '@mui/material';
import FullScreenSwitch from '@/@core/components/general-map/general-map-controllers/FullScreenSwitch';
import SatelliteViewSwitch from '@/@core/ui-kits/loads/loads-map/controllers/SatelliteViewSwitch';
import WeatherController from '@/@core/ui-kits/loads/loads-map/controllers/weather/WeatherController';
import {
    useContextSelectedStop,
    useCreateBlankManifestForm
} from '@/views/dispatch/manifests/modals/create-blank-manifest/helpers';
import { reverseGeocoder } from '@/@core/fields/inputs/LocationInput/utils/geocoder';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import StopsPointersLayer from '@/views/dispatch/manifests/map/layers/stops/StopsPointersLayer';
import { PreparedMapStop } from '../../../../map/utils';
import StopsMarkers from './StopMarkers';
import { MANIFEST_MAP_CONFIG } from '../../../../map/layers.config';

const ContainerControllers = styled('div')(({ theme }) => ({
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
    zIndex        : 1200
}));

function Map() {
    const { t } = useAppTranslation();
    const mapWrapper = useRef<HTMLDivElement>(null);
    const { map } = useInitializeMap({
        mapWrapper
    });
    const [isSatellite, setSatellite] = useState(false);

    const {
        control,
        setValue,
        formState: { errors }
    } = useCreateBlankManifestForm();

    const stops = useWatch({ name: 'stops', control });

    const preparedStops = React.useMemo(
        () =>
            stops.map(
                (stop, index): PreparedMapStop => ({
                    address           : stop.location.address,
                    appointmentStartAt: stop.appointmentStartAt,
                    arrivesAt         : 0,
                    city              : stop.location.city,
                    arrivesAtDate     : '',
                    arrivesAtTime     : '',
                    earliness         : 0,
                    eta               : 0,
                    isCompleted       : false,
                    lateness          : 0,
                    loadId            : '',
                    lonLat:
                        stop.location.lon && stop.location.lat
                            ? [stop.location.lon, stop.location.lat]
                            : null,
                    markerDisplayTime: stop.appointmentStartAt
                        ? {
                            month: moment(stop.appointmentStartAt).format('MMM'),
                            day  : moment(stop.appointmentStartAt).format('D'),
                            time : moment(stop.appointmentStartAt).format('H:mm')
                        }
                        : {
                            month: '-',
                            day  : '-',
                            time : '-'
                        },

                    originType        : ManifestsTypes.OriginType.MANIFEST,
                    polylineToNextStop: '',
                    sequence          : index + 1,
                    state             : stop.location.state,
                    status            : ManifestModel_ManifestStop_Status.PLANNING,
                    stopId            : stop.stopId,
                    type              : stop.type,
                    arrivedAt         : ''
                })
            ),
        [stops]
    );

    const stopsMap = useMemo(() => createMap(preparedStops, 'stopId'), [preparedStops]);

    const {
        field: {
            onChange,
            value
        }
    } = useController({
        name: 'stops',
        control
    });

    const onChangeStops = useCallback(
        (index: number, newValue: any) => {
            const currentStop = value[index];
            const newStop = {
                ...currentStop,
                ...newValue
            };

            const newStops = value.map((item, idx) => (idx === index ? newStop : item));
            onChange(newStops);
        },
        [onChange, value]
    );

    const coords = React.useMemo(
        () =>
            stops.reduce((acc, stop) => {
                if (stop.location.lon && stop.location.lat) {
                    acc.push([stop.location.lon, stop.location.lat]);
                }

                return acc;
            }, [] as [number, number][]),
        [stops]
    );

    const {
        selectedStopId,
        setSelectedStopId
    } = useContextSelectedStop();

    useEffect(() => {
        if (map) {
            if (!selectedStopId) {
                if (coords.length >= 2) {
                    const bounds = coords.reduce((acc, coord) => {
                        acc.extend(coord);
                        return acc;
                    }, new mapboxgl.LngLatBounds());
                    map.fitBounds(bounds, {
                        padding: 50,
                        speed  : 10
                    });
                } else if (coords.length === 1) {
                    const center = coords[0];
                    map.flyTo({
                        zoom : 16,
                        center,
                        speed: 10
                    });
                }
            } else {
                const stop = stopsMap[selectedStopId];
                if (stop?.lonLat) {
                    map.flyTo({
                        center: stop.lonLat,
                        zoom  : 16,
                        speed : 10
                    });
                }
            }
        }
    }, [coords, map, selectedStopId, stopsMap]);

    const addCenterPin = () => {
        if (map && selectedStopId) {
            const stopIndex = value.findIndex((item) => item.stopId === selectedStopId);
            if (stopIndex === -1) return;
            const center = map.getCenter();
            reverseGeocoder(center.lat, center.lng).then((geoValue) => {
                onChangeStops(stopIndex, {
                    location: {
                        address   : geoValue.location_id_address,
                        city      : geoValue.location_id_city,
                        lat       : center.lat,
                        line1     : geoValue.location_id_line1,
                        lon       : center.lng,
                        name      : geoValue.location_id_name,
                        postalCode: geoValue.location_id_postal_code,
                        state     : geoValue.location_id_state
                    }
                });
            });
        }
    };

    return (
        <Stack
            position="relative"
            flexGrow={1}
        >
            <Stack
                position="absolute"
                top={0}
                left={0}
                width="100%"
                height="100%"
                alignItems="center"
                justifyContent="center"
                zIndex={10}
                onClick={addCenterPin}
                display={
                    selectedStopId ? (stopsMap[selectedStopId]?.lonLat ? 'none' : 'flex') : 'none'
                }
                sx={{ cursor: 'pointer' }}
            >
                <Typography
                    noWrap
                    fontSize="20px"
                    fontWeight={600}
                    textAlign="center"
                    color="white"
                    sx={{ cursor: 'pointer' }}
                >
                    {t('modals:manifests.create_blank.map.add_location')}
                </Typography>
            </Stack>
            <Stack
                sx={{
                    transition: 'filter 0.3s',
                    filter    : selectedStopId
                        ? stopsMap[selectedStopId]?.lonLat
                            ? 'none'
                            : 'blur(5px) brightness(0.8)'
                        : 'none',
                    flexGrow: 1
                }}
            >
                <GeneralMapStyled.Map
                    ref={mapWrapper}
                    sx={{
                        height: '100%'
                    }}
                >
                    {map && (
                        <>
                            {preparedStops.map((stop, idx) => (
                                <StopsMarkers
                                    map={map}
                                    selectedStopId={selectedStopId}
                                    setStopId={setSelectedStopId}
                                    stop={stop}
                                    onChangeStops={onChangeStops}
                                    index={idx}
                                    key={stop.stopId}
                                />
                            ))}
                            <StopsPointersLayer
                                map={map}
                                preparedStops={preparedStops}
                            />
                            <ContainerControllers>
                                <Stack
                                    direction="column"
                                    spacing={2}
                                    alignItems="flex-end"
                                    flexGrow={1}
                                    gap={2}
                                >
                                    <FullScreenSwitch
                                        mapRef={map}
                                        wrapRef={mapWrapper.current as HTMLDivElement}
                                    />
                                    <SatelliteViewSwitch
                                        isSatellite={isSatellite}
                                        setSatellite={setSatellite}
                                        map={map}
                                    />
                                    <WeatherController
                                        beforeLayer={MANIFEST_MAP_CONFIG.stops_pointers.layerId}
                                        map={map}
                                        storageKey="create_manifests"
                                    />
                                </Stack>
                            </ContainerControllers>
                        </>
                    )}
                </GeneralMapStyled.Map>
            </Stack>
        </Stack>
    );
}

export default memo(Map);
