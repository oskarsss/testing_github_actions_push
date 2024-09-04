import { LoadData_Load } from '@proto/loads';
import moment from 'moment-timezone';
import { ManifestModel_Stop } from '@proto/models/model_manifest';
import { createIndexesMap } from '../../../dispatch/manifests/utils/indexes';

export type OrdersIndexes = {
    truckIdToIndexesMap: Record<string, number[]>;
    statusToIndexesMap: Record<string, number[]>;
    firstStopDateToIndexesMap: Record<string, number[]>;
    grossAmountToIndexesMap: Record<number, number[]>;
    loadedMilesToIndexesMap: Record<number, number[]>;
    orderIdToIndexMap: Record<string, number>;
    trailerIdToIndexesMap: Record<string, number[]>;
    driverIdToIndexesMap: Record<string, number[]>;
    brokerIdToIndexesMap: Record<string, number[]>;
    customerIdToIndexesMap: Record<string, number[]>;
    invoiceStatusToIndexesMap: Record<string, number[]>;
    userToIndexesMap: Record<string, number[]>;
    invoiceFactoringCompanyToIndexesMap: Record<string, number[]>;
    stopsByIndex: Record<number, ManifestModel_Stop[]>;
};

export const createIndexes = (orders: LoadData_Load[]) => {
    const indexes: OrdersIndexes = {
        truckIdToIndexesMap                : {}, // +,
        statusToIndexesMap                 : {}, // +
        grossAmountToIndexesMap            : {}, // +
        firstStopDateToIndexesMap          : {}, // +
        loadedMilesToIndexesMap            : {}, //+
        orderIdToIndexMap                  : {}, //+
        trailerIdToIndexesMap              : {}, //+
        driverIdToIndexesMap               : {}, //+
        brokerIdToIndexesMap               : {}, //+
        customerIdToIndexesMap             : {}, // +,
        invoiceStatusToIndexesMap          : {}, // +,
        userToIndexesMap                   : {}, // +,
        invoiceFactoringCompanyToIndexesMap: {},
        stopsByIndex                       : {} // +,
    };

    indexes.orderIdToIndexMap = orders.reduce((acc, order, idx) => {
        acc[order.loadId] = idx;
        return acc;
    }, {} as Record<string, number>);

    indexes.statusToIndexesMap = createIndexesMap(orders, (order) => order.status);

    indexes.stopsByIndex = orders.reduce<Record<number, ManifestModel_Stop[]>>(
        (acc, order, idx) => {
            const stops = order.manifests.flatMap((manifest) =>
                manifest.stops.filter((s) => s.loadId === order.loadId));

            acc[idx] = stops;
            return acc;
        },
        {}
    );

    // Secondary sorting by firstStopDate
    Object.keys(indexes.statusToIndexesMap).forEach((status) => {
        indexes.statusToIndexesMap[status].sort((a, b) => {
            const orderA = orders[a];
            const orderB = orders[b];
            const dateA =
                orderA.manifests.flatMap((m) =>
                    m.stops.filter((s) => s.loadId === orderA.loadId))[0]?.appointmentStartAtLocal || '';
            const dateB =
                orderB.manifests.flatMap((m) =>
                    m.stops.filter((s) => s.loadId === orderB.loadId))[0]?.appointmentStartAtLocal || '';
            return moment(dateA).diff(moment(dateB));
        });
    });

    indexes.invoiceFactoringCompanyToIndexesMap = createIndexesMap(
        orders,
        (order) => order.invoiceFactoringCompanyId
    );

    indexes.brokerIdToIndexesMap = createIndexesMap(orders, (order) => order.brokerId);
    indexes.customerIdToIndexesMap = createIndexesMap(orders, (order) => order.customerId);
    indexes.loadedMilesToIndexesMap = createIndexesMap(orders, (order) => order.loadedMiles);
    indexes.userToIndexesMap = createIndexesMap(orders, (order) => order.dispatcherId);
    indexes.trailerIdToIndexesMap = orders.reduce((acc, order, idx) => {
        const trailerIds = order.manifests.map((manifest) => manifest.trailerId);
        trailerIds.forEach((trailerId) => {
            if (!acc[trailerId]) {
                acc[trailerId] = [];
            }
            acc[trailerId].push(idx);
        });
        return acc;
    }, {} as Record<string, number[]>);

    indexes.truckIdToIndexesMap = orders.reduce((acc, manifest, idx) => {
        const truckIds = manifest.manifests.map((manifest) => manifest.truckId);

        truckIds.forEach((truckId) => {
            if (!acc[truckId]) {
                acc[truckId] = [];
            }
            acc[truckId].push(idx);
        });
        return acc;
    }, {} as Record<string, number[]>);

    indexes.invoiceStatusToIndexesMap = createIndexesMap(orders, (order) => order.invoiceStatus);

    indexes.driverIdToIndexesMap = orders.reduce((acc, manifest, idx) => {
        const driverIds = manifest.manifests.reduce((acc, manifest) => {
            acc.push(...manifest.driverIds);
            return acc;
        }, [] as string[]);

        driverIds.forEach((driverId) => {
            if (!acc[driverId]) {
                acc[driverId] = [];
            }
            acc[driverId].push(idx);
        });
        return acc;
    }, {} as Record<string, number[]>);

    indexes.firstStopDateToIndexesMap = createIndexesMap(
        orders,
        (order) =>
            order.manifests.flatMap(
                (manifest) => manifest.stops.filter((stop) => stop.loadId === order.loadId) || []
            )?.[0]?.appointmentStartAtLocal || ''
    );

    indexes.grossAmountToIndexesMap = createIndexesMap(orders, (order) => order.grossAmount);

    return indexes;
};
