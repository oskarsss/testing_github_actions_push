// @generated by protobuf-ts 2.9.4 with parameter long_type_number,generate_dependencies,ts_nocheck,output_typescript
// @generated from protobuf file "v1/settings.proto" (syntax proto3)
// tslint:disable
// @ts-nocheck
import type { RpcTransport } from "@protobuf-ts/runtime-rpc";
import type { ServiceInfo } from "@protobuf-ts/runtime-rpc";
import { SettingsService } from "./settings";
import type { SettingsUpdateReply } from "./settings";
import type { SettingsUpdateRequest } from "./settings";
import { stackIntercept } from "@protobuf-ts/runtime-rpc";
import type { SettingsRetrieveReply } from "./settings";
import type { SettingsRetrieveRequest } from "./settings";
import type { UnaryCall } from "@protobuf-ts/runtime-rpc";
import type { RpcOptions } from "@protobuf-ts/runtime-rpc";
/**
 * @generated from protobuf service SettingsService
 */
export interface ISettingsServiceClient {
    /**
     * @generated from protobuf rpc: SettingsRetrieve(SettingsRetrieveRequest) returns (SettingsRetrieveReply);
     */
    settingsRetrieve(input: SettingsRetrieveRequest, options?: RpcOptions): UnaryCall<SettingsRetrieveRequest, SettingsRetrieveReply>;
    /**
     * @generated from protobuf rpc: SettingsUpdate(SettingsUpdateRequest) returns (SettingsUpdateReply);
     */
    settingsUpdate(input: SettingsUpdateRequest, options?: RpcOptions): UnaryCall<SettingsUpdateRequest, SettingsUpdateReply>;
}
/**
 * @generated from protobuf service SettingsService
 */
export class SettingsServiceClient implements ISettingsServiceClient, ServiceInfo {
    typeName = SettingsService.typeName;
    methods = SettingsService.methods;
    options = SettingsService.options;
    constructor(private readonly _transport: RpcTransport) {
    }
    /**
     * @generated from protobuf rpc: SettingsRetrieve(SettingsRetrieveRequest) returns (SettingsRetrieveReply);
     */
    settingsRetrieve(input: SettingsRetrieveRequest, options?: RpcOptions): UnaryCall<SettingsRetrieveRequest, SettingsRetrieveReply> {
        const method = this.methods[0], opt = this._transport.mergeOptions(options);
        return stackIntercept<SettingsRetrieveRequest, SettingsRetrieveReply>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: SettingsUpdate(SettingsUpdateRequest) returns (SettingsUpdateReply);
     */
    settingsUpdate(input: SettingsUpdateRequest, options?: RpcOptions): UnaryCall<SettingsUpdateRequest, SettingsUpdateReply> {
        const method = this.methods[1], opt = this._transport.mergeOptions(options);
        return stackIntercept<SettingsUpdateRequest, SettingsUpdateReply>("unary", this._transport, method, opt, input);
    }
}
