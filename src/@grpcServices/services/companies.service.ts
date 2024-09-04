import { CompaniesServiceClient } from '@proto/companies.client';
import {
    CompanyCreateReply,
    CompanyCreateRequest,
    ConfigKeyGetReply,
    ConfigKeyGetRequest,
    ConfigValueUpdateReply,
    ConfigValueUpdateRequest
} from '@proto/companies';
import { handleRequest } from '@/store/api';
import grpcTransport from '../grpcTransport';
import grpcAPI from '../api';
import { createPrivateQueryFn } from '../createQueryFn';

const Client = new CompaniesServiceClient(grpcTransport);

const CompaniesGrpcService = grpcAPI.injectEndpoints({
    endpoints: ({
        query,
        mutation
    }) => ({
        getCompaniesConfig: query<ConfigKeyGetReply, ConfigKeyGetRequest>({
            queryFn     : createPrivateQueryFn(Client, 'configKeyGet'),
            providesTags: ['companies_config_key']
        }),
        updateCompaniesConfig: mutation<ConfigValueUpdateReply, ConfigValueUpdateRequest>({
            queryFn        : createPrivateQueryFn(Client, 'configValueUpdate'),
            invalidatesTags: ['companies_config_key'],
            onQueryStarted(arg, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Updating companies config',
                    success: 'Companies config was updated'
                });
            }
        }),
        createCompany: mutation<CompanyCreateReply, CompanyCreateRequest>({
            queryFn        : createPrivateQueryFn(Client, 'companyCreate'),
            invalidatesTags: ['account'],
            onQueryStarted(arg, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Creating company',
                    success: 'Company was created'
                });
            }
        })
    })
});

export default CompaniesGrpcService;
