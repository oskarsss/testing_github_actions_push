import grpcAPI from '@/@grpcServices/api';
import { DocumentTypesServiceClient } from '@proto/document_types.client';
import {
    DocumentTypeCreateReply,
    DocumentTypeCreateRequest,
    DocumentTypeDeleteReply,
    DocumentTypeDeleteRequest,
    DocumentTypeGetReply,
    DocumentTypeGetRequest,
    DocumentTypeSequenceUpdateReply,
    DocumentTypeSequenceUpdateRequest,
    DocumentTypeUpdateReply,
    DocumentTypeUpdateRequest
} from '@proto/document_types';
import grpcTransport from '@/@grpcServices/grpcTransport';
import { createPrivateQueryFn } from '@/@grpcServices/createQueryFn';
import { handleRequest } from '@/store/api';

const Client = new DocumentTypesServiceClient(grpcTransport);

const DocumentTypesGrpcServices = grpcAPI.injectEndpoints({
    endpoints: ({
        mutation,
        query
    }) => ({
        getDocumentTypes: query<DocumentTypeGetReply, DocumentTypeGetRequest>({
            queryFn     : createPrivateQueryFn(Client, 'documentTypeGet'),
            providesTags: ['document_types']
        }),

        createDocumentType: mutation<DocumentTypeCreateReply, DocumentTypeCreateRequest>({
            queryFn        : createPrivateQueryFn(Client, 'documentTypeCreate'),
            invalidatesTags: ['document_types'],
            async onQueryStarted(arg, { queryFulfilled }) {
                await handleRequest({
                    queryFulfilled,
                    loading: 'Document type creating',
                    success: 'Document type was created'
                });
            }
        }),
        updateDocumentType: mutation<DocumentTypeUpdateReply, DocumentTypeUpdateRequest>({
            queryFn        : createPrivateQueryFn(Client, 'documentTypeUpdate'),
            invalidatesTags: ['document_types'],
            async onQueryStarted(arg, { queryFulfilled }) {
                await handleRequest({
                    queryFulfilled,
                    loading: 'Document type updating',
                    success: 'Document type was updated'
                });
            }
        }),
        deleteDocumentType: mutation<DocumentTypeDeleteReply, DocumentTypeDeleteRequest>({
            queryFn        : createPrivateQueryFn(Client, 'documentTypeDelete'),
            invalidatesTags: ['document_types'],
            async onQueryStarted(arg, { queryFulfilled }) {
                await handleRequest({
                    queryFulfilled,
                    loading: 'Document type deleting',
                    success: 'Document type was deleted'
                });
            }
        }),
        updateDocumentTypeSequence: mutation<
            DocumentTypeSequenceUpdateReply,
            DocumentTypeSequenceUpdateRequest
        >({
            queryFn        : createPrivateQueryFn(Client, 'documentTypeSequenceUpdate'),
            invalidatesTags: ['document_types'],
            async onQueryStarted(arg, { queryFulfilled }) {
                await handleRequest({
                    queryFulfilled,
                    loading: 'Document type sequence updating',
                    success: 'Document type sequence was updated'
                });
            }
        })
    })
});

export default DocumentTypesGrpcServices;
