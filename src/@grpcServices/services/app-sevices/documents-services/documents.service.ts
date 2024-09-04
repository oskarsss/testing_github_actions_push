/* eslint-disable max-len */

import { DocumentsServiceClient } from '@proto/documents.client';
import {
    DocumentCreateReply,
    DocumentCreateRequest,
    DocumentDeleteReply,
    DocumentDeleteRequest,
    DocumentImageRotateReply,
    DocumentImageRotateRequest,
    DocumentDownloadReply,
    DocumentDownloadRequest,
    DocumentGetReply,
    DocumentGetRequest,
    DocumentUpdateReply,
    DocumentUpdateRequest,
    DocumentFileUpdateRequest,
    DocumentFileUpdateReply,
    DocumentVersionDeleteReply,
    DocumentVersionDeleteRequest,
    DocumentGetVersionsReply,
    DocumentGetVersionsRequest,
    DocumentFileClearReply,
    DocumentFileClearRequest
} from '@proto/documents';
import { handleRequest } from '@/store/api';
import InvalidateDocuments from '@/@grpcServices/services/app-sevices/documents-services/service-utils/utils';

import { getEntitiesDocumentsThunk } from '@/store/documents/slice';
import grpcTransport from '../../../grpcTransport';
import { createPrivateQueryFn } from '../../../createQueryFn';
import grpcAPI from '../../../api';

export const DocumentsGrpcClient = new DocumentsServiceClient(grpcTransport);

const DocumentsGrpcService = grpcAPI.injectEndpoints({
    endpoints: ({
        query,
        mutation
    }) => ({
        getDocumentVersions: query<DocumentGetVersionsReply, DocumentGetVersionsRequest>({
            queryFn     : createPrivateQueryFn(DocumentsGrpcClient, 'documentGetVersions'),
            providesTags: ['document_versions']
        }),
        documentClearFile: mutation<DocumentFileClearReply, DocumentFileClearRequest>({
            queryFn        : createPrivateQueryFn(DocumentsGrpcClient, 'documentFileClear'),
            invalidatesTags: InvalidateDocuments(['document_versions']),
            async onQueryStarted(arg, {
                queryFulfilled,
                dispatch
            }) {
                dispatch(
                    getEntitiesDocumentsThunk({
                        entities: [
                            {
                                entityIds : [arg.entityId],
                                entityType: arg.entityType
                            }
                        ]
                    })
                );
                await handleRequest({
                    queryFulfilled,
                    loading: 'Clearing a document',
                    success: 'Document was cleared'
                });
            }
        }),
        deleteDocumentVersion: mutation<DocumentVersionDeleteReply, DocumentVersionDeleteRequest>({
            queryFn        : createPrivateQueryFn(DocumentsGrpcClient, 'documentVersionDelete'),
            invalidatesTags: InvalidateDocuments(),
            async onQueryStarted(arg, {
                queryFulfilled,
                dispatch
            }) {
                dispatch(
                    getEntitiesDocumentsThunk({
                        entities: [
                            {
                                entityIds : [arg.entityId],
                                entityType: arg.entityType
                            }
                        ]
                    })
                );
                await handleRequest({
                    queryFulfilled,
                    loading: 'Deleting a document version',
                    success: 'Document version was deleted'
                });
            }
        }),
        addDocument: mutation<DocumentCreateReply, DocumentCreateRequest>({
            queryFn        : createPrivateQueryFn(DocumentsGrpcClient, 'documentCreate'),
            invalidatesTags: InvalidateDocuments(),
            async onQueryStarted(arg, {
                queryFulfilled,
                dispatch
            }) {
                dispatch(
                    getEntitiesDocumentsThunk({
                        entities: [
                            {
                                entityIds : [arg.entityId],
                                entityType: arg.entityType
                            }
                        ]
                    })
                );
                await handleRequest({
                    queryFulfilled,
                    loading: 'Adding a document',
                    success: 'Document was added'
                });
            }
        }),
        documentFileUpdate: mutation<DocumentFileUpdateReply, DocumentFileUpdateRequest>({
            queryFn        : createPrivateQueryFn(DocumentsGrpcClient, 'documentFileUpdate'),
            invalidatesTags: InvalidateDocuments(['document_versions']),
            async onQueryStarted(arg, {
                queryFulfilled,
                dispatch
            }) {
                dispatch(
                    getEntitiesDocumentsThunk({
                        entities: [
                            {
                                entityIds : [arg.entityId],
                                entityType: arg.entityType
                            }
                        ]
                    })
                );
                await handleRequest({
                    queryFulfilled,
                    loading: 'Updating a document',
                    success: 'Document was updated'
                });
            }
        }),
        downloadDocuments: mutation<DocumentDownloadReply, DocumentDownloadRequest>({
            queryFn: createPrivateQueryFn(DocumentsGrpcClient, 'documentDownload'),
            async onQueryStarted(arg, { queryFulfilled }) {
                await handleRequest({
                    queryFulfilled,
                    loading: 'Documents downloading',
                    success: 'Documents were downloaded'
                });
            }
        }),
        getDocumentsByEntity: query<DocumentGetReply, DocumentGetRequest>({
            queryFn     : createPrivateQueryFn(DocumentsGrpcClient, 'documentGet'),
            providesTags: InvalidateDocuments()
        }),
        rotatePhoto: mutation<DocumentImageRotateReply, DocumentImageRotateRequest>({
            queryFn        : createPrivateQueryFn(DocumentsGrpcClient, 'documentImageRotate'),
            invalidatesTags: InvalidateDocuments(['document_versions']),
            async onQueryStarted(arg, { queryFulfilled }) {
                await handleRequest({
                    queryFulfilled,
                    loading: 'Photo rotating',
                    success: 'Photo was rotated'
                });
            }
        }),
        updateDocument: mutation<DocumentUpdateReply, DocumentUpdateRequest>({
            queryFn        : createPrivateQueryFn(DocumentsGrpcClient, 'documentUpdate'),
            invalidatesTags: InvalidateDocuments(),
            onQueryStarted(arg, { dispatch }) {
                dispatch(
                    getEntitiesDocumentsThunk({
                        entities: [
                            {
                                entityIds : [arg.entityId],
                                entityType: arg.entityType
                            }
                        ]
                    })
                );
            }
        }),
        deleteDocument: mutation<DocumentDeleteReply, DocumentDeleteRequest>({
            queryFn        : createPrivateQueryFn(DocumentsGrpcClient, 'documentDelete'),
            invalidatesTags: InvalidateDocuments(),
            async onQueryStarted(arg, {
                queryFulfilled,
                dispatch
            }) {
                dispatch(
                    getEntitiesDocumentsThunk({
                        entities: [
                            {
                                entityIds : [arg.entityId],
                                entityType: arg.entityType
                            }
                        ]
                    })
                );
                await handleRequest({
                    queryFulfilled,
                    loading: 'Deleting a document',
                    success: 'Document was deleted'
                });
            }
        })
    })
});

export default DocumentsGrpcService;
