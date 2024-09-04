// @generated by protobuf-ts 2.9.4 with parameter long_type_number,generate_dependencies,ts_nocheck,output_typescript
// @generated from protobuf file "v1/customer_portal.proto" (syntax proto3)
// tslint:disable
// @ts-nocheck
import type { RpcTransport } from "@protobuf-ts/runtime-rpc";
import type { ServiceInfo } from "@protobuf-ts/runtime-rpc";
import { CustomerPortalService } from "./customer_portal";
import type { CustomerPortalImageUpdateReply } from "./customer_portal";
import type { CustomerPortalImageUpdateRequest } from "./customer_portal";
import type { CustomerPortalImageDeleteReply } from "./customer_portal";
import type { CustomerPortalImageDeleteRequest } from "./customer_portal";
import type { CustomerPortalImageCreateReply } from "./customer_portal";
import type { CustomerPortalImageCreateRequest } from "./customer_portal";
import type { CustomerPortalImageGetReply } from "./customer_portal";
import type { CustomerPortalImageGetRequest } from "./customer_portal";
import type { CustomerPortalCodeClearReply } from "./customer_portal";
import type { CustomerPortalCodeClearRequest } from "./customer_portal";
import type { CustomerPortalCodeSetReply } from "./customer_portal";
import type { CustomerPortalCodeSetRequest } from "./customer_portal";
import type { CustomerPortalDomainDeleteReply } from "./customer_portal";
import type { CustomerPortalDomainDeleteRequest } from "./customer_portal";
import type { CustomerPortalDomainCreateReply } from "./customer_portal";
import type { CustomerPortalDomainCreateRequest } from "./customer_portal";
import type { CustomerPortalDomainGetReply } from "./customer_portal";
import type { CustomerPortalDomainGetRequest } from "./customer_portal";
import type { CustomerPortalDeleteReply } from "./customer_portal";
import type { CustomerPortalDeleteRequest } from "./customer_portal";
import type { CustomerPortalUpdateReply } from "./customer_portal";
import type { CustomerPortalUpdateRequest } from "./customer_portal";
import type { CustomerPortalCreateReply } from "./customer_portal";
import type { CustomerPortalCreateRequest } from "./customer_portal";
import { stackIntercept } from "@protobuf-ts/runtime-rpc";
import type { CustomerPortalGetReply } from "./customer_portal";
import type { CustomerPortalGetRequest } from "./customer_portal";
import type { UnaryCall } from "@protobuf-ts/runtime-rpc";
import type { RpcOptions } from "@protobuf-ts/runtime-rpc";
/**
 * @generated from protobuf service CustomerPortalService
 */
