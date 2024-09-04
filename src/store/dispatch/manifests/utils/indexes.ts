import { ManifestModel_Manifest } from '@proto/models/model_manifest';
import moment from 'moment-timezone';

export const createIndexesMap = <T, K extends string | number>(
    items: T[],
    keySelector: (item: T) => K
): Record<K, number[]> =>
        items.reduce<Record<string | number, number[]>>((acc, item, idx) => {
            const key = keySelector(item);
            if (!acc[key]) {
                acc[key] = [];
            }
            acc[key].push(idx);
            return acc;
        }, {});

export const generateIndexes = (manifests: ManifestModel_Manifest[]) => {
    const indexesMap: {
        statusToIndexesMap: Record<string, number[]>;
        firstStopDateToIndexesMap: Record<string, number[]>;
        grossAmountToIndexesMap: Record<number, number[]>;
        distanceToIndexesMap: Record<number, number[]>;
        loadedDistanceToIndexesMap: Record<number, number[]>;
        manifestIdToIndexMap: Record<string, number>;
        trailerIdToIndexesMap: Record<string, number[]>;
        driverIdToIndexesMap: Record<string, number[]>;
        truckIdToIndexesMap: Record<string, number[]>;
    } = {
        statusToIndexesMap        : {},
        firstStopDateToIndexesMap : {},
        grossAmountToIndexesMap   : {},
        distanceToIndexesMap      : {},
        loadedDistanceToIndexesMap: {},
        manifestIdToIndexMap      : {},
        trailerIdToIndexesMap     : {},
        driverIdToIndexesMap      : {},
        truckIdToIndexesMap       : {}
    };

    indexesMap.manifestIdToIndexMap = manifests.reduce((acc, manifest, idx) => {
        acc[manifest.manifestId] = idx;
        return acc;
    }, {} as Record<string, number>);

    indexesMap.statusToIndexesMap = createIndexesMap(manifests, (manifest) => manifest.status);

    // Secondary sorting by firstStopDate
    Object.keys(indexesMap.statusToIndexesMap).forEach((status) => {
        indexesMap.statusToIndexesMap[status].sort((a, b) => {
            const dateA = manifests[a].stops[0].appointmentStartAtLocal;
            const dateB = manifests[b].stops[0].appointmentStartAtLocal;
            return moment(dateA).diff(moment(dateB));
        });
    });

    indexesMap.trailerIdToIndexesMap = createIndexesMap(
        manifests,
        (manifest) => manifest.trailerId
    );

    indexesMap.truckIdToIndexesMap = createIndexesMap(manifests, (manifest) => manifest.truckId);

    indexesMap.firstStopDateToIndexesMap = createIndexesMap(
        manifests,
        (manifest) => manifest.stops[0].appointmentStartAtLocal
    );

    indexesMap.driverIdToIndexesMap = manifests.reduce((acc, manifest, idx) => {
        manifest.driverIds.forEach((driverId) => {
            if (!acc[driverId]) {
                acc[driverId] = [];
            }
            acc[driverId].push(idx);
        });
        return acc;
    }, {} as Record<string, number[]>);

    indexesMap.grossAmountToIndexesMap = createIndexesMap(
        manifests,
        (manifest) => manifest.gross?.amount || 0
    );

    indexesMap.distanceToIndexesMap = createIndexesMap(
        manifests,
        (manifest) => manifest.totalDistance?.miles || 0
    );

    indexesMap.loadedDistanceToIndexesMap = createIndexesMap(
        manifests,
        (manifest) => manifest.loadedDistance?.miles || 0
    );

    return indexesMap;
};
