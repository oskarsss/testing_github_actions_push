import { TrucksServiceClient } from '@proto/trucks.client';
import {
    TruckStatusUpdateReply,
    TruckStatusUpdateRequest,
    TruckDeleteReply,
    TruckDeleteRequest,
    TruckParkingLocationUpdateReply,
    TruckParkingLocationUpdateRequest,
    TruckUpdateReply,
    TruckUpdateRequest,
    TruckInsuranceEndorsedReply,
    TruckInsuranceEndorsedRequest,
    TruckGetRequest,
    TruckGetReply,
    TruckCreateReply,
    TruckCreateRequest,
    TruckTrailerAssignRequest,
    TruckTrailerAssignReply,
    TruckTrailerRemoveReply,
    TruckTrailerRemoveRequest,
    TruckDriverAssignReply,
    TruckDriverAssignRequest,
    TruckDriverRemoveReply,
    TruckDriverRemoveRequest,
    TruckDriverPrimarySetReply,
    TruckDriverPrimarySetRequest,
    TruckUserAssignReply,
    TruckUserAssignRequest,
    TruckUserRemoveReply,
    TruckUserRemoveRequest,
    TruckRetrieveReply,
    TruckRetrieveRequest,
    TruckStatsRetrieveReply,
    TruckStatsRetrieveRequest
} from '@proto/trucks';
import { handleRequest, invalidateTag, invalidateTags } from '@/store/api';
import API_TAGS from '@/store/api_tags';
import { UpdateTruckCacheDataThunk } from '@/store/storage/trucks/actions/cashe';
import { TruckModel_Status } from '@proto/models/model_truck';
import { RootState } from '@/pages/_app';
import grpcTransport from '../grpcTransport';
import grpcAPI from '../api';
import { createPrivateQueryFn } from '../createQueryFn';

const Client = new TrucksServiceClient(grpcTransport);

