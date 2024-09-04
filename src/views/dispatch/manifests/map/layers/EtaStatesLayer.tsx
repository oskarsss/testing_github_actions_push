/* eslint-disable no-restricted-syntax */
import MapboxGeojsonLayer from '@/@core/maps/MapboxGeojsonLayer';
import ManifestsTypes from '@/store/dispatch/manifests/types';
import type { Feature, GeoJsonProperties, Geometry } from 'geojson';
import mapboxgl from 'mapbox-gl';
import React, { useMemo, useEffect, useState } from 'react';
import { MapDefaultSources } from '@/utils/mapbox-utils/map-helper';
import { ManifestRouteModel_EtaState } from '@proto/models/model_manifest';
import { GeojsonSourceType } from './FromTruckToNextStopLayer';
import EtaStatePopup from '../popups/eta-state';
import MANIFEST_LAYERS, { MANIFEST_MAP_CONFIG } from '../layers.config';

export type PreparedEtaState = ManifestRouteModel_EtaState & {
    preparedStopId: string;
    stopOrigin: ManifestsTypes.OriginType;
    uniqueKey: string;
};

type Props = {
    map: mapboxgl.Map;
    connected: boolean;
    preparedEtaStates: PreparedEtaState[];
};

export const prepareEtaStates = (
    etaStates: (ManifestRouteModel_EtaState & { manifestId: string })[]
): PreparedEtaState[] =>
    etaStates.reduce((acc, etaState) => {
        acc.push({
            preparedStopId: etaState.stopId?.loadStopId || etaState.stopId?.manifestStopId || '',
            stopOrigin    : etaState.stopId?.loadStopId
                ? ManifestsTypes.OriginType.LOAD
                : ManifestsTypes.OriginType.MANIFEST,
            uniqueKey: `${etaState.truckLat}_${etaState.truckLon}`,
            ...etaState
        });

        return acc;
    }, [] as PreparedEtaState[]);

const getClusterFeatures = async (
    clusterId: number,
    source: mapboxgl.GeoJSONSource
): Promise<GeoJSON.Feature<GeoJSON.Geometry, GeoJSON.GeoJsonProperties>[]> => {
    const data: GeoJSON.Feature<GeoJSON.Geometry, GeoJSON.GeoJsonProperties>[] = [];

    const getChildren = async (clusterId: number): Promise<void> => {
        const features = await new Promise<
            GeoJSON.Feature<GeoJSON.Geometry, GeoJSON.GeoJsonProperties>[]
        >((res, rej) => {
            source.getClusterChildren(clusterId, (err, features) => {
                if (err) {
                    rej(err);
                    return;
                }
                res(features || []);
            });
        });

        for (const feature of features) {
            if (!feature.properties?.cluster) {
                data.push(feature);
            } else {
                // eslint-disable-next-line no-await-in-loop
                await getChildren(feature.properties?.cluster_id);
            }
        }
    };

    await getChildren(clusterId);

    return data;
};

export type VisibleCluster = {
    coordinates: [number, number];
    clusterId: number;
    futureCount: number;
    nowCount: number;
    bounds: mapboxgl.LngLatBounds;
};

export type PopupData = {
    etaStates: PreparedEtaState[];
    bounds: mapboxgl.LngLatBounds;
    coordinates: [number, number];
    isCluster: boolean;
};

const etaStatesLayerId = MANIFEST_MAP_CONFIG.eta_states.layerId;
const etaStatesSourceId = MANIFEST_MAP_CONFIG.eta_states.sourceId;

