// /* eslint-disable no-param-reassign */
// import { useRef } from 'react';

// class MapboxSourceHelper<T extends mapboxgl.GeoJSONSourceSpecification> {
//     #map: mapboxgl.Map | null;

//     #sourceId: string;

//     #source: T;

//     #layerIds: Set<string> = new Set();

//     constructor(sourceId: string, source: T, map?: mapboxgl.Map | null) {
//         this.#map = map ?? null;
//         this.#sourceId = sourceId;
//         this.#source = source;

//         this.#initialAddSource();
//     }

//     #initialAddSource = () => {
//         if (!this.#map) return;
//         if (this.#map.getSource(this.#sourceId)) {
//             return;
//         }
//         this.#map.addSource(this.#sourceId, this.#source);
//     };

//     get source() {
//         if (!this.#map) return null;
//         return this.#map.getSource(this.#sourceId) as mapboxgl.GeoJSONSource;
//     }

//     set map(map: mapboxgl.Map | null) {
//         this.#map = map ?? null;
//         this.#initialAddSource();
//     }

//     addLayerListener = <
//         T extends string | ReadonlyArray<string>,
//         EventType extends mapboxgl.MapMouseEvent
//     >(
//         eventType: EventType,
//         layerId: T,
//         callback: (this: mapboxgl.Map, ev: mapboxgl.MapMouseEvent[EventType]) => void
//     ) => {
//         if (!this.#map) return () => {};
//         callback = callback.bind(this.#map);
//         this.#map.on(eventType, layerId, callback);
//         return () => {
//             this.#map?.off(eventType, layerId, callback);
//         };
//     };

//     update = (data: T['data']) => {
//         if (!this.#map) return this;
//         const source = this.#map.getSource(this.#sourceId);
//         if (source) {
//             // @ts-ignore
//             source.setData(data);
//             return this;
//         }
//         this.#map.addSource(this.#sourceId, { ...this.#source, data });
//         return this;
//     };

//     setLayer = (options: mapboxgl.AnyLayer, before?: string) => {
//         if (!this.#map) return this;
//         const layer = this.#map.getLayer(options.id);
//         if (layer) {
//             if ('paint' in options) {
//                 Object.entries(options?.paint || {}).forEach(([key, value]) => {
//                     this.#map?.setPaintProperty(options.id, key, value);
//                 });
//             }
//             if ('layout' in options) {
//                 Object.entries(options?.layout || {}).forEach(([key, value]) => {
//                     this.#map?.setLayoutProperty(options.id, key, value);
//                 });
//             }
//             return this;
//         }

//         this.#map.addLayer(
//             {
//                 // @ts-ignore
//                 source: this.#sourceId,
//                 ...options
//             },
//             before
//         );
//         this.#layerIds.add(options.id);

//         return this;
//     };

//     remove = () => {
//         if (!this.#map) return this;
//         const source = this.#map.getSource(this.#sourceId);
//         if (source) {
//             this.#map.removeSource(this.#sourceId);
//         }
//         return this;
//     };

//     removeLayer = (id: string) => {
//         if (!this.#map) return this;
//         const layer = this.#map.getLayer(id);
//         if (layer) {
//             this.#map.removeLayer(id);
//             this.#layerIds.delete(id);
//         }
//         return this;
//     };

//     removeAllLayers = () => {
//         if (!this.#map) return this;
//         this.#layerIds.forEach((id) => {
//             this.#map?.removeLayer(id);
//         });
//         this.#layerIds.clear();
//         return this;
//     };
// }

// export const useMapboxSourceUtil = <T extends mapboxgl.GeoJSONSource>(
//     sourceId: string,
//     source: T,
//     map?: mapboxgl.Map | null
// ) => {
//     const sourceRef = useRef(new MapboxSourceHelper(sourceId, source, map)).current;
//     sourceRef.map = map ?? null;

//     return sourceRef;
// };
