// @generated by protobuf-ts 2.9.4 with parameter long_type_number,generate_dependencies,ts_nocheck,output_typescript
// @generated from protobuf file "v1/settlement.recurring_transaction.proto" (syntax proto3)
// tslint:disable
// @ts-nocheck
import type { RpcTransport } from "@protobuf-ts/runtime-rpc";
import type { ServiceInfo } from "@protobuf-ts/runtime-rpc";
import { SettlementRecurringTransactionService } from "./settlement.recurring_transaction";
import type { SettlementRecurringTransactionDeleteReply } from "./settlement.recurring_transaction";
import type { SettlementRecurringTransactionDeleteRequest } from "./settlement.recurring_transaction";
import type { SettlementRecurringTransactionCreateReply } from "./settlement.recurring_transaction";
import type { SettlementRecurringTransactionCreateRequest } from "./settlement.recurring_transaction";
import type { SettlementRecurringTransactionStatusUpdateReply } from "./settlement.recurring_transaction";
import type { SettlementRecurringTransactionStatusUpdateRequest } from "./settlement.recurring_transaction";
import type { SettlementRecurringTransactionUpdateReply } from "./settlement.recurring_transaction";
import type { SettlementRecurringTransactionUpdateRequest } from "./settlement.recurring_transaction";
import type { SettlementRecurringTransactionRetrieveReply } from "./settlement.recurring_transaction";
import type { SettlementRecurringTransactionRetrieveRequest } from "./settlement.recurring_transaction";
import { stackIntercept } from "@protobuf-ts/runtime-rpc";
import type { SettlementRecurringTransactionGetReply } from "./settlement.recurring_transaction";
import type { SettlementRecurringTransactionGetRequest } from "./settlement.recurring_transaction";
import type { UnaryCall } from "@protobuf-ts/runtime-rpc";
import type { RpcOptions } from "@protobuf-ts/runtime-rpc";
/**
 * @generated from protobuf service SettlementRecurringTransactionService
 */
export interface ISettlementRecurringTransactionServiceClient {
    /**
     * @generated from protobuf rpc: SettlementRecurringTransactionGet(SettlementRecurringTransactionGetRequest) returns (SettlementRecurringTransactionGetReply);
     */
    settlementRecurringTransactionGet(input: SettlementRecurringTransactionGetRequest, options?: RpcOptions): UnaryCall<SettlementRecurringTransactionGetRequest, SettlementRecurringTransactionGetReply>;
    /**
     * @generated from protobuf rpc: SettlementRecurringTransactionRetrieve(SettlementRecurringTransactionRetrieveRequest) returns (SettlementRecurringTransactionRetrieveReply);
     */
    settlementRecurringTransactionRetrieve(input: SettlementRecurringTransactionRetrieveRequest, options?: RpcOptions): UnaryCall<SettlementRecurringTransactionRetrieveRequest, SettlementRecurringTransactionRetrieveReply>;
    /**
     * @generated from protobuf rpc: SettlementRecurringTransactionUpdate(SettlementRecurringTransactionUpdateRequest) returns (SettlementRecurringTransactionUpdateReply);
     */
    settlementRecurringTransactionUpdate(input: SettlementRecurringTransactionUpdateRequest, options?: RpcOptions): UnaryCall<SettlementRecurringTransactionUpdateRequest, SettlementRecurringTransactionUpdateReply>;
    /**
     * @generated from protobuf rpc: SettlementRecurringTransactionStatusUpdate(SettlementRecurringTransactionStatusUpdateRequest) returns (SettlementRecurringTransactionStatusUpdateReply);
     */
    settlementRecurringTransactionStatusUpdate(input: SettlementRecurringTransactionStatusUpdateRequest, options?: RpcOptions): UnaryCall<SettlementRecurringTransactionStatusUpdateRequest, SettlementRecurringTransactionStatusUpdateReply>;
    /**
     * @generated from protobuf rpc: SettlementRecurringTransactionCreate(SettlementRecurringTransactionCreateRequest) returns (SettlementRecurringTransactionCreateReply);
     */
    settlementRecurringTransactionCreate(input: SettlementRecurringTransactionCreateRequest, options?: RpcOptions): UnaryCall<SettlementRecurringTransactionCreateRequest, SettlementRecurringTransactionCreateReply>;
    /**
     * @generated from protobuf rpc: SettlementRecurringTransactionDelete(SettlementRecurringTransactionDeleteRequest) returns (SettlementRecurringTransactionDeleteReply);
     */
    settlementRecurringTransactionDelete(input: SettlementRecurringTransactionDeleteRequest, options?: RpcOptions): UnaryCall<SettlementRecurringTransactionDeleteRequest, SettlementRecurringTransactionDeleteReply>;
}
/**
 * @generated from protobuf service SettlementRecurringTransactionService
 */
