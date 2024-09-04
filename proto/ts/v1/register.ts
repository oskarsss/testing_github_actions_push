// @generated by protobuf-ts 2.9.4 with parameter long_type_number,generate_dependencies,ts_nocheck,output_typescript
// @generated from protobuf file "v1/register.proto" (syntax proto3)
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
import { CountryCode } from "./models/country_code";
/**
 * Get Notes 1
 *
 * @generated from protobuf message RegisterRequest
 */
export interface RegisterRequest {
    /**
     * @generated from protobuf field: string first_name = 1;
     */
    firstName: string;
    /**
     * @generated from protobuf field: string last_name = 2;
     */
    lastName: string;
    /**
     * @generated from protobuf field: string phone = 3;
     */
    phone: string;
    /**
     * @generated from protobuf field: string email = 4;
     */
    email: string;
    /**
     * @generated from protobuf field: string password = 5;
     */
    password: string;
    /**
     * @generated from protobuf field: string company_name = 6;
     */
    companyName: string;
    /**
     * @generated from protobuf field: int64 dot = 7;
     */
    dot: number;
    /**
     * @generated from protobuf field: string ip_address = 8;
     */
    ipAddress: string;
    /**
     * @generated from protobuf field: string referral_code = 9;
     */
    referralCode: string;
    /**
     * @generated from protobuf field: string hear_about_us = 10;
     */
    hearAboutUs: string;
    /**
     * @generated from protobuf field: string address_line_1 = 11;
     */
    addressLine1: string;
    /**
     * @generated from protobuf field: string address_line_2 = 12;
     */
    addressLine2: string;
    /**
     * @generated from protobuf field: string address_city = 13;
     */
    addressCity: string;
    /**
     * @generated from protobuf field: string address_state = 14;
     */
    addressState: string;
    /**
     * @generated from protobuf field: string address_postal_code = 15;
     */
    addressPostalCode: string;
    /**
     * @generated from protobuf field: bool terms_of_service_and_privacy_policy_confirmed = 16;
     */
    termsOfServiceAndPrivacyPolicyConfirmed: boolean;
    /**
     * @generated from protobuf field: optional string partner_id = 17;
     */
    partnerId?: string;
    /**
     * @generated from protobuf field: optional CountryCode country = 18;
     */
    country?: CountryCode;
}
/**
 * @generated from protobuf message RegisterReply
 */
export interface RegisterReply {
    /**
     * @generated from protobuf field: string token = 1;
     */
    token: string;
    /**
     * @generated from protobuf field: string company_id = 2;
     */
    companyId: string;
    /**
     * @generated from protobuf field: string user_id = 3;
     */
    userId: string;
}
/**
 * @generated from protobuf message GetByDotRequest
 */
export interface GetByDotRequest {
    /**
     * @generated from protobuf field: int64 dot = 1;
     */
    dot: number;
}
/**
 * @generated from protobuf message GetByDotReply
 */
