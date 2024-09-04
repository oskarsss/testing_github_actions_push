// @generated by protobuf-ts 2.9.4 with parameter long_type_number,generate_dependencies,ts_nocheck,output_typescript
// @generated from protobuf file "v1/export.proto" (syntax proto3)
// tslint:disable
// @ts-nocheck
import type { RpcTransport } from '@protobuf-ts/runtime-rpc';
import type { ServiceInfo } from '@protobuf-ts/runtime-rpc';
import { ExportService } from './export';
import type { ExportDirectInvoicesReply } from './export';
import type { ExportDirectInvoicesRequest } from './export';
import type { ExportFactoringInvoicesReply } from './export';
import type { ExportFactoringInvoicesRequest } from './export';
import type { ExportAllInvoicesReply } from './export';
import type { ExportAllInvoicesRequest } from './export';
import type { DownloadExportReply } from './export';
import type { DownloadExportRequest } from './export';
import { stackIntercept } from '@protobuf-ts/runtime-rpc';
import type { GetExportConfigReply } from './export';
import type { GetExportConfigRequest } from './export';
import type { UnaryCall } from '@protobuf-ts/runtime-rpc';
import type { RpcOptions } from '@protobuf-ts/runtime-rpc';
/**
 * @generated from protobuf service ExportService
 */
export interface IExportServiceClient {
    /**
     * @generated from protobuf rpc: GetExportConfig(GetExportConfigRequest) returns (GetExportConfigReply);
     */
    getExportConfig(
        input: GetExportConfigRequest,
        options?: RpcOptions
    ): UnaryCall<GetExportConfigRequest, GetExportConfigReply>;
    /**
     * @generated from protobuf rpc: DownloadExport(DownloadExportRequest) returns (DownloadExportReply);
     */
    downloadExport(
        input: DownloadExportRequest,
        options?: RpcOptions
    ): UnaryCall<DownloadExportRequest, DownloadExportReply>;
    /**
     * Temporary RPC Calls
     *
     * @generated from protobuf rpc: ExportAllInvoices(ExportAllInvoicesRequest) returns (ExportAllInvoicesReply);
     */
    exportAllInvoices(
        input: ExportAllInvoicesRequest,
        options?: RpcOptions
    ): UnaryCall<ExportAllInvoicesRequest, ExportAllInvoicesReply>;
    /**
     * @generated from protobuf rpc: ExportFactoringInvoices(ExportFactoringInvoicesRequest) returns (ExportFactoringInvoicesReply);
     */
    exportFactoringInvoices(
        input: ExportFactoringInvoicesRequest,
        options?: RpcOptions
    ): UnaryCall<ExportFactoringInvoicesRequest, ExportFactoringInvoicesReply>;
    /**
     * @generated from protobuf rpc: ExportDirectInvoices(ExportDirectInvoicesRequest) returns (ExportDirectInvoicesReply);
     */
    exportDirectInvoices(
        input: ExportDirectInvoicesRequest,
        options?: RpcOptions
    ): UnaryCall<ExportDirectInvoicesRequest, ExportDirectInvoicesReply>;
}
/**
 * @generated from protobuf service ExportService
 */
export class ExportServiceClient implements IExportServiceClient, ServiceInfo {
    typeName = ExportService.typeName;
    methods = ExportService.methods;
    options = ExportService.options;
    constructor(private readonly _transport: RpcTransport) {}
    /**
     * @generated from protobuf rpc: GetExportConfig(GetExportConfigRequest) returns (GetExportConfigReply);
     */
    getExportConfig(
        input: GetExportConfigRequest,
        options?: RpcOptions
    ): UnaryCall<GetExportConfigRequest, GetExportConfigReply> {
        const method = this.methods[0],
            opt = this._transport.mergeOptions(options);
        return stackIntercept<GetExportConfigRequest, GetExportConfigReply>(
            'unary',
            this._transport,
            method,
            opt,
            input
        );
    }
    /**
     * @generated from protobuf rpc: DownloadExport(DownloadExportRequest) returns (DownloadExportReply);
     */
    downloadExport(
        input: DownloadExportRequest,
        options?: RpcOptions
    ): UnaryCall<DownloadExportRequest, DownloadExportReply> {
        const method = this.methods[1],
            opt = this._transport.mergeOptions(options);
        return stackIntercept<DownloadExportRequest, DownloadExportReply>(
            'unary',
            this._transport,
            method,
            opt,
            input
        );
    }
    /**
     * Temporary RPC Calls
     *
     * @generated from protobuf rpc: ExportAllInvoices(ExportAllInvoicesRequest) returns (ExportAllInvoicesReply);
     */
    exportAllInvoices(
        input: ExportAllInvoicesRequest,
        options?: RpcOptions
    ): UnaryCall<ExportAllInvoicesRequest, ExportAllInvoicesReply> {
        const method = this.methods[2],
            opt = this._transport.mergeOptions(options);
        return stackIntercept<ExportAllInvoicesRequest, ExportAllInvoicesReply>(
            'unary',
            this._transport,
            method,
            opt,
            input
        );
    }
    /**
     * @generated from protobuf rpc: ExportFactoringInvoices(ExportFactoringInvoicesRequest) returns (ExportFactoringInvoicesReply);
     */
    exportFactoringInvoices(
        input: ExportFactoringInvoicesRequest,
        options?: RpcOptions
    ): UnaryCall<ExportFactoringInvoicesRequest, ExportFactoringInvoicesReply> {
        const method = this.methods[3],
            opt = this._transport.mergeOptions(options);
        return stackIntercept<ExportFactoringInvoicesRequest, ExportFactoringInvoicesReply>(
            'unary',
            this._transport,
            method,
            opt,
            input
        );
    }
    /**
     * @generated from protobuf rpc: ExportDirectInvoices(ExportDirectInvoicesRequest) returns (ExportDirectInvoicesReply);
     */
    exportDirectInvoices(
        input: ExportDirectInvoicesRequest,
        options?: RpcOptions
    ): UnaryCall<ExportDirectInvoicesRequest, ExportDirectInvoicesReply> {
        const method = this.methods[4],
            opt = this._transport.mergeOptions(options);
        return stackIntercept<ExportDirectInvoicesRequest, ExportDirectInvoicesReply>(
            'unary',
            this._transport,
            method,
            opt,
            input
        );
    }
}
