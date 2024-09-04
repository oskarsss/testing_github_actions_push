/* eslint-disable no-restricted-syntax */
/* eslint-disable max-len */
import { LoadModel_Status, LoadModel_Stop_Type } from '@proto/models/model_load';
import {
    LOAD_INVOICE_STATUS_TO_GRPC_ENUM,
    LOAD_STATUS_TO_GRPC_ENUM
} from '@/models/loads/load-mappings';
import { LoadStatus } from '@/models/loads/load';
import { default_loads_filters } from '@/@grpcServices/services/loads-service/service-utils/loads-default-models';
import { BillingStoreKey } from '@/store/billing/slice';
import { ManifestModel_LoadStop_Status } from '@proto/models/model_manifest';
import moment from 'moment-timezone';
import { selectOrdersDataIndexes } from '../selectors';

export const generatePaginatedIndexMap = (
    indexes: number[],
    currentPage: number,
    itemsPerPage: number
): number[] => {
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return indexes.slice(startIndex, endIndex);
};

export const filterByStatus =
    (params: string[], indexes: Record<string | number, number[]>) =>
        (array: number[]): number[] => {
            const filteredIndexes: number[] = [];
            if (!params.length) {
                const nonDeletedIndexes = array.filter(
                    (index) => !indexes[LoadModel_Status.deleted]?.includes(index)
                );
                return nonDeletedIndexes;
            }

            params.forEach((status) => {
                const grpcStatus = LOAD_STATUS_TO_GRPC_ENUM[status as LoadStatus];
                if (indexes[grpcStatus]) {
                    filteredIndexes.push(...indexes[grpcStatus]);
                }
            });

            return array.filter((index) => filteredIndexes.includes(index));
        };

export const filterOnlyInvoice =
    (params: string[], indexes: Record<string | number, number[]>) =>
        (array: number[]): number[] => {
            const filteredIndexes: number[] = [];
            if (!params.length) {
                const nonDeletedIndexes = array.filter((index) =>
                    [
                        ...(indexes[LoadModel_Status.tonu] || []),
                        ...(indexes[LoadModel_Status.delivered] || [])
                    ]?.includes(index));
                return nonDeletedIndexes;
            }

            params.forEach((status) => {
                const grpcStatus = LOAD_STATUS_TO_GRPC_ENUM[status as LoadStatus];
                if (indexes[grpcStatus]) {
                    filteredIndexes.push(...indexes[grpcStatus]);
                }
            });

            return array.filter((index) => filteredIndexes.includes(index));
        };

export const filterByHashMaps =
    (params: typeof default_loads_filters, indexes: ReturnType<typeof selectOrdersDataIndexes>) =>
        (array: number[]): number[] => {
            let filteredIndexes: number[] = array;
            if (
                !params.driver.length &&
            !params.truck.length &&
            !params.user.length &&
            !params.broker.length &&
            !params.load_invoice_status.length

            // !params.customer.length
            ) {
                return array;
            }

            // !params.customer.length

            if (params.driver.length) {
                filteredIndexes = filteredIndexes.filter((index) =>
                    params.driver.some((driverId) => indexes.driver[driverId]?.includes(index)));
            }

            if (params.truck.length) {
                filteredIndexes = filteredIndexes.filter((index) =>
                    params.truck.some((truckId) => indexes.truck[truckId]?.includes(index)));
            }

            if (params.user.length) {
                filteredIndexes = filteredIndexes.filter((index) =>
                    params.user.some((userId) => indexes.user[userId]?.includes(index)));
            }

            if (params.broker.length) {
                filteredIndexes = filteredIndexes.filter((index) =>
                    params.broker.some((brokerId) => indexes.broker[brokerId]?.includes(index)));
            }

            if (params.load_invoice_status.length) {
                console.log('params.load_invoice_status', params.load_invoice_status);
                filteredIndexes = filteredIndexes.filter((index) =>
                    params.load_invoice_status.some((invoiceStatus) =>
                        indexes.invoiceStatus[
                            LOAD_INVOICE_STATUS_TO_GRPC_ENUM[invoiceStatus]
                        ]?.includes(index)));
            }

            return filteredIndexes;
        };

export const filterInvoicesByType =
    (type: BillingStoreKey, indexes: ReturnType<typeof selectOrdersDataIndexes>) =>
        (array: number[]): number[] => {
            switch (type) {
            case 'all':
                return array;

            case 'factoring':
                return Object.keys(indexes.invoiceFactoringCompany).reduce((acc, key) => {
                    if (key) {
                        return [...acc, ...indexes.invoiceFactoringCompany[key]];
                    }
                    return acc;
                }, [] as number[]);

            case 'amazon':
                return array;

            case 'direct':
                return indexes.invoiceFactoringCompany[''] ?? [];

            default:
                // Default case, return the array as is
                return array;
            }
        };

export const ACTIVE_STOPS_STATUS = [
    ManifestModel_LoadStop_Status.PLANNING,
    ManifestModel_LoadStop_Status.EN_ROUTE
];

export const filterByLatePickups =
    (latePickup: boolean, indexes: ReturnType<typeof selectOrdersDataIndexes>) =>
        (array: number[]) => {
            if (!latePickup) {
                return array;
            }
            const activeOrders = array.filter(
                (index) =>
                    (indexes.loadStatus[LoadModel_Status.assigned] || [])?.includes(index) ||
                (indexes.loadStatus[LoadModel_Status.pending] || [])?.includes(index) ||
                (indexes.loadStatus[LoadModel_Status.in_progress] || [])?.includes(index)
            );
            return activeOrders.filter((index) => {
                const stops = indexes.stopsByIndex[index];
                const firstStop = stops.find(
                    (stop) =>
                        stop.loadStopType === LoadModel_Stop_Type.pickup &&
                    ACTIVE_STOPS_STATUS.includes(stop.loadStopStatus)
                );
                const appStartAt = firstStop?.appointmentStartAtLocal || '';
                return appStartAt && moment(appStartAt).isBefore(moment());
            });
        };

export const filterByLateDropoff =
    (lateDropoff: boolean, indexes: ReturnType<typeof selectOrdersDataIndexes>) =>
        (array: number[]) => {
            if (!lateDropoff) {
                return array;
            }
            const activeOrders = array.filter(
                (index) =>
                    (indexes.loadStatus[LoadModel_Status.assigned] || [])?.includes(index) ||
                (indexes.loadStatus[LoadModel_Status.pending] || [])?.includes(index) ||
                (indexes.loadStatus[LoadModel_Status.in_progress] || [])?.includes(index)
            );
            return activeOrders.filter((index) => {
                const stops = indexes.stopsByIndex[index];
                const lastStop = stops.find(
                    (stop) =>
                        stop.loadStopType === LoadModel_Stop_Type.dropoff &&
                    ACTIVE_STOPS_STATUS.includes(stop.loadStopStatus)
                );
                const appStartAt = lastStop?.appointmentStartAtLocal || '';
                return appStartAt && moment(appStartAt).isBefore(moment());
            });
        };
