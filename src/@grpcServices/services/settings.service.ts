import {
    SettingsRetrieveReply,
    SettingsRetrieveRequest,
    SettingsUpdateReply,
    SettingsUpdateRequest
} from '@proto/settings';
import { SettingsServiceClient } from '@proto/settings.client';
import { handleRequest } from '@/store/api';
import grpcTransport from '../grpcTransport';
import grpcAPI from '../api';
import { createPrivateQueryFn } from '../createQueryFn';

const Client = new SettingsServiceClient(grpcTransport);

const SettingsGrpcService = grpcAPI.injectEndpoints({
    endpoints: ({
        mutation,
        query
    }) => ({
        getSettings: query<SettingsRetrieveReply, SettingsRetrieveRequest>({
            queryFn     : createPrivateQueryFn(Client, 'settingsRetrieve'),
            providesTags: ['settings']
        }),
        updateSettings: mutation<SettingsUpdateReply, SettingsUpdateRequest>({
            queryFn        : createPrivateQueryFn(Client, 'settingsUpdate'),
            invalidatesTags: ['settings'],
            async onQueryStarted(arg, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Updating Settings',
                    success: 'Settings were updated'
                });
            }
        })
    })
});

export default SettingsGrpcService;
