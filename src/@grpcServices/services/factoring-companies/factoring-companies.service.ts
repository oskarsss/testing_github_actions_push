import grpcAPI from '@/@grpcServices/api';
import { createPrivateQueryFn } from '@/@grpcServices/createQueryFn';
import grpcTransport from '@/@grpcServices/grpcTransport';
import { FactoringCompaniesServiceClient } from '@proto/factoring_companies.client';
import {
    FactoringCompaniesGetReply,
    FactoringCompaniesGetRequest,
    FactoringCompanyCreateReply,
    FactoringCompanyCreateRequest,
    FactoringCompanyDeleteReply,
    FactoringCompanyDeleteRequest,
    FactoringCompanyRestoreReply,
    FactoringCompanyRestoreRequest,
    FactoringCompanyUpdateReply,
    FactoringCompanyUpdateRequest
} from '@proto/factoring_companies';
import { handleRequest } from '@/store/api';

const Client = new FactoringCompaniesServiceClient(grpcTransport);

const FactoringCompaniesGrpcService = grpcAPI.injectEndpoints({
    endpoints: ({
        mutation,
        query
    }) => ({
        getFactoringCompanies: query<FactoringCompaniesGetReply, FactoringCompaniesGetRequest>({
            queryFn     : createPrivateQueryFn(Client, 'factoringCompanyGet'),
            providesTags: ['factoring_companies']
        }),
        createFactoringCompany: mutation<
            FactoringCompanyCreateReply,
            FactoringCompanyCreateRequest
        >({
            queryFn        : createPrivateQueryFn(Client, 'factoringCompanyCreate'),
            invalidatesTags: ['factoring_companies'],
            async onQueryStarted(arg, { queryFulfilled }) {
                await handleRequest({
                    queryFulfilled,
                    loading: 'Adding Factoring Company',
                    success: 'Factoring Company was added'
                });
            }
        }),
        updateFactoringCompany: mutation<
            FactoringCompanyUpdateReply,
            FactoringCompanyUpdateRequest
        >({
            queryFn        : createPrivateQueryFn(Client, 'factoringCompanyUpdate'),
            invalidatesTags: ['factoring_companies'],
            async onQueryStarted(arg, { queryFulfilled }) {
                await handleRequest({
                    queryFulfilled,
                    loading: 'Updating Factoring Company',
                    success: 'Factoring Company was updated'
                });
            }
        }),
        deleteFactoringCompany: mutation<
            FactoringCompanyDeleteReply,
            FactoringCompanyDeleteRequest
        >({
            queryFn        : createPrivateQueryFn(Client, 'factoringCompanyDelete'),
            invalidatesTags: ['factoring_companies'],
            async onQueryStarted(arg, { queryFulfilled }) {
                await handleRequest({
                    queryFulfilled,
                    loading: 'Deleting Factoring Company',
                    success: 'Factoring Company was deleted'
                });
            }
        }),
        restoreFactoringCompany: mutation<
            FactoringCompanyRestoreReply,
            FactoringCompanyRestoreRequest
        >({
            queryFn        : createPrivateQueryFn(Client, 'factoringCompanyRestore'),
            invalidatesTags: ['factoring_companies'],
            async onQueryStarted(arg, { queryFulfilled }) {
                await handleRequest({
                    queryFulfilled,
                    loading: 'Restoring Factoring Company',
                    success: 'Factoring Company was restored'
                });
            }
        })
    })
});

export default FactoringCompaniesGrpcService;
