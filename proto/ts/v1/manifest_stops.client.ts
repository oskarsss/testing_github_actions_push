// @generated by protobuf-ts 2.9.4 with parameter long_type_number,generate_dependencies,ts_nocheck,output_typescript
// @generated from protobuf file "v1/manifest_stops.proto" (syntax proto3)
// tslint:disable
// @ts-nocheck
import type { RpcTransport } from "@protobuf-ts/runtime-rpc";
import type { ServiceInfo } from "@protobuf-ts/runtime-rpc";
import { ManifestStopsService } from "./manifest_stops";
import type { ManifestStopTakeoutSeparateReply } from "./manifest_stops";
import type { ManifestStopTakeoutSeparateRequest } from "./manifest_stops";
import type { ManifestStopTakeoutReply } from "./manifest_stops";
import type { ManifestStopTakeoutRequest } from "./manifest_stops";
import type { ManifestStopRemoveReply } from "./manifest_stops";
import type { ManifestStopRemoveRequest } from "./manifest_stops";
import type { ManifestStopStatusUpdateReply } from "./manifest_stops";
import type { ManifestStopStatusUpdateRequest } from "./manifest_stops";
import type { ManifestStopUpdateReply } from "./manifest_stops";
import type { ManifestStopUpdateRequest } from "./manifest_stops";
import type { ManifestStopSequenceUpdateReply } from "./manifest_stops";
import type { ManifestStopSequenceUpdateRequest } from "./manifest_stops";
import { stackIntercept } from "@protobuf-ts/runtime-rpc";
import type { ManifestStopAddReply } from "./manifest_stops";
import type { ManifestStopAddRequest } from "./manifest_stops";
import type { UnaryCall } from "@protobuf-ts/runtime-rpc";
import type { RpcOptions } from "@protobuf-ts/runtime-rpc";
/**
 * @generated from protobuf service ManifestStopsService
 */
export interface IManifestStopsServiceClient {
    /**
     * @generated from protobuf rpc: ManifestStopAdd(ManifestStopAddRequest) returns (ManifestStopAddReply);
     */
    manifestStopAdd(input: ManifestStopAddRequest, options?: RpcOptions): UnaryCall<ManifestStopAddRequest, ManifestStopAddReply>;
    /**
     * @generated from protobuf rpc: ManifestStopSequenceUpdate(ManifestStopSequenceUpdateRequest) returns (ManifestStopSequenceUpdateReply);
     */
    manifestStopSequenceUpdate(input: ManifestStopSequenceUpdateRequest, options?: RpcOptions): UnaryCall<ManifestStopSequenceUpdateRequest, ManifestStopSequenceUpdateReply>;
    /**
     * @generated from protobuf rpc: ManifestStopUpdate(ManifestStopUpdateRequest) returns (ManifestStopUpdateReply);
     */
    manifestStopUpdate(input: ManifestStopUpdateRequest, options?: RpcOptions): UnaryCall<ManifestStopUpdateRequest, ManifestStopUpdateReply>;
    /**
     * @generated from protobuf rpc: ManifestStopStatusUpdate(ManifestStopStatusUpdateRequest) returns (ManifestStopStatusUpdateReply);
     */
    manifestStopStatusUpdate(input: ManifestStopStatusUpdateRequest, options?: RpcOptions): UnaryCall<ManifestStopStatusUpdateRequest, ManifestStopStatusUpdateReply>;
    /**
     * @generated from protobuf rpc: ManifestStopRemove(ManifestStopRemoveRequest) returns (ManifestStopRemoveReply);
     */
    manifestStopRemove(input: ManifestStopRemoveRequest, options?: RpcOptions): UnaryCall<ManifestStopRemoveRequest, ManifestStopRemoveReply>;
    /**
     * @generated from protobuf rpc: ManifestStopTakeOut(ManifestStopTakeoutRequest) returns (ManifestStopTakeoutReply);
     */
    manifestStopTakeOut(input: ManifestStopTakeoutRequest, options?: RpcOptions): UnaryCall<ManifestStopTakeoutRequest, ManifestStopTakeoutReply>;
    /**
     * @generated from protobuf rpc: ManifestStopTakeOutSeparate(ManifestStopTakeoutSeparateRequest) returns (ManifestStopTakeoutSeparateReply);
     */
    manifestStopTakeOutSeparate(input: ManifestStopTakeoutSeparateRequest, options?: RpcOptions): UnaryCall<ManifestStopTakeoutSeparateRequest, ManifestStopTakeoutSeparateReply>;
}
/**
 * @generated from protobuf service ManifestStopsService
 */
