import { createPrivateQueryFn } from '@/@grpcServices/createQueryFn';
import grpcTransport from '@/@grpcServices/grpcTransport';
import { api, handleRequest } from '@/store/api';
import { RootState } from '@/store/types';
import {
    ManifestRetrieveReply,
    ManifestRetrieveRequest,
    ManifestGrossUpdateRequest,
    ManifestGrossUpdateReply,
    ManifestGetReply,
    ManifestGetRequest,
    ManifestTruckAssignReply,
    ManifestTruckAssignRequest,
    ManifestTruckUnassignReply,
    ManifestTruckUnassignRequest,
    ManifestStatusUpdateReply,
    ManifestStatusUpdateRequest,
    ManifestStatsGetReply,
    ManifestStatsGetRequest,
    ManifestMergeReply,
    ManifestMergeRequest,
    ManifestDriverAssignReply,
    ManifestDriverAssignRequest,
    ManifestDriverUnassignReply,
    ManifestDriverUnassignRequest,
    ManifestEmptyDistanceUpdateReply,
    ManifestEmptyDistanceUpdateRequest,
    ManifestLoadedDistanceUpdateReply,
    ManifestLoadedDistanceUpdateRequest,
    ManifestTruckRouteRetrieveReply,
    ManifestTruckRouteRetrieveRequest,
    ManifestTruckEtaStatesGetRequest,
    ManifestTruckEtaStatesGetReply,
    ManifestSplitReply,
    ManifestSplitRequest,
    ManifestTitleUpdateReply,
    ManifestTitleUpdateRequest,
    ManifestCreateReply,
    ManifestCreateRequest,
    ManifestDeleteReply,
    ManifestDeleteRequest,
    ManifestDriverGetReply,
    ManifestDriverGetRequest,
    ManifestLoadDetailsGetReply,
    ManifestLoadDetailsGetRequest,
    ManifestTrailerAssignReply,
    ManifestTrailerAssignRequest
} from '@proto/manifests';
import { ManifestsServiceClient } from '@proto/manifests.client';
import { ManifestModel_Manifest, ManifestModel_Status } from '@proto/models/model_manifest';
import getFormattedAmountOfMoney from '@/utils/get-formatted-amount-of-money';
import { BatchUpdateCashedManifest } from '@/store/dispatch/manifests/actions/cashe';
import Router from 'next/router';
import { milesToKilometers } from '@/utils/formatting';
import { assign } from 'lodash';
import toast from 'react-hot-toast';
import { UpdateOrderDataCacheThunk } from '../../../store/storage/orders/actions/cache';

export const ManifestsGrpcClient = new ManifestsServiceClient(grpcTransport);

const getActualLoadManifests = (store: RootState) => {
    const ordersStore = store.ordersData.rows;
    if (Router.pathname === '/dispatch/orders') {
        const { selectedOrderIndex } = store.loads;
        if (!selectedOrderIndex) return [];
        const order = ordersStore[selectedOrderIndex];
        if (!order) return [];
        return order.manifests;
    }
    if (Router.pathname === '/dispatch/tracking') {
        const selectedOrderIndex = store.tracking.selectedLoadIndex;
        if (!selectedOrderIndex) return [];
        const order = ordersStore[selectedOrderIndex];
        if (!order) return [];
        return order.manifests;
    }
    return [];
};

