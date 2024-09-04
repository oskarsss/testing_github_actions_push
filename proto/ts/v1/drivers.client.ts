// @generated by protobuf-ts 2.9.4 with parameter long_type_number,generate_dependencies,ts_nocheck,output_typescript
// @generated from protobuf file "v1/drivers.proto" (syntax proto3)
// tslint:disable
// @ts-nocheck
import type { RpcTransport } from "@protobuf-ts/runtime-rpc";
import type { ServiceInfo } from "@protobuf-ts/runtime-rpc";
import { DriversService } from "./drivers";
import type { DriverSendSmsReply } from "./drivers";
import type { DriverSendSmsRequest } from "./drivers";
import type { DriverVendorRemoveReply } from "./drivers";
import type { DriverVendorRemoveRequest } from "./drivers";
import type { DriverVendorAssignReply } from "./drivers";
import type { DriverVendorAssignRequest } from "./drivers";
import type { DriverUserRemoveReply } from "./drivers";
import type { DriverUserRemoveRequest } from "./drivers";
import type { DriverUserAssignReply } from "./drivers";
import type { DriverUserAssignRequest } from "./drivers";
import type { DriverNoteUpdateReply } from "./drivers";
import type { DriverNoteUpdateRequest } from "./drivers";
import type { DriverDeviceGetReply } from "./drivers";
import type { DriverDeviceGetRequest } from "./drivers";
import type { DriverSelfieUploadReply } from "./drivers";
import type { DriverSelfieUploadRequest } from "./drivers";
import type { DriverCreateReply } from "./drivers";
import type { DriverCreateRequest } from "./drivers";
import type { DriverStatsRetrieveReply } from "./drivers";
import type { DriverStatsRetrieveRequest } from "./drivers";
import type { DriverRetrieveReply } from "./drivers";
import type { DriverRetrieveRequest } from "./drivers";
import type { DriverGetReply } from "./drivers";
import type { DriverGetRequest } from "./drivers";
import type { DriverUpdateReply } from "./drivers";
import type { DriverUpdateRequest } from "./drivers";
import type { DriverInsuranceEndorsedReply } from "./drivers";
import type { DriverInsuranceEndorsedRequest } from "./drivers";
import type { DriverStatusUpdateReply } from "./drivers";
import type { DriverStatusUpdateRequest } from "./drivers";
import type { DriverDeleteReply } from "./drivers";
import type { DriverDeleteRequest } from "./drivers";
import { stackIntercept } from "@protobuf-ts/runtime-rpc";
import type { SendDriverInviteReply } from "./drivers";
import type { SendDriverInviteRequest } from "./drivers";
import type { UnaryCall } from "@protobuf-ts/runtime-rpc";
import type { RpcOptions } from "@protobuf-ts/runtime-rpc";
/**
 * @generated from protobuf service DriversService
 */
