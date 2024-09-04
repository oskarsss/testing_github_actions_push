// @generated by protobuf-ts 2.9.4 with parameter long_type_number,generate_dependencies,ts_nocheck,output_typescript
// @generated from protobuf file "v1/tolls.proto" (syntax proto3)
// tslint:disable
// @ts-nocheck
import type { RpcTransport } from "@protobuf-ts/runtime-rpc";
import type { ServiceInfo } from "@protobuf-ts/runtime-rpc";
import { TollsService } from "./tolls";
import type { TollBatchUnassignReply } from "./tolls";
import type { TollBatchUnassignRequest } from "./tolls";
import type { TollBatchAssignReply } from "./tolls";
import type { TollBatchAssignRequest } from "./tolls";
import type { UnassignEquipmentReply } from "./tolls";
import type { UnassignEquipmentRequest } from "./tolls";
import type { AssignEquipmentReply } from "./tolls";
import type { AssignEquipmentRequest } from "./tolls";
import type { DeleteTollReply } from "./tolls";
import type { DeleteTollRequest } from "./tolls";
import type { UpdateTollReply } from "./tolls";
import type { UpdateTollRequest } from "./tolls";
import type { CreateTollReply } from "./tolls";
import type { CreateTollRequest } from "./tolls";
import type { TollStatsGetReply } from "./tolls";
import type { TollStatsGetRequest } from "./tolls";
import type { TollGetReply } from "./tolls";
import type { TollGetRequest } from "./tolls";
import { stackIntercept } from "@protobuf-ts/runtime-rpc";
import type { TollRetrieveReply } from "./tolls";
import type { TollRetrieveRequest } from "./tolls";
import type { UnaryCall } from "@protobuf-ts/runtime-rpc";
import type { RpcOptions } from "@protobuf-ts/runtime-rpc";
/**
 * @generated from protobuf service TollsService
 */
export interface ITollsServiceClient {
    /**
     * @generated from protobuf rpc: TollRetrieve(TollRetrieveRequest) returns (TollRetrieveReply);
     */
    tollRetrieve(input: TollRetrieveRequest, options?: RpcOptions): UnaryCall<TollRetrieveRequest, TollRetrieveReply>;
    /**
     * @generated from protobuf rpc: TollGet(TollGetRequest) returns (TollGetReply);
     */
    tollGet(input: TollGetRequest, options?: RpcOptions): UnaryCall<TollGetRequest, TollGetReply>;
    /**
     * @generated from protobuf rpc: TollStatsGet(TollStatsGetRequest) returns (TollStatsGetReply);
     */
    tollStatsGet(input: TollStatsGetRequest, options?: RpcOptions): UnaryCall<TollStatsGetRequest, TollStatsGetReply>;
    /**
     * @generated from protobuf rpc: CreateToll(CreateTollRequest) returns (CreateTollReply);
     */
    createToll(input: CreateTollRequest, options?: RpcOptions): UnaryCall<CreateTollRequest, CreateTollReply>;
    /**
     * @generated from protobuf rpc: UpdateToll(UpdateTollRequest) returns (UpdateTollReply);
     */
    updateToll(input: UpdateTollRequest, options?: RpcOptions): UnaryCall<UpdateTollRequest, UpdateTollReply>;
    /**
     * @generated from protobuf rpc: DeleteToll(DeleteTollRequest) returns (DeleteTollReply);
     */
    deleteToll(input: DeleteTollRequest, options?: RpcOptions): UnaryCall<DeleteTollRequest, DeleteTollReply>;
    /**
     * @generated from protobuf rpc: AssignEquipment(AssignEquipmentRequest) returns (AssignEquipmentReply);
     */
    assignEquipment(input: AssignEquipmentRequest, options?: RpcOptions): UnaryCall<AssignEquipmentRequest, AssignEquipmentReply>;
    /**
     * @generated from protobuf rpc: UnassignEquipment(UnassignEquipmentRequest) returns (UnassignEquipmentReply);
     */
    unassignEquipment(input: UnassignEquipmentRequest, options?: RpcOptions): UnaryCall<UnassignEquipmentRequest, UnassignEquipmentReply>;
    /**
     * @generated from protobuf rpc: TollBatchAssign(TollBatchAssignRequest) returns (TollBatchAssignReply);
     */
    tollBatchAssign(input: TollBatchAssignRequest, options?: RpcOptions): UnaryCall<TollBatchAssignRequest, TollBatchAssignReply>;
    /**
     * @generated from protobuf rpc: TollBatchUnassign(TollBatchUnassignRequest) returns (TollBatchUnassignReply);
     */
    tollBatchUnassign(input: TollBatchUnassignRequest, options?: RpcOptions): UnaryCall<TollBatchUnassignRequest, TollBatchUnassignReply>;
}
/**
 * @generated from protobuf service TollsService
 */
