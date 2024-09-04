import { DriversServiceClient } from '@proto/drivers.client';
import {
    DriverDeleteReply,
    DriverDeleteRequest,
    DriverInsuranceEndorsedReply,
    DriverInsuranceEndorsedRequest,
    DriverStatusUpdateReply,
    DriverStatusUpdateRequest,
    DriverUpdateReply,
    type DriverUpdateRequest,
    SendDriverInviteReply,
    SendDriverInviteRequest,
    DriverCreateReply,
    DriverCreateRequest,
    DriverSelfieUploadRequest,
    DriverSelfieUploadReply,
    DriverNoteUpdateRequest,
    DriverNoteUpdateReply,
    DriverUserAssignReply,
    DriverUserAssignRequest,
    DriverUserRemoveReply,
    DriverUserRemoveRequest,
    DriverSendSmsReply,
    DriverSendSmsRequest,
    DriverVendorAssignReply,
    DriverVendorAssignRequest,
    DriverVendorRemoveReply,
    DriverVendorRemoveRequest,
    DriverDeviceGetReply,
    DriverDeviceGetRequest,
    DriverStatsRetrieveReply,
    DriverStatsRetrieveRequest
} from '@proto/drivers';
import { handleRequest, tagIdList } from '@/store/api';
import { UpdateDriverDataCache } from '@/store/storage/drivers/actions/cache';
import { DriverModel_Driver_User, DriverModel_Status } from '@proto/models/model_driver';
import { RootState } from '@/store/types';
import { selectDriverRowById } from '@/store/storage/drivers/selectors';
import grpcTransport from '../grpcTransport';
import grpcAPI from '../api';
import { createPrivateQueryFn } from '../createQueryFn';

const Client = new DriversServiceClient(grpcTransport);

