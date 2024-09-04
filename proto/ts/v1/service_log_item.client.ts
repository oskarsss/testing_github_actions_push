// @generated by protobuf-ts 2.9.4 with parameter long_type_number,generate_dependencies,ts_nocheck,output_typescript
// @generated from protobuf file "v1/service_log_item.proto" (syntax proto3)
// tslint:disable
// @ts-nocheck
import type { RpcTransport } from "@protobuf-ts/runtime-rpc";
import type { ServiceInfo } from "@protobuf-ts/runtime-rpc";
import { ServiceLogItemService } from "./service_log_item";
import type { ServiceLogItemDeleteReply } from "./service_log_item";
import type { ServiceLogItemDeleteRequest } from "./service_log_item";
import type { ServiceLogItemUpdateReply } from "./service_log_item";
import type { ServiceLogItemUpdateRequest } from "./service_log_item";
import type { ServiceLogItemGetReply } from "./service_log_item";
import type { ServiceLogItemGetRequest } from "./service_log_item";
import type { ServiceLogItemRetrieveReply } from "./service_log_item";
import type { ServiceLogItemRetrieveRequest } from "./service_log_item";
import { stackIntercept } from "@protobuf-ts/runtime-rpc";
import type { ServiceLogItemCreateReply } from "./service_log_item";
import type { ServiceLogItemCreateRequest } from "./service_log_item";
import type { UnaryCall } from "@protobuf-ts/runtime-rpc";
import type { RpcOptions } from "@protobuf-ts/runtime-rpc";
/**
 * @generated from protobuf service ServiceLogItemService
 */
export interface IServiceLogItemServiceClient {
    /**
     * @generated from protobuf rpc: ServiceLogItemCreate(ServiceLogItemCreateRequest) returns (ServiceLogItemCreateReply);
     */
    serviceLogItemCreate(input: ServiceLogItemCreateRequest, options?: RpcOptions): UnaryCall<ServiceLogItemCreateRequest, ServiceLogItemCreateReply>;
    /**
     * @generated from protobuf rpc: ServiceLogItemRetrieve(ServiceLogItemRetrieveRequest) returns (ServiceLogItemRetrieveReply);
     */
    serviceLogItemRetrieve(input: ServiceLogItemRetrieveRequest, options?: RpcOptions): UnaryCall<ServiceLogItemRetrieveRequest, ServiceLogItemRetrieveReply>;
    /**
     * @generated from protobuf rpc: ServiceLogItemGet(ServiceLogItemGetRequest) returns (ServiceLogItemGetReply);
     */
    serviceLogItemGet(input: ServiceLogItemGetRequest, options?: RpcOptions): UnaryCall<ServiceLogItemGetRequest, ServiceLogItemGetReply>;
    /**
     * @generated from protobuf rpc: ServiceLogItemUpdate(ServiceLogItemUpdateRequest) returns (ServiceLogItemUpdateReply);
     */
    serviceLogItemUpdate(input: ServiceLogItemUpdateRequest, options?: RpcOptions): UnaryCall<ServiceLogItemUpdateRequest, ServiceLogItemUpdateReply>;
    /**
     * @generated from protobuf rpc: ServiceLogItemDelete(ServiceLogItemDeleteRequest) returns (ServiceLogItemDeleteReply);
     */
    serviceLogItemDelete(input: ServiceLogItemDeleteRequest, options?: RpcOptions): UnaryCall<ServiceLogItemDeleteRequest, ServiceLogItemDeleteReply>;
}
/**
 * @generated from protobuf service ServiceLogItemService
 */
export class ServiceLogItemServiceClient implements IServiceLogItemServiceClient, ServiceInfo {
    typeName = ServiceLogItemService.typeName;
    methods = ServiceLogItemService.methods;
    options = ServiceLogItemService.options;
    constructor(private readonly _transport: RpcTransport) {
    }
    /**
     * @generated from protobuf rpc: ServiceLogItemCreate(ServiceLogItemCreateRequest) returns (ServiceLogItemCreateReply);
     */
    serviceLogItemCreate(input: ServiceLogItemCreateRequest, options?: RpcOptions): UnaryCall<ServiceLogItemCreateRequest, ServiceLogItemCreateReply> {
        const method = this.methods[0], opt = this._transport.mergeOptions(options);
        return stackIntercept<ServiceLogItemCreateRequest, ServiceLogItemCreateReply>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: ServiceLogItemRetrieve(ServiceLogItemRetrieveRequest) returns (ServiceLogItemRetrieveReply);
     */
    serviceLogItemRetrieve(input: ServiceLogItemRetrieveRequest, options?: RpcOptions): UnaryCall<ServiceLogItemRetrieveRequest, ServiceLogItemRetrieveReply> {
        const method = this.methods[1], opt = this._transport.mergeOptions(options);
        return stackIntercept<ServiceLogItemRetrieveRequest, ServiceLogItemRetrieveReply>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: ServiceLogItemGet(ServiceLogItemGetRequest) returns (ServiceLogItemGetReply);
     */
    serviceLogItemGet(input: ServiceLogItemGetRequest, options?: RpcOptions): UnaryCall<ServiceLogItemGetRequest, ServiceLogItemGetReply> {
        const method = this.methods[2], opt = this._transport.mergeOptions(options);
        return stackIntercept<ServiceLogItemGetRequest, ServiceLogItemGetReply>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: ServiceLogItemUpdate(ServiceLogItemUpdateRequest) returns (ServiceLogItemUpdateReply);
     */
    serviceLogItemUpdate(input: ServiceLogItemUpdateRequest, options?: RpcOptions): UnaryCall<ServiceLogItemUpdateRequest, ServiceLogItemUpdateReply> {
        const method = this.methods[3], opt = this._transport.mergeOptions(options);
        return stackIntercept<ServiceLogItemUpdateRequest, ServiceLogItemUpdateReply>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: ServiceLogItemDelete(ServiceLogItemDeleteRequest) returns (ServiceLogItemDeleteReply);
     */
    serviceLogItemDelete(input: ServiceLogItemDeleteRequest, options?: RpcOptions): UnaryCall<ServiceLogItemDeleteRequest, ServiceLogItemDeleteReply> {
        const method = this.methods[4], opt = this._transport.mergeOptions(options);
        return stackIntercept<ServiceLogItemDeleteRequest, ServiceLogItemDeleteReply>("unary", this._transport, method, opt, input);
    }
}
