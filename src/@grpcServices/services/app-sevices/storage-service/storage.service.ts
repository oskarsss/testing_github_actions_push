import {
    StorageFileDeleteReply,
    StorageFileDeleteRequest,
    StorageFileUploadPublicReply,
    StorageFileUploadPublicRequest,
    StorageFileUploadReply,
    StorageFileUploadRequest,
    StorageFilesUploadReply,
    StorageFilesUploadRequest
} from '@proto/storage';
import { StorageServiceClient } from '@proto/storage.client';
import grpcTransport from '../../../grpcTransport';
import grpcAPI from '../../../api';
import { createPrivateQueryFn } from '../../../createQueryFn';

export const StorageClient = new StorageServiceClient(grpcTransport);

const StorageGrpcService = grpcAPI.injectEndpoints({
    endpoints: ({
        mutation,
        query
    }) => ({
        deleteFile: mutation<StorageFileDeleteReply, StorageFileDeleteRequest>({
            queryFn: createPrivateQueryFn(StorageClient, 'storageFileDelete')
        }),
        uploadFile: mutation<StorageFileUploadReply, StorageFileUploadRequest>({
            queryFn: createPrivateQueryFn(StorageClient, 'storageFileUpload')
        }),
        uploadFiles: mutation<StorageFilesUploadReply, StorageFilesUploadRequest>({
            queryFn: createPrivateQueryFn(StorageClient, 'storageFilesUpload')
        }),
        uploadPublicFile: mutation<StorageFileUploadPublicReply, StorageFileUploadPublicRequest>({
            queryFn: createPrivateQueryFn(StorageClient, 'storageFileUploadPublic')
        })
    })
});

export default StorageGrpcService;