export interface ICustomerPortalServiceClient {
    /**
     * Portal
     *
     * @generated from protobuf rpc: CustomerPortalGet(CustomerPortalGetRequest) returns (CustomerPortalGetReply);
     */
    customerPortalGet(input: CustomerPortalGetRequest, options?: RpcOptions): UnaryCall<CustomerPortalGetRequest, CustomerPortalGetReply>;
    /**
     * @generated from protobuf rpc: CustomerPortalCreate(CustomerPortalCreateRequest) returns (CustomerPortalCreateReply);
     */
    customerPortalCreate(input: CustomerPortalCreateRequest, options?: RpcOptions): UnaryCall<CustomerPortalCreateRequest, CustomerPortalCreateReply>;
    /**
     * @generated from protobuf rpc: CustomerPortalUpdate(CustomerPortalUpdateRequest) returns (CustomerPortalUpdateReply);
     */
    customerPortalUpdate(input: CustomerPortalUpdateRequest, options?: RpcOptions): UnaryCall<CustomerPortalUpdateRequest, CustomerPortalUpdateReply>;
    /**
     * @generated from protobuf rpc: CustomerPortalDelete(CustomerPortalDeleteRequest) returns (CustomerPortalDeleteReply);
     */
    customerPortalDelete(input: CustomerPortalDeleteRequest, options?: RpcOptions): UnaryCall<CustomerPortalDeleteRequest, CustomerPortalDeleteReply>;
    /**
     * Domain
     *
     * @generated from protobuf rpc: CustomerPortalDomainGet(CustomerPortalDomainGetRequest) returns (CustomerPortalDomainGetReply);
     */
    customerPortalDomainGet(input: CustomerPortalDomainGetRequest, options?: RpcOptions): UnaryCall<CustomerPortalDomainGetRequest, CustomerPortalDomainGetReply>;
    /**
     * @generated from protobuf rpc: CustomerPortalDomainCreate(CustomerPortalDomainCreateRequest) returns (CustomerPortalDomainCreateReply);
     */
    customerPortalDomainCreate(input: CustomerPortalDomainCreateRequest, options?: RpcOptions): UnaryCall<CustomerPortalDomainCreateRequest, CustomerPortalDomainCreateReply>;
    /**
     * @generated from protobuf rpc: CustomerPortalDomainDelete(CustomerPortalDomainDeleteRequest) returns (CustomerPortalDomainDeleteReply);
     */
    customerPortalDomainDelete(input: CustomerPortalDomainDeleteRequest, options?: RpcOptions): UnaryCall<CustomerPortalDomainDeleteRequest, CustomerPortalDomainDeleteReply>;
    /**
     * Code
     *
     * @generated from protobuf rpc: CustomerPortalCodeSet(CustomerPortalCodeSetRequest) returns (CustomerPortalCodeSetReply);
     */
    customerPortalCodeSet(input: CustomerPortalCodeSetRequest, options?: RpcOptions): UnaryCall<CustomerPortalCodeSetRequest, CustomerPortalCodeSetReply>;
    /**
     * @generated from protobuf rpc: CustomerPortalCodeClear(CustomerPortalCodeClearRequest) returns (CustomerPortalCodeClearReply);
     */
    customerPortalCodeClear(input: CustomerPortalCodeClearRequest, options?: RpcOptions): UnaryCall<CustomerPortalCodeClearRequest, CustomerPortalCodeClearReply>;
    /**
     * Image
     *
     * @generated from protobuf rpc: CustomerPortalImageGet(CustomerPortalImageGetRequest) returns (CustomerPortalImageGetReply);
     */
    customerPortalImageGet(input: CustomerPortalImageGetRequest, options?: RpcOptions): UnaryCall<CustomerPortalImageGetRequest, CustomerPortalImageGetReply>;
    /**
     * @generated from protobuf rpc: CustomerPortalImageCreate(CustomerPortalImageCreateRequest) returns (CustomerPortalImageCreateReply);
     */
    customerPortalImageCreate(input: CustomerPortalImageCreateRequest, options?: RpcOptions): UnaryCall<CustomerPortalImageCreateRequest, CustomerPortalImageCreateReply>;
    /**
     * @generated from protobuf rpc: CustomerPortalImageDelete(CustomerPortalImageDeleteRequest) returns (CustomerPortalImageDeleteReply);
     */
    customerPortalImageDelete(input: CustomerPortalImageDeleteRequest, options?: RpcOptions): UnaryCall<CustomerPortalImageDeleteRequest, CustomerPortalImageDeleteReply>;
    /**
     * @generated from protobuf rpc: CustomerPortalImageUpdate(CustomerPortalImageUpdateRequest) returns (CustomerPortalImageUpdateReply);
     */
    customerPortalImageUpdate(input: CustomerPortalImageUpdateRequest, options?: RpcOptions): UnaryCall<CustomerPortalImageUpdateRequest, CustomerPortalImageUpdateReply>;
}
/**
 * @generated from protobuf service CustomerPortalService
 */