export class SettlementRecurringTransactionServiceClient implements ISettlementRecurringTransactionServiceClient, ServiceInfo {
    typeName = SettlementRecurringTransactionService.typeName;
    methods = SettlementRecurringTransactionService.methods;
    options = SettlementRecurringTransactionService.options;
    constructor(private readonly _transport: RpcTransport) {
    }
    /**
     * @generated from protobuf rpc: SettlementRecurringTransactionGet(SettlementRecurringTransactionGetRequest) returns (SettlementRecurringTransactionGetReply);
     */
    settlementRecurringTransactionGet(input: SettlementRecurringTransactionGetRequest, options?: RpcOptions): UnaryCall<SettlementRecurringTransactionGetRequest, SettlementRecurringTransactionGetReply> {
        const method = this.methods[0], opt = this._transport.mergeOptions(options);
        return stackIntercept<SettlementRecurringTransactionGetRequest, SettlementRecurringTransactionGetReply>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: SettlementRecurringTransactionRetrieve(SettlementRecurringTransactionRetrieveRequest) returns (SettlementRecurringTransactionRetrieveReply);
     */
    settlementRecurringTransactionRetrieve(input: SettlementRecurringTransactionRetrieveRequest, options?: RpcOptions): UnaryCall<SettlementRecurringTransactionRetrieveRequest, SettlementRecurringTransactionRetrieveReply> {
        const method = this.methods[1], opt = this._transport.mergeOptions(options);
        return stackIntercept<SettlementRecurringTransactionRetrieveRequest, SettlementRecurringTransactionRetrieveReply>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: SettlementRecurringTransactionUpdate(SettlementRecurringTransactionUpdateRequest) returns (SettlementRecurringTransactionUpdateReply);
     */
    settlementRecurringTransactionUpdate(input: SettlementRecurringTransactionUpdateRequest, options?: RpcOptions): UnaryCall<SettlementRecurringTransactionUpdateRequest, SettlementRecurringTransactionUpdateReply> {
        const method = this.methods[2], opt = this._transport.mergeOptions(options);
        return stackIntercept<SettlementRecurringTransactionUpdateRequest, SettlementRecurringTransactionUpdateReply>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: SettlementRecurringTransactionStatusUpdate(SettlementRecurringTransactionStatusUpdateRequest) returns (SettlementRecurringTransactionStatusUpdateReply);
     */
    settlementRecurringTransactionStatusUpdate(input: SettlementRecurringTransactionStatusUpdateRequest, options?: RpcOptions): UnaryCall<SettlementRecurringTransactionStatusUpdateRequest, SettlementRecurringTransactionStatusUpdateReply> {
        const method = this.methods[3], opt = this._transport.mergeOptions(options);
        return stackIntercept<SettlementRecurringTransactionStatusUpdateRequest, SettlementRecurringTransactionStatusUpdateReply>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: SettlementRecurringTransactionCreate(SettlementRecurringTransactionCreateRequest) returns (SettlementRecurringTransactionCreateReply);
     */
    settlementRecurringTransactionCreate(input: SettlementRecurringTransactionCreateRequest, options?: RpcOptions): UnaryCall<SettlementRecurringTransactionCreateRequest, SettlementRecurringTransactionCreateReply> {
        const method = this.methods[4], opt = this._transport.mergeOptions(options);
        return stackIntercept<SettlementRecurringTransactionCreateRequest, SettlementRecurringTransactionCreateReply>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: SettlementRecurringTransactionDelete(SettlementRecurringTransactionDeleteRequest) returns (SettlementRecurringTransactionDeleteReply);
     */
    settlementRecurringTransactionDelete(input: SettlementRecurringTransactionDeleteRequest, options?: RpcOptions): UnaryCall<SettlementRecurringTransactionDeleteRequest, SettlementRecurringTransactionDeleteReply> {
        const method = this.methods[5], opt = this._transport.mergeOptions(options);
        return stackIntercept<SettlementRecurringTransactionDeleteRequest, SettlementRecurringTransactionDeleteReply>("unary", this._transport, method, opt, input);
    }
}