export interface GetByDotReply {
    /**
     * @generated from protobuf field: bool active = 1;
     */
    active: boolean;
    /**
     * @generated from protobuf field: int64 dot = 2;
     */
    dot: number;
    /**
     * @generated from protobuf field: string name = 3;
     */
    name: string;
    /**
     * @generated from protobuf field: string address_line_1 = 4;
     */
    addressLine1: string;
    /**
     * @generated from protobuf field: string address_city = 5;
     */
    addressCity: string;
    /**
     * @generated from protobuf field: string address_state = 6;
     */
    addressState: string;
    /**
     * @generated from protobuf field: string address_postal_code = 7;
     */
    addressPostalCode: string;
    /**
     * @generated from protobuf field: int64 ein = 8;
     */
    ein: number;
    /**
     * @generated from protobuf field: string address = 9;
     */
    address: string;
    /**
     * @generated from protobuf field: int64 mc = 10;
     */
    mc: number;
}
// @generated message type with reflection information, may provide speed optimized methods
class RegisterRequest$Type extends MessageType<RegisterRequest> {
    constructor() {
        super("RegisterRequest", [
            { no: 1, name: "first_name", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "last_name", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 3, name: "phone", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 4, name: "email", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 5, name: "password", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 6, name: "company_name", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 7, name: "dot", kind: "scalar", T: 3 /*ScalarType.INT64*/, L: 2 /*LongType.NUMBER*/ },
            { no: 8, name: "ip_address", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 9, name: "referral_code", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 10, name: "hear_about_us", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 11, name: "address_line_1", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 12, name: "address_line_2", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 13, name: "address_city", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 14, name: "address_state", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 15, name: "address_postal_code", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 16, name: "terms_of_service_and_privacy_policy_confirmed", kind: "scalar", T: 8 /*ScalarType.BOOL*/ },
            { no: 17, name: "partner_id", kind: "scalar", opt: true, T: 9 /*ScalarType.STRING*/ },
            { no: 18, name: "country", kind: "enum", opt: true, T: () => ["CountryCode", CountryCode, "COUNTRY_CODE_"] }
        ]);
    }
    create(value?: PartialMessage<RegisterRequest>): RegisterRequest {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.firstName = "";
        message.lastName = "";
        message.phone = "";
        message.email = "";
        message.password = "";
        message.companyName = "";
        message.dot = 0;
        message.ipAddress = "";
        message.referralCode = "";
        message.hearAboutUs = "";
        message.addressLine1 = "";
        message.addressLine2 = "";
        message.addressCity = "";
        message.addressState = "";
        message.addressPostalCode = "";
        message.termsOfServiceAndPrivacyPolicyConfirmed = false;
        if (value !== undefined)
            reflectionMergePartial<RegisterRequest>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: RegisterRequest): RegisterRequest {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* string first_name */ 1:
                    message.firstName = reader.string();
                    break;
                case /* string last_name */ 2:
                    message.lastName = reader.string();
                    break;
                case /* string phone */ 3:
                    message.phone = reader.string();
                    break;
                case /* string email */ 4:
                    message.email = reader.string();
                    break;
                case /* string password */ 5:
                    message.password = reader.string();
                    break;
                case /* string company_name */ 6:
                    message.companyName = reader.string();
                    break;
                case /* int64 dot */ 7:
                    message.dot = reader.int64().toNumber();
                    break;
                case /* string ip_address */ 8:
                    message.ipAddress = reader.string();
                    break;
                case /* string referral_code */ 9:
                    message.referralCode = reader.string();
                    break;
                case /* string hear_about_us */ 10:
                    message.hearAboutUs = reader.string();
                    break;
                case /* string address_line_1 */ 11:
                    message.addressLine1 = reader.string();
                    break;
                case /* string address_line_2 */ 12:
                    message.addressLine2 = reader.string();
                    break;
                case /* string address_city */ 13:
                    message.addressCity = reader.string();
                    break;
                case /* string address_state */ 14:
                    message.addressState = reader.string();
                    break;
                case /* string address_postal_code */ 15:
                    message.addressPostalCode = reader.string();
                    break;
                case /* bool terms_of_service_and_privacy_policy_confirmed */ 16:
                    message.termsOfServiceAndPrivacyPolicyConfirmed = reader.bool();
                    break;
                case /* optional string partner_id */ 17:
                    message.partnerId = reader.string();
                    break;
                case /* optional CountryCode country */ 18:
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
    internalBinaryWrite(message: RegisterRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* string first_name = 1; */
        if (message.firstName !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.firstName);
        /* string last_name = 2; */
        if (message.lastName !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.lastName);
        /* string phone = 3; */
        if (message.phone !== "")
            writer.tag(3, WireType.LengthDelimited).string(message.phone);
        /* string email = 4; */
        if (message.email !== "")
            writer.tag(4, WireType.LengthDelimited).string(message.email);
        /* string password = 5; */
        if (message.password !== "")
            writer.tag(5, WireType.LengthDelimited).string(message.password);
        /* string company_name = 6; */
        if (message.companyName !== "")
            writer.tag(6, WireType.LengthDelimited).string(message.companyName);
        /* int64 dot = 7; */
        if (message.dot !== 0)
            writer.tag(7, WireType.Varint).int64(message.dot);
        /* string ip_address = 8; */
        if (message.ipAddress !== "")
            writer.tag(8, WireType.LengthDelimited).string(message.ipAddress);
        /* string referral_code = 9; */
        if (message.referralCode !== "")
            writer.tag(9, WireType.LengthDelimited).string(message.referralCode);
        /* string hear_about_us = 10; */
        if (message.hearAboutUs !== "")
            writer.tag(10, WireType.LengthDelimited).string(message.hearAboutUs);
        /* string address_line_1 = 11; */
        if (message.addressLine1 !== "")
            writer.tag(11, WireType.LengthDelimited).string(message.addressLine1);
        /* string address_line_2 = 12; */
        if (message.addressLine2 !== "")
            writer.tag(12, WireType.LengthDelimited).string(message.addressLine2);
        /* string address_city = 13; */
        if (message.addressCity !== "")
            writer.tag(13, WireType.LengthDelimited).string(message.addressCity);
        /* string address_state = 14; */
        if (message.addressState !== "")
            writer.tag(14, WireType.LengthDelimited).string(message.addressState);
        /* string address_postal_code = 15; */
        if (message.addressPostalCode !== "")
            writer.tag(15, WireType.LengthDelimited).string(message.addressPostalCode);
        /* bool terms_of_service_and_privacy_policy_confirmed = 16; */
        if (message.termsOfServiceAndPrivacyPolicyConfirmed !== false)
            writer.tag(16, WireType.Varint).bool(message.termsOfServiceAndPrivacyPolicyConfirmed);
        /* optional string partner_id = 17; */
        if (message.partnerId !== undefined)
            writer.tag(17, WireType.LengthDelimited).string(message.partnerId);
        /* optional CountryCode country = 18; */
        if (message.country !== undefined)
            writer.tag(18, WireType.Varint).int32(message.country);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message RegisterRequest
 */
export const RegisterRequest = new RegisterRequest$Type();
// @generated message type with reflection information, may provide speed optimized methods
class RegisterReply$Type extends MessageType<RegisterReply> {
    constructor() {
        super("RegisterReply", [
            { no: 1, name: "token", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "company_id", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 3, name: "user_id", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
    create(value?: PartialMessage<RegisterReply>): RegisterReply {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.token = "";
        message.companyId = "";
        message.userId = "";
        if (value !== undefined)
            reflectionMergePartial<RegisterReply>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: RegisterReply): RegisterReply {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* string token */ 1:
                    message.token = reader.string();
                    break;
                case /* string company_id */ 2:
                    message.companyId = reader.string();
                    break;
                case /* string user_id */ 3:
                    message.userId = reader.string();
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
    internalBinaryWrite(message: RegisterReply, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* string token = 1; */
        if (message.token !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.token);
        /* string company_id = 2; */
        if (message.companyId !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.companyId);
        /* string user_id = 3; */
        if (message.userId !== "")
            writer.tag(3, WireType.LengthDelimited).string(message.userId);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message RegisterReply
 */
export const RegisterReply = new RegisterReply$Type();
// @generated message type with reflection information, may provide speed optimized methods
class GetByDotRequest$Type extends MessageType<GetByDotRequest> {
    constructor() {
        super("GetByDotRequest", [
            { no: 1, name: "dot", kind: "scalar", T: 3 /*ScalarType.INT64*/, L: 2 /*LongType.NUMBER*/ }
        ]);
    }
    create(value?: PartialMessage<GetByDotRequest>): GetByDotRequest {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.dot = 0;
        if (value !== undefined)
            reflectionMergePartial<GetByDotRequest>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: GetByDotRequest): GetByDotRequest {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* int64 dot */ 1:
                    message.dot = reader.int64().toNumber();
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
    internalBinaryWrite(message: GetByDotRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* int64 dot = 1; */
        if (message.dot !== 0)
            writer.tag(1, WireType.Varint).int64(message.dot);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message GetByDotRequest
 */
export const GetByDotRequest = new GetByDotRequest$Type();
// @generated message type with reflection information, may provide speed optimized methods
class GetByDotReply$Type extends MessageType<GetByDotReply> {
    constructor() {
        super("GetByDotReply", [
            { no: 1, name: "active", kind: "scalar", T: 8 /*ScalarType.BOOL*/ },
            { no: 2, name: "dot", kind: "scalar", T: 3 /*ScalarType.INT64*/, L: 2 /*LongType.NUMBER*/ },
            { no: 3, name: "name", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 4, name: "address_line_1", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 5, name: "address_city", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 6, name: "address_state", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 7, name: "address_postal_code", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 8, name: "ein", kind: "scalar", T: 3 /*ScalarType.INT64*/, L: 2 /*LongType.NUMBER*/ },
            { no: 9, name: "address", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 10, name: "mc", kind: "scalar", T: 3 /*ScalarType.INT64*/, L: 2 /*LongType.NUMBER*/ }
        ]);
    }
    create(value?: PartialMessage<GetByDotReply>): GetByDotReply {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.active = false;
        message.dot = 0;
        message.name = "";
        message.addressLine1 = "";
        message.addressCity = "";
        message.addressState = "";
        message.addressPostalCode = "";
        message.ein = 0;
        message.address = "";
        message.mc = 0;
        if (value !== undefined)
            reflectionMergePartial<GetByDotReply>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: GetByDotReply): GetByDotReply {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* bool active */ 1:
                    message.active = reader.bool();
                    break;
                case /* int64 dot */ 2:
                    message.dot = reader.int64().toNumber();
                    break;
                case /* string name */ 3:
                    message.name = reader.string();
                    break;
                case /* string address_line_1 */ 4:
                    message.addressLine1 = reader.string();
                    break;
                case /* string address_city */ 5:
                    message.addressCity = reader.string();
                    break;
                case /* string address_state */ 6:
                    message.addressState = reader.string();
                    break;
                case /* string address_postal_code */ 7:
                    message.addressPostalCode = reader.string();
                    break;
                case /* int64 ein */ 8:
                    message.ein = reader.int64().toNumber();
                    break;
                case /* string address */ 9:
                    message.address = reader.string();
                    break;
                case /* int64 mc */ 10:
                    message.mc = reader.int64().toNumber();
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
    internalBinaryWrite(message: GetByDotReply, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* bool active = 1; */
        if (message.active !== false)
            writer.tag(1, WireType.Varint).bool(message.active);
        /* int64 dot = 2; */
        if (message.dot !== 0)
            writer.tag(2, WireType.Varint).int64(message.dot);
        /* string name = 3; */
        if (message.name !== "")
            writer.tag(3, WireType.LengthDelimited).string(message.name);
        /* string address_line_1 = 4; */
        if (message.addressLine1 !== "")
            writer.tag(4, WireType.LengthDelimited).string(message.addressLine1);
        /* string address_city = 5; */
        if (message.addressCity !== "")
            writer.tag(5, WireType.LengthDelimited).string(message.addressCity);
        /* string address_state = 6; */
        if (message.addressState !== "")
            writer.tag(6, WireType.LengthDelimited).string(message.addressState);
        /* string address_postal_code = 7; */
        if (message.addressPostalCode !== "")
            writer.tag(7, WireType.LengthDelimited).string(message.addressPostalCode);
        /* int64 ein = 8; */
        if (message.ein !== 0)
            writer.tag(8, WireType.Varint).int64(message.ein);
        /* string address = 9; */
        if (message.address !== "")
            writer.tag(9, WireType.LengthDelimited).string(message.address);
        /* int64 mc = 10; */
        if (message.mc !== 0)
            writer.tag(10, WireType.Varint).int64(message.mc);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message GetByDotReply
 */
export const GetByDotReply = new GetByDotReply$Type();
/**
 * @generated ServiceType for protobuf service RegisterService
 */
export const RegisterService = new ServiceType("RegisterService", [
    { name: "Register", options: {}, I: RegisterRequest, O: RegisterReply },
    { name: "GetByDot", options: {}, I: GetByDotRequest, O: GetByDotReply }
]);
