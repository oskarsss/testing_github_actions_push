import { OrdersDataSelectors } from '@/store/storage/orders/slice';
import { RootState } from '@/store/types';
import { createSelector } from '@reduxjs/toolkit';

export const trackingViewsSelector = (state: RootState) => state.tracking.views;

export const trackingMapControllersSelector = (state: RootState) => state.tracking.mapControllers;

export const trackingSelectedLoadIdxSelector = (state: RootState) =>
    state.tracking.selectedLoadIndex;

export const trackingSelectedOrderSelector = createSelector(
    OrdersDataSelectors.getOrdersRows,
    trackingSelectedLoadIdxSelector,
    (rows, selectedLoadIdx) => {
        if (selectedLoadIdx === null) {
            return null;
        }
        return rows[selectedLoadIdx];
    }
);
