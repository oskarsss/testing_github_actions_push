// @generated by protobuf-ts 2.9.4 with parameter long_type_number,generate_dependencies,ts_nocheck,output_typescript
// @generated from protobuf file "v1/integration_provider_wex.proto" (syntax proto3)
// tslint:disable
// @ts-nocheck
import { ServiceType } from "@protobuf-ts/runtime-rpc";
import { WireType } from "@protobuf-ts/runtime";
import type { BinaryWriteOptions } from "@protobuf-ts/runtime";
import type { IBinaryWriter } from "@protobuf-ts/runtime";
import { UnknownFieldHandler } from "@protobuf-ts/runtime";
import type { BinaryReadOptions } from "@protobuf-ts/runtime";
import type { IBinaryReader } from "@protobuf-ts/runtime";
import type { PartialMessage } from "@protobuf-ts/runtime";
import { reflectionMergePartial } from "@protobuf-ts/runtime";
import { MessageType } from "@protobuf-ts/runtime";
/**
 * @generated from protobuf message IP_Wex_TransactionTypeGetRequest
 */
export interface IP_Wex_TransactionTypeGetRequest {
}
/**
 * @generated from protobuf message WexTransactionType
 */
export interface WexTransactionType {
    /**
     * @generated from protobuf field: string tranasction_type_id = 1;
     */
    tranasctionTypeId: string;
    /**
     * @generated from protobuf field: string name = 2;
     */
    name: string;
    /**
     * @generated from protobuf field: bool auto_import = 3;
     */
    autoImport: boolean;
}
/**
 * @generated from protobuf message IP_Wex_TransactionTypeGetReply
 */
export interface IP_Wex_TransactionTypeGetReply {
    /**
     * @generated from protobuf field: repeated WexTransactionType wex_transaction_types = 1;
     */
    wexTransactionTypes: WexTransactionType[];
}
/**
 * @generated from protobuf message IP_Wex_TranasctionTypeUpdateRequest
 */
export interface IP_Wex_TranasctionTypeUpdateRequest {
    /**
     * @generated from protobuf field: IP_Wex_TranasctionTypeUpdateRequest.WexTransactionTypeUpdate wex_transaction_type = 1;
     */
    wexTransactionType?: IP_Wex_TranasctionTypeUpdateRequest_WexTransactionTypeUpdate;
}
/**
 * @generated from protobuf message IP_Wex_TranasctionTypeUpdateRequest.WexTransactionTypeUpdate
 */
export interface IP_Wex_TranasctionTypeUpdateRequest_WexTransactionTypeUpdate {
    /**
     * @generated from protobuf field: string tranasction_type_id = 1;
     */
    tranasctionTypeId: string;
    /**
     * @generated from protobuf field: bool auto_import = 2;
     */
    autoImport: boolean;
}
/**
 * @generated from protobuf message IP_Wex_TranasctionTypeUpdateReply
 */
