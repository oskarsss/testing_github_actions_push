import { IntegrationsServiceClient } from '@proto/integrations.client';

import {
    GetIntegrationProvidersRequest,
    GetIntegrationProvidersReply,
    UpdateIntegrationProviderFieldValueReply,
    UpdateIntegrationProviderFieldValueRequest,
    ConnectIntegrationProviderReply,
    ConnectIntegrationProviderRequest,
    DisconnectIntegrationProviderReply,
    DisconnectIntegrationProviderRequest,
    IntegrationProviderSamsaraUpdateOAuthCodeReply,
    IntegrationProviderSamsaraUpdateOAuthCodeRequest,
    IntegrationProviderMotiveUpdateOAuthCodeReply,
    IntegrationProviderMotiveUpdateOAuthCodeRequest,
    GetIntegrationProviderOAuthURLReply,
    GetIntegrationProviderOAuthURLRequest,
    IntegrationProviderUpdateDriverRequest,
    IntegrationProviderUpdateDriverReply,
    IntegrationProviderUpdateVehicleRequest,
    IntegrationProviderUpdateVehicleReply,
    IntegrationProviderOttLoadboardUpdateOAuthCodeRequest,
    IntegrationProviderOttLoadboardUpdateOAuthCodeReply,
    IntegrationProviderUberUpdateOAuthCodeRequest,
    IntegrationProviderUberUpdateOAuthCodeReply,
    IntegrationProviderQuickbooksUpdateOAuthCodeRequest,
    IntegrationProviderQuickbooksUpdateOAuthCodeReply,
    GetIntegrationProviderReply,
    GetIntegrationProviderRequest,
    RequestIntegrationReply,
    RequestIntegrationRequest,
    IntegrationProviderApexCapitalUpdateOAuthCodeReply,
    IntegrationProviderApexCapitalUpdateOAuthCodeRequest
} from '@proto/integrations';
import { handleRequest } from '@/store/api';
import { PROVIDER_ID } from '@/views/settings/tabs/Integrations/constants';
import grpcTransport from '../grpcTransport';
import grpcAPI from '../api';
import { createPrivateQueryFn } from '../createQueryFn';

const IntegrationServiceClient = new IntegrationsServiceClient(grpcTransport);

