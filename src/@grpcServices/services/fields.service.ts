import * as Proto from '@proto/field';
import { FieldServiceClient } from '@proto/field.client';
import { handleRequest } from '@/store/api';
import { PageModel_Page } from '@proto/models/model_page';
import { retrievePage } from '@/@grpcServices/services/pages.service';
import grpcTransport from '../grpcTransport';
import grpcAPI from '../api';
import { createPrivateQueryFn } from '../createQueryFn';

const Client = new FieldServiceClient(grpcTransport);

const FieldsGrpcService = grpcAPI.injectEndpoints({
    endpoints: ({
        mutation,
        query
    }) => ({
        getTableEditorFields: query<Proto.FieldGetReply, Proto.FieldGetRequest>({
            queryFn     : createPrivateQueryFn(Client, 'fieldGet'),
            providesTags: (res, err, arg) => [{ type: 'fields', id: arg.page }]
        }),
        createTableEditorField: mutation<
            Proto.FieldCreateReply,
            Proto.FieldCreateRequest & { page: PageModel_Page }
        >({
            queryFn        : createPrivateQueryFn(Client, 'fieldCreate'),
            invalidatesTags: (res, err, arg) => [{ type: 'fields', id: arg.page }],
            async onQueryStarted(arg, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Creating Field',
                    success: 'Field was created'
                });
            }
        }),
        updateTableEditorField: mutation<
            Proto.FieldUpdateReply,
            Proto.FieldUpdateRequest & { page: PageModel_Page }
        >({
            queryFn        : createPrivateQueryFn(Client, 'fieldUpdate'),
            invalidatesTags: (res, err, arg) => [{ type: 'fields', id: arg.page }],
            async onQueryStarted(arg, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Updating Field',
                    success: 'Field was updated'
                });
            }
        }),
        setFieldValue: mutation<
            Proto.FieldValueSetReply,
            Proto.FieldValueSetRequest & { page: PageModel_Page }
        >({
            queryFn        : createPrivateQueryFn(Client, 'fieldValueSet'),
            invalidatesTags: (res, err, arg) => [{ type: 'fields', id: arg.page }],
            async onQueryStarted(arg, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Setting Field Value',
                    success: 'Field Value was set'
                });
            }
        }),
        deleteTableEditorField: mutation<
            Proto.FieldDeleteReply,
            Proto.FieldDeleteRequest & { page: PageModel_Page }
        >({
            queryFn        : createPrivateQueryFn(Client, 'fieldDelete'),
            invalidatesTags: (res, err, arg) => [{ type: 'fields', id: arg.page }],
            async onQueryStarted(arg, {
                queryFulfilled,
                dispatch
            }) {
                handleRequest({
                    queryFulfilled,
                    loading  : 'Deleting Field',
                    success  : 'Field was deleted',
                    onSuccess: () => retrievePage(dispatch, arg.page)
                });
            }
        })
    })
});

export default FieldsGrpcService;
