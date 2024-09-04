// @generated by protobuf-ts 2.9.4 with parameter long_type_number,generate_dependencies,ts_nocheck,output_typescript
// @generated from protobuf file "v1/factoring_companies.proto" (syntax proto3)
// tslint:disable
// @ts-nocheck
import { ServiceType } from "@protobuf-ts/runtime-rpc";
import type { BinaryWriteOptions } from "@protobuf-ts/runtime";
import type { IBinaryWriter } from "@protobuf-ts/runtime";
import { WireType } from "@protobuf-ts/runtime";
import type { BinaryReadOptions } from "@protobuf-ts/runtime";
import type { IBinaryReader } from "@protobuf-ts/runtime";
import { UnknownFieldHandler } from "@protobuf-ts/runtime";
import type { PartialMessage } from "@protobuf-ts/runtime";
import { reflectionMergePartial } from "@protobuf-ts/runtime";
import { MessageType } from "@protobuf-ts/runtime";
import { FactoringCompanyModel } from "./models/model_factoring_company";
import { FactoringCompanyModel_Address } from "./models/model_factoring_company";
/**
 * FactoringCompanyCreate
 *
 * @generated from protobuf message FactoringCompanyCreateRequest
 */
export interface FactoringCompanyCreateRequest {
    /**
     * required, max len 256
     *
     * @generated from protobuf field: string name = 1;
     */
    name: string;
    /**
     * @generated from protobuf field: double fee_percentage = 2;
     */
    feePercentage: number;
    /**
     * in format date only "2006-01-02".
     *
     * @generated from protobuf field: string contract_end_at = 3;
     */
    contractEndAt: string;
    /**
     * in format datetime "2006-01-02 15:04:05"
     *
     * @generated from protobuf field: string cutoff_time = 4;
     */
    cutoffTime: string;
    /**
     * max len 1024
     *
     * @generated from protobuf field: string note = 5;
     */
    note: string;
    /**
     * @generated from protobuf field: string phone = 6;
     */
    phone: string;
    /**
     * @generated from protobuf field: string fax = 7;
     */
    fax: string;
    /**
     * @generated from protobuf field: string ein = 8;
     */
    ein: string;
    /**
     * @generated from protobuf field: string noa_file_id = 9;
     */
    noaFileId: string;
    /**
     * @generated from protobuf field: string logo_file_id = 10;
     */
    logoFileId: string;
    /**
     * @generated from protobuf field: FactoringCompanyModel.Address address = 11;
     */
    address?: FactoringCompanyModel_Address;
}
/**
 * FactoringCompanyCreate
 *
 * @generated from protobuf message FactoringCompanyCreateReply
 */
export interface FactoringCompanyCreateReply {
    /**
     * @generated from protobuf field: string factoring_company_id = 1;
     */
    factoringCompanyId: string;
}
/**
 * FactoringCompanyGet
 *
 * @generated from protobuf message FactoringCompaniesGetRequest
 */
export interface FactoringCompaniesGetRequest {
}
/**
 * FactoringCompanyGet
 *
 * @generated from protobuf message FactoringCompaniesGetReply
 */
export interface FactoringCompaniesGetReply {
    /**
     * @generated from protobuf field: repeated FactoringCompanyModel factoring_companies = 1;
     */
    factoringCompanies: FactoringCompanyModel[];
}
/**
 * FactoringCompanyUpdate
 *
 * @generated from protobuf message FactoringCompanyUpdateRequest
 */
export interface FactoringCompanyUpdateRequest {
    /**
     * @generated from protobuf field: string factoring_company_id = 1;
     */
    factoringCompanyId: string;
    /**
     * required, max len 256
     *
     * @generated from protobuf field: string name = 2;
     */
    name: string;
    /**
     * @generated from protobuf field: double fee_percentage = 3;
     */
    feePercentage: number;
    /**
     * in format date only "2006-01-02".
     *
     * @generated from protobuf field: string contract_end_at = 4;
     */
    contractEndAt: string;
    /**
     * @generated from protobuf field: string cutoff_time = 5;
     */
    cutoffTime: string;
    /**
     * max len 1024
     *
     * @generated from protobuf field: string note = 6;
     */
    note: string;
    /**
     * @generated from protobuf field: string phone = 7;
     */
    phone: string;
    /**
     * @generated from protobuf field: string fax = 8;
     */
    fax: string;
    /**
     * @generated from protobuf field: string ein = 9;
     */
    ein: string;
    /**
     * @generated from protobuf field: string noa_file_id = 10;
     */
    noaFileId: string;
    /**
     * @generated from protobuf field: string logo_file_id = 11;
     */
    logoFileId: string;
    /**
     * @generated from protobuf field: FactoringCompanyModel.Address address = 12;
     */
    address?: FactoringCompanyModel_Address;
}
/**
 * FactoringCompanyUpdate
 *
 * @generated from protobuf message FactoringCompanyUpdateReply
 */