const DriversGrpcService = grpcAPI.injectEndpoints({
    endpoints: ({
        mutation,
        query
    }) => ({
        getDriverStats: query<DriverStatsRetrieveReply, DriverStatsRetrieveRequest>({
            queryFn     : createPrivateQueryFn(Client, 'driverStatsRetrieve'),
            providesTags: [{ type: 'drivers', id: tagIdList }]
        }),

        inviteDriver: mutation<SendDriverInviteReply, SendDriverInviteRequest>({
            queryFn       : createPrivateQueryFn(Client, 'sendDriverInvite'),
            onQueryStarted: (params, { queryFulfilled }) => {
                handleRequest({
                    queryFulfilled,
                    loading: 'Sending an invitation',
                    success: 'Driver was invited'
                });
            }
        }),

        deleteDriver: mutation<DriverDeleteReply, DriverDeleteRequest>({
            queryFn: createPrivateQueryFn(Client, 'driverDelete'),
            onQueryStarted(arg, {
                dispatch,
                queryFulfilled
            }) {
                dispatch(
                    UpdateDriverDataCache({
                        driverId: arg.driverId,
                        data    : { status: DriverModel_Status.DELETED },
                        queryFulfilled
                    })
                );
            }
        }),
        updateDriverStatus: mutation<DriverStatusUpdateReply, DriverStatusUpdateRequest>({
            queryFn: createPrivateQueryFn(Client, 'driverStatusUpdate'),
            onQueryStarted(arg, {
                dispatch,
                queryFulfilled
            }) {
                dispatch(
                    UpdateDriverDataCache({
                        driverId: arg.driverId,
                        data    : arg,
                        queryFulfilled
                    })
                );
            }
        }),
        updateDriverInsuranceEndorsed: mutation<
            DriverInsuranceEndorsedReply,
            DriverInsuranceEndorsedRequest
        >({
            queryFn: createPrivateQueryFn(Client, 'driverInsuranceEndorsedUpdate'),
            onQueryStarted(arg, {
                dispatch,
                queryFulfilled
            }) {
                dispatch(
                    UpdateDriverDataCache({
                        driverId: arg.driverId,
                        data    : arg,
                        queryFulfilled
                    })
                );
            }
        }),
        updateDriver: mutation<DriverUpdateReply, DriverUpdateRequest>({
            queryFn: createPrivateQueryFn(Client, 'driverUpdate'),
            onQueryStarted(arg, {
                dispatch,
                queryFulfilled
            }) {
                dispatch(
                    UpdateDriverDataCache({
                        driverId: arg.driverId,
                        data    : arg,
                        queryFulfilled
                    })
                );
            }
        }),
        createDriver: mutation<DriverCreateReply, DriverCreateRequest>({
            queryFn: createPrivateQueryFn(Client, 'driverCreate'),
            onQueryStarted(arg, api) {
                handleRequest({
                    queryFulfilled: api.queryFulfilled,
                    loading       : 'Creating Driver',
                    success       : 'Driver was created'
                });
            }
        }),
        updateDriverSelfie: mutation<DriverSelfieUploadReply, DriverSelfieUploadRequest>({
            queryFn: createPrivateQueryFn(Client, 'driverSelfieUpload'),
            onQueryStarted(arg, {
                dispatch,
                queryFulfilled
            }) {
                dispatch(
                    UpdateDriverDataCache({
                        driverId: arg.driverId,
                        data    : arg,
                        queryFulfilled
                    })
                );
            }
        }),
        updateDriverNote: mutation<DriverNoteUpdateReply, DriverNoteUpdateRequest>({
            queryFn: createPrivateQueryFn(Client, 'driverNoteUpdate'),
            onQueryStarted(arg, {
                dispatch,
                queryFulfilled
            }) {
                dispatch(
                    UpdateDriverDataCache({
                        driverId: arg.driverId,
                        data    : arg,
                        queryFulfilled
                    })
                );
            }
        }),
        assignUserToDriver: mutation<DriverUserAssignReply, DriverUserAssignRequest>({
            queryFn: createPrivateQueryFn(Client, 'driverUserAssign'),
            onQueryStarted(arg, {
                dispatch,
                queryFulfilled,
                getState
            }) {
                const store = getState() as RootState;
                const currentUsers = selectDriverRowById(arg.driverId)(store).users ?? [];
                const newUsers: DriverModel_Driver_User[] = [
                    { assignedAt: new Date().toISOString(), userId: arg.userId },
                    ...currentUsers
                ];
                dispatch(
                    UpdateDriverDataCache({
                        driverId: arg.driverId,
                        data    : {
                            users: newUsers
                        },
                        queryFulfilled
                    })
                );
            }
        }),
        removeUserFromDriver: mutation<DriverUserRemoveReply, DriverUserRemoveRequest>({
            queryFn: createPrivateQueryFn(Client, 'driverUserRemove'),
            onQueryStarted(arg, {
                dispatch,
                queryFulfilled,
                getState
            }) {
                const store = getState() as RootState;
                const currentUsers = selectDriverRowById(arg.driverId)(store).users ?? [];
                const newUsers = currentUsers.filter((user) => user.userId !== arg.userId);
                dispatch(
                    UpdateDriverDataCache({
                        driverId: arg.driverId,
                        data    : {
                            users: newUsers
                        },
                        queryFulfilled
                    })
                );
            }
        }),
        sendDriverSMS: mutation<DriverSendSmsReply, DriverSendSmsRequest>({
            queryFn: createPrivateQueryFn(Client, 'driverSendSms'),
            onQueryStarted(arg, api) {
                handleRequest({
                    queryFulfilled: api.queryFulfilled,
                    loading       : 'Sending SMS',
                    success       : 'SMS was sent'
                });
            }
        }),
        assignVendorToDriver: mutation<DriverVendorAssignReply, DriverVendorAssignRequest>({
            queryFn: createPrivateQueryFn(Client, 'driverVendorAssign'),
            onQueryStarted(arg, {
                dispatch,
                queryFulfilled
            }) {
                dispatch(
                    UpdateDriverDataCache({
                        driverId: arg.driverId,
                        data    : {
                            vendorId: arg.vendorId
                        },
                        queryFulfilled
                    })
                );
            }
        }),
        removeVendorFromDriver: mutation<DriverVendorRemoveReply, DriverVendorRemoveRequest>({
            queryFn: createPrivateQueryFn(Client, 'driverVendorRemove'),
            onQueryStarted(arg, {
                dispatch,
                queryFulfilled
            }) {
                dispatch(
                    UpdateDriverDataCache({
                        driverId: arg.driverId,
                        data    : {
                            vendorId: ''
                        },
                        queryFulfilled
                    })
                );
            }
        }),
        getDriverDevices: query<DriverDeviceGetReply, DriverDeviceGetRequest>({
            queryFn     : createPrivateQueryFn(Client, 'driverDeviceGet'),
            providesTags: [{ type: 'devices', id: tagIdList }]
        })
    })
});

export default DriversGrpcService;
