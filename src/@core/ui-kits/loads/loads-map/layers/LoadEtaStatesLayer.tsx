/* eslint-disable max-len */
// /* eslint-disable no-param-reassign */
// /* eslint-disable no-nested-ternary */
// /* eslint-disable max-len */
// import { useEffect, useMemo, useRef } from 'react';
// // eslint-disable-next-line import/no-extraneous-dependencies
// import { Feature, Point } from 'geojson';
// import { MapHelper } from '@/utils/mapbox-utils/map-helper';
// import LoadsGrpcService from '@/@grpcServices/services/loads-service/loads.service';
// import mapboxgl, { Popup } from 'mapbox-gl';
// import { useGetTruckRouteQuery } from '@/@grpcServices/services/trucks.service';
// import {
//     transformGrpcStop,
//     transformPhpStop
// } from '@/@core/components/general-map/general-map-markers/general-stop-marker/utils';
// import { LoadModel_Stop_Status } from '@proto/models/model_load';
// import { useAppSelector } from '@/services/hooks';
// import { useStableLinks } from '@/@core/components/table/hooks/helpers';
// import { useManifestTruckRoute } from '@/services/streams/events/hooks';
// import { LOAD_STOP_TYPE_GRPC_ENUM } from '@/models/loads/load-mappings';
// import { layers } from '../../../../../views/dispatch/loads/Details/sections/load-map/config';
// import { getETACirclePopup } from '../popup/ETACirclePopup';

// type Props = {
//     mapWorker: MapHelper;
//     loadId?: string;
//     truckId?: string;
//     isCompletedLoad: boolean;
// };

// export default function LoadEtaStatesLayer({
//     mapWorker,
//     loadId,
//     truckId,
//     isCompletedLoad
// }: Props) {
//     const selectedLoadId = useAppSelector((state) => state.loads.selected_load_id);
//     const { emptyArray } = useStableLinks();
//     const truckRoute = useManifestTruckRoute(truckId);

//     const {
//         data,
//         error
//     } = LoadsGrpcService.endpoints.getLoadEtaStates.useQueryState({
//         loadId: loadId || ''
//     });

//     const isErrorEtaStates = !!error;

//     const loadData = LoadsGrpcService.endpoints.getLoad.useQueryState({
//         loadId: loadId || ''
//     });

//     const truckRouteData = useGetTruckRouteQuery({
//         truckId: truckId || ''
//     });

//     const truckRouteStopsMap = useMemo(() => {
//         if (!truckRouteData.data) return null;
//         return truckRouteData.data.stops;
//     }, [truckRouteData.data]);

//     const activeLoadStopsMap = useMemo(() => {
//         const map = new Map<string, ReturnType<typeof transformPhpStop>>();
//         if (isCompletedLoad) {
//             if (!loadData.data?.load?.stops) return map;
//             loadData.data?.load?.stops
//                 .map((stop) => transformPhpStop(stop, { selectedLoadId, truckId: truckId || '' }))
//                 .forEach((stop) => map.set(stop.stopId, stop));
//             return map;
//         }
//         const completedStops = loadData.data?.load?.stops.filter(
//             (stop) =>
//                 stop.status === LoadModel_Stop_Status.completed ||
//                 stop.status === LoadModel_Stop_Status.tonu
//         );

//         const featuresCompleted = completedStops
//             ? completedStops.map((stop) =>
//                 transformPhpStop(stop, { selectedLoadId, truckId: truckId || '' }))
//             : emptyArray;

//         const featuresRouteData =
//             truckRoute?.map((routeStop) =>
//                 transformGrpcStop(routeStop, truckRouteStopsMap || {}, {
//                     selectedLoadId,
//                     truckId: truckId || ''
//                 })) ?? [];

//         [...featuresCompleted, ...featuresRouteData].forEach((stop) => {
//             // @ts-ignore
//             map.set(stop.stopId, stop);
//         });
//     }, [
//         truckRoute,
//         truckId,
//         loadData.data?.load?.stops,
//         truckRouteStopsMap,
//         emptyArray,
//         selectedLoadId,
//         isCompletedLoad
//     ]);

//     const popupRef = useRef(
//         new Popup({
//             offset      : 10,
//             anchor      : 'top',
//             closeButton : false,
//             closeOnClick: true,
//             closeOnMove : true
//         })
//     );

//     useEffect(() => {
//         mapWorker.geojson.updateClusterSource(
//             'load_eta_state_circles_source',
//             mapWorker.defaultSources.featurePoint
//         );
//         mapWorker.addLayer(layers.load_eta_state_circles);