export interface IP_Wex_TranasctionTypeUpdateReply {
}
// @generated message type with reflection information, may provide speed optimized methods
class IP_Wex_TransactionTypeGetRequest$Type extends MessageType<IP_Wex_TransactionTypeGetRequest> {
    constructor() {
        super("IP_Wex_TransactionTypeGetRequest", []);
    }
    create(value?: PartialMessage<IP_Wex_TransactionTypeGetRequest>): IP_Wex_TransactionTypeGetRequest {
        const message = globalThis.Object.create((this.messagePrototype!));
        if (value !== undefined)
            reflectionMergePartial<IP_Wex_TransactionTypeGetRequest>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: IP_Wex_TransactionTypeGetRequest): IP_Wex_TransactionTypeGetRequest {
        return target ?? this.create();
    }
    internalBinaryWrite(message: IP_Wex_TransactionTypeGetRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message IP_Wex_TransactionTypeGetRequest
 */
export const IP_Wex_TransactionTypeGetRequest = new IP_Wex_TransactionTypeGetRequest$Type();
// @generated message type with reflection information, may provide speed optimized methods
class WexTransactionType$Type extends MessageType<WexTransactionType> {
    constructor() {
        super("WexTransactionType", [
            { no: 1, name: "tranasction_type_id", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "name", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 3, name: "auto_import", kind: "scalar", T: 8 /*ScalarType.BOOL*/ }
        ]);
    }
    create(value?: PartialMessage<WexTransactionType>): WexTransactionType {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.tranasctionTypeId = "";
        message.name = "";
        message.autoImport = false;
        if (value !== undefined)
            reflectionMergePartial<WexTransactionType>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: WexTransactionType): WexTransactionType {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* string tranasction_type_id */ 1:
                    message.tranasctionTypeId = reader.string();
                    break;
                case /* string name */ 2:
                    message.name = reader.string();
                    break;
                case /* bool auto_import */ 3:
                    message.autoImport = reader.bool();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: WexTransactionType, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* string tranasction_type_id = 1; */
        if (message.tranasctionTypeId !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.tranasctionTypeId);
        /* string name = 2; */
        if (message.name !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.name);
        /* bool auto_import = 3; */
        if (message.autoImport !== false)
            writer.tag(3, WireType.Varint).bool(message.autoImport);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message WexTransactionType
 */
export const WexTransactionType = new WexTransactionType$Type();
// @generated message type with reflection information, may provide speed optimized methods
class IP_Wex_TransactionTypeGetReply$Type extends MessageType<IP_Wex_TransactionTypeGetReply> {
    constructor() {
        super("IP_Wex_TransactionTypeGetReply", [
            { no: 1, name: "wex_transaction_types", kind: "message", repeat: 1 /*RepeatType.PACKED*/, T: () => WexTransactionType }
        ]);
    }
    create(value?: PartialMessage<IP_Wex_TransactionTypeGetReply>): IP_Wex_TransactionTypeGetReply {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.wexTransactionTypes = [];
        if (value !== undefined)
            reflectionMergePartial<IP_Wex_TransactionTypeGetReply>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: IP_Wex_TransactionTypeGetReply): IP_Wex_TransactionTypeGetReply {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* repeated WexTransactionType wex_transaction_types */ 1:
                    message.wexTransactionTypes.push(WexTransactionType.internalBinaryRead(reader, reader.uint32(), options));
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: IP_Wex_TransactionTypeGetReply, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* repeated WexTransactionType wex_transaction_types = 1; */
        for (let i = 0; i < message.wexTransactionTypes.length; i++)
            WexTransactionType.internalBinaryWrite(message.wexTransactionTypes[i], writer.tag(1, WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message IP_Wex_TransactionTypeGetReply
 */
export const IP_Wex_TransactionTypeGetReply = new IP_Wex_TransactionTypeGetReply$Type();
// @generated message type with reflection information, may provide speed optimized methods
class IP_Wex_TranasctionTypeUpdateRequest$Type extends MessageType<IP_Wex_TranasctionTypeUpdateRequest> {
    constructor() {
        super("IP_Wex_TranasctionTypeUpdateRequest", [
            { no: 1, name: "wex_transaction_type", kind: "message", T: () => IP_Wex_TranasctionTypeUpdateRequest_WexTransactionTypeUpdate }
        ]);
    }
    create(value?: PartialMessage<IP_Wex_TranasctionTypeUpdateRequest>): IP_Wex_TranasctionTypeUpdateRequest {
        const message = globalThis.Object.create((this.messagePrototype!));
        if (value !== undefined)
            reflectionMergePartial<IP_Wex_TranasctionTypeUpdateRequest>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: IP_Wex_TranasctionTypeUpdateRequest): IP_Wex_TranasctionTypeUpdateRequest {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* IP_Wex_TranasctionTypeUpdateRequest.WexTransactionTypeUpdate wex_transaction_type */ 1:
                    message.wexTransactionType = IP_Wex_TranasctionTypeUpdateRequest_WexTransactionTypeUpdate.internalBinaryRead(reader, reader.uint32(), options, message.wexTransactionType);
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: IP_Wex_TranasctionTypeUpdateRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* IP_Wex_TranasctionTypeUpdateRequest.WexTransactionTypeUpdate wex_transaction_type = 1; */
        if (message.wexTransactionType)
            IP_Wex_TranasctionTypeUpdateRequest_WexTransactionTypeUpdate.internalBinaryWrite(message.wexTransactionType, writer.tag(1, WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message IP_Wex_TranasctionTypeUpdateRequest
 */
export const IP_Wex_TranasctionTypeUpdateRequest = new IP_Wex_TranasctionTypeUpdateRequest$Type();
// @generated message type with reflection information, may provide speed optimized methods
class IP_Wex_TranasctionTypeUpdateRequest_WexTransactionTypeUpdate$Type extends MessageType<IP_Wex_TranasctionTypeUpdateRequest_WexTransactionTypeUpdate> {
    constructor() {
        super("IP_Wex_TranasctionTypeUpdateRequest.WexTransactionTypeUpdate", [
            { no: 1, name: "tranasction_type_id", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "auto_import", kind: "scalar", T: 8 /*ScalarType.BOOL*/ }
        ]);
    }
    create(value?: PartialMessage<IP_Wex_TranasctionTypeUpdateRequest_WexTransactionTypeUpdate>): IP_Wex_TranasctionTypeUpdateRequest_WexTransactionTypeUpdate {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.tranasctionTypeId = "";
        message.autoImport = false;
        if (value !== undefined)
            reflectionMergePartial<IP_Wex_TranasctionTypeUpdateRequest_WexTransactionTypeUpdate>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: IP_Wex_TranasctionTypeUpdateRequest_WexTransactionTypeUpdate): IP_Wex_TranasctionTypeUpdateRequest_WexTransactionTypeUpdate {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* string tranasction_type_id */ 1:
                    message.tranasctionTypeId = reader.string();
                    break;
                case /* bool auto_import */ 2:
                    message.autoImport = reader.bool();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: IP_Wex_TranasctionTypeUpdateRequest_WexTransactionTypeUpdate, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* string tranasction_type_id = 1; */
        if (message.tranasctionTypeId !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.tranasctionTypeId);
        /* bool auto_import = 2; */
        if (message.autoImport !== false)
            writer.tag(2, WireType.Varint).bool(message.autoImport);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message IP_Wex_TranasctionTypeUpdateRequest.WexTransactionTypeUpdate
 */
export const IP_Wex_TranasctionTypeUpdateRequest_WexTransactionTypeUpdate = new IP_Wex_TranasctionTypeUpdateRequest_WexTransactionTypeUpdate$Type();
// @generated message type with reflection information, may provide speed optimized methods
class IP_Wex_TranasctionTypeUpdateReply$Type extends MessageType<IP_Wex_TranasctionTypeUpdateReply> {
    constructor() {
        super("IP_Wex_TranasctionTypeUpdateReply", []);
    }
    create(value?: PartialMessage<IP_Wex_TranasctionTypeUpdateReply>): IP_Wex_TranasctionTypeUpdateReply {
        const message = globalThis.Object.create((this.messagePrototype!));
        if (value !== undefined)
            reflectionMergePartial<IP_Wex_TranasctionTypeUpdateReply>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: IP_Wex_TranasctionTypeUpdateReply): IP_Wex_TranasctionTypeUpdateReply {
        return target ?? this.create();
    }
    internalBinaryWrite(message: IP_Wex_TranasctionTypeUpdateReply, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message IP_Wex_TranasctionTypeUpdateReply
 */
export const IP_Wex_TranasctionTypeUpdateReply = new IP_Wex_TranasctionTypeUpdateReply$Type();
/**
 * @generated ServiceType for protobuf service IntegrationProviderWex
 */
export const IntegrationProviderWex = new ServiceType("IntegrationProviderWex", [
    { name: "IP_Wex_TransactionTypeGet", options: {}, I: IP_Wex_TransactionTypeGetRequest, O: IP_Wex_TransactionTypeGetReply },
    { name: "IP_Wex_TranasctionTypeUpdate", options: {}, I: IP_Wex_TranasctionTypeUpdateRequest, O: IP_Wex_TranasctionTypeUpdateReply }
]);