export interface IDriversServiceClient {
    /**
     * @generated from protobuf rpc: SendDriverInvite(SendDriverInviteRequest) returns (SendDriverInviteReply);
     */
    sendDriverInvite(input: SendDriverInviteRequest, options?: RpcOptions): UnaryCall<SendDriverInviteRequest, SendDriverInviteReply>;
    /**
     * @generated from protobuf rpc: DriverDelete(DriverDeleteRequest) returns (DriverDeleteReply);
     */
    driverDelete(input: DriverDeleteRequest, options?: RpcOptions): UnaryCall<DriverDeleteRequest, DriverDeleteReply>;
    /**
     * @generated from protobuf rpc: DriverStatusUpdate(DriverStatusUpdateRequest) returns (DriverStatusUpdateReply);
     */
    driverStatusUpdate(input: DriverStatusUpdateRequest, options?: RpcOptions): UnaryCall<DriverStatusUpdateRequest, DriverStatusUpdateReply>;
    /**
     * @generated from protobuf rpc: DriverInsuranceEndorsedUpdate(DriverInsuranceEndorsedRequest) returns (DriverInsuranceEndorsedReply);
     */
    driverInsuranceEndorsedUpdate(input: DriverInsuranceEndorsedRequest, options?: RpcOptions): UnaryCall<DriverInsuranceEndorsedRequest, DriverInsuranceEndorsedReply>;
    /**
     * @generated from protobuf rpc: DriverUpdate(DriverUpdateRequest) returns (DriverUpdateReply);
     */
    driverUpdate(input: DriverUpdateRequest, options?: RpcOptions): UnaryCall<DriverUpdateRequest, DriverUpdateReply>;
    /**
     * @generated from protobuf rpc: DriverGet(DriverGetRequest) returns (DriverGetReply);
     */
    driverGet(input: DriverGetRequest, options?: RpcOptions): UnaryCall<DriverGetRequest, DriverGetReply>;
    /**
     * @generated from protobuf rpc: DriverRetrieve(DriverRetrieveRequest) returns (DriverRetrieveReply);
     */
    driverRetrieve(input: DriverRetrieveRequest, options?: RpcOptions): UnaryCall<DriverRetrieveRequest, DriverRetrieveReply>;
    /**
     * @generated from protobuf rpc: DriverStatsRetrieve(DriverStatsRetrieveRequest) returns (DriverStatsRetrieveReply);
     */
    driverStatsRetrieve(input: DriverStatsRetrieveRequest, options?: RpcOptions): UnaryCall<DriverStatsRetrieveRequest, DriverStatsRetrieveReply>;
    /**
     * @generated from protobuf rpc: DriverCreate(DriverCreateRequest) returns (DriverCreateReply);
     */
    driverCreate(input: DriverCreateRequest, options?: RpcOptions): UnaryCall<DriverCreateRequest, DriverCreateReply>;
    /**
     * @generated from protobuf rpc: DriverSelfieUpload(DriverSelfieUploadRequest) returns (DriverSelfieUploadReply);
     */
    driverSelfieUpload(input: DriverSelfieUploadRequest, options?: RpcOptions): UnaryCall<DriverSelfieUploadRequest, DriverSelfieUploadReply>;
    /**
     * @generated from protobuf rpc: DriverDeviceGet(DriverDeviceGetRequest) returns (DriverDeviceGetReply);
     */
    driverDeviceGet(input: DriverDeviceGetRequest, options?: RpcOptions): UnaryCall<DriverDeviceGetRequest, DriverDeviceGetReply>;
    /**
     * @generated from protobuf rpc: DriverNoteUpdate(DriverNoteUpdateRequest) returns (DriverNoteUpdateReply);
     */
    driverNoteUpdate(input: DriverNoteUpdateRequest, options?: RpcOptions): UnaryCall<DriverNoteUpdateRequest, DriverNoteUpdateReply>;
    /**
     * @generated from protobuf rpc: DriverUserAssign(DriverUserAssignRequest) returns (DriverUserAssignReply);
     */
    driverUserAssign(input: DriverUserAssignRequest, options?: RpcOptions): UnaryCall<DriverUserAssignRequest, DriverUserAssignReply>;
    /**
     * @generated from protobuf rpc: DriverUserRemove(DriverUserRemoveRequest) returns (DriverUserRemoveReply);
     */
    driverUserRemove(input: DriverUserRemoveRequest, options?: RpcOptions): UnaryCall<DriverUserRemoveRequest, DriverUserRemoveReply>;
    /**
     * @generated from protobuf rpc: DriverVendorAssign(DriverVendorAssignRequest) returns (DriverVendorAssignReply);
     */
    driverVendorAssign(input: DriverVendorAssignRequest, options?: RpcOptions): UnaryCall<DriverVendorAssignRequest, DriverVendorAssignReply>;
    /**
     * @generated from protobuf rpc: DriverVendorRemove(DriverVendorRemoveRequest) returns (DriverVendorRemoveReply);
     */
    driverVendorRemove(input: DriverVendorRemoveRequest, options?: RpcOptions): UnaryCall<DriverVendorRemoveRequest, DriverVendorRemoveReply>;
    /**
     * @generated from protobuf rpc: DriverSendSms(DriverSendSmsRequest) returns (DriverSendSmsReply);
     */
    driverSendSms(input: DriverSendSmsRequest, options?: RpcOptions): UnaryCall<DriverSendSmsRequest, DriverSendSmsReply>;
}
/**
 * @generated from protobuf service DriversService
 */
