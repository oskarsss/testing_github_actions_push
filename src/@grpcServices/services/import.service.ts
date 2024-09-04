import { ImportServiceClient } from 'proto_data/ts/v1/import.client';
import {
    ExtractReply,
    ExtractRequest,
    GetImportConfigReply,
    GetImportConfigRequest,
    ImportReply,
    ImportRequest
} from 'proto_data/ts/v1/import';
import grpcAPI from '@/@grpcServices/api';
import { createPrivateQueryFn } from '@/@grpcServices/createQueryFn';
import { IMPORT_PROCESSOR_ID_GRPC_ENUM } from '@/models/import/import-mappings';
import grpcDataTransport from '../grpcDataTransport';

const ImportClient = new ImportServiceClient(grpcDataTransport);

const ImportGrpcService = grpcAPI.injectEndpoints({
    endpoints: ({
        query,
        mutation
    }) => ({
        getImportConfig: query<GetImportConfigReply, GetImportConfigRequest>({
            queryFn: createPrivateQueryFn(ImportClient, 'getImportConfig')
        }),
        extract: mutation<ExtractReply, ExtractRequest>({
            queryFn: createPrivateQueryFn(ImportClient, 'extract')
        }),
        import: mutation<ImportReply, ImportRequest>({
            queryFn        : createPrivateQueryFn(ImportClient, 'import'),
            invalidatesTags: (result, _, arg) => [
                { type: IMPORT_PROCESSOR_ID_GRPC_ENUM[arg.processorId], id: 'LIST' }
            ]
        })
    })
});

export default ImportGrpcService;