export class TollsServiceClient implements ITollsServiceClient, ServiceInfo {
    typeName = TollsService.typeName;
    methods = TollsService.methods;
    options = TollsService.options;
    constructor(private readonly _transport: RpcTransport) {
    }
    /**
     * @generated from protobuf rpc: TollRetrieve(TollRetrieveRequest) returns (TollRetrieveReply);
     */
    tollRetrieve(input: TollRetrieveRequest, options?: RpcOptions): UnaryCall<TollRetrieveRequest, TollRetrieveReply> {
        const method = this.methods[0], opt = this._transport.mergeOptions(options);
        return stackIntercept<TollRetrieveRequest, TollRetrieveReply>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: TollGet(TollGetRequest) returns (TollGetReply);
     */
    tollGet(input: TollGetRequest, options?: RpcOptions): UnaryCall<TollGetRequest, TollGetReply> {
        const method = this.methods[1], opt = this._transport.mergeOptions(options);
        return stackIntercept<TollGetRequest, TollGetReply>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: TollStatsGet(TollStatsGetRequest) returns (TollStatsGetReply);
     */
    tollStatsGet(input: TollStatsGetRequest, options?: RpcOptions): UnaryCall<TollStatsGetRequest, TollStatsGetReply> {
        const method = this.methods[2], opt = this._transport.mergeOptions(options);
        return stackIntercept<TollStatsGetRequest, TollStatsGetReply>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: CreateToll(CreateTollRequest) returns (CreateTollReply);
     */
    createToll(input: CreateTollRequest, options?: RpcOptions): UnaryCall<CreateTollRequest, CreateTollReply> {
        const method = this.methods[3], opt = this._transport.mergeOptions(options);
        return stackIntercept<CreateTollRequest, CreateTollReply>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: UpdateToll(UpdateTollRequest) returns (UpdateTollReply);
     */
    updateToll(input: UpdateTollRequest, options?: RpcOptions): UnaryCall<UpdateTollRequest, UpdateTollReply> {
        const method = this.methods[4], opt = this._transport.mergeOptions(options);
        return stackIntercept<UpdateTollRequest, UpdateTollReply>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: DeleteToll(DeleteTollRequest) returns (DeleteTollReply);
     */
    deleteToll(input: DeleteTollRequest, options?: RpcOptions): UnaryCall<DeleteTollRequest, DeleteTollReply> {
        const method = this.methods[5], opt = this._transport.mergeOptions(options);
        return stackIntercept<DeleteTollRequest, DeleteTollReply>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: AssignEquipment(AssignEquipmentRequest) returns (AssignEquipmentReply);
     */
    assignEquipment(input: AssignEquipmentRequest, options?: RpcOptions): UnaryCall<AssignEquipmentRequest, AssignEquipmentReply> {
        const method = this.methods[6], opt = this._transport.mergeOptions(options);
        return stackIntercept<AssignEquipmentRequest, AssignEquipmentReply>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: UnassignEquipment(UnassignEquipmentRequest) returns (UnassignEquipmentReply);
     */
    unassignEquipment(input: UnassignEquipmentRequest, options?: RpcOptions): UnaryCall<UnassignEquipmentRequest, UnassignEquipmentReply> {
        const method = this.methods[7], opt = this._transport.mergeOptions(options);
        return stackIntercept<UnassignEquipmentRequest, UnassignEquipmentReply>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: TollBatchAssign(TollBatchAssignRequest) returns (TollBatchAssignReply);
     */
    tollBatchAssign(input: TollBatchAssignRequest, options?: RpcOptions): UnaryCall<TollBatchAssignRequest, TollBatchAssignReply> {
        const method = this.methods[8], opt = this._transport.mergeOptions(options);
        return stackIntercept<TollBatchAssignRequest, TollBatchAssignReply>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: TollBatchUnassign(TollBatchUnassignRequest) returns (TollBatchUnassignReply);
     */
    tollBatchUnassign(input: TollBatchUnassignRequest, options?: RpcOptions): UnaryCall<TollBatchUnassignRequest, TollBatchUnassignReply> {
        const method = this.methods[9], opt = this._transport.mergeOptions(options);
        return stackIntercept<TollBatchUnassignRequest, TollBatchUnassignReply>("unary", this._transport, method, opt, input);
    }
}