export class ManifestStopsServiceClient implements IManifestStopsServiceClient, ServiceInfo {
    typeName = ManifestStopsService.typeName;
    methods = ManifestStopsService.methods;
    options = ManifestStopsService.options;
    constructor(private readonly _transport: RpcTransport) {
    }
    /**
     * @generated from protobuf rpc: ManifestStopAdd(ManifestStopAddRequest) returns (ManifestStopAddReply);
     */
    manifestStopAdd(input: ManifestStopAddRequest, options?: RpcOptions): UnaryCall<ManifestStopAddRequest, ManifestStopAddReply> {
        const method = this.methods[0], opt = this._transport.mergeOptions(options);
        return stackIntercept<ManifestStopAddRequest, ManifestStopAddReply>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: ManifestStopSequenceUpdate(ManifestStopSequenceUpdateRequest) returns (ManifestStopSequenceUpdateReply);
     */
    manifestStopSequenceUpdate(input: ManifestStopSequenceUpdateRequest, options?: RpcOptions): UnaryCall<ManifestStopSequenceUpdateRequest, ManifestStopSequenceUpdateReply> {
        const method = this.methods[1], opt = this._transport.mergeOptions(options);
        return stackIntercept<ManifestStopSequenceUpdateRequest, ManifestStopSequenceUpdateReply>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: ManifestStopUpdate(ManifestStopUpdateRequest) returns (ManifestStopUpdateReply);
     */
    manifestStopUpdate(input: ManifestStopUpdateRequest, options?: RpcOptions): UnaryCall<ManifestStopUpdateRequest, ManifestStopUpdateReply> {
        const method = this.methods[2], opt = this._transport.mergeOptions(options);
        return stackIntercept<ManifestStopUpdateRequest, ManifestStopUpdateReply>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: ManifestStopStatusUpdate(ManifestStopStatusUpdateRequest) returns (ManifestStopStatusUpdateReply);
     */
    manifestStopStatusUpdate(input: ManifestStopStatusUpdateRequest, options?: RpcOptions): UnaryCall<ManifestStopStatusUpdateRequest, ManifestStopStatusUpdateReply> {
        const method = this.methods[3], opt = this._transport.mergeOptions(options);
        return stackIntercept<ManifestStopStatusUpdateRequest, ManifestStopStatusUpdateReply>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: ManifestStopRemove(ManifestStopRemoveRequest) returns (ManifestStopRemoveReply);
     */
    manifestStopRemove(input: ManifestStopRemoveRequest, options?: RpcOptions): UnaryCall<ManifestStopRemoveRequest, ManifestStopRemoveReply> {
        const method = this.methods[4], opt = this._transport.mergeOptions(options);
        return stackIntercept<ManifestStopRemoveRequest, ManifestStopRemoveReply>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: ManifestStopTakeOut(ManifestStopTakeoutRequest) returns (ManifestStopTakeoutReply);
     */
    manifestStopTakeOut(input: ManifestStopTakeoutRequest, options?: RpcOptions): UnaryCall<ManifestStopTakeoutRequest, ManifestStopTakeoutReply> {
        const method = this.methods[5], opt = this._transport.mergeOptions(options);
        return stackIntercept<ManifestStopTakeoutRequest, ManifestStopTakeoutReply>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: ManifestStopTakeOutSeparate(ManifestStopTakeoutSeparateRequest) returns (ManifestStopTakeoutSeparateReply);
     */
    manifestStopTakeOutSeparate(input: ManifestStopTakeoutSeparateRequest, options?: RpcOptions): UnaryCall<ManifestStopTakeoutSeparateRequest, ManifestStopTakeoutSeparateReply> {
        const method = this.methods[6], opt = this._transport.mergeOptions(options);
        return stackIntercept<ManifestStopTakeoutSeparateRequest, ManifestStopTakeoutSeparateReply>("unary", this._transport, method, opt, input);
    }
}
