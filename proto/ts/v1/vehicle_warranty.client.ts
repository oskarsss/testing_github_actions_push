// @generated by protobuf-ts 2.9.4 with parameter long_type_number,generate_dependencies,ts_nocheck,output_typescript
// @generated from protobuf file "v1/vehicle_warranty.proto" (syntax proto3)
// tslint:disable
// @ts-nocheck
import type { RpcTransport } from "@protobuf-ts/runtime-rpc";
import type { ServiceInfo } from "@protobuf-ts/runtime-rpc";
import { VehicleWarrantyService } from "./vehicle_warranty";
import type { WarrantyDeleteReply } from "./vehicle_warranty";
import type { WarrantyDeleteRequest } from "./vehicle_warranty";
import type { WarrantyUpdateReply } from "./vehicle_warranty";
import type { WarrantyUpdateRequest } from "./vehicle_warranty";
import type { WarrantyEldRetrieveReply } from "./vehicle_warranty";
import type { WarrantyEldRetrieveRequest } from "./vehicle_warranty";
import type { WarrantyRetrieveReply } from "./vehicle_warranty";
import type { WarrantyRetrieveRequest } from "./vehicle_warranty";
import { stackIntercept } from "@protobuf-ts/runtime-rpc";
import type { WarrantyCreateReply } from "./vehicle_warranty";
import type { WarrantyCreateRequest } from "./vehicle_warranty";
import type { UnaryCall } from "@protobuf-ts/runtime-rpc";
import type { RpcOptions } from "@protobuf-ts/runtime-rpc";
/**
 * @generated from protobuf service VehicleWarrantyService
 */
export interface IVehicleWarrantyServiceClient {
    /**
     * @generated from protobuf rpc: WarrantyCreate(WarrantyCreateRequest) returns (WarrantyCreateReply);
     */
    warrantyCreate(input: WarrantyCreateRequest, options?: RpcOptions): UnaryCall<WarrantyCreateRequest, WarrantyCreateReply>;
    /**
     * @generated from protobuf rpc: WarrantyRetrieve(WarrantyRetrieveRequest) returns (WarrantyRetrieveReply);
     */
    warrantyRetrieve(input: WarrantyRetrieveRequest, options?: RpcOptions): UnaryCall<WarrantyRetrieveRequest, WarrantyRetrieveReply>;
    /**
     * @generated from protobuf rpc: WarrantyEldRetrieve(WarrantyEldRetrieveRequest) returns (WarrantyEldRetrieveReply);
     */
    warrantyEldRetrieve(input: WarrantyEldRetrieveRequest, options?: RpcOptions): UnaryCall<WarrantyEldRetrieveRequest, WarrantyEldRetrieveReply>;
    /**
     * @generated from protobuf rpc: WarrantyUpdate(WarrantyUpdateRequest) returns (WarrantyUpdateReply);
     */
    warrantyUpdate(input: WarrantyUpdateRequest, options?: RpcOptions): UnaryCall<WarrantyUpdateRequest, WarrantyUpdateReply>;
    /**
     * @generated from protobuf rpc: WarrantyDelete(WarrantyDeleteRequest) returns (WarrantyDeleteReply);
     */
    warrantyDelete(input: WarrantyDeleteRequest, options?: RpcOptions): UnaryCall<WarrantyDeleteRequest, WarrantyDeleteReply>;
}
/**
 * @generated from protobuf service VehicleWarrantyService
 */
export class VehicleWarrantyServiceClient implements IVehicleWarrantyServiceClient, ServiceInfo {
    typeName = VehicleWarrantyService.typeName;
    methods = VehicleWarrantyService.methods;
    options = VehicleWarrantyService.options;
    constructor(private readonly _transport: RpcTransport) {
    }
    /**
     * @generated from protobuf rpc: WarrantyCreate(WarrantyCreateRequest) returns (WarrantyCreateReply);
     */
    warrantyCreate(input: WarrantyCreateRequest, options?: RpcOptions): UnaryCall<WarrantyCreateRequest, WarrantyCreateReply> {
        const method = this.methods[0], opt = this._transport.mergeOptions(options);
        return stackIntercept<WarrantyCreateRequest, WarrantyCreateReply>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: WarrantyRetrieve(WarrantyRetrieveRequest) returns (WarrantyRetrieveReply);
     */
    warrantyRetrieve(input: WarrantyRetrieveRequest, options?: RpcOptions): UnaryCall<WarrantyRetrieveRequest, WarrantyRetrieveReply> {
        const method = this.methods[1], opt = this._transport.mergeOptions(options);
        return stackIntercept<WarrantyRetrieveRequest, WarrantyRetrieveReply>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: WarrantyEldRetrieve(WarrantyEldRetrieveRequest) returns (WarrantyEldRetrieveReply);
     */
    warrantyEldRetrieve(input: WarrantyEldRetrieveRequest, options?: RpcOptions): UnaryCall<WarrantyEldRetrieveRequest, WarrantyEldRetrieveReply> {
        const method = this.methods[2], opt = this._transport.mergeOptions(options);
        return stackIntercept<WarrantyEldRetrieveRequest, WarrantyEldRetrieveReply>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: WarrantyUpdate(WarrantyUpdateRequest) returns (WarrantyUpdateReply);
     */
    warrantyUpdate(input: WarrantyUpdateRequest, options?: RpcOptions): UnaryCall<WarrantyUpdateRequest, WarrantyUpdateReply> {
        const method = this.methods[3], opt = this._transport.mergeOptions(options);
        return stackIntercept<WarrantyUpdateRequest, WarrantyUpdateReply>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: WarrantyDelete(WarrantyDeleteRequest) returns (WarrantyDeleteReply);
     */
    warrantyDelete(input: WarrantyDeleteRequest, options?: RpcOptions): UnaryCall<WarrantyDeleteRequest, WarrantyDeleteReply> {
        const method = this.methods[4], opt = this._transport.mergeOptions(options);
        return stackIntercept<WarrantyDeleteRequest, WarrantyDeleteReply>("unary", this._transport, method, opt, input);
    }
}
