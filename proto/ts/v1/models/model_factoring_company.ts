// @generated by protobuf-ts 2.9.4 with parameter long_type_number,generate_dependencies,ts_nocheck,output_typescript
// @generated from protobuf file "v1/models/model_factoring_company.proto" (syntax proto3)
// tslint:disable
// @ts-nocheck
import type { BinaryWriteOptions } from "@protobuf-ts/runtime";
import type { IBinaryWriter } from "@protobuf-ts/runtime";
import { WireType } from "@protobuf-ts/runtime";
import type { BinaryReadOptions } from "@protobuf-ts/runtime";
import type { IBinaryReader } from "@protobuf-ts/runtime";
import { UnknownFieldHandler } from "@protobuf-ts/runtime";
import type { PartialMessage } from "@protobuf-ts/runtime";
import { reflectionMergePartial } from "@protobuf-ts/runtime";
import { MessageType } from "@protobuf-ts/runtime";
import { CountryCode } from "./country_code";
/**
 * @generated from protobuf message FactoringCompanyModel
 */
export interface FactoringCompanyModel {
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
    /**
     * @generated from protobuf field: bool deleted = 13;
     */
    deleted: boolean;
    /**
     * @generated from protobuf field: string updated_at = 14;
     */
    updatedAt: string;
    /**
     * @generated from protobuf field: string created_at = 15;
     */
    createdAt: string;
}
/**
 * @generated from protobuf message FactoringCompanyModel.Address
 */
export interface FactoringCompanyModel_Address {
    /**
     * @generated from protobuf field: string line_1 = 1;
     */
    line1: string;
    /**
     * @generated from protobuf field: string line_2 = 2;
     */
    line2: string;
    /**
     * @generated from protobuf field: string city = 3;
     */
    city: string;
    /**
     * @generated from protobuf field: string state = 4;
     */
    state: string;
    /**
     * @generated from protobuf field: string postal_code = 5;
     */
    postalCode: string;
    /**
     * @generated from protobuf field: optional CountryCode country = 6;
     */
    country?: CountryCode;
}
// @generated message type with reflection information, may provide speed optimized methods
class FactoringCompanyModel$Type extends MessageType<FactoringCompanyModel> {
    constructor() {
        super("FactoringCompanyModel", [
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
            { no: 12, name: "address", kind: "message", T: () => FactoringCompanyModel_Address },
            { no: 13, name: "deleted", kind: "scalar", T: 8 /*ScalarType.BOOL*/ },
            { no: 14, name: "updated_at", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 15, name: "created_at", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
    create(value?: PartialMessage<FactoringCompanyModel>): FactoringCompanyModel {
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
        message.deleted = false;
        message.updatedAt = "";
        message.createdAt = "";
        if (value !== undefined)
            reflectionMergePartial<FactoringCompanyModel>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: FactoringCompanyModel): FactoringCompanyModel {
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
                case /* bool deleted */ 13:
                    message.deleted = reader.bool();
                    break;
                case /* string updated_at */ 14:
                    message.updatedAt = reader.string();
                    break;
                case /* string created_at */ 15:
                    message.createdAt = reader.string();
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
    internalBinaryWrite(message: FactoringCompanyModel, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
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
        /* bool deleted = 13; */
        if (message.deleted !== false)
            writer.tag(13, WireType.Varint).bool(message.deleted);
        /* string updated_at = 14; */
        if (message.updatedAt !== "")
            writer.tag(14, WireType.LengthDelimited).string(message.updatedAt);
        /* string created_at = 15; */
        if (message.createdAt !== "")
            writer.tag(15, WireType.LengthDelimited).string(message.createdAt);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message FactoringCompanyModel
 */
export const FactoringCompanyModel = new FactoringCompanyModel$Type();
// @generated message type with reflection information, may provide speed optimized methods
class FactoringCompanyModel_Address$Type extends MessageType<FactoringCompanyModel_Address> {
    constructor() {
        super("FactoringCompanyModel.Address", [
            { no: 1, name: "line_1", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "line_2", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 3, name: "city", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 4, name: "state", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 5, name: "postal_code", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 6, name: "country", kind: "enum", opt: true, T: () => ["CountryCode", CountryCode, "COUNTRY_CODE_"] }
        ]);
    }
    create(value?: PartialMessage<FactoringCompanyModel_Address>): FactoringCompanyModel_Address {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.line1 = "";
        message.line2 = "";
        message.city = "";
        message.state = "";
        message.postalCode = "";
        if (value !== undefined)
            reflectionMergePartial<FactoringCompanyModel_Address>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: FactoringCompanyModel_Address): FactoringCompanyModel_Address {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* string line_1 */ 1:
                    message.line1 = reader.string();
                    break;
                case /* string line_2 */ 2:
                    message.line2 = reader.string();
                    break;
                case /* string city */ 3:
                    message.city = reader.string();
                    break;
                case /* string state */ 4:
                    message.state = reader.string();
                    break;
                case /* string postal_code */ 5:
                    message.postalCode = reader.string();
                    break;
                case /* optional CountryCode country */ 6:
                    message.country = reader.int32();
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
    internalBinaryWrite(message: FactoringCompanyModel_Address, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* string line_1 = 1; */
        if (message.line1 !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.line1);
        /* string line_2 = 2; */
        if (message.line2 !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.line2);
        /* string city = 3; */
        if (message.city !== "")
            writer.tag(3, WireType.LengthDelimited).string(message.city);
        /* string state = 4; */
        if (message.state !== "")
            writer.tag(4, WireType.LengthDelimited).string(message.state);
        /* string postal_code = 5; */
        if (message.postalCode !== "")
            writer.tag(5, WireType.LengthDelimited).string(message.postalCode);
        /* optional CountryCode country = 6; */
        if (message.country !== undefined)
            writer.tag(6, WireType.Varint).int32(message.country);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message FactoringCompanyModel.Address
 */
export const FactoringCompanyModel_Address = new FactoringCompanyModel_Address$Type();