const TrucksGrpcService = grpcAPI.injectEndpoints({
    endpoints: ({
        query,
        mutation
    }) => ({
        retrieveTruckStats: query<TruckStatsRetrieveReply, TruckStatsRetrieveRequest>({
            queryFn     : createPrivateQueryFn(Client, 'truckStatsRetrieve'),
            providesTags: (result, _, arg) => [{ type: 'truck', id: arg.truckId }]
        }),
        createTruck: mutation<TruckCreateReply, TruckCreateRequest>({
            queryFn: createPrivateQueryFn(Client, 'truckCreate'),
            onQueryStarted(arg, api) {
                handleRequest({
                    queryFulfilled: api.queryFulfilled,
                    loading       : 'Adding Truck',
                    success       : 'Truck was added'
                });
            }
        }),
        assignTrailerToTruck: mutation<TruckTrailerAssignReply, TruckTrailerAssignRequest>({
            queryFn: createPrivateQueryFn(Client, 'truckTrailerAssign'),
            async onQueryStarted(arg, {
                queryFulfilled,
                dispatch,
                getState
            }) {
                dispatch(
                    UpdateTruckCacheDataThunk({
                        truckId: arg.truckId,
                        data   : {
                            trailerId: arg.trailerId
                        },
                        queryFulfilled
                    })
                );
            }
        }),
        removeTrailerFromTruck: mutation<TruckTrailerRemoveReply, TruckTrailerRemoveRequest>({
            queryFn: createPrivateQueryFn(Client, 'truckTrailerRemove'),
            async onQueryStarted(arg, {
                queryFulfilled,
                dispatch,
                getState
            }) {
                dispatch(
                    UpdateTruckCacheDataThunk({
                        truckId: arg.truckId,
                        data   : {
                            trailerId: ''
                        },
                        queryFulfilled
                    })
                );
            }
        }),
        assignDriverToTruck: mutation<TruckDriverAssignReply, TruckDriverAssignRequest>({
            queryFn: createPrivateQueryFn(Client, 'truckDriverAssign'),
            async onQueryStarted(arg, {
                queryFulfilled,
                dispatch,
                getState
            }) {
                const store = getState() as RootState;
                const currentDrivers = store.trucksData.trucksByIdMap[arg.truckId]?.drivers || [];
                const preparedCurrentDrivers = arg.primary
                    ? currentDrivers.map((driver) => ({
                        ...driver,
                        primary: false
                    }))
                    : currentDrivers;

                const newDrivers = [
                    { driverId: arg.driverId, primary: arg.primary },
                    ...preparedCurrentDrivers
                ];
                dispatch(
                    UpdateTruckCacheDataThunk({
                        truckId: arg.truckId,
                        data   : {
                            drivers: newDrivers
                        },
                        queryFulfilled
                    })
                );
            }
        }),
        removeDriverFromTruck: mutation<TruckDriverRemoveReply, TruckDriverRemoveRequest>({
            queryFn: createPrivateQueryFn(Client, 'truckDriverRemove'),
            async onQueryStarted(arg, {
                queryFulfilled,
                dispatch,
                getState
            }) {
                const store = getState() as RootState;
                const currentDrivers = store.trucksData.trucksByIdMap[arg.truckId]?.drivers || [];
                const newDrivers = currentDrivers.filter(
                    (driver) => driver.driverId !== arg.driverId
                );
                dispatch(
                    UpdateTruckCacheDataThunk({
                        truckId: arg.truckId,
                        data   : {
                            drivers: newDrivers
                        },
                        queryFulfilled
                    })
                );
            }
        }),
        setPrimaryDriver: mutation<TruckDriverPrimarySetReply, TruckDriverPrimarySetRequest>({
            queryFn: createPrivateQueryFn(Client, 'truckDriverPrimarySet'),
            async onQueryStarted(arg, {
                queryFulfilled,
                dispatch,
                getState
            }) {
                const store = getState() as RootState;
                const currentDrivers = store.trucksData.trucksByIdMap[arg.truckId]?.drivers || [];
                const newDrivers = currentDrivers.map((driver) => ({
                    ...driver,
                    primary: driver.driverId === arg.driverId
                }));
                dispatch(
                    UpdateTruckCacheDataThunk({
                        truckId: arg.truckId,
                        data   : {
                            drivers: newDrivers
                        },
                        queryFulfilled
                    })
                );
            }
        }),
        assignUserToTruck: mutation<TruckUserAssignReply, TruckUserAssignRequest>({
            queryFn: createPrivateQueryFn(Client, 'truckUserAssign'),
            async onQueryStarted(arg, {
                queryFulfilled,
                dispatch,
                getState
            }) {
                const store = getState() as RootState;
                const currentUsers = store.trucksData.trucksByIdMap[arg.truckId]?.users || [];
                const newUsers = [...currentUsers, arg.userId];
                dispatch(
                    UpdateTruckCacheDataThunk({
                        truckId: arg.truckId,
                        data   : {
                            users: newUsers
                        },
                        queryFulfilled
                    })
                );
            }
        }),
        removeUserFromTruck: mutation<TruckUserRemoveReply, TruckUserRemoveRequest>({
            queryFn: createPrivateQueryFn(Client, 'truckUserRemove'),

            async onQueryStarted(arg, {
                queryFulfilled,
                dispatch,
                getState
            }) {
                const store = getState() as RootState;
                const currentUsers = store.trucksData.trucksByIdMap[arg.truckId]?.users || [];
                const newUsers = currentUsers.filter((id) => id !== arg.userId);
                dispatch(
                    UpdateTruckCacheDataThunk({
                        truckId: arg.truckId,
                        data   : {
                            users: newUsers
                        },
                        queryFulfilled
                    })
                );
            }
        }),
        updateTruckInsuranceEndorsed: mutation<
            TruckInsuranceEndorsedReply,
            TruckInsuranceEndorsedRequest
        >({
            queryFn: createPrivateQueryFn(Client, 'truckInsuranceEndorsedUpdate'),
            async onQueryStarted(arg, {
                queryFulfilled,
                dispatch
            }) {
                dispatch(
                    UpdateTruckCacheDataThunk({ truckId: arg.truckId, data: arg, queryFulfilled })
                );
            }
        }),
        updateTruck: mutation<TruckUpdateReply, TruckUpdateRequest & { trailer_id: string }>({
            queryFn: createPrivateQueryFn(Client, 'truckUpdate'),
            async onQueryStarted(arg, {
                queryFulfilled,
                dispatch
            }) {
                dispatch(
                    UpdateTruckCacheDataThunk({ truckId: arg.truckId, data: arg, queryFulfilled })
                );
            }
        }),
        updateTruckStatus: mutation<TruckStatusUpdateReply, TruckStatusUpdateRequest>({
            queryFn: createPrivateQueryFn(Client, 'statusUpdate'),
            async onQueryStarted(arg, {
                queryFulfilled,
                dispatch
            }) {
                dispatch(
                    UpdateTruckCacheDataThunk({ truckId: arg.truckId, data: arg, queryFulfilled })
                );
            }
        }),
        deleteTruck: mutation<TruckDeleteReply, TruckDeleteRequest>({
            queryFn: createPrivateQueryFn(Client, 'delete'),
            async onQueryStarted(arg, {
                queryFulfilled,
                dispatch
            }) {
                dispatch(
                    UpdateTruckCacheDataThunk({
                        truckId: arg.truckId,
                        data   : {
                            status: TruckModel_Status.deleted
                        },
                        queryFulfilled
                    })
                );
            }
        }),
        updateTruckParkingLocation: mutation<
            TruckParkingLocationUpdateReply,
            TruckParkingLocationUpdateRequest
        >({
            queryFn: createPrivateQueryFn(Client, 'truckParkingLocationUpdate'),
            async onQueryStarted(arg, {
                queryFulfilled,
                dispatch
            }) {
                dispatch(
                    UpdateTruckCacheDataThunk({
                        truckId: arg.truckId,
                        data   : {
                            parkingLocation: arg.parkingLocation
                        },
                        queryFulfilled
                    })
                );
            }
        })
    })
});

export default TrucksGrpcService;