const IntegrationProviderGrpcService = grpcAPI.injectEndpoints({
    endpoints: ({
        query,
        mutation
    }) => ({
        getIntegrationProviders: query<
            GetIntegrationProvidersReply,
            GetIntegrationProvidersRequest
        >({
            queryFn     : createPrivateQueryFn(IntegrationServiceClient, 'getIntegrationProviders'),
            providesTags: ['integrations']
        }),
        getIntegrationProviderId: query<GetIntegrationProviderReply, GetIntegrationProviderRequest>(
            {
                queryFn     : createPrivateQueryFn(IntegrationServiceClient, 'getIntegrationProvider'),
                providesTags: (result, _, arg) => [
                    { type: 'integration', id: arg.integrationProviderId }
                ]
            }
        ),
        updateIntegrationProviderFieldValue: mutation<
            UpdateIntegrationProviderFieldValueReply,
            UpdateIntegrationProviderFieldValueRequest
        >({
            queryFn: createPrivateQueryFn(
                IntegrationServiceClient,
                'updateIntegrationProviderFieldValue'
            ),
            onQueryStarted(arg, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Updating integration provider',
                    success: 'Integration provider was updated'
                });
            },
            invalidatesTags: (result, error, arg) => [
                { type: 'integration', id: arg.integrationProviderId }
            ]
        }),
        connectIntegrationProvider: mutation<
            ConnectIntegrationProviderReply,
            ConnectIntegrationProviderRequest
        >({
            queryFn        : createPrivateQueryFn(IntegrationServiceClient, 'connectIntegrationProvider'),
            invalidatesTags: (result, _, arg) => [
                'integrations',
                { type: 'integration', id: arg.integrationProviderId }
            ],
            onQueryStarted(arg, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Connecting integration provider',
                    success: 'Integration provider was connected'
                });
            }
        }),
        disconnectIntegrationProvider: mutation<
            DisconnectIntegrationProviderReply,
            DisconnectIntegrationProviderRequest
        >({
            queryFn: createPrivateQueryFn(
                IntegrationServiceClient,
                'disconnectIntegrationProvider'
            ),
            onQueryStarted(arg, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Disconnecting integration provider',
                    success: 'Integration provider was disconnected',
                    styles : { maxWidth: '360px' }
                });
            },
            invalidatesTags: (result, _, arg) => [
                'integrations',
                { type: 'integration', id: arg.integrationProviderId }
            ]
        }),
        samsaraUpdateOAuthToken: mutation<
            IntegrationProviderSamsaraUpdateOAuthCodeReply,
            IntegrationProviderSamsaraUpdateOAuthCodeRequest
        >({
            queryFn: createPrivateQueryFn(
                IntegrationServiceClient,
                'integrationProviderSamsaraUpdateOAuthCode'
            ),
            invalidatesTags: ['integrations']
        }),
        quickbooksUpdateOAuthToken: mutation<
            IntegrationProviderQuickbooksUpdateOAuthCodeReply,
            IntegrationProviderQuickbooksUpdateOAuthCodeRequest
        >({
            queryFn: createPrivateQueryFn(
                IntegrationServiceClient,
                'integrationProviderQuickbooksUpdateOAuthCode'
            ),
            invalidatesTags: ['integrations', { type: 'integration', id: PROVIDER_ID.QUICKBOOKS }]
        }),
        motiveUpdateOAuthToken: mutation<
            IntegrationProviderMotiveUpdateOAuthCodeReply,
            IntegrationProviderMotiveUpdateOAuthCodeRequest
        >({
            queryFn: createPrivateQueryFn(
                IntegrationServiceClient,
                'integrationProviderMotiveUpdateOAuthCode'
            ),
            invalidatesTags: ['integrations']
        }),
        ottLoadboardUpdateOAuthToken: mutation<
            IntegrationProviderOttLoadboardUpdateOAuthCodeReply,
            IntegrationProviderOttLoadboardUpdateOAuthCodeRequest
        >({
            queryFn: createPrivateQueryFn(
                IntegrationServiceClient,
                'integrationProviderOttLoadboardUpdateOAuthCode'
            ),
            invalidatesTags: ['integrations']
        }),
        uberUpdateOAuthToken: mutation<
            IntegrationProviderUberUpdateOAuthCodeReply,
            IntegrationProviderUberUpdateOAuthCodeRequest
        >({
            queryFn: createPrivateQueryFn(
                IntegrationServiceClient,
                'integrationProviderUberUpdateOAuthCode'
            ),
            invalidatesTags: ['integrations']
        }),
        getOAuthUrl: query<
            GetIntegrationProviderOAuthURLReply,
            GetIntegrationProviderOAuthURLRequest
        >({
            queryFn: createPrivateQueryFn(
                IntegrationServiceClient,
                'getIntegrationProviderOAuthURL'
            )
        }),
        linkVehicleIntegrationProvider: mutation<
            IntegrationProviderUpdateVehicleReply,
            IntegrationProviderUpdateVehicleRequest
        >({
            queryFn: createPrivateQueryFn(
                IntegrationServiceClient,
                'integrationProviderUpdateVehicle'
            ),
            onQueryStarted(arg, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Linking vehicle',
                    success: 'Vehicle was linked'
                });
            },
            invalidatesTags: (result, _, arg) => [
                { type: 'integration', id: arg.integrationProviderId }
            ]
        }),
        unLinkVehicleIntegrationProvider: mutation<
            IntegrationProviderUpdateVehicleReply,
            IntegrationProviderUpdateVehicleRequest
        >({
            queryFn: createPrivateQueryFn(
                IntegrationServiceClient,
                'integrationProviderUpdateVehicle'
            ),
            onQueryStarted(arg, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Unlinking vehicle',
                    success: 'Vehicle was unlinked'
                });
            },
            invalidatesTags: (result, _, arg) => [
                { type: 'integration', id: arg.integrationProviderId }
            ]
        }),
        linkDriverIntegrationProvider: mutation<
            IntegrationProviderUpdateDriverReply,
            IntegrationProviderUpdateDriverRequest
        >({
            queryFn: createPrivateQueryFn(
                IntegrationServiceClient,
                'integrationProviderUpdateDriver'
            ),
            onQueryStarted(arg, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Linking driver',
                    success: 'Driver was linked'
                });
            },
            invalidatesTags: (result, _, arg) => [
                { type: 'integration', id: arg.integrationProviderId }
            ]
        }),
        unLinkDriverIntegrationProvider: mutation<
            IntegrationProviderUpdateDriverReply,
            IntegrationProviderUpdateDriverRequest
        >({
            queryFn: createPrivateQueryFn(
                IntegrationServiceClient,
                'integrationProviderUpdateDriver'
            ),
            onQueryStarted(arg, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Unlinking driver',
                    success: 'Driver was unlinked'
                });
            },
            invalidatesTags: (result, _, arg) => [
                { type: 'integration', id: arg.integrationProviderId }
            ]
        }),
        requestIntegration: mutation<RequestIntegrationReply, RequestIntegrationRequest>({
            queryFn: createPrivateQueryFn(IntegrationServiceClient, 'requestIntegration'),
            onQueryStarted(arg, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Sending an integration request.',
                    success: 'Integration request has been sent.'
                });
            }
        }),
        apexCapitalUpdateOAuthToken: mutation<
            IntegrationProviderApexCapitalUpdateOAuthCodeReply,
            IntegrationProviderApexCapitalUpdateOAuthCodeRequest
        >({
            queryFn: createPrivateQueryFn(
                IntegrationServiceClient,
                'integrationProviderApexCapitalUpdateOAuthCode'
            ),
            invalidatesTags: ['integrations', { type: 'integration', id: PROVIDER_ID.APEX_CAPITAL }]
        })
    })
});

export default IntegrationProviderGrpcService;
