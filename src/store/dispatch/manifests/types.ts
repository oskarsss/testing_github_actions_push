/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
import {
    getActiveStopsCount,
    getFirstActiveStop
} from '@/@grpcServices/services/manifests-service/utils';
import {
    ManifestModel_Load,
    ManifestModel_Manifest,
    ManifestModel_Stop
} from '@proto/models/model_manifest';

namespace ManifestsTypes {
    export enum OriginType {
        MANIFEST = 'manifest',
        LOAD = 'load'
    }
    export type TableTotals = {
        totalDistance: string;
        totalEmptyDistance: string;
        totalLoadsCount: number;
        averageRatePerMileFormatted: string;
        totalGrossAmount: string;
        totalLoadedDistance: string;
    };

    // export type FlattedManifest = ManifestModel_Manifest & {
    //     totalStopsCount: number;
    //     completedStopsCount: number;
    //     firstStop?: ManifestModel_Stop;
    //     lastStop?: ManifestModel_Stop;
    //     nextActiveStop?: ManifestModel_Stop;
    //     relatedLoads: ManifestModel_Load[];
    //     isFirstOfPeriod: boolean;
    // };

    export type PreparedStop = ManifestModel_Stop & { stopId: string; originType: OriginType };
    export type AnyPreparedStop = ManifestModel_Stop & { stopId: string; originType: OriginType };

    export type ConvertedManifest = ManifestModel_Manifest & {
        preparedStops: AnyPreparedStop[];
        loads: ManifestModel_Load[];
    };
}

export default ManifestsTypes;

// export const flatManifests = (
//     manifests?: ManifestModel_Manifest[],
//     checkLastOfPeriod?: boolean
// ): ManifestsTypes.FlattedManifest[] => {
//     if (!manifests) return [];

//     // let lastDate = '';

//     const formattedManifests = manifests.reduce((acc, manifest) => {
//         if (manifest) {
//             const activeStops = getActiveStopsCount(manifest.stops).length;
//             const totalStopsCount = manifest.stops.length;
//             const completedStopsCount = totalStopsCount - activeStops;

//             // let isFirstOfPeriod = false
//             // const date = new Date(manifest.firstStop?.appointmentStartAtLocal ?? '').toISOString().split('T')[0];
//             // if (date !== lastDate && setFirstOfPeriod) {
//             //     isFirstOfPeriod = true;
//             //     lastDate = date;
//             // }
//             acc.push({
//                 ...manifest,
//                 completedStopsCount,
//                 totalStopsCount,
//                 relatedLoads   : [],
//                 isFirstOfPeriod: false
//             });
//         }
//         return acc;
//     }, [] as ManifestsTypes.FlattedManifest[]);

//     if (checkLastOfPeriod) {
//         // Mark the first load of each day
//         let lastDate = '';
//         formattedManifests.forEach((manifest) => {
//             const firstStop = manifest.stops[0];
//             const manifestDate = firstStop
//                 ? new Date(firstStop?.appointmentStartAtLocal ?? '').toISOString().split('T')[0]
//                 : '';
//             if (manifestDate && manifestDate !== lastDate) {
//                 manifest.isFirstOfPeriod = true;
//                 lastDate = manifestDate;
//             }
//         });
//     }

//     return formattedManifests;
// };
