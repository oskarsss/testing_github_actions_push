import { SettingsBillingServiceClient } from '@proto/settings_billing.client';
import {
    GetSubscriptionReply,
    GetSubscriptionRequest,
    GetPaymentMethodReply,
    GetPaymentMethodRequest,
    GetInvoicesReply,
    GetInvoicesRequest,
    CancelAccountReply,
    CancelAccountRequest,
    CheckoutReply,
    CheckoutRequest,
    CreateSessionRequest,
    CreateSessionReply
} from '@proto/settings_billing';
import grpcTransport from '../grpcTransport';
import grpcAPI from '../api';
import { createPrivateQueryFn } from '../createQueryFn';

const SettingsBillingService = new SettingsBillingServiceClient(grpcTransport);

// const builder = GrpcService.createEndpointBuilder(SettingsBillingServiceClient, GrpcAPI);

// const keyGenerator = GrpcService.createApiKeyGenerator('settingsBillingService');

const SettingsBillingGrpcService = grpcAPI.injectEndpoints({
    endpoints: ({ query }) => ({
        getSettingsBillingSubscription: query<GetSubscriptionReply, GetSubscriptionRequest>({
            queryFn: createPrivateQueryFn(SettingsBillingService, 'getSubscription')
        }),
        getSettingsBillingPaymentMethod: query<GetPaymentMethodReply, GetPaymentMethodRequest>({
            queryFn: createPrivateQueryFn(SettingsBillingService, 'getPaymentMethod')
        }),
        getSettingsBillingInvoices: query<GetInvoicesReply, GetInvoicesRequest>({
            queryFn: createPrivateQueryFn(SettingsBillingService, 'getInvoices')
        }),
        settingsBillingCreateSession: query<CreateSessionReply, CreateSessionRequest>({
            queryFn: createPrivateQueryFn(SettingsBillingService, 'createSession')
        }),
        settingsBillingCheckout: query<CheckoutReply, CheckoutRequest>({
            queryFn: createPrivateQueryFn(SettingsBillingService, 'checkout')
        }),
        settingsBillingCancelAccount: query<CancelAccountReply, CancelAccountRequest>({
            queryFn: createPrivateQueryFn(SettingsBillingService, 'cancelAccount')
        })
    })
});

export default SettingsBillingGrpcService;