export class CustomerPortalServiceClient implements ICustomerPortalServiceClient, ServiceInfo {
    typeName = CustomerPortalService.typeName;
    methods = CustomerPortalService.methods;
    options = CustomerPortalService.options;
    constructor(private readonly _transport: RpcTransport) {
    }
    /**
     * Portal
     *
     * @generated from protobuf rpc: CustomerPortalGet(CustomerPortalGetRequest) returns (CustomerPortalGetReply);
     */
    customerPortalGet(input: CustomerPortalGetRequest, options?: RpcOptions): UnaryCall<CustomerPortalGetRequest, CustomerPortalGetReply> {
        const method = this.methods[0], opt = this._transport.mergeOptions(options);
        return stackIntercept<CustomerPortalGetRequest, CustomerPortalGetReply>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: CustomerPortalCreate(CustomerPortalCreateRequest) returns (CustomerPortalCreateReply);
     */
    customerPortalCreate(input: CustomerPortalCreateRequest, options?: RpcOptions): UnaryCall<CustomerPortalCreateRequest, CustomerPortalCreateReply> {
        const method = this.methods[1], opt = this._transport.mergeOptions(options);
        return stackIntercept<CustomerPortalCreateRequest, CustomerPortalCreateReply>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: CustomerPortalUpdate(CustomerPortalUpdateRequest) returns (CustomerPortalUpdateReply);
     */
    customerPortalUpdate(input: CustomerPortalUpdateRequest, options?: RpcOptions): UnaryCall<CustomerPortalUpdateRequest, CustomerPortalUpdateReply> {
        const method = this.methods[2], opt = this._transport.mergeOptions(options);
        return stackIntercept<CustomerPortalUpdateRequest, CustomerPortalUpdateReply>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: CustomerPortalDelete(CustomerPortalDeleteRequest) returns (CustomerPortalDeleteReply);
     */
    customerPortalDelete(input: CustomerPortalDeleteRequest, options?: RpcOptions): UnaryCall<CustomerPortalDeleteRequest, CustomerPortalDeleteReply> {
        const method = this.methods[3], opt = this._transport.mergeOptions(options);
        return stackIntercept<CustomerPortalDeleteRequest, CustomerPortalDeleteReply>("unary", this._transport, method, opt, input);
    }
    /**
     * Domain
     *
     * @generated from protobuf rpc: CustomerPortalDomainGet(CustomerPortalDomainGetRequest) returns (CustomerPortalDomainGetReply);
     */
    customerPortalDomainGet(input: CustomerPortalDomainGetRequest, options?: RpcOptions): UnaryCall<CustomerPortalDomainGetRequest, CustomerPortalDomainGetReply> {
        const method = this.methods[4], opt = this._transport.mergeOptions(options);
        return stackIntercept<CustomerPortalDomainGetRequest, CustomerPortalDomainGetReply>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: CustomerPortalDomainCreate(CustomerPortalDomainCreateRequest) returns (CustomerPortalDomainCreateReply);
     */
    customerPortalDomainCreate(input: CustomerPortalDomainCreateRequest, options?: RpcOptions): UnaryCall<CustomerPortalDomainCreateRequest, CustomerPortalDomainCreateReply> {
        const method = this.methods[5], opt = this._transport.mergeOptions(options);
        return stackIntercept<CustomerPortalDomainCreateRequest, CustomerPortalDomainCreateReply>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: CustomerPortalDomainDelete(CustomerPortalDomainDeleteRequest) returns (CustomerPortalDomainDeleteReply);
     */
    customerPortalDomainDelete(input: CustomerPortalDomainDeleteRequest, options?: RpcOptions): UnaryCall<CustomerPortalDomainDeleteRequest, CustomerPortalDomainDeleteReply> {
        const method = this.methods[6], opt = this._transport.mergeOptions(options);
        return stackIntercept<CustomerPortalDomainDeleteRequest, CustomerPortalDomainDeleteReply>("unary", this._transport, method, opt, input);
    }
    /**
     * Code
     *
     * @generated from protobuf rpc: CustomerPortalCodeSet(CustomerPortalCodeSetRequest) returns (CustomerPortalCodeSetReply);
     */
    customerPortalCodeSet(input: CustomerPortalCodeSetRequest, options?: RpcOptions): UnaryCall<CustomerPortalCodeSetRequest, CustomerPortalCodeSetReply> {
        const method = this.methods[7], opt = this._transport.mergeOptions(options);
        return stackIntercept<CustomerPortalCodeSetRequest, CustomerPortalCodeSetReply>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: CustomerPortalCodeClear(CustomerPortalCodeClearRequest) returns (CustomerPortalCodeClearReply);
     */
    customerPortalCodeClear(input: CustomerPortalCodeClearRequest, options?: RpcOptions): UnaryCall<CustomerPortalCodeClearRequest, CustomerPortalCodeClearReply> {
        const method = this.methods[8], opt = this._transport.mergeOptions(options);
        return stackIntercept<CustomerPortalCodeClearRequest, CustomerPortalCodeClearReply>("unary", this._transport, method, opt, input);
    }
    /**
     * Image
     *
     * @generated from protobuf rpc: CustomerPortalImageGet(CustomerPortalImageGetRequest) returns (CustomerPortalImageGetReply);
     */
    customerPortalImageGet(input: CustomerPortalImageGetRequest, options?: RpcOptions): UnaryCall<CustomerPortalImageGetRequest, CustomerPortalImageGetReply> {
        const method = this.methods[9], opt = this._transport.mergeOptions(options);
        return stackIntercept<CustomerPortalImageGetRequest, CustomerPortalImageGetReply>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: CustomerPortalImageCreate(CustomerPortalImageCreateRequest) returns (CustomerPortalImageCreateReply);
     */
    customerPortalImageCreate(input: CustomerPortalImageCreateRequest, options?: RpcOptions): UnaryCall<CustomerPortalImageCreateRequest, CustomerPortalImageCreateReply> {
        const method = this.methods[10], opt = this._transport.mergeOptions(options);
        return stackIntercept<CustomerPortalImageCreateRequest, CustomerPortalImageCreateReply>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: CustomerPortalImageDelete(CustomerPortalImageDeleteRequest) returns (CustomerPortalImageDeleteReply);
     */
    customerPortalImageDelete(input: CustomerPortalImageDeleteRequest, options?: RpcOptions): UnaryCall<CustomerPortalImageDeleteRequest, CustomerPortalImageDeleteReply> {
        const method = this.methods[11], opt = this._transport.mergeOptions(options);
        return stackIntercept<CustomerPortalImageDeleteRequest, CustomerPortalImageDeleteReply>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: CustomerPortalImageUpdate(CustomerPortalImageUpdateRequest) returns (CustomerPortalImageUpdateReply);
     */
    customerPortalImageUpdate(input: CustomerPortalImageUpdateRequest, options?: RpcOptions): UnaryCall<CustomerPortalImageUpdateRequest, CustomerPortalImageUpdateReply> {
        const method = this.methods[12], opt = this._transport.mergeOptions(options);
        return stackIntercept<CustomerPortalImageUpdateRequest, CustomerPortalImageUpdateReply>("unary", this._transport, method, opt, input);
    }
}
