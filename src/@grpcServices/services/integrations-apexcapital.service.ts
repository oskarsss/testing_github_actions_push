import { IntegrationProviderApexCapitalClient } from '@proto/integration_provider_apexcapital.client';
import {
    IP_ApexCapital_GetEquipmentsReply,
    IP_ApexCapital_GetEquipmentsRequest,
    IP_ApexCapital_GetLineItemsReply,
    IP_ApexCapital_GetLineItemsRequest,
    IP_ApexCapital_Item_UpdateLoadInvoiceItemCategoryReply,
    IP_ApexCapital_Item_UpdateLoadInvoiceItemCategoryRequest,
    IP_ApexCapital_Equipment_UpdateEquipmentTypeReply,
    IP_ApexCapital_Equipment_UpdateEquipmentTypeRequest,
    IP_ApexCapital_Invoices_PreviewReply,
    IP_ApexCapital_Invoices_PreviewRequest
} from '@proto/integration_provider_apexcapital';
import grpcTransport from '../grpcTransport';
import grpcAPI from '../api';
import { createPrivateQueryFn } from '../createQueryFn';

export const IntegrationsApexCapitalService = new IntegrationProviderApexCapitalClient(
    grpcTransport
);

const IntegrationApexCapitalGrpcService = grpcAPI.injectEndpoints({
    endpoints: ({
        mutation,
        query
    }) => ({
        previewApexCapitalInvoice: query<
            IP_ApexCapital_Invoices_PreviewReply,
            IP_ApexCapital_Invoices_PreviewRequest
        >({
            queryFn: createPrivateQueryFn(
                IntegrationsApexCapitalService,
                'iPApexCapitalInvoicesPreview'
            ),
            providesTags: ['integration.apexcapital.preview', 'loads']
        }),
        getApexCapitalLineItems: query<
            IP_ApexCapital_GetLineItemsReply,
            IP_ApexCapital_GetLineItemsRequest
        >({
            queryFn: createPrivateQueryFn(
                IntegrationsApexCapitalService,
                'iPApexCapitalGetLineItems'
            ),
            providesTags: ['integration.apexcapital.items']
        }),
        updateApexCapitalLineItemCategory: mutation<
            IP_ApexCapital_Item_UpdateLoadInvoiceItemCategoryReply,
            IP_ApexCapital_Item_UpdateLoadInvoiceItemCategoryRequest
        >({
            queryFn: createPrivateQueryFn(
                IntegrationsApexCapitalService,
                'iPApexCapitalLineItemUpdateLoadInvoiceLineItemCategory'
            ),
            invalidatesTags: ['integration.apexcapital.items']
        }),
        getApexCapitalEquipments: query<
            IP_ApexCapital_GetEquipmentsReply,
            IP_ApexCapital_GetEquipmentsRequest
        >({
            queryFn: createPrivateQueryFn(
                IntegrationsApexCapitalService,
                'iPApexCapitalGetEquipments'
            ),
            providesTags: ['integration.apexcapital.equipments']
        }),
        updateApexCapitalEquipmentType: mutation<
            IP_ApexCapital_Equipment_UpdateEquipmentTypeReply,
            IP_ApexCapital_Equipment_UpdateEquipmentTypeRequest
        >({
            queryFn: createPrivateQueryFn(
                IntegrationsApexCapitalService,
                'iPApexCapitalEquipmentUpdateEquipmentType'
            ),
            invalidatesTags: ['integration.apexcapital.equipments']
        })
    })
});
export default IntegrationApexCapitalGrpcService;