//         const getClusterFeatures = async (
//             clusterId: number,
//             source: mapboxgl.GeoJSONSource
//         ): Promise<GeoJSON.Feature<GeoJSON.Geometry, GeoJSON.GeoJsonProperties>[]> => {
//             const features = await new Promise<
//                 GeoJSON.Feature<GeoJSON.Geometry, GeoJSON.GeoJsonProperties>[]
//             >((res) => {
//                 source.getClusterChildren(clusterId, (err, features) => {
//                     if (err) return;
//                     res(features);
//                 });
//             });
//             const feature = features[0];
//             if (feature && feature.properties?.cluster) {
//                 return getClusterFeatures(features[0].properties?.cluster_id, source);
//             }
//             return features;
//         };

//         mapWorker.addLayerListener('click', layers.load_eta_state_circles.id, async (e) => {
//             if (!e || !e.features) return;
//             const source = mapWorker.map.getSource(
//                 'load_eta_state_circles_source'
//             ) as mapboxgl.GeoJSONSource;
//             if (!source) return;
//             const properties = e.features?.[0].properties;
//             const clusterId = properties?.cluster_id;
//             if (clusterId) {
//                 const features = await getClusterFeatures(clusterId, source);
//                 const coordinates = (features[0].geometry as Point).coordinates.slice();
//                 mapWorker.flyTo([coordinates[0], coordinates[1]]);
//                 return;
//             }
//             const coordinates = (e.features[0].geometry as Point).coordinates.slice();
//             mapWorker.flyTo([coordinates[0], coordinates[1]]);
//         });

//         mapWorker.addLayerListener('mouseenter', layers.load_eta_state_circles.id, async (e) => {
//             mapWorker.map.getCanvas().style.cursor = 'pointer';
//             const source = mapWorker.map.getSource(
//                 'load_eta_state_circles_source'
//             ) as mapboxgl.GeoJSONSource;
//             if (!e || !source) return;
//             const properties = e.features?.[0].properties;
//             const clusterId = properties?.cluster_id;
//             if (clusterId) {
//                 const features = await getClusterFeatures(clusterId, source);

//                 const etaPopupContent = getETACirclePopup({
//                     etas: features.map((f) => ({
//                         eta     : f.properties?.eta,
//                         state   : f.properties?.state || '',
//                         stopType: f.properties?.stopType || '',
//                         city    : f.properties?.city || ''
//                     }))
//                 });
//                 popupRef.current.setLngLat(e.lngLat).setHTML(etaPopupContent).addTo(mapWorker.map);
//                 return;
//             }

//             if (properties?.type === 'stop') {
//                 const etaPopupContent = getETACirclePopup({
//                     eta: {
//                         eta     : properties.eta,
//                         state   : properties.state,
//                         stopType: properties.stopType,
//                         city    : properties.city
//                     }
//                 });
//                 popupRef.current.setLngLat(e.lngLat).setHTML(etaPopupContent).addTo(mapWorker.map);
//             }
//         });

//         mapWorker.addLayerListener('mouseleave', layers.load_eta_state_circles.id, () => {
//             popupRef.current.remove();
//         });

//         return () => {
//             mapWorker.removeLayer(layers.load_eta_state_circles.id);
//         };
//     }, []);

//     const features: Feature<Point>[] = useMemo(
//         () =>
//             data?.loadEtaStates && !isErrorEtaStates
//                 ? data?.loadEtaStates.map((etaState, index) => ({
//                     type      : 'Feature',
//                     properties: {
//                         stop_id          : etaState.stopId,
//                         type             : 'stop',
//                         title            : `${etaState.sequence}`,
//                         color            : '#0fe7ce',
//                         orderPosition    : index,
//                         orderTextPosition: -index,
//                         textOffset       : [0, -1.15],
//                         eta              : etaState.eta,
//                         state            : activeLoadStopsMap?.get(etaState.stopId)?.state || '',
//                         stopType         : LOAD_STOP_TYPE_GRPC_ENUM[etaState.type || 0] || '',
//                         city             : activeLoadStopsMap?.get(etaState.stopId)?.city || ''
//                     },
//                     geometry: {
//                         type       : 'Point',
//                         coordinates: [etaState.truckLon, etaState.truckLat]
//                     }
//                 }))
//                 : [],
//         [data, activeLoadStopsMap, isErrorEtaStates]
//     );

//     useEffect(() => {
//         mapWorker.geojson.updateClusterSource('load_eta_state_circles_source', {
//             type: 'FeatureCollection',
//             features
//         });
//     }, [features]);

//     return null;
// }
