import { PlateCompanyServiceClient } from '@proto/plate.company.client';
import {
    PlateCompanyCreateReply,
    PlateCompanyCreateRequest,
    PlateCompanyDeleteReply,
    PlateCompanyDeleteRequest,
    PlateCompanyGetReply,
    PlateCompanyGetRequest,
    PlateCompanyRestoreReply,
    PlateCompanyRestoreRequest,
    PlateCompanyRetrieveReply,
    PlateCompanyRetrieveRequest,
    PlateCompanyUpdateReply,
    PlateCompanyUpdateRequest
} from '@proto/plate.company';
import { handleRequest } from '@/store/api';
import grpcTransport from '../grpcTransport';
import grpcAPI from '../api';
import { createPrivateQueryFn } from '../createQueryFn';

const Client = new PlateCompanyServiceClient(grpcTransport);

const PlateCompaniesGrpcService = grpcAPI.injectEndpoints({
    endpoints: ({
        mutation,
        query
    }) => ({
        getPlateCompanies: query<PlateCompanyGetReply, PlateCompanyGetRequest>({
            queryFn     : createPrivateQueryFn(Client, 'plateCompanyGet'),
            providesTags: ['plate_companies']
        }),
        createPlateCompany: mutation<PlateCompanyCreateReply, PlateCompanyCreateRequest>({
            queryFn        : createPrivateQueryFn(Client, 'plateCompanyCreate'),
            invalidatesTags: ['plate_companies'],
            onQueryStarted(arg, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Adding Plate Company',
                    success: 'Plate Company was added'
                });
            }
        }),
        updatePlateCompany: mutation<PlateCompanyUpdateReply, PlateCompanyUpdateRequest>({
            queryFn        : createPrivateQueryFn(Client, 'plateCompanyUpdate'),
            invalidatesTags: ['plate_companies'],
            onQueryStarted(arg, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Updating Company',
                    success: 'Company was updated'
                });
            }
        }),
        deletePlateCompany: mutation<PlateCompanyDeleteReply, PlateCompanyDeleteRequest>({
            queryFn        : createPrivateQueryFn(Client, 'plateCompanyDelete'),
            invalidatesTags: ['plate_companies'],
            onQueryStarted(arg, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Deleting Company',
                    success: 'Company was deleted'
                });
            }
        }),
        restorePlateCompany: mutation<PlateCompanyRestoreReply, PlateCompanyRestoreRequest>({
            queryFn        : createPrivateQueryFn(Client, 'plateCompanyRestore'),
            invalidatesTags: ['plate_companies'],
            onQueryStarted(arg, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Restoring Company',
                    success: 'Company was restored'
                });
            }
        }),
        retrievePlateCompany: query<PlateCompanyRetrieveReply, PlateCompanyRetrieveRequest>({
            queryFn     : createPrivateQueryFn(Client, 'plateCompanyRetrieve'),
            providesTags: ['plate_companies']
        })
    })
});

export default PlateCompaniesGrpcService;
