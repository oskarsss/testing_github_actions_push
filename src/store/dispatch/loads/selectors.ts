import { RootState } from '@/pages/_app';
import { OrdersDataSelectors } from '@/store/storage/orders/slice';
import { createSelector } from '@reduxjs/toolkit';

export const ordersViewsSelector = (state: RootState) => state.loads.views;

export const ordersMapControllersSelector = (state: RootState) => state.loads.mapControllers;

export const ordersSelectedLoadIdxSelector = (state: RootState) => state.loads.selectedOrderIndex;

export const ordersPageSelectedOrderSelector = createSelector(
    OrdersDataSelectors.getOrdersRows,
    ordersSelectedLoadIdxSelector,
    (rows, selectedLoadIdx) => {
        if (selectedLoadIdx === null) {
            return null;
        }
        return rows[selectedLoadIdx];
    }
);