export class DriversServiceClient implements IDriversServiceClient, ServiceInfo {
    typeName = DriversService.typeName;
    methods = DriversService.methods;
    options = DriversService.options;
    constructor(private readonly _transport: RpcTransport) {
    }
    /**
     * @generated from protobuf rpc: SendDriverInvite(SendDriverInviteRequest) returns (SendDriverInviteReply);
     */
    sendDriverInvite(input: SendDriverInviteRequest, options?: RpcOptions): UnaryCall<SendDriverInviteRequest, SendDriverInviteReply> {
        const method = this.methods[0], opt = this._transport.mergeOptions(options);
        return stackIntercept<SendDriverInviteRequest, SendDriverInviteReply>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: DriverDelete(DriverDeleteRequest) returns (DriverDeleteReply);
     */
    driverDelete(input: DriverDeleteRequest, options?: RpcOptions): UnaryCall<DriverDeleteRequest, DriverDeleteReply> {
        const method = this.methods[1], opt = this._transport.mergeOptions(options);
        return stackIntercept<DriverDeleteRequest, DriverDeleteReply>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: DriverStatusUpdate(DriverStatusUpdateRequest) returns (DriverStatusUpdateReply);
     */
    driverStatusUpdate(input: DriverStatusUpdateRequest, options?: RpcOptions): UnaryCall<DriverStatusUpdateRequest, DriverStatusUpdateReply> {
        const method = this.methods[2], opt = this._transport.mergeOptions(options);
        return stackIntercept<DriverStatusUpdateRequest, DriverStatusUpdateReply>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: DriverInsuranceEndorsedUpdate(DriverInsuranceEndorsedRequest) returns (DriverInsuranceEndorsedReply);
     */
    driverInsuranceEndorsedUpdate(input: DriverInsuranceEndorsedRequest, options?: RpcOptions): UnaryCall<DriverInsuranceEndorsedRequest, DriverInsuranceEndorsedReply> {
        const method = this.methods[3], opt = this._transport.mergeOptions(options);
        return stackIntercept<DriverInsuranceEndorsedRequest, DriverInsuranceEndorsedReply>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: DriverUpdate(DriverUpdateRequest) returns (DriverUpdateReply);
     */
    driverUpdate(input: DriverUpdateRequest, options?: RpcOptions): UnaryCall<DriverUpdateRequest, DriverUpdateReply> {
        const method = this.methods[4], opt = this._transport.mergeOptions(options);
        return stackIntercept<DriverUpdateRequest, DriverUpdateReply>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: DriverGet(DriverGetRequest) returns (DriverGetReply);
     */
    driverGet(input: DriverGetRequest, options?: RpcOptions): UnaryCall<DriverGetRequest, DriverGetReply> {
        const method = this.methods[5], opt = this._transport.mergeOptions(options);
        return stackIntercept<DriverGetRequest, DriverGetReply>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: DriverRetrieve(DriverRetrieveRequest) returns (DriverRetrieveReply);
     */
    driverRetrieve(input: DriverRetrieveRequest, options?: RpcOptions): UnaryCall<DriverRetrieveRequest, DriverRetrieveReply> {
        const method = this.methods[6], opt = this._transport.mergeOptions(options);
        return stackIntercept<DriverRetrieveRequest, DriverRetrieveReply>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: DriverStatsRetrieve(DriverStatsRetrieveRequest) returns (DriverStatsRetrieveReply);
     */
    driverStatsRetrieve(input: DriverStatsRetrieveRequest, options?: RpcOptions): UnaryCall<DriverStatsRetrieveRequest, DriverStatsRetrieveReply> {
        const method = this.methods[7], opt = this._transport.mergeOptions(options);
        return stackIntercept<DriverStatsRetrieveRequest, DriverStatsRetrieveReply>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: DriverCreate(DriverCreateRequest) returns (DriverCreateReply);
     */
    driverCreate(input: DriverCreateRequest, options?: RpcOptions): UnaryCall<DriverCreateRequest, DriverCreateReply> {
        const method = this.methods[8], opt = this._transport.mergeOptions(options);
        return stackIntercept<DriverCreateRequest, DriverCreateReply>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: DriverSelfieUpload(DriverSelfieUploadRequest) returns (DriverSelfieUploadReply);
     */
    driverSelfieUpload(input: DriverSelfieUploadRequest, options?: RpcOptions): UnaryCall<DriverSelfieUploadRequest, DriverSelfieUploadReply> {
        const method = this.methods[9], opt = this._transport.mergeOptions(options);
        return stackIntercept<DriverSelfieUploadRequest, DriverSelfieUploadReply>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: DriverDeviceGet(DriverDeviceGetRequest) returns (DriverDeviceGetReply);
     */
    driverDeviceGet(input: DriverDeviceGetRequest, options?: RpcOptions): UnaryCall<DriverDeviceGetRequest, DriverDeviceGetReply> {
        const method = this.methods[10], opt = this._transport.mergeOptions(options);
        return stackIntercept<DriverDeviceGetRequest, DriverDeviceGetReply>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: DriverNoteUpdate(DriverNoteUpdateRequest) returns (DriverNoteUpdateReply);
     */
    driverNoteUpdate(input: DriverNoteUpdateRequest, options?: RpcOptions): UnaryCall<DriverNoteUpdateRequest, DriverNoteUpdateReply> {
        const method = this.methods[11], opt = this._transport.mergeOptions(options);
        return stackIntercept<DriverNoteUpdateRequest, DriverNoteUpdateReply>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: DriverUserAssign(DriverUserAssignRequest) returns (DriverUserAssignReply);
     */
    driverUserAssign(input: DriverUserAssignRequest, options?: RpcOptions): UnaryCall<DriverUserAssignRequest, DriverUserAssignReply> {
        const method = this.methods[12], opt = this._transport.mergeOptions(options);
        return stackIntercept<DriverUserAssignRequest, DriverUserAssignReply>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: DriverUserRemove(DriverUserRemoveRequest) returns (DriverUserRemoveReply);
     */
    driverUserRemove(input: DriverUserRemoveRequest, options?: RpcOptions): UnaryCall<DriverUserRemoveRequest, DriverUserRemoveReply> {
        const method = this.methods[13], opt = this._transport.mergeOptions(options);
        return stackIntercept<DriverUserRemoveRequest, DriverUserRemoveReply>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: DriverVendorAssign(DriverVendorAssignRequest) returns (DriverVendorAssignReply);
     */
    driverVendorAssign(input: DriverVendorAssignRequest, options?: RpcOptions): UnaryCall<DriverVendorAssignRequest, DriverVendorAssignReply> {
        const method = this.methods[14], opt = this._transport.mergeOptions(options);
        return stackIntercept<DriverVendorAssignRequest, DriverVendorAssignReply>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: DriverVendorRemove(DriverVendorRemoveRequest) returns (DriverVendorRemoveReply);
     */
    driverVendorRemove(input: DriverVendorRemoveRequest, options?: RpcOptions): UnaryCall<DriverVendorRemoveRequest, DriverVendorRemoveReply> {
        const method = this.methods[15], opt = this._transport.mergeOptions(options);
        return stackIntercept<DriverVendorRemoveRequest, DriverVendorRemoveReply>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: DriverSendSms(DriverSendSmsRequest) returns (DriverSendSmsReply);
     */
    driverSendSms(input: DriverSendSmsRequest, options?: RpcOptions): UnaryCall<DriverSendSmsRequest, DriverSendSmsReply> {
        const method = this.methods[16], opt = this._transport.mergeOptions(options);
        return stackIntercept<DriverSendSmsRequest, DriverSendSmsReply>("unary", this._transport, method, opt, input);
    }
}
