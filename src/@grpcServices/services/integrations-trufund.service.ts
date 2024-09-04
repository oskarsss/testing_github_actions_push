import { IntegrationProviderTruFundClient } from '@proto/integration_provider_trufund.client';
import {
    IP_TruFund_Invoices_PreviewRequest,
    IP_TruFund_Invoices_PreviewReply
} from '@proto/integration_provider_trufund';
import grpcTransport from '../grpcTransport';
import grpcAPI from '../api';
import { createPrivateQueryFn } from '../createQueryFn';

export const IntegrationsTruFundService = new IntegrationProviderTruFundClient(grpcTransport);

const IntegrationTruFundGrpcService = grpcAPI.injectEndpoints({
    endpoints: ({ query }) => ({
        previewTruFundInvoice: query<
            IP_TruFund_Invoices_PreviewReply,
            IP_TruFund_Invoices_PreviewRequest
        >({
            queryFn     : createPrivateQueryFn(IntegrationsTruFundService, 'iPTruFundInvoicesPreview'),
            providesTags: ['integration.trufund.preview', 'loads']
        })
    })
});
export default IntegrationTruFundGrpcService;
