/* eslint-disable max-len */

import { AppThunkAction } from '@/store/types';
import { RootState } from '@/pages/_app';
import {
    ManifestModel_Manifest,
    ManifestModel_Status,
    ManifestModel_Stop
} from '@proto/models/model_manifest';
import toast from 'react-hot-toast';
import Router from 'next/router';
import { ManifestsActions } from '../slice';

const getActualRows = (store: RootState) => store.manifests.liveMode.rows;

/**
 *
 * @param manifestId
 * @param updateData
 * @param queryFulfilled - optional if you want to handle the promise rejection
 * @returns
 */
export const BatchUpdateCashedManifest =
    (
        manifestId: string,
        updateData: Partial<ManifestModel_Manifest>,
        queryFulfilled?: Promise<any>
    ): AppThunkAction =>
        async (dispatch, getState) => {
            const store = getState() as RootState;
            const prevIdx = store.manifests.selectedManifestIndex;
            dispatch(ManifestsActions.UpdateManifest({ ...updateData, manifestId }));

            queryFulfilled?.catch((error) => {
                toast.error(error.error.message, {
                    position: 'top-right'
                });

                if (prevIdx) {
                    const prevState = store.manifests.liveMode.rows[prevIdx];
                    dispatch(ManifestsActions.UpdateManifest(prevState));
                }
            });
        };

export const UpdateCacheManifestStops =
    (
        manifestId: string,
        stopId: string,
        updateData: Partial<ManifestModel_Stop>,
        queryFulfilled: Promise<any>
    ): AppThunkAction =>
        (dispatch, getState) => {
            const store = getState() as RootState;
            const prevStateIdx = store.manifests.selectedManifestIndex;
            const actualRows = getActualRows(store);

            const prevState = actualRows[prevStateIdx ?? -1];
            const prevStops = prevState?.stops || [];
            const { pathname } = Router;
            if (['/dispatch/orders/[id]', '/dispatch/orders', '/dispatch/tracking'].includes(pathname)) return;

            const stops = prevStops.reduce((acc, stop) => {
                if (stop.loadStopId === stopId || stop.manifestStopId === stopId) {
                    acc.push({
                        ...stop,
                        ...updateData
                    });
                } else {
                    acc.push(stop);
                }
                return acc;
            }, [] as ManifestModel_Stop[]);

            // if (prevState?.status === ManifestModel_Status.DELIVERED) {
            //     toast.error('Manifest delivered and not editable', {
            //         position: 'top-right'
            //     });
            //     return;
            // }

            dispatch(BatchUpdateCashedManifest(manifestId, { stops }, queryFulfilled));
        };

export const RemoveStopFromManifestCache =
    (manifestId: string, stopId: string, queryFulfilled: Promise<any>): AppThunkAction =>
        async (dispatch, getState) => {
            const store = getState() as RootState;
            const prevStateIdx = (getState() as RootState).manifests.selectedManifestIndex;
            const actualRows = getActualRows(store);

            const prevState = actualRows[prevStateIdx ?? -1];
            const prevStops = prevState?.stops || [];
            const { pathname } = Router;
            if (
                ['/dispatch/orders/[id]', '/dispatch/orders', '/dispatch/tracking'].includes(pathname)
            ) {
                return;
            }

            // if (prevState?.status !== ManifestModel_Status.DELIVERED && prevStops.length > 2) {
            const stops = prevStops
                .filter((stop) => stop.manifestStopId !== stopId)
                .filter((stop) => stop.loadStopId !== stopId);

            dispatch(BatchUpdateCashedManifest(manifestId, { stops }, queryFulfilled));

            // }

            // else {
            //     const message =
            //     prevStops.length === 2
            //         ? 'Manifest must have at least 2 stops'
            //         : 'Manifest delivered and not editable';

        //     toast.error(message, {
        //         position: 'top-right'
        //     });
        // }
        };
