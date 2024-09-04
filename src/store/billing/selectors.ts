import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/pages/_app';
import { OrdersDataSelectors } from '../storage/orders/slice';
import { ordersSelectedLoadIdxSelector } from '../dispatch/loads/selectors';
import { BillingSelectors, BillingStoreKey } from './slice';

const selectedLoadId = (key: BillingStoreKey) => (state: RootState) =>
    state.billing[key].selectedLoadId;

export const selectSelectedBillingOrder = (key: BillingStoreKey) =>
    createSelector(
        OrdersDataSelectors.getOrdersRows,
        selectedLoadId(key),
        (rows, selectedLoadId) => {
            if (!selectedLoadId) {
                return null;
            }

            const selectedOrder = rows.find((order) => order.loadId === selectedLoadId);

            return selectedOrder || null;
        }
    );
