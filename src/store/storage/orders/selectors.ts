import { createSelector } from '@reduxjs/toolkit';
import { prepareManifestModelMapStops } from '@/store/dispatch/manifests/utils/prepare';
import { OrdersDataSelectors } from './slice';

export const selectDefaultIndexes = createSelector(OrdersDataSelectors.getOrdersRows, (rows) =>
    rows.map((_, idx) => idx));

export const selectOrderDataMapStopsByOrderId = (orderId: string) =>
    createSelector(
        OrdersDataSelectors.getOrdersRows,
        OrdersDataSelectors.getOrdersOrderIdToIndexMap,
        (rows, orderIdToIndexMap) => {
            const index = orderIdToIndexMap[orderId];
            if (index === undefined) {
                return [];
            }
            const order = rows[index];
            if (!order) {
                return [];
            }
            const stops = order.manifests.flatMap((manifest) => manifest.stops);
            return prepareManifestModelMapStops(stops);
        }
    );

export const selectOrderById = (orderId: string) =>
    createSelector(
        [OrdersDataSelectors.getOrdersRows, OrdersDataSelectors.getOrdersOrderIdToIndexMap],
        (rows, orderIdToIndexMap) => {
            const index = orderIdToIndexMap[orderId];

            if (index === undefined) {
                return undefined;
            }

            return rows[index];
        }
    );

export const selectOrdersDataIndexes = createSelector(
    OrdersDataSelectors.getOrdersRows,
    selectDefaultIndexes,
    OrdersDataSelectors.getOrdersFirstStopDateToIndexesMap,
    OrdersDataSelectors.getOrdersGrossAmountToIndexesMap,
    OrdersDataSelectors.getOrdersLoadedDistanceToIndexesMap,
    OrdersDataSelectors.getOrdersLoadedDistanceToIndexesMap,
    OrdersDataSelectors.getOrdersStatusToIndexesMap,
    OrdersDataSelectors.getOrdersTruckIdToIndexesMap,
    OrdersDataSelectors.getOrdersTrailerIdToIndexesMap,
    OrdersDataSelectors.getOrdersDriverIdToIndexesMap,
    OrdersDataSelectors.getOrdersBrokerIdToIndexesMap,
    OrdersDataSelectors.getOrdersCustomerIdToIndexesMap,
    OrdersDataSelectors.getOrdersInvoiceStatusToIndexesMap,
    OrdersDataSelectors.getOrdersUserToIndexesMap,
    OrdersDataSelectors.getOrdersInvoiceFactoringCompanyToIndexesMap,
    OrdersDataSelectors.getOrdersStopsByIndex,
    (
        rows,
        defaultIndexes,
        firstStopDate,
        grossAmount,
        distance,
        loadedMiles,
        loadStatus,
        truck,
        trailer,
        driver,
        broker,
        customer,
        invoiceStatus,
        user,
        invoiceFactoringCompany,
        stopsByIndex
    ) => ({
        rows,
        defaultIndexes,
        firstStopDate,
        grossAmount,
        distance,
        loadedMiles,
        loadStatus,
        truck,
        trailer,
        driver,
        broker,
        customer,
        invoiceStatus,
        user,
        invoiceFactoringCompany,
        stopsByIndex
    })
);
