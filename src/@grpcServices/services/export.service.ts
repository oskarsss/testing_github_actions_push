import { ExportServiceClient } from 'proto_data/ts/v1/export.client';
import {
    GetExportConfigRequest,
    GetExportConfigReply,
    DownloadExportReply,
    DownloadExportRequest,
    ExportFactoringInvoicesReply,
    ExportFactoringInvoicesRequest,
    ExportAllInvoicesReply,
    ExportAllInvoicesRequest,
    ExportDirectInvoicesReply,
    ExportDirectInvoicesRequest
} from 'proto_data/ts/v1/export';
import grpcAPI from '@/@grpcServices/api';
import { createPrivateQueryFn } from '@/@grpcServices/createQueryFn';
import grpcDataTransport from '@/@grpcServices/grpcDataTransport';
import { handleRequest } from '@/store/api';

const ExportClient = new ExportServiceClient(grpcDataTransport);

const ExportGrpcService = grpcAPI.injectEndpoints({
    endpoints: ({
        query,
        mutation
    }) => ({
        getExportConfig: query<GetExportConfigReply, GetExportConfigRequest>({
            queryFn: createPrivateQueryFn(ExportClient, 'getExportConfig')
        }),
        downloadExport: mutation<DownloadExportReply, DownloadExportRequest>({
            queryFn: createPrivateQueryFn(ExportClient, 'downloadExport')
        }),
        exportFactoringInvoices: mutation<
            ExportFactoringInvoicesReply,
            ExportFactoringInvoicesRequest
        >({
            queryFn: createPrivateQueryFn(ExportClient, 'exportFactoringInvoices'),
            async onQueryStarted(arg, { queryFulfilled }) {
                await handleRequest({
                    queryFulfilled,
                    loading: 'Exporting',
                    success: 'Invoice was exported'
                });
            }
        }),
        exportAllInvoices: mutation<ExportAllInvoicesReply, ExportAllInvoicesRequest>({
            queryFn: createPrivateQueryFn(ExportClient, 'exportAllInvoices'),
            async onQueryStarted(arg, { queryFulfilled }) {
                await handleRequest({
                    queryFulfilled,
                    loading: 'Exporting',
                    success: 'Invoices were exported'
                });
            }
        }),
        exportDirectInvoices: mutation<ExportDirectInvoicesReply, ExportDirectInvoicesRequest>({
            queryFn: createPrivateQueryFn(ExportClient, 'exportDirectInvoices'),
            async onQueryStarted(arg, { queryFulfilled }) {
                await handleRequest({
                    queryFulfilled,
                    loading: 'Exporting',
                    success: 'Invoice was exported'
                });
            }
        })
    })
});

export default ExportGrpcService;