export interface FactoringCompanyUpdateReply {
}
/**
 * FactoringCompanyDelete
 *
 * @generated from protobuf message FactoringCompanyDeleteRequest
 */
export interface FactoringCompanyDeleteRequest {
    /**
     * @generated from protobuf field: string factoring_company_id = 1;
     */
    factoringCompanyId: string;
}
/**
 * FactoringCompanyDelete
 *
 * @generated from protobuf message FactoringCompanyDeleteReply
 */
export interface FactoringCompanyDeleteReply {
}
/**
 * FactoringCompanyRestore
 *
 * @generated from protobuf message FactoringCompanyRestoreRequest
 */
export interface FactoringCompanyRestoreRequest {
    /**
     * @generated from protobuf field: string factoring_company_id = 1;
     */
    factoringCompanyId: string;
}
/**
 * FactoringCompanyRestore
 *
 * @generated from protobuf message FactoringCompanyRestoreReply
 */
export interface FactoringCompanyRestoreReply {
}
// @generated message type with reflection information, may provide speed optimized methods
class FactoringCompanyCreateRequest$Type extends MessageType<FactoringCompanyCreateRequest> {
    constructor() {
        super("FactoringCompanyCreateRequest", [
            { no: 1, name: "name", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "fee_percentage", kind: "scalar", T: 1 /*ScalarType.DOUBLE*/ },
            { no: 3, name: "contract_end_at", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 4, name: "cutoff_time", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 5, name: "note", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 6, name: "phone", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 7, name: "fax", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 8, name: "ein", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 9, name: "noa_file_id", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 10, name: "logo_file_id", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 11, name: "address", kind: "message", T: () => FactoringCompanyModel_Address }
        ]);
    }
    create(value?: PartialMessage<FactoringCompanyCreateRequest>): FactoringCompanyCreateRequest {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.name = "";
        message.feePercentage = 0;
        message.contractEndAt = "";
        message.cutoffTime = "";
        message.note = "";
        message.phone = "";
        message.fax = "";
        message.ein = "";
        message.noaFileId = "";
        message.logoFileId = "";
        if (value !== undefined)
            reflectionMergePartial<FactoringCompanyCreateRequest>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: FactoringCompanyCreateRequest): FactoringCompanyCreateRequest {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* string name */ 1:
                    message.name = reader.string();
                    break;
                case /* double fee_percentage */ 2:
                    message.feePercentage = reader.double();
                    break;
                case /* string contract_end_at */ 3:
                    message.contractEndAt = reader.string();
                    break;
                case /* string cutoff_time */ 4:
                    message.cutoffTime = reader.string();
                    break;
                case /* string note */ 5:
                    message.note = reader.string();
                    break;
                case /* string phone */ 6:
                    message.phone = reader.string();
                    break;
                case /* string fax */ 7:
                    message.fax = reader.string();
                    break;
                case /* string ein */ 8:
                    message.ein = reader.string();
                    break;
                case /* string noa_file_id */ 9:
                    message.noaFileId = reader.string();
                    break;
                case /* string logo_file_id */ 10:
                    message.logoFileId = reader.string();
                    break;
                case /* FactoringCompanyModel.Address address */ 11:
                    message.address = FactoringCompanyModel_Address.internalBinaryRead(reader, reader.uint32(), options, message.address);
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
    internalBinaryWrite(message: FactoringCompanyCreateRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* string name = 1; */
        if (message.name !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.name);
        /* double fee_percentage = 2; */
        if (message.feePercentage !== 0)
            writer.tag(2, WireType.Bit64).double(message.feePercentage);
        /* string contract_end_at = 3; */
        if (message.contractEndAt !== "")
            writer.tag(3, WireType.LengthDelimited).string(message.contractEndAt);
        /* string cutoff_time = 4; */
        if (message.cutoffTime !== "")
            writer.tag(4, WireType.LengthDelimited).string(message.cutoffTime);
        /* string note = 5; */
        if (message.note !== "")
            writer.tag(5, WireType.LengthDelimited).string(message.note);
        /* string phone = 6; */
        if (message.phone !== "")
            writer.tag(6, WireType.LengthDelimited).string(message.phone);
        /* string fax = 7; */
        if (message.fax !== "")
            writer.tag(7, WireType.LengthDelimited).string(message.fax);
        /* string ein = 8; */
        if (message.ein !== "")
            writer.tag(8, WireType.LengthDelimited).string(message.ein);
        /* string noa_file_id = 9; */
        if (message.noaFileId !== "")
            writer.tag(9, WireType.LengthDelimited).string(message.noaFileId);
        /* string logo_file_id = 10; */
        if (message.logoFileId !== "")
            writer.tag(10, WireType.LengthDelimited).string(message.logoFileId);
        /* FactoringCompanyModel.Address address = 11; */
        if (message.address)
            FactoringCompanyModel_Address.internalBinaryWrite(message.address, writer.tag(11, WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message FactoringCompanyCreateRequest
 */
export const FactoringCompanyCreateRequest = new FactoringCompanyCreateRequest$Type();
// @generated message type with reflection information, may provide speed optimized methods
class FactoringCompanyCreateReply$Type extends MessageType<FactoringCompanyCreateReply> {
    constructor() {
        super("FactoringCompanyCreateReply", [
            { no: 1, name: "factoring_company_id", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
    create(value?: PartialMessage<FactoringCompanyCreateReply>): FactoringCompanyCreateReply {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.factoringCompanyId = "";
        if (value !== undefined)
            reflectionMergePartial<FactoringCompanyCreateReply>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: FactoringCompanyCreateReply): FactoringCompanyCreateReply {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* string factoring_company_id */ 1:
                    message.factoringCompanyId = reader.string();
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
    internalBinaryWrite(message: FactoringCompanyCreateReply, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* string factoring_company_id = 1; */
        if (message.factoringCompanyId !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.factoringCompanyId);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message FactoringCompanyCreateReply
 */
export const FactoringCompanyCreateReply = new FactoringCompanyCreateReply$Type();
// @generated message type with reflection information, may provide speed optimized methods
class FactoringCompaniesGetRequest$Type extends MessageType<FactoringCompaniesGetRequest> {
    constructor() {
        super("FactoringCompaniesGetRequest", []);
    }
    create(value?: PartialMessage<FactoringCompaniesGetRequest>): FactoringCompaniesGetRequest {
        const message = globalThis.Object.create((this.messagePrototype!));
        if (value !== undefined)
            reflectionMergePartial<FactoringCompaniesGetRequest>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: FactoringCompaniesGetRequest): FactoringCompaniesGetRequest {
        return target ?? this.create();
    }
    internalBinaryWrite(message: FactoringCompaniesGetRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message FactoringCompaniesGetRequest
 */
export const FactoringCompaniesGetRequest = new FactoringCompaniesGetRequest$Type();
// @generated message type with reflection information, may provide speed optimized methods
class FactoringCompaniesGetReply$Type extends MessageType<FactoringCompaniesGetReply> {
    constructor() {
        super("FactoringCompaniesGetReply", [
            { no: 1, name: "factoring_companies", kind: "message", repeat: 1 /*RepeatType.PACKED*/, T: () => FactoringCompanyModel }
        ]);
    }
    create(value?: PartialMessage<FactoringCompaniesGetReply>): FactoringCompaniesGetReply {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.factoringCompanies = [];
        if (value !== undefined)
            reflectionMergePartial<FactoringCompaniesGetReply>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: FactoringCompaniesGetReply): FactoringCompaniesGetReply {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* repeated FactoringCompanyModel factoring_companies */ 1:
                    message.factoringCompanies.push(FactoringCompanyModel.internalBinaryRead(reader, reader.uint32(), options));
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
    internalBinaryWrite(message: FactoringCompaniesGetReply, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* repeated FactoringCompanyModel factoring_companies = 1; */
        for (let i = 0; i < message.factoringCompanies.length; i++)
            FactoringCompanyModel.internalBinaryWrite(message.factoringCompanies[i], writer.tag(1, WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message FactoringCompaniesGetReply
 */
export const FactoringCompaniesGetReply = new FactoringCompaniesGetReply$Type();
// @generated message type with reflection information, may provide speed optimized methods
class FactoringCompanyUpdateRequest$Type extends MessageType<FactoringCompanyUpdateRequest> {
    constructor() {
        super("FactoringCompanyUpdateRequest", [
            { no: 1, name: "factoring_company_id", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "name", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 3, name: "fee_percentage", kind: "scalar", T: 1 /*ScalarType.DOUBLE*/ },
            { no: 4, name: "contract_end_at", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 5, name: "cutoff_time", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 6, name: "note", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 7, name: "phone", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 8, name: "fax", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 9, name: "ein", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 10, name: "noa_file_id", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 11, name: "logo_file_id", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 12, name: "address", kind: "message", T: () => FactoringCompanyModel_Address }
        ]);
    }
    create(value?: PartialMessage<FactoringCompanyUpdateRequest>): FactoringCompanyUpdateRequest {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.factoringCompanyId = "";
        message.name = "";
        message.feePercentage = 0;
        message.contractEndAt = "";
        message.cutoffTime = "";
        message.note = "";
        message.phone = "";
        message.fax = "";
        message.ein = "";
        message.noaFileId = "";
        message.logoFileId = "";
        if (value !== undefined)
            reflectionMergePartial<FactoringCompanyUpdateRequest>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: FactoringCompanyUpdateRequest): FactoringCompanyUpdateRequest {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* string factoring_company_id */ 1:
                    message.factoringCompanyId = reader.string();
                    break;
                case /* string name */ 2:
                    message.name = reader.string();
                    break;
                case /* double fee_percentage */ 3:
                    message.feePercentage = reader.double();
                    break;
                case /* string contract_end_at */ 4:
                    message.contractEndAt = reader.string();
                    break;
                case /* string cutoff_time */ 5:
                    message.cutoffTime = reader.string();
                    break;
                case /* string note */ 6:
                    message.note = reader.string();
                    break;
                case /* string phone */ 7:
                    message.phone = reader.string();
                    break;
                case /* string fax */ 8:
                    message.fax = reader.string();
                    break;
                case /* string ein */ 9:
                    message.ein = reader.string();
                    break;
                case /* string noa_file_id */ 10:
                    message.noaFileId = reader.string();
                    break;
                case /* string logo_file_id */ 11:
                    message.logoFileId = reader.string();
                    break;
                case /* FactoringCompanyModel.Address address */ 12:
                    message.address = FactoringCompanyModel_Address.internalBinaryRead(reader, reader.uint32(), options, message.address);
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
    internalBinaryWrite(message: FactoringCompanyUpdateRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* string factoring_company_id = 1; */
        if (message.factoringCompanyId !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.factoringCompanyId);
        /* string name = 2; */
        if (message.name !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.name);
        /* double fee_percentage = 3; */
        if (message.feePercentage !== 0)
            writer.tag(3, WireType.Bit64).double(message.feePercentage);
        /* string contract_end_at = 4; */
        if (message.contractEndAt !== "")
            writer.tag(4, WireType.LengthDelimited).string(message.contractEndAt);
        /* string cutoff_time = 5; */
        if (message.cutoffTime !== "")
            writer.tag(5, WireType.LengthDelimited).string(message.cutoffTime);
        /* string note = 6; */
        if (message.note !== "")
            writer.tag(6, WireType.LengthDelimited).string(message.note);
        /* string phone = 7; */
        if (message.phone !== "")
            writer.tag(7, WireType.LengthDelimited).string(message.phone);
        /* string fax = 8; */
        if (message.fax !== "")
            writer.tag(8, WireType.LengthDelimited).string(message.fax);
        /* string ein = 9; */
        if (message.ein !== "")
            writer.tag(9, WireType.LengthDelimited).string(message.ein);
        /* string noa_file_id = 10; */
        if (message.noaFileId !== "")
            writer.tag(10, WireType.LengthDelimited).string(message.noaFileId);
        /* string logo_file_id = 11; */
        if (message.logoFileId !== "")
            writer.tag(11, WireType.LengthDelimited).string(message.logoFileId);
        /* FactoringCompanyModel.Address address = 12; */
        if (message.address)
            FactoringCompanyModel_Address.internalBinaryWrite(message.address, writer.tag(12, WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message FactoringCompanyUpdateRequest
 */
export const FactoringCompanyUpdateRequest = new FactoringCompanyUpdateRequest$Type();
// @generated message type with reflection information, may provide speed optimized methods
class FactoringCompanyUpdateReply$Type extends MessageType<FactoringCompanyUpdateReply> {
    constructor() {
        super("FactoringCompanyUpdateReply", []);
    }
    create(value?: PartialMessage<FactoringCompanyUpdateReply>): FactoringCompanyUpdateReply {
        const message = globalThis.Object.create((this.messagePrototype!));
        if (value !== undefined)
            reflectionMergePartial<FactoringCompanyUpdateReply>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: FactoringCompanyUpdateReply): FactoringCompanyUpdateReply {
        return target ?? this.create();
    }
    internalBinaryWrite(message: FactoringCompanyUpdateReply, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message FactoringCompanyUpdateReply
 */
export const FactoringCompanyUpdateReply = new FactoringCompanyUpdateReply$Type();
// @generated message type with reflection information, may provide speed optimized methods
class FactoringCompanyDeleteRequest$Type extends MessageType<FactoringCompanyDeleteRequest> {
    constructor() {
        super("FactoringCompanyDeleteRequest", [
            { no: 1, name: "factoring_company_id", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
    create(value?: PartialMessage<FactoringCompanyDeleteRequest>): FactoringCompanyDeleteRequest {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.factoringCompanyId = "";
        if (value !== undefined)
            reflectionMergePartial<FactoringCompanyDeleteRequest>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: FactoringCompanyDeleteRequest): FactoringCompanyDeleteRequest {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* string factoring_company_id */ 1:
                    message.factoringCompanyId = reader.string();
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
    internalBinaryWrite(message: FactoringCompanyDeleteRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* string factoring_company_id = 1; */
        if (message.factoringCompanyId !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.factoringCompanyId);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message FactoringCompanyDeleteRequest
 */
export const FactoringCompanyDeleteRequest = new FactoringCompanyDeleteRequest$Type();
// @generated message type with reflection information, may provide speed optimized methods
class FactoringCompanyDeleteReply$Type extends MessageType<FactoringCompanyDeleteReply> {
    constructor() {
        super("FactoringCompanyDeleteReply", []);
    }
    create(value?: PartialMessage<FactoringCompanyDeleteReply>): FactoringCompanyDeleteReply {
        const message = globalThis.Object.create((this.messagePrototype!));
        if (value !== undefined)
            reflectionMergePartial<FactoringCompanyDeleteReply>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: FactoringCompanyDeleteReply): FactoringCompanyDeleteReply {
        return target ?? this.create();
    }
    internalBinaryWrite(message: FactoringCompanyDeleteReply, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message FactoringCompanyDeleteReply
 */
export const FactoringCompanyDeleteReply = new FactoringCompanyDeleteReply$Type();
// @generated message type with reflection information, may provide speed optimized methods
class FactoringCompanyRestoreRequest$Type extends MessageType<FactoringCompanyRestoreRequest> {
    constructor() {
        super("FactoringCompanyRestoreRequest", [
            { no: 1, name: "factoring_company_id", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
    create(value?: PartialMessage<FactoringCompanyRestoreRequest>): FactoringCompanyRestoreRequest {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.factoringCompanyId = "";
        if (value !== undefined)
            reflectionMergePartial<FactoringCompanyRestoreRequest>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: FactoringCompanyRestoreRequest): FactoringCompanyRestoreRequest {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* string factoring_company_id */ 1:
                    message.factoringCompanyId = reader.string();
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
    internalBinaryWrite(message: FactoringCompanyRestoreRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* string factoring_company_id = 1; */
        if (message.factoringCompanyId !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.factoringCompanyId);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message FactoringCompanyRestoreRequest
 */
export const FactoringCompanyRestoreRequest = new FactoringCompanyRestoreRequest$Type();
// @generated message type with reflection information, may provide speed optimized methods
class FactoringCompanyRestoreReply$Type extends MessageType<FactoringCompanyRestoreReply> {
    constructor() {
        super("FactoringCompanyRestoreReply", []);
    }
    create(value?: PartialMessage<FactoringCompanyRestoreReply>): FactoringCompanyRestoreReply {
        const message = globalThis.Object.create((this.messagePrototype!));
        if (value !== undefined)
            reflectionMergePartial<FactoringCompanyRestoreReply>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: FactoringCompanyRestoreReply): FactoringCompanyRestoreReply {
        return target ?? this.create();
    }
    internalBinaryWrite(message: FactoringCompanyRestoreReply, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message FactoringCompanyRestoreReply
 */
export const FactoringCompanyRestoreReply = new FactoringCompanyRestoreReply$Type();
/**
 * @generated ServiceType for protobuf service FactoringCompaniesService
 */
export const FactoringCompaniesService = new ServiceType("FactoringCompaniesService", [
    { name: "FactoringCompanyCreate", options: {}, I: FactoringCompanyCreateRequest, O: FactoringCompanyCreateReply },
    { name: "FactoringCompanyGet", options: {}, I: FactoringCompaniesGetRequest, O: FactoringCompaniesGetReply },
    { name: "FactoringCompanyUpdate", options: {}, I: FactoringCompanyUpdateRequest, O: FactoringCompanyUpdateReply },
    { name: "FactoringCompanyDelete", options: {}, I: FactoringCompanyDeleteRequest, O: FactoringCompanyDeleteReply },
    { name: "FactoringCompanyRestore", options: {}, I: FactoringCompanyRestoreRequest, O: FactoringCompanyRestoreReply }
]);
