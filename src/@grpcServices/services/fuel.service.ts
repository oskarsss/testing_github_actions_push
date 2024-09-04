import { FuelServiceClient } from '@proto/fuel.client';
import {
    AssignTruckReply,
    AssignTruckRequest,
    CreateFuelTransactionRequest,
    CreateFuelTransactionResponse,
    DeleteFuelTransactionReply,
    DeleteFuelTransactionRequest,
    FindByReferenceIDReply,
    FindByReferenceIDRequest,
    FuelUpdateVerifiedReply,
    FuelUpdateVerifiedRequest,
    UnassignTruckReply,
    UnassignTruckRequest,
    UpdateFuelTransactionReply,
    UpdateFuelTransactionRequest,
    FuelRetrieveReply,
    FuelRetrieveRequest,
    FuelGetReply,
    FuelGetRequest,
    FuelStatsGetReply,
    FuelStatsGetRequest
} from '@proto/fuel';
import { handleRequest, invalidateTags } from '@/store/api';
import grpcTransport from '../grpcTransport';
import grpcAPI from '../api';
import { createPrivateQueryFn } from '../createQueryFn';

const FuelService = new FuelServiceClient(grpcTransport);

const FuelGrpcService = grpcAPI.injectEndpoints({
    endpoints: ({
        mutation,
        query
    }) => ({
        getFuel: query<FuelGetReply, FuelGetRequest>({
            queryFn          : createPrivateQueryFn(FuelService, 'fuelGet'),
            providesTags     : (result) => invalidateTags(result, 'fuel'),
            keepUnusedDataFor: 0
        }),

        getFuelStats: query<FuelStatsGetReply, FuelStatsGetRequest>({
            queryFn          : createPrivateQueryFn(FuelService, 'fuelStatsGet'),
            providesTags     : (result) => invalidateTags(result, 'fuel'),
            keepUnusedDataFor: 0
        }),

        createFuel: mutation<CreateFuelTransactionResponse, CreateFuelTransactionRequest>({
            queryFn        : createPrivateQueryFn(FuelService, 'createFuelTransaction'),
            invalidatesTags: (result) => invalidateTags(result, 'fuel'),
            onQueryStarted(arg, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Creating fuel transaction',
                    success: 'Fuel transaction was created'
                });
            }
        }),
        retrieveFuel: query<FuelRetrieveReply, FuelRetrieveRequest>({
            queryFn     : createPrivateQueryFn(FuelService, 'retrieveFuelTransaction'),
            providesTags: (result, _, arg) =>
                invalidateTags(result, 'fuel', arg.fuelTransactionId, 'fuel')
        }),
        assignTruck: mutation<AssignTruckReply, AssignTruckRequest>({
            queryFn        : createPrivateQueryFn(FuelService, 'assignTruck'),
            invalidatesTags: (result, _, arg) =>
                invalidateTags(result, 'fuel', arg.fuelTransactionId, 'fuel'),
            onQueryStarted(arg, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Assigning truck',
                    success: 'Truck was assigned'
                });
            }
        }),
        unassignTruck: mutation<UnassignTruckReply, UnassignTruckRequest>({
            queryFn        : createPrivateQueryFn(FuelService, 'unassignTruck'),
            invalidatesTags: (result, _, arg) =>
                invalidateTags(result, 'fuel', arg.fuelTransactionId, 'fuel'),
            onQueryStarted(arg, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Unassigning truck',
                    success: 'Truck was unassigned'
                });
            }
        }),
        deleteFuelTransaction: mutation<DeleteFuelTransactionReply, DeleteFuelTransactionRequest>({
            queryFn        : createPrivateQueryFn(FuelService, 'deleteFuelTransaction'),
            invalidatesTags: (result, _, arg) => invalidateTags(result, 'fuel'),
            onQueryStarted(arg, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Deleting fuel transaction',
                    success: 'Fuel transaction was deleted'
                });
            }
        }),
        updateFuel: mutation<UpdateFuelTransactionReply, UpdateFuelTransactionRequest>({
            queryFn        : createPrivateQueryFn(FuelService, 'updateFuelTransaction'),
            invalidatesTags: (result, _, arg) =>
                invalidateTags(result, 'fuel', arg.fuelTransactionId, 'fuel'),
            onQueryStarted(arg, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Updating fuel transaction',
                    success: 'Fuel transaction was updated'
                });
            }
        }),
        checkDuplicate: mutation<FindByReferenceIDReply, FindByReferenceIDRequest>({
            queryFn: createPrivateQueryFn(FuelService, 'findByReferenceID')
        }),
        changeVerified: mutation<FuelUpdateVerifiedReply, FuelUpdateVerifiedRequest>({
            queryFn        : createPrivateQueryFn(FuelService, 'updateVerified'),
            invalidatesTags: (result, _, arg) =>
                invalidateTags(result, 'fuel', arg.fuelTransactionId, 'fuel'),
            onQueryStarted(arg, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Updating fuel transaction',
                    success: 'Fuel transaction was updated'
                });
            }
        })
    })
});

export default FuelGrpcService;
