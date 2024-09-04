/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-len */
import { AppThunkAction } from '@/store/types';
import { RootState } from '@/pages/_app';
import toast from 'react-hot-toast';
import { LoadModel_Status } from '@proto/models/model_load';
import { ManifestModel_Manifest, ManifestModel_Stop } from '@proto/models/model_manifest';
import { OrdersDataActions } from '@/store/storage/orders/slice';
import { LoadData_Load } from '@proto/loads';

interface UpdateLoadParams {
    loadId: string;
    updateData: Partial<LoadData_Load>;
}

export const UpdateOrderDataCacheThunk =
    (params: UpdateLoadParams, queryFulfilled?: Promise<any>): AppThunkAction =>
        (dispatch, getState) => {
            const store = getState() as RootState;
            const {
                loadId,
                updateData
            } = params;
            const ordersData = store.ordersData.rows;
            const index = store.ordersData.indexes.orderIdToIndexMap[loadId];
            const prevState = ordersData[index];

            dispatch(
                OrdersDataActions.UpdateOrder({
                    order: {
                        ...updateData,
                        loadId
                    },
                    isCacheUpdate: true
                })
            );

            queryFulfilled?.catch((error) => {
                if (prevState) {
                    dispatch(OrdersDataActions.UpdateOrder({ order: prevState, isCacheUpdate: true }));
                }
                toast.error(error.error.message, {
                    position: 'top-right'
                });
            });
        };

export const UpdateOrderStopsDataCache =
    (
        loadId: string,
        stopId: string,
        updateData: Partial<ManifestModel_Stop>,
        queryFulfilled: Promise<any>
    ): AppThunkAction =>
        (dispatch, getState) => {
            const store = getState() as RootState;
            const ordersData = store.ordersData.rows;
            const index = store.ordersData.indexes.orderIdToIndexMap[loadId];
            const prevState: LoadData_Load | undefined = ordersData[index];
            const prevManifests = prevState?.manifests || [];

            // if (prevState?.status === LoadModel_Status.delivered) {
            //     toast.error('Manifest delivered and not editable', {
            //         position: 'top-right'
            //     });
            //     return;
            // }

            const manifests = prevManifests.reduce((acc, m) => {
                const stops = m.stops.reduce((acc, s) => {
                    if ([s.loadStopId, s.manifestStopId].includes(stopId)) {
                        acc.push({ ...s, ...updateData });
                    } else {
                        acc.push(s);
                    }
                    return acc;
                }, [] as ManifestModel_Stop[]);
                acc.push({ ...m, stops });
                return acc;
            }, [] as ManifestModel_Manifest[]);

            dispatch(
                UpdateOrderDataCacheThunk(
                    {
                        loadId,
                        updateData: { manifests }
                    },
                    queryFulfilled
                )
            );
        };

export const RemoveStopFromLoadsCache =
    (loadId: string, stopId: string, queryFulfilled: Promise<any>): AppThunkAction =>
        async (dispatch, getState) => {
            const store = getState() as RootState;
            const ordersData = store.ordersData.rows;
            const index = store.ordersData.indexes.orderIdToIndexMap[loadId];
            const prevState = ordersData[index];
            const prevManifests = prevState.manifests;

            // if (prevState?.status !== LoadModel_Status.delivered) {
            const manifests = prevManifests.reduce((acc, m) => {
                const stops = m.stops.filter((s) => ![s.loadStopId, s.manifestStopId].includes(stopId));
                acc.push({ ...m, stops });
                return acc;
            }, [] as ManifestModel_Manifest[]);

            dispatch(
                UpdateOrderDataCacheThunk(
                    {
                        loadId,
                        updateData: { manifests }
                    },
                    queryFulfilled
                )
            );

            // } else {
            //     const message =
            //     prevManifests.length === 2
            //         ? 'Manifest must have at least 2 stops'
            //         : 'Manifest delivered and not editable';

        //     toast.error(message, {
        //         position: 'top-right'
        //     });
        // }
        };
