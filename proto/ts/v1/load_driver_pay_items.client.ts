// @generated by protobuf-ts 2.9.4 with parameter long_type_number,generate_dependencies,ts_nocheck,output_typescript
// @generated from protobuf file "v1/load_driver_pay_items.proto" (syntax proto3)
// tslint:disable
// @ts-nocheck
import type { RpcTransport } from "@protobuf-ts/runtime-rpc";
import type { ServiceInfo } from "@protobuf-ts/runtime-rpc";
import { LoadsDriverPayItemsService } from "./load_driver_pay_items";
import type { LoadDriverPayItemRetrieveReply } from "./load_driver_pay_items";
import type { LoadDriverPayItemRetrieveRequest } from "./load_driver_pay_items";
import type { LoadDriverPayItemDeleteReply } from "./load_driver_pay_items";
import type { LoadDriverPayItemDeleteRequest } from "./load_driver_pay_items";
import type { LoadDriverPayItemUpdateReply } from "./load_driver_pay_items";
import type { LoadDriverPayItemUpdateRequest } from "./load_driver_pay_items";
import { stackIntercept } from "@protobuf-ts/runtime-rpc";
import type { LoadDriverPayItemAddReply } from "./load_driver_pay_items";
import type { LoadDriverPayItemAddRequest } from "./load_driver_pay_items";
import type { UnaryCall } from "@protobuf-ts/runtime-rpc";
import type { RpcOptions } from "@protobuf-ts/runtime-rpc";
/**
 * @generated from protobuf service LoadsDriverPayItemsService
 */
export interface ILoadsDriverPayItemsServiceClient {
    /**
     * @generated from protobuf rpc: LoadDriverPayItemAdd(LoadDriverPayItemAddRequest) returns (LoadDriverPayItemAddReply);
     */
    loadDriverPayItemAdd(input: LoadDriverPayItemAddRequest, options?: RpcOptions): UnaryCall<LoadDriverPayItemAddRequest, LoadDriverPayItemAddReply>;
    /**
     * @generated from protobuf rpc: LoadDriverPayItemUpdate(LoadDriverPayItemUpdateRequest) returns (LoadDriverPayItemUpdateReply);
     */
    loadDriverPayItemUpdate(input: LoadDriverPayItemUpdateRequest, options?: RpcOptions): UnaryCall<LoadDriverPayItemUpdateRequest, LoadDriverPayItemUpdateReply>;
    /**
     * @generated from protobuf rpc: LoadDriverPayItemDelete(LoadDriverPayItemDeleteRequest) returns (LoadDriverPayItemDeleteReply);
     */
    loadDriverPayItemDelete(input: LoadDriverPayItemDeleteRequest, options?: RpcOptions): UnaryCall<LoadDriverPayItemDeleteRequest, LoadDriverPayItemDeleteReply>;
    /**
     * @generated from protobuf rpc: LoadDriverPayItemRetrieve(LoadDriverPayItemRetrieveRequest) returns (LoadDriverPayItemRetrieveReply);
     */
    loadDriverPayItemRetrieve(input: LoadDriverPayItemRetrieveRequest, options?: RpcOptions): UnaryCall<LoadDriverPayItemRetrieveRequest, LoadDriverPayItemRetrieveReply>;
}
/**
 * @generated from protobuf service LoadsDriverPayItemsService
 */
export class LoadsDriverPayItemsServiceClient implements ILoadsDriverPayItemsServiceClient, ServiceInfo {
    typeName = LoadsDriverPayItemsService.typeName;
    methods = LoadsDriverPayItemsService.methods;
    options = LoadsDriverPayItemsService.options;
    constructor(private readonly _transport: RpcTransport) {
    }
    /**
     * @generated from protobuf rpc: LoadDriverPayItemAdd(LoadDriverPayItemAddRequest) returns (LoadDriverPayItemAddReply);
     */
    loadDriverPayItemAdd(input: LoadDriverPayItemAddRequest, options?: RpcOptions): UnaryCall<LoadDriverPayItemAddRequest, LoadDriverPayItemAddReply> {
        const method = this.methods[0], opt = this._transport.mergeOptions(options);
        return stackIntercept<LoadDriverPayItemAddRequest, LoadDriverPayItemAddReply>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: LoadDriverPayItemUpdate(LoadDriverPayItemUpdateRequest) returns (LoadDriverPayItemUpdateReply);
     */
    loadDriverPayItemUpdate(input: LoadDriverPayItemUpdateRequest, options?: RpcOptions): UnaryCall<LoadDriverPayItemUpdateRequest, LoadDriverPayItemUpdateReply> {
        const method = this.methods[1], opt = this._transport.mergeOptions(options);
        return stackIntercept<LoadDriverPayItemUpdateRequest, LoadDriverPayItemUpdateReply>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: LoadDriverPayItemDelete(LoadDriverPayItemDeleteRequest) returns (LoadDriverPayItemDeleteReply);
     */
    loadDriverPayItemDelete(input: LoadDriverPayItemDeleteRequest, options?: RpcOptions): UnaryCall<LoadDriverPayItemDeleteRequest, LoadDriverPayItemDeleteReply> {
        const method = this.methods[2], opt = this._transport.mergeOptions(options);
        return stackIntercept<LoadDriverPayItemDeleteRequest, LoadDriverPayItemDeleteReply>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: LoadDriverPayItemRetrieve(LoadDriverPayItemRetrieveRequest) returns (LoadDriverPayItemRetrieveReply);
     */
    loadDriverPayItemRetrieve(input: LoadDriverPayItemRetrieveRequest, options?: RpcOptions): UnaryCall<LoadDriverPayItemRetrieveRequest, LoadDriverPayItemRetrieveReply> {
        const method = this.methods[3], opt = this._transport.mergeOptions(options);
        return stackIntercept<LoadDriverPayItemRetrieveRequest, LoadDriverPayItemRetrieveReply>("unary", this._transport, method, opt, input);
    }
}
