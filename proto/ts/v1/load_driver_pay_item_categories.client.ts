// @generated by protobuf-ts 2.9.4 with parameter long_type_number,generate_dependencies,ts_nocheck,output_typescript
// @generated from protobuf file "v1/load_driver_pay_item_categories.proto" (syntax proto3)
// tslint:disable
// @ts-nocheck
import type { RpcTransport } from "@protobuf-ts/runtime-rpc";
import type { ServiceInfo } from "@protobuf-ts/runtime-rpc";
import { LoadDriverPayItemCategoryService } from "./load_driver_pay_item_categories";
import type { LoadDriverPayItemCategoryRestoreReply } from "./load_driver_pay_item_categories";
import type { LoadDriverPayItemCategoryRestoreRequest } from "./load_driver_pay_item_categories";
import type { LoadDriverPayItemCategoriesGetReply } from "./load_driver_pay_item_categories";
import type { LoadDriverPayItemCategoriesGetRequest } from "./load_driver_pay_item_categories";
import type { LoadDriverPayItemCategoryRetrieveReply } from "./load_driver_pay_item_categories";
import type { LoadDriverPayItemCategoryRetrieveRequest } from "./load_driver_pay_item_categories";
import type { LoadDriverPayItemCategoryDeleteReply } from "./load_driver_pay_item_categories";
import type { LoadDriverPayItemCategoryDeleteRequest } from "./load_driver_pay_item_categories";
import type { LoadDriverPayItemCategoryUpdateReply } from "./load_driver_pay_item_categories";
import type { LoadDriverPayItemCategoryUpdateRequest } from "./load_driver_pay_item_categories";
import { stackIntercept } from "@protobuf-ts/runtime-rpc";
import type { LoadDriverPayItemCategoryAddReply } from "./load_driver_pay_item_categories";
import type { LoadDriverPayItemCategoryAddRequest } from "./load_driver_pay_item_categories";
import type { UnaryCall } from "@protobuf-ts/runtime-rpc";
import type { RpcOptions } from "@protobuf-ts/runtime-rpc";
/**
 * @generated from protobuf service LoadDriverPayItemCategoryService
 */
export interface ILoadDriverPayItemCategoryServiceClient {
    /**
     * @generated from protobuf rpc: LoadDriverPayItemCategoryAdd(LoadDriverPayItemCategoryAddRequest) returns (LoadDriverPayItemCategoryAddReply);
     */
    loadDriverPayItemCategoryAdd(input: LoadDriverPayItemCategoryAddRequest, options?: RpcOptions): UnaryCall<LoadDriverPayItemCategoryAddRequest, LoadDriverPayItemCategoryAddReply>;
    /**
     * @generated from protobuf rpc: LoadDriverPayItemCategoryUpdate(LoadDriverPayItemCategoryUpdateRequest) returns (LoadDriverPayItemCategoryUpdateReply);
     */
    loadDriverPayItemCategoryUpdate(input: LoadDriverPayItemCategoryUpdateRequest, options?: RpcOptions): UnaryCall<LoadDriverPayItemCategoryUpdateRequest, LoadDriverPayItemCategoryUpdateReply>;
    /**
     * @generated from protobuf rpc: LoadDriverPayItemCategoryDelete(LoadDriverPayItemCategoryDeleteRequest) returns (LoadDriverPayItemCategoryDeleteReply);
     */
    loadDriverPayItemCategoryDelete(input: LoadDriverPayItemCategoryDeleteRequest, options?: RpcOptions): UnaryCall<LoadDriverPayItemCategoryDeleteRequest, LoadDriverPayItemCategoryDeleteReply>;
    /**
     * @generated from protobuf rpc: LoadDriverPayItemCategoryRetrieve(LoadDriverPayItemCategoryRetrieveRequest) returns (LoadDriverPayItemCategoryRetrieveReply);
     */
    loadDriverPayItemCategoryRetrieve(input: LoadDriverPayItemCategoryRetrieveRequest, options?: RpcOptions): UnaryCall<LoadDriverPayItemCategoryRetrieveRequest, LoadDriverPayItemCategoryRetrieveReply>;
    /**
     * @generated from protobuf rpc: LoadDriverPayItemCategoriesGet(LoadDriverPayItemCategoriesGetRequest) returns (LoadDriverPayItemCategoriesGetReply);
     */
    loadDriverPayItemCategoriesGet(input: LoadDriverPayItemCategoriesGetRequest, options?: RpcOptions): UnaryCall<LoadDriverPayItemCategoriesGetRequest, LoadDriverPayItemCategoriesGetReply>;
    /**
     * @generated from protobuf rpc: LoadDriverPayItemCategoryRestore(LoadDriverPayItemCategoryRestoreRequest) returns (LoadDriverPayItemCategoryRestoreReply);
     */
    loadDriverPayItemCategoryRestore(input: LoadDriverPayItemCategoryRestoreRequest, options?: RpcOptions): UnaryCall<LoadDriverPayItemCategoryRestoreRequest, LoadDriverPayItemCategoryRestoreReply>;
}
/**
 * @generated from protobuf service LoadDriverPayItemCategoryService
 */