export default function EtaStatesLayer({
    map,
    connected,
    preparedEtaStates
}: Props) {
    const [popupData, setPopupData] = useState<null | PopupData>(null);

    const features: Feature<Geometry, GeoJsonProperties>[] = useMemo(
        () =>
            preparedEtaStates.map(
                (etaState): Feature<Geometry, GeoJsonProperties> => ({
                    type    : 'Feature',
                    geometry: {
                        type       : 'Point',
                        coordinates: [etaState.truckLon, etaState.truckLat]
                    },
                    properties: {
                        etaState
                    }
                })
            ),
        [preparedEtaStates]
    );

    const coordinates = useMemo(
        () =>
            preparedEtaStates.reduce((acc, etaState) => {
                acc.push([etaState.truckLon, etaState.truckLat]);
                return acc;
            }, [] as [number, number][]),
        [preparedEtaStates]
    );

    const connectedFeatures: GeojsonSourceType = useMemo(
        () =>
            connected
                ? {
                    type      : 'Feature',
                    properties: {},
                    geometry  : {
                        type: 'LineString',
                        coordinates
                    }
                }
                : MapDefaultSources.featureLineString,
        [connected, coordinates]
    );

    useEffect(() => {
        map.on('click', etaStatesLayerId, (e) => {
            const source = map.getSource(etaStatesSourceId) as mapboxgl.GeoJSONSource;
            if (e?.features && source) {
                const { properties } = e.features[0];
                const clusterId = properties?.cluster_id;
                if (clusterId) {
                    getClusterFeatures(clusterId, source).then((clusterFeatures) => {
                        const coordinates = (
                            clusterFeatures[0].geometry as any
                        ).coordinates.slice();
                        map.flyTo({
                            center: coordinates,
                            zoom  : 12,
                            speed : 12
                        });
                    });
                    return;
                }
                const coordinates = (e.features[0].geometry as any).coordinates.slice();
                map.flyTo({
                    center: coordinates,
                    zoom  : 12,
                    speed : 12
                });
            }
        });

        map.on('mouseenter', etaStatesLayerId, async (e) => {
            // eslint-disable-next-line no-param-reassign
            map.getCanvas().style.cursor = 'pointer';
            const source = map.getSource(etaStatesSourceId) as mapboxgl.GeoJSONSource;
            if (e?.features && source) {
                const properties = e.features?.[0].properties;
                const clusterId = properties?.cluster_id;
                if (clusterId) {
                    const clusterFeatures = await getClusterFeatures(clusterId, source);

                    const data = clusterFeatures.reduce(
                        (acc, feature) => {
                            const { coordinates } = feature.geometry as { coordinates: any };
                            if (feature.properties?.etaState) {
                                acc.etaStates.push(feature.properties?.etaState);
                            }
                            if (coordinates) {
                                acc.bounds.extend([coordinates[0], coordinates[1]]);
                            }

                            return acc;
                        },
                        {
                            bounds     : new mapboxgl.LngLatBounds(),
                            etaStates  : [],
                            coordinates: (e.features[0].geometry as { coordinates: any })
                                .coordinates,
                            isCluster: true
                        } as PopupData
                    );
                    setPopupData(data);
                } else {
                    const { coordinates } = e.features[0].geometry as { coordinates: any };
                    const bounds = new mapboxgl.LngLatBounds();
                    bounds.extend([coordinates[0], coordinates[1]]);

                    const pointerData = e.features?.reduce(
                        (acc, feature) => {
                            const { coordinates } = feature.geometry as { coordinates: any };
                            if (feature.properties?.etaState) {
                                acc.etaStates.push(JSON.parse(feature.properties.etaState));
                            }
                            if (coordinates) {
                                acc.bounds.extend([coordinates[0], coordinates[1]]);
                            }

                            return acc;
                        },
                        {
                            bounds     : new mapboxgl.LngLatBounds(),
                            etaStates  : [],
                            coordinates: (e.features[0].geometry as { coordinates: any })
                                .coordinates,
                            isCluster: false
                        } as PopupData
                    );

                    if (pointerData) {
                        setPopupData(pointerData);
                    }
                }
            }
        });
    }, []);

    return (
        <>
            <MapboxGeojsonLayer
                sourceId={etaStatesSourceId}
                layerId={etaStatesLayerId}
                features={{
                    type: 'FeatureCollection',
                    features
                }}
                layer={MANIFEST_LAYERS.eta_states}
                map={map}
                source={{
                    type: 'geojson',
                    data: {
                        type: 'FeatureCollection',
                        features
                    },

                    cluster: true,

                    clusterRadius : 10,
                    clusterMaxZoom: 12
                }}
            />
            <EtaStatePopup
                onMouseLeave={() => setPopupData(null)}
                map={map}
                data={popupData}
            />

            <MapboxGeojsonLayer
                layerId={MANIFEST_MAP_CONFIG.passed_route_polyline.layerId}
                sourceId={MANIFEST_MAP_CONFIG.passed_route_polyline.sourceId}
                features={connectedFeatures}
                layer={MANIFEST_LAYERS.passed_route_polyline}
                map={map}
                source={{
                    type: 'geojson',
                    data: connectedFeatures
                }}
            />
        </>
    );
}