const ManifestsGrpcService = api.injectEndpoints({
    endpoints: ({
        mutation,
        query
    }) => ({
        getManifests: query<ManifestGetReply, ManifestGetRequest>({
            queryFn          : createPrivateQueryFn(ManifestsGrpcClient, 'manifestGet'),
            providesTags     : ['manifests'],
            keepUnusedDataFor: 0
        }),
        assignTrailerToManifest: mutation<ManifestTrailerAssignReply, ManifestTrailerAssignRequest>(
            {
                queryFn        : createPrivateQueryFn(ManifestsGrpcClient, 'manifestTrailerAssign'),
                invalidatesTags: ['manifests'],
                onQueryStarted : async (arg, {
                    dispatch,
                    queryFulfilled
                }) => {
                    const updateData: Partial<ManifestModel_Manifest> = {
                        trailerId: arg.trailerId
                    };
                    dispatch(BatchUpdateCashedManifest(arg.manifestId, updateData, queryFulfilled));
                }
            }
        ),
        getManifestsDrivers: query<ManifestDriverGetReply, ManifestDriverGetRequest>({
            queryFn          : createPrivateQueryFn(ManifestsGrpcClient, 'manifestDriverGet'),
            providesTags     : (r, e, arg) => [{ type: 'manifests_drivers', id: arg.manifestId }],
            keepUnusedDataFor: 0
        }),
        retrieveManifest: query<
            ManifestRetrieveReply,
            ManifestRetrieveRequest & { storeInSelectedManifest?: boolean }
        >({
            queryFn          : createPrivateQueryFn(ManifestsGrpcClient, 'manifestRetrieve'),
            providesTags     : (res, _, arg) => [{ type: 'manifest', id: arg.manifestId }],
            keepUnusedDataFor: 0
        }),

        getManifestLoads: query<
            ManifestLoadDetailsGetReply,
            ManifestLoadDetailsGetRequest & { storeInSelectedManifest?: boolean }
        >({
            queryFn          : createPrivateQueryFn(ManifestsGrpcClient, 'manifestLoadDetailsGet'),
            providesTags     : ['manifest_loads'],
            keepUnusedDataFor: 0
        }),
        retrieveManifestTruckRoute: query<
            ManifestTruckRouteRetrieveReply,
            ManifestTruckRouteRetrieveRequest
        >({
            queryFn          : createPrivateQueryFn(ManifestsGrpcClient, 'manifestTruckRouteRetrieve'),
            providesTags     : ['manifest_truck_route'],
            keepUnusedDataFor: 0
        }),
        getManifestTruckEtaStates: query<
            ManifestTruckEtaStatesGetReply,
            ManifestTruckEtaStatesGetRequest
        >({
            queryFn          : createPrivateQueryFn(ManifestsGrpcClient, 'manifestTruckEtaStatesGet'),
            keepUnusedDataFor: 0
        }),

        getManifestStats: query<ManifestStatsGetReply, ManifestStatsGetRequest>({
            queryFn          : createPrivateQueryFn(ManifestsGrpcClient, 'manifestStatsGet'),
            providesTags     : ['manifests'],
            keepUnusedDataFor: 0
        }),

        // ---- MUTATIONS ----
        createBlankManifest: mutation<ManifestCreateReply, ManifestCreateRequest>({
            queryFn        : createPrivateQueryFn(ManifestsGrpcClient, 'manifestCreate'),
            invalidatesTags: ['manifest', 'manifests'],
            onQueryStarted : async (arg, {
                dispatch,
                queryFulfilled
            }) => {
                queryFulfilled
                    .then((res) => {
                        const { manifest } = res.data;
                        if (manifest) {
                            dispatch(
                                BatchUpdateCashedManifest(
                                    manifest.manifestId,
                                    manifest,
                                    queryFulfilled
                                )
                            );
                        }
                    })
                    .catch((error) => {
                        toast.error(error.error.message, {
                            position: 'top-right'
                        });
                    });
            }
        }),

        splitManifest: mutation<ManifestSplitReply, ManifestSplitRequest>({
            queryFn       : createPrivateQueryFn(ManifestsGrpcClient, 'manifestSplit'),
            onQueryStarted: async (arg, {
                dispatch,
                queryFulfilled
            }) => {
                queryFulfilled
                    .then((res) => {
                        const {
                            manifest,
                            newManifest
                        } = res.data;
                        if (manifest) {
                            dispatch(
                                BatchUpdateCashedManifest(
                                    manifest.manifestId,
                                    manifest,
                                    queryFulfilled
                                )
                            );
                        }
                        if (newManifest) {
                            dispatch(
                                BatchUpdateCashedManifest(
                                    newManifest.manifestId,
                                    newManifest,
                                    queryFulfilled
                                )
                            );
                        }
                    })
                    .catch((error) => {
                        toast.error(error.error.message, {
                            position: 'top-right'
                        });
                    });
            }
        }),

        assignDriverToManifest: mutation<ManifestDriverAssignReply, ManifestDriverAssignRequest>({
            queryFn        : createPrivateQueryFn(ManifestsGrpcClient, 'manifestDriverAssign'),
            invalidatesTags: (res, _, arg) => [{ type: 'manifests_drivers', id: arg.manifestId }],
            onQueryStarted : async (arg, {
                dispatch,
                getState,
                queryFulfilled
            }) => {
                queryFulfilled
                    .then((res) => {
                        const { manifest } = res.data;
                        if (manifest) {
                            dispatch(
                                BatchUpdateCashedManifest(arg.manifestId, manifest, queryFulfilled)
                            );
                        }
                    })
                    .catch((error) => {
                        toast.error(error.error.message, {
                            position: 'top-right'
                        });
                    });
            }
        }),

        unassignDriverFromManifest: mutation<
            ManifestDriverUnassignReply,
            ManifestDriverUnassignRequest
        >({
            queryFn        : createPrivateQueryFn(ManifestsGrpcClient, 'manifestDriverUnassign'),
            invalidatesTags: (res, _, arg) => [{ type: 'manifests_drivers', id: arg.manifestId }],
            onQueryStarted : async (arg, {
                dispatch,
                queryFulfilled
            }) => {
                queryFulfilled
                    .then((res) => {
                        const { manifest } = res.data;
                        if (manifest) {
                            dispatch(
                                BatchUpdateCashedManifest(arg.manifestId, manifest, queryFulfilled)
                            );
                        }
                    })
                    .catch((error) => {
                        toast.error(error.error.message, {
                            position: 'top-right'
                        });
                    });
            }
        }),
        mergeManifests: mutation<ManifestMergeReply, ManifestMergeRequest>({
            queryFn: createPrivateQueryFn(ManifestsGrpcClient, 'manifestMerge'),

            onQueryStarted: async (arg, {
                dispatch,
                queryFulfilled
            }) => {
                queryFulfilled
                    .then((res) => {
                        const { manifest } = res.data;
                        if (manifest) {
                            dispatch(
                                BatchUpdateCashedManifest(
                                    manifest.manifestId,
                                    manifest,
                                    queryFulfilled
                                )
                            );
                        }
                    })
                    .catch((error) => {
                        toast.error(error.error.message, {
                            position: 'top-right'
                        });
                    });
            }
        }),

        /** ---- MANUAL CACHE UPDATES MUTATIONS ---- */
        deleteManifest: mutation<ManifestDeleteReply, ManifestDeleteRequest>({
            queryFn       : createPrivateQueryFn(ManifestsGrpcClient, 'manifestDelete'),
            onQueryStarted: async (arg, {
                dispatch,
                queryFulfilled
            }) => {
                const updateData: Partial<ManifestModel_Manifest> = {
                    status: ManifestModel_Status.DELETED
                };
                dispatch(BatchUpdateCashedManifest(arg.manifestId, updateData, queryFulfilled));
            }
        }),

        updateManifestTitle: mutation<ManifestTitleUpdateReply, ManifestTitleUpdateRequest>({
            queryFn       : createPrivateQueryFn(ManifestsGrpcClient, 'manifestTitleUpdate'),
            onQueryStarted: async (arg, {
                dispatch,
                queryFulfilled
            }) => {
                const updateData: Partial<ManifestModel_Manifest> = {
                    title: arg.title
                };
                dispatch(BatchUpdateCashedManifest(arg.manifestId, updateData, queryFulfilled));
            }
        }),

        // IMPLEMENT LOGIC FOR LOAD ASSIGNMENT
        unassignTruckFromManifest: mutation<
            ManifestTruckUnassignReply,
            ManifestTruckUnassignRequest & { loadId?: string }
        >({
            queryFn        : createPrivateQueryFn(ManifestsGrpcClient, 'manifestTruckUnassign'),
            invalidatesTags: (res, _, arg) => [{ type: 'manifests_drivers', id: arg.manifestId }],
            onQueryStarted : async (arg, {
                dispatch,
                queryFulfilled,
                getState
            }) => {
                queryFulfilled.then((res) => {
                    const { manifest } = res.data;
                    if (manifest) {
                        dispatch(
                            BatchUpdateCashedManifest(arg.manifestId, manifest, queryFulfilled)
                        );

                        if (arg.loadId) {
                            const storeManifests = getActualLoadManifests(getState() as RootState);
                            const activeManifestIdx = storeManifests.findIndex(
                                (m) => m.manifestId === arg.manifestId
                            );
                            const activeManifest = storeManifests[activeManifestIdx];

                            if (!activeManifest) return;

                            const manifests = storeManifests.map((manifest, idx) => {
                                if (idx === activeManifestIdx) {
                                    return manifest;
                                }
                                return manifest;
                            });

                            dispatch(
                                UpdateOrderDataCacheThunk(
                                    {
                                        loadId    : arg.loadId,
                                        updateData: {
                                            manifests
                                        }
                                    },
                                    queryFulfilled
                                )
                            );
                        }
                    }
                });
            }
        }),

        // IMPLEMENT LOGIC FOR LOAD ASSIGNMENT
        assignTruckToManifest: mutation<
            ManifestTruckAssignReply,
            ManifestTruckAssignRequest & { loadId: string }
        >({
            queryFn        : createPrivateQueryFn(ManifestsGrpcClient, 'manifestTruckAssign'),
            invalidatesTags: (res, _, arg) => [{ type: 'manifests_drivers', id: arg.manifestId }],
            onQueryStarted : async (arg, {
                dispatch,
                queryFulfilled,
                getState
            }) => {
                queryFulfilled
                    .then((res) => {
                        const { manifest } = res.data;

                        if (manifest) {
                            dispatch(
                                BatchUpdateCashedManifest(arg.manifestId, manifest, queryFulfilled)
                            );
                            if (arg.loadId) {
                                const storeManifests = getActualLoadManifests(
                                    getState() as RootState
                                );
                                const activeManifestIdx = storeManifests.findIndex(
                                    (m) => m.manifestId === arg.manifestId
                                );
                                const activeManifest = storeManifests[activeManifestIdx];

                                if (!activeManifest) return;

                                const manifests = storeManifests.map((manifest, idx) => {
                                    if (idx === activeManifestIdx) {
                                        return manifest;
                                    }
                                    return manifest;
                                });

                                dispatch(
                                    UpdateOrderDataCacheThunk(
                                        {
                                            loadId    : arg.loadId,
                                            updateData: {
                                                activeManifestId: arg.manifestId,
                                                manifests
                                            }
                                        },
                                        queryFulfilled
                                    )
                                );
                            }
                        }
                    })
                    .catch((error) => {
                        toast.error(error.error.message, {
                            position: 'top-right'
                        });
                    });
            }
        }),

        // IMPLEMENT LOGIC FOR LOAD ASSIGNMENT
        reAssignTruckToManifest: mutation<
            ManifestTruckAssignReply,
            ManifestTruckAssignRequest & { loadId: string }
        >({
            queryFn       : createPrivateQueryFn(ManifestsGrpcClient, 'manifestTruckAssign'),
            onQueryStarted: async (arg, {
                dispatch,
                queryFulfilled,
                getState
            }) => {
                const state = getState() as RootState;
                const trucksMap = state.trucksData.trucksByIdMap;
                const truck = trucksMap[arg.truckId];

                const driverIds: string[] = truck.drivers.map((driver) => driver.driverId);

                const updateData: Partial<ManifestModel_Manifest> = {
                    truckId  : truck.truckId,
                    trailerId: truck.trailerId,
                    driverIds
                };
                if (arg.loadId) {
                    const storeManifests = getActualLoadManifests(getState() as RootState);
                    const activeManifestIdx = storeManifests.findIndex(
                        (m) => m.manifestId === arg.manifestId
                    );
                    const activeManifest = storeManifests[activeManifestIdx];

                    if (!activeManifest) return;

                    const primaryDriverId =
                        truck.drivers.find((driver) => driver.primary)?.driverId || '';
                    const updatedManifest: ManifestModel_Manifest = {
                        ...activeManifest,
                        truckId  : arg.truckId,
                        trailerId: truck.trailerId,
                        driverIds: [],
                        primaryDriverId
                    };
                    const manifests = storeManifests.map((manifest, idx) => {
                        if (idx === activeManifestIdx) {
                            return updatedManifest;
                        }
                        return manifest;
                    });
                    dispatch(
                        UpdateOrderDataCacheThunk(
                            {
                                loadId    : arg.loadId,
                                updateData: {
                                    activeManifestId: arg.manifestId,
                                    manifests
                                }
                            },
                            queryFulfilled
                        )
                    );
                }
                dispatch(BatchUpdateCashedManifest(arg.manifestId, updateData, queryFulfilled));
            }
        }),
        updateManifestStatus: mutation<ManifestStatusUpdateReply, ManifestStatusUpdateRequest>({
            queryFn        : createPrivateQueryFn(ManifestsGrpcClient, 'manifestStatusUpdate'),
            invalidatesTags: ['manifest_truck_route', 'manifests'],
            onQueryStarted : async (arg, {
                dispatch,
                queryFulfilled
            }) => {
                const updateData: Partial<ManifestModel_Manifest> = {
                    status: arg.status
                };
                dispatch(BatchUpdateCashedManifest(arg.manifestId, updateData, queryFulfilled));
            }
        }),
        updateGross: mutation<ManifestGrossUpdateReply, ManifestGrossUpdateRequest>({
            queryFn       : createPrivateQueryFn(ManifestsGrpcClient, 'manifestGrossUpdate'),
            onQueryStarted: async (arg, {
                dispatch,
                queryFulfilled
            }) => {
                const updateData: Partial<ManifestModel_Manifest> = {
                    gross: {
                        amount         : Number(arg.grossAmount),
                        currency       : arg.grossCurrency,
                        amountFormatted: getFormattedAmountOfMoney(Number(arg.grossAmount))
                    }
                };
                dispatch(BatchUpdateCashedManifest(arg.manifestId, updateData, queryFulfilled));
            }
        }),
        updateEmptyDistance: mutation<
            ManifestEmptyDistanceUpdateReply,
            ManifestEmptyDistanceUpdateRequest
        >({
            queryFn       : createPrivateQueryFn(ManifestsGrpcClient, 'manifestEmptyDistanceUpdate'),
            onQueryStarted: async (arg, {
                dispatch,
                queryFulfilled
            }) => {
                const updateData: Partial<ManifestModel_Manifest> = {
                    emptyDistance: {
                        kilometers         : milesToKilometers(Number(arg.miles)),
                        miles              : Number(arg.miles),
                        milesFormatted     : arg.miles || '',
                        kilometersFormatted: milesToKilometers(Number(arg.miles)).toString()
                    }
                };

                dispatch(BatchUpdateCashedManifest(arg.manifestId, updateData, queryFulfilled));
            }
        }),
        updateLoadedDistance: mutation<
            ManifestLoadedDistanceUpdateReply,
            ManifestLoadedDistanceUpdateRequest
        >({
            queryFn       : createPrivateQueryFn(ManifestsGrpcClient, 'manifestLoadedDistanceUpdate'),
            onQueryStarted: async (arg, {
                dispatch,
                queryFulfilled
            }) => {
                const updateData: Partial<ManifestModel_Manifest> = {
                    loadedDistance: {
                        kilometers         : milesToKilometers(Number(arg.miles)),
                        miles              : Number(arg.miles),
                        milesFormatted     : arg.miles || '',
                        kilometersFormatted: milesToKilometers(Number(arg.miles)).toString()
                    }
                };

                dispatch(BatchUpdateCashedManifest(arg.manifestId, updateData, queryFulfilled));
            }
        })
    })
});

export default ManifestsGrpcService;
