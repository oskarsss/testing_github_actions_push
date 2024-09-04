// @generated by protobuf-ts 2.9.4 with parameter long_type_number,generate_dependencies,ts_nocheck,output_typescript
// @generated from protobuf file "v1/import.proto" (syntax proto3)
// tslint:disable
// @ts-nocheck
import type { RpcTransport } from '@protobuf-ts/runtime-rpc';
import type { ServiceInfo } from '@protobuf-ts/runtime-rpc';
import { ImportService } from './import';
import type { GetSampleFileReply } from './import';
import type { GetSampleFileRequest } from './import';
import type { ImportReply } from './import';
import type { ImportRequest } from './import';
import type { ExtractReply } from './import';
import type { ExtractRequest } from './import';
import { stackIntercept } from '@protobuf-ts/runtime-rpc';
import type { GetImportConfigReply } from './import';
import type { GetImportConfigRequest } from './import';
import type { UnaryCall } from '@protobuf-ts/runtime-rpc';
import type { RpcOptions } from '@protobuf-ts/runtime-rpc';
/**
 * @generated from protobuf service ImportService
 */
export interface IImportServiceClient {
    /**
     * @generated from protobuf rpc: GetImportConfig(GetImportConfigRequest) returns (GetImportConfigReply);
     */
    getImportConfig(
        input: GetImportConfigRequest,
        options?: RpcOptions
    ): UnaryCall<GetImportConfigRequest, GetImportConfigReply>;
    /**
     * @generated from protobuf rpc: Extract(ExtractRequest) returns (ExtractReply);
     */
    extract(input: ExtractRequest, options?: RpcOptions): UnaryCall<ExtractRequest, ExtractReply>;
    /**
     * @generated from protobuf rpc: Import(ImportRequest) returns (ImportReply);
     */
    import(input: ImportRequest, options?: RpcOptions): UnaryCall<ImportRequest, ImportReply>;
    /**
     * @generated from protobuf rpc: GetSampleFile(GetSampleFileRequest) returns (GetSampleFileReply);
     */
    getSampleFile(
        input: GetSampleFileRequest,
        options?: RpcOptions
    ): UnaryCall<GetSampleFileRequest, GetSampleFileReply>;
}
/**
 * @generated from protobuf service ImportService
 */
export class ImportServiceClient implements IImportServiceClient, ServiceInfo {
    typeName = ImportService.typeName;
    methods = ImportService.methods;
    options = ImportService.options;
    constructor(private readonly _transport: RpcTransport) {}
    /**
     * @generated from protobuf rpc: GetImportConfig(GetImportConfigRequest) returns (GetImportConfigReply);
     */
    getImportConfig(
        input: GetImportConfigRequest,
        options?: RpcOptions
    ): UnaryCall<GetImportConfigRequest, GetImportConfigReply> {
        const method = this.methods[0],
            opt = this._transport.mergeOptions(options);
        return stackIntercept<GetImportConfigRequest, GetImportConfigReply>(
            'unary',
            this._transport,
            method,
            opt,
            input
        );
    }
    /**
     * @generated from protobuf rpc: Extract(ExtractRequest) returns (ExtractReply);
     */
    extract(input: ExtractRequest, options?: RpcOptions): UnaryCall<ExtractRequest, ExtractReply> {
        const method = this.methods[1],
            opt = this._transport.mergeOptions(options);
        return stackIntercept<ExtractRequest, ExtractReply>(
            'unary',
            this._transport,
            method,
            opt,
            input
        );
    }
    /**
     * @generated from protobuf rpc: Import(ImportRequest) returns (ImportReply);
     */
    import(input: ImportRequest, options?: RpcOptions): UnaryCall<ImportRequest, ImportReply> {
        const method = this.methods[2],
            opt = this._transport.mergeOptions(options);
        return stackIntercept<ImportRequest, ImportReply>(
            'unary',
            this._transport,
            method,
            opt,
            input
        );
    }
    /**
     * @generated from protobuf rpc: GetSampleFile(GetSampleFileRequest) returns (GetSampleFileReply);
     */
    getSampleFile(
        input: GetSampleFileRequest,
        options?: RpcOptions
    ): UnaryCall<GetSampleFileRequest, GetSampleFileReply> {
        const method = this.methods[3],
            opt = this._transport.mergeOptions(options);
        return stackIntercept<GetSampleFileRequest, GetSampleFileReply>(
            'unary',
            this._transport,
            method,
            opt,
            input
        );
    }
}
