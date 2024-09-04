// @generated by protobuf-ts 2.9.4 with parameter long_type_number,generate_dependencies,ts_nocheck,output_typescript
// @generated from protobuf file "v1/load_invoice_item_categories.proto" (syntax proto3)
// tslint:disable
// @ts-nocheck
import type { RpcTransport } from "@protobuf-ts/runtime-rpc";
import type { ServiceInfo } from "@protobuf-ts/runtime-rpc";
import { LoadInvoiceItemCategoriesService } from "./load_invoice_item_categories";
import type { LoadInvoiceItemCategoriesGetReply } from "./load_invoice_item_categories";
import type { LoadInvoiceItemCategoriesGetRequest } from "./load_invoice_item_categories";
import type { LoadInvoiceItemCategoryRetrieveReply } from "./load_invoice_item_categories";
import type { LoadInvoiceItemCategoryRetrieveRequest } from "./load_invoice_item_categories";
import type { LoadInvoiceItemCategoryRestoreReply } from "./load_invoice_item_categories";
import type { LoadInvoiceItemCategoryRestoreRequest } from "./load_invoice_item_categories";
import type { LoadInvoiceItemCategoryDeleteReply } from "./load_invoice_item_categories";
import type { LoadInvoiceItemCategoryDeleteRequest } from "./load_invoice_item_categories";
import type { LoadInvoiceItemCategoryUpdateReply } from "./load_invoice_item_categories";
import type { LoadInvoiceItemCategoryUpdateRequest } from "./load_invoice_item_categories";
import { stackIntercept } from "@protobuf-ts/runtime-rpc";
import type { LoadInvoiceItemCategoryAddReply } from "./load_invoice_item_categories";
import type { LoadInvoiceItemCategoryAddRequest } from "./load_invoice_item_categories";
import type { UnaryCall } from "@protobuf-ts/runtime-rpc";
import type { RpcOptions } from "@protobuf-ts/runtime-rpc";
/**
 * @generated from protobuf service LoadInvoiceItemCategoriesService
 */
export interface ILoadInvoiceItemCategoriesServiceClient {
    /**
     * @generated from protobuf rpc: LoadInvoiceItemCategoryAdd(LoadInvoiceItemCategoryAddRequest) returns (LoadInvoiceItemCategoryAddReply);
     */
    loadInvoiceItemCategoryAdd(input: LoadInvoiceItemCategoryAddRequest, options?: RpcOptions): UnaryCall<LoadInvoiceItemCategoryAddRequest, LoadInvoiceItemCategoryAddReply>;
    /**
     * @generated from protobuf rpc: LoadInvoiceItemCategoryUpdate(LoadInvoiceItemCategoryUpdateRequest) returns (LoadInvoiceItemCategoryUpdateReply);
     */
    loadInvoiceItemCategoryUpdate(input: LoadInvoiceItemCategoryUpdateRequest, options?: RpcOptions): UnaryCall<LoadInvoiceItemCategoryUpdateRequest, LoadInvoiceItemCategoryUpdateReply>;
    /**
     * @generated from protobuf rpc: LoadInvoiceItemCategoryDelete(LoadInvoiceItemCategoryDeleteRequest) returns (LoadInvoiceItemCategoryDeleteReply);
     */
    loadInvoiceItemCategoryDelete(input: LoadInvoiceItemCategoryDeleteRequest, options?: RpcOptions): UnaryCall<LoadInvoiceItemCategoryDeleteRequest, LoadInvoiceItemCategoryDeleteReply>;
    /**
     * @generated from protobuf rpc: LoadInvoiceItemCategoryRestore(LoadInvoiceItemCategoryRestoreRequest) returns (LoadInvoiceItemCategoryRestoreReply);
     */
    loadInvoiceItemCategoryRestore(input: LoadInvoiceItemCategoryRestoreRequest, options?: RpcOptions): UnaryCall<LoadInvoiceItemCategoryRestoreRequest, LoadInvoiceItemCategoryRestoreReply>;
    /**
     * @generated from protobuf rpc: LoadInvoiceItemCategoryRetrieve(LoadInvoiceItemCategoryRetrieveRequest) returns (LoadInvoiceItemCategoryRetrieveReply);
     */
    loadInvoiceItemCategoryRetrieve(input: LoadInvoiceItemCategoryRetrieveRequest, options?: RpcOptions): UnaryCall<LoadInvoiceItemCategoryRetrieveRequest, LoadInvoiceItemCategoryRetrieveReply>;
    /**
     * @generated from protobuf rpc: LoadInvoiceItemCategoriesGet(LoadInvoiceItemCategoriesGetRequest) returns (LoadInvoiceItemCategoriesGetReply);
     */
    loadInvoiceItemCategoriesGet(input: LoadInvoiceItemCategoriesGetRequest, options?: RpcOptions): UnaryCall<LoadInvoiceItemCategoriesGetRequest, LoadInvoiceItemCategoriesGetReply>;
}
/**
 * @generated from protobuf service LoadInvoiceItemCategoriesService
 */