export class LoadDriverPayItemCategoryServiceClient implements ILoadDriverPayItemCategoryServiceClient, ServiceInfo {
    typeName = LoadDriverPayItemCategoryService.typeName;
    methods = LoadDriverPayItemCategoryService.methods;
    options = LoadDriverPayItemCategoryService.options;
    constructor(private readonly _transport: RpcTransport) {
    }
    /**
     * @generated from protobuf rpc: LoadDriverPayItemCategoryAdd(LoadDriverPayItemCategoryAddRequest) returns (LoadDriverPayItemCategoryAddReply);
     */
    loadDriverPayItemCategoryAdd(input: LoadDriverPayItemCategoryAddRequest, options?: RpcOptions): UnaryCall<LoadDriverPayItemCategoryAddRequest, LoadDriverPayItemCategoryAddReply> {
        const method = this.methods[0], opt = this._transport.mergeOptions(options);
        return stackIntercept<LoadDriverPayItemCategoryAddRequest, LoadDriverPayItemCategoryAddReply>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: LoadDriverPayItemCategoryUpdate(LoadDriverPayItemCategoryUpdateRequest) returns (LoadDriverPayItemCategoryUpdateReply);
     */
    loadDriverPayItemCategoryUpdate(input: LoadDriverPayItemCategoryUpdateRequest, options?: RpcOptions): UnaryCall<LoadDriverPayItemCategoryUpdateRequest, LoadDriverPayItemCategoryUpdateReply> {
        const method = this.methods[1], opt = this._transport.mergeOptions(options);
        return stackIntercept<LoadDriverPayItemCategoryUpdateRequest, LoadDriverPayItemCategoryUpdateReply>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: LoadDriverPayItemCategoryDelete(LoadDriverPayItemCategoryDeleteRequest) returns (LoadDriverPayItemCategoryDeleteReply);
     */
    loadDriverPayItemCategoryDelete(input: LoadDriverPayItemCategoryDeleteRequest, options?: RpcOptions): UnaryCall<LoadDriverPayItemCategoryDeleteRequest, LoadDriverPayItemCategoryDeleteReply> {
        const method = this.methods[2], opt = this._transport.mergeOptions(options);
        return stackIntercept<LoadDriverPayItemCategoryDeleteRequest, LoadDriverPayItemCategoryDeleteReply>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: LoadDriverPayItemCategoryRetrieve(LoadDriverPayItemCategoryRetrieveRequest) returns (LoadDriverPayItemCategoryRetrieveReply);
     */
    loadDriverPayItemCategoryRetrieve(input: LoadDriverPayItemCategoryRetrieveRequest, options?: RpcOptions): UnaryCall<LoadDriverPayItemCategoryRetrieveRequest, LoadDriverPayItemCategoryRetrieveReply> {
        const method = this.methods[3], opt = this._transport.mergeOptions(options);
        return stackIntercept<LoadDriverPayItemCategoryRetrieveRequest, LoadDriverPayItemCategoryRetrieveReply>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: LoadDriverPayItemCategoriesGet(LoadDriverPayItemCategoriesGetRequest) returns (LoadDriverPayItemCategoriesGetReply);
     */
    loadDriverPayItemCategoriesGet(input: LoadDriverPayItemCategoriesGetRequest, options?: RpcOptions): UnaryCall<LoadDriverPayItemCategoriesGetRequest, LoadDriverPayItemCategoriesGetReply> {
        const method = this.methods[4], opt = this._transport.mergeOptions(options);
        return stackIntercept<LoadDriverPayItemCategoriesGetRequest, LoadDriverPayItemCategoriesGetReply>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: LoadDriverPayItemCategoryRestore(LoadDriverPayItemCategoryRestoreRequest) returns (LoadDriverPayItemCategoryRestoreReply);
     */
    loadDriverPayItemCategoryRestore(input: LoadDriverPayItemCategoryRestoreRequest, options?: RpcOptions): UnaryCall<LoadDriverPayItemCategoryRestoreRequest, LoadDriverPayItemCategoryRestoreReply> {
        const method = this.methods[5], opt = this._transport.mergeOptions(options);
        return stackIntercept<LoadDriverPayItemCategoryRestoreRequest, LoadDriverPayItemCategoryRestoreReply>("unary", this._transport, method, opt, input);
    }
}
