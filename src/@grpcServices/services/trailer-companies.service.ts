import { TrailerCompanyServiceClient } from '@proto/trailer.company.client';
import {
    TrailerCompanyCreateReply,
    TrailerCompanyCreateRequest,
    TrailerCompanyDeleteReply,
    TrailerCompanyDeleteRequest,
    TrailerCompanyGetReply,
    TrailerCompanyGetRequest,
    TrailerCompanyRetrieveReply,
    TrailerCompanyRetrieveRequest,
    TrailerCompanyUpdateReply,
    TrailerCompanyUpdateRequest
} from '@proto/trailer.company';
import { handleRequest } from '@/store/api';
import grpcTransport from '../grpcTransport';
import grpcAPI from '../api';
import { createPrivateQueryFn } from '../createQueryFn';

const Client = new TrailerCompanyServiceClient(grpcTransport);

const TrailerCompaniesGrpcService = grpcAPI.injectEndpoints({
    endpoints: ({
        mutation,
        query
    }) => ({
        getTrailerCompanies: query<TrailerCompanyGetReply, TrailerCompanyGetRequest>({
            queryFn     : createPrivateQueryFn(Client, 'trailerCompanyGet'),
            providesTags: ['trailer_companies']
        }),
        createTrailerCompany: mutation<TrailerCompanyCreateReply, TrailerCompanyCreateRequest>({
            queryFn        : createPrivateQueryFn(Client, 'trailerCompanyCreate'),
            invalidatesTags: ['trailer_companies'],
            onQueryStarted(arg, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Add Trailer Company',
                    success: 'Company was added'
                });
            }
        }),
        updateTrailerCompany: mutation<TrailerCompanyUpdateReply, TrailerCompanyUpdateRequest>({
            queryFn        : createPrivateQueryFn(Client, 'trailerCompanyUpdate'),
            invalidatesTags: ['trailer_companies'],
            onQueryStarted(arg, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Updating Company',
                    success: 'Company was updated'
                });
            }
        }),
        deleteTrailerCompany: mutation<TrailerCompanyDeleteReply, TrailerCompanyDeleteRequest>({
            queryFn        : createPrivateQueryFn(Client, 'trailerCompanyDelete'),
            invalidatesTags: ['trailer_companies'],
            onQueryStarted(arg, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Deleting Company',
                    success: 'Company was deleted'
                });
            }
        }),
        retrieveTrailerCompany: query<TrailerCompanyRetrieveReply, TrailerCompanyRetrieveRequest>({
            queryFn     : createPrivateQueryFn(Client, 'trailerCompanyRetrieve'),
            providesTags: ['trailer_companies']
        })
    })
});

export default TrailerCompaniesGrpcService;