export class LoadInvoiceItemCategoriesServiceClient implements ILoadInvoiceItemCategoriesServiceClient, ServiceInfo {
    typeName = LoadInvoiceItemCategoriesService.typeName;
    methods = LoadInvoiceItemCategoriesService.methods;
    options = LoadInvoiceItemCategoriesService.options;
    constructor(private readonly _transport: RpcTransport) {
    }
    /**
     * @generated from protobuf rpc: LoadInvoiceItemCategoryAdd(LoadInvoiceItemCategoryAddRequest) returns (LoadInvoiceItemCategoryAddReply);
     */
    loadInvoiceItemCategoryAdd(input: LoadInvoiceItemCategoryAddRequest, options?: RpcOptions): UnaryCall<LoadInvoiceItemCategoryAddRequest, LoadInvoiceItemCategoryAddReply> {
        const method = this.methods[0], opt = this._transport.mergeOptions(options);
        return stackIntercept<LoadInvoiceItemCategoryAddRequest, LoadInvoiceItemCategoryAddReply>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: LoadInvoiceItemCategoryUpdate(LoadInvoiceItemCategoryUpdateRequest) returns (LoadInvoiceItemCategoryUpdateReply);
     */
    loadInvoiceItemCategoryUpdate(input: LoadInvoiceItemCategoryUpdateRequest, options?: RpcOptions): UnaryCall<LoadInvoiceItemCategoryUpdateRequest, LoadInvoiceItemCategoryUpdateReply> {
        const method = this.methods[1], opt = this._transport.mergeOptions(options);
        return stackIntercept<LoadInvoiceItemCategoryUpdateRequest, LoadInvoiceItemCategoryUpdateReply>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: LoadInvoiceItemCategoryDelete(LoadInvoiceItemCategoryDeleteRequest) returns (LoadInvoiceItemCategoryDeleteReply);
     */
    loadInvoiceItemCategoryDelete(input: LoadInvoiceItemCategoryDeleteRequest, options?: RpcOptions): UnaryCall<LoadInvoiceItemCategoryDeleteRequest, LoadInvoiceItemCategoryDeleteReply> {
        const method = this.methods[2], opt = this._transport.mergeOptions(options);
        return stackIntercept<LoadInvoiceItemCategoryDeleteRequest, LoadInvoiceItemCategoryDeleteReply>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: LoadInvoiceItemCategoryRestore(LoadInvoiceItemCategoryRestoreRequest) returns (LoadInvoiceItemCategoryRestoreReply);
     */
    loadInvoiceItemCategoryRestore(input: LoadInvoiceItemCategoryRestoreRequest, options?: RpcOptions): UnaryCall<LoadInvoiceItemCategoryRestoreRequest, LoadInvoiceItemCategoryRestoreReply> {
        const method = this.methods[3], opt = this._transport.mergeOptions(options);
        return stackIntercept<LoadInvoiceItemCategoryRestoreRequest, LoadInvoiceItemCategoryRestoreReply>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: LoadInvoiceItemCategoryRetrieve(LoadInvoiceItemCategoryRetrieveRequest) returns (LoadInvoiceItemCategoryRetrieveReply);
     */
    loadInvoiceItemCategoryRetrieve(input: LoadInvoiceItemCategoryRetrieveRequest, options?: RpcOptions): UnaryCall<LoadInvoiceItemCategoryRetrieveRequest, LoadInvoiceItemCategoryRetrieveReply> {
        const method = this.methods[4], opt = this._transport.mergeOptions(options);
        return stackIntercept<LoadInvoiceItemCategoryRetrieveRequest, LoadInvoiceItemCategoryRetrieveReply>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: LoadInvoiceItemCategoriesGet(LoadInvoiceItemCategoriesGetRequest) returns (LoadInvoiceItemCategoriesGetReply);
     */
    loadInvoiceItemCategoriesGet(input: LoadInvoiceItemCategoriesGetRequest, options?: RpcOptions): UnaryCall<LoadInvoiceItemCategoriesGetRequest, LoadInvoiceItemCategoriesGetReply> {
        const method = this.methods[5], opt = this._transport.mergeOptions(options);
        return stackIntercept<LoadInvoiceItemCategoriesGetRequest, LoadInvoiceItemCategoriesGetReply>("unary", this._transport, method, opt, input);
    }
}
