// @generated by protobuf-ts 2.9.4 with parameter long_type_number,generate_dependencies,ts_nocheck,output_typescript
// @generated from protobuf file "v1/storage.proto" (syntax proto3)
// tslint:disable
// @ts-nocheck
import type { RpcTransport } from "@protobuf-ts/runtime-rpc";
import type { ServiceInfo } from "@protobuf-ts/runtime-rpc";
import { StorageService } from "./storage";
import type { StorageFileUploadPublicReply } from "./storage";
import type { StorageFileUploadPublicRequest } from "./storage";
import type { StorageFilesUploadReply } from "./storage";
import type { StorageFilesUploadRequest } from "./storage";
import type { StorageFileUploadReply } from "./storage";
import type { StorageFileUploadRequest } from "./storage";
import type { StorageFileRetrieveReply } from "./storage";
import type { StorageFileRetrieveRequest } from "./storage";
import type { ServerStreamingCall } from "@protobuf-ts/runtime-rpc";
import { stackIntercept } from "@protobuf-ts/runtime-rpc";
import type { StorageFileDeleteReply } from "./storage";
import type { StorageFileDeleteRequest } from "./storage";
import type { UnaryCall } from "@protobuf-ts/runtime-rpc";
import type { RpcOptions } from "@protobuf-ts/runtime-rpc";
/**
 * @generated from protobuf service StorageService
 */
export interface IStorageServiceClient {
    /**
     * @generated from protobuf rpc: StorageFileDelete(StorageFileDeleteRequest) returns (StorageFileDeleteReply);
     */
    storageFileDelete(input: StorageFileDeleteRequest, options?: RpcOptions): UnaryCall<StorageFileDeleteRequest, StorageFileDeleteReply>;
    /**
     * @generated from protobuf rpc: StorageFileRetrieve(StorageFileRetrieveRequest) returns (stream StorageFileRetrieveReply);
     */
    storageFileRetrieve(input: StorageFileRetrieveRequest, options?: RpcOptions): ServerStreamingCall<StorageFileRetrieveRequest, StorageFileRetrieveReply>;
    /**
     * @generated from protobuf rpc: StorageFileUpload(StorageFileUploadRequest) returns (StorageFileUploadReply);
     */
    storageFileUpload(input: StorageFileUploadRequest, options?: RpcOptions): UnaryCall<StorageFileUploadRequest, StorageFileUploadReply>;
    /**
     * @generated from protobuf rpc: StorageFilesUpload(StorageFilesUploadRequest) returns (StorageFilesUploadReply);
     */
    storageFilesUpload(input: StorageFilesUploadRequest, options?: RpcOptions): UnaryCall<StorageFilesUploadRequest, StorageFilesUploadReply>;
    /**
     * @generated from protobuf rpc: StorageFileUploadPublic(StorageFileUploadPublicRequest) returns (StorageFileUploadPublicReply);
     */
    storageFileUploadPublic(input: StorageFileUploadPublicRequest, options?: RpcOptions): UnaryCall<StorageFileUploadPublicRequest, StorageFileUploadPublicReply>;
}
/**
 * @generated from protobuf service StorageService
 */
export class StorageServiceClient implements IStorageServiceClient, ServiceInfo {
    typeName = StorageService.typeName;
    methods = StorageService.methods;
    options = StorageService.options;
    constructor(private readonly _transport: RpcTransport) {
    }
    /**
     * @generated from protobuf rpc: StorageFileDelete(StorageFileDeleteRequest) returns (StorageFileDeleteReply);
     */
    storageFileDelete(input: StorageFileDeleteRequest, options?: RpcOptions): UnaryCall<StorageFileDeleteRequest, StorageFileDeleteReply> {
        const method = this.methods[0], opt = this._transport.mergeOptions(options);
        return stackIntercept<StorageFileDeleteRequest, StorageFileDeleteReply>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: StorageFileRetrieve(StorageFileRetrieveRequest) returns (stream StorageFileRetrieveReply);
     */
    storageFileRetrieve(input: StorageFileRetrieveRequest, options?: RpcOptions): ServerStreamingCall<StorageFileRetrieveRequest, StorageFileRetrieveReply> {
        const method = this.methods[1], opt = this._transport.mergeOptions(options);
        return stackIntercept<StorageFileRetrieveRequest, StorageFileRetrieveReply>("serverStreaming", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: StorageFileUpload(StorageFileUploadRequest) returns (StorageFileUploadReply);
     */
    storageFileUpload(input: StorageFileUploadRequest, options?: RpcOptions): UnaryCall<StorageFileUploadRequest, StorageFileUploadReply> {
        const method = this.methods[2], opt = this._transport.mergeOptions(options);
        return stackIntercept<StorageFileUploadRequest, StorageFileUploadReply>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: StorageFilesUpload(StorageFilesUploadRequest) returns (StorageFilesUploadReply);
     */
    storageFilesUpload(input: StorageFilesUploadRequest, options?: RpcOptions): UnaryCall<StorageFilesUploadRequest, StorageFilesUploadReply> {
        const method = this.methods[3], opt = this._transport.mergeOptions(options);
        return stackIntercept<StorageFilesUploadRequest, StorageFilesUploadReply>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: StorageFileUploadPublic(StorageFileUploadPublicRequest) returns (StorageFileUploadPublicReply);
     */
    storageFileUploadPublic(input: StorageFileUploadPublicRequest, options?: RpcOptions): UnaryCall<StorageFileUploadPublicRequest, StorageFileUploadPublicReply> {
        const method = this.methods[4], opt = this._transport.mergeOptions(options);
        return stackIntercept<StorageFileUploadPublicRequest, StorageFileUploadPublicReply>("unary", this._transport, method, opt, input);
    }
}
