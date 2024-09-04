import { DriverTypeServiceClient } from '@proto/driver_type.client';
import { handleRequest } from '@/store/api';
import {
    DriverTypeCreateReply,
    DriverTypeCreateRequest,
    DriverTypeDeleteReply,
    DriverTypeDeleteRequest,
    DriverTypeGetReply,
    DriverTypeGetRequest,
    DriverTypeUpdateReply,
    DriverTypeUpdateRequest
} from '@proto/driver_type';
import grpcTransport from '../../grpcTransport';
import grpcAPI from '../../api';
import { createPrivateQueryFn } from '../../createQueryFn';

const DriverTypesService = new DriverTypeServiceClient(grpcTransport);

const driverTypesTag = 'driver_types';

const DriverTypesGrpcService = grpcAPI.injectEndpoints({
    endpoints: ({
        query,
        mutation
    }) => ({
        getDriverTypes: query<DriverTypeGetReply, DriverTypeGetRequest>({
            queryFn     : createPrivateQueryFn(DriverTypesService, 'driverTypeGet'),
            providesTags: [driverTypesTag]
        }),
        createDriverType: mutation<DriverTypeCreateReply, DriverTypeCreateRequest>({
            queryFn        : createPrivateQueryFn(DriverTypesService, 'driverTypeCreate'),
            invalidatesTags: [driverTypesTag],
            onQueryStarted(arg, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Creating Driver Type',
                    success: 'Driver Type was created'
                });
            }
        }),
        updateDriverType: mutation<DriverTypeUpdateReply, DriverTypeUpdateRequest>({
            queryFn        : createPrivateQueryFn(DriverTypesService, 'driverTypeUpdate'),
            invalidatesTags: [driverTypesTag],
            onQueryStarted(arg, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Updating Driver Type',
                    success: 'Driver Type was updated'
                });
            }
        }),
        deleteDriverType: mutation<DriverTypeDeleteReply, DriverTypeDeleteRequest>({
            queryFn        : createPrivateQueryFn(DriverTypesService, 'driverTypeDelete'),
            invalidatesTags: [driverTypesTag],
            onQueryStarted(arg, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Deleting Driver Type',
                    success: 'Driver Type was deleted'
                });
            }
        })
    })
});

export default DriverTypesGrpcService;
