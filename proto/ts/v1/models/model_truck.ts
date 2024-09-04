// @generated by protobuf-ts 2.9.4 with parameter long_type_number,generate_dependencies,ts_nocheck,output_typescript
// @generated from protobuf file "v1/models/model_truck.proto" (syntax proto3)
// tslint:disable
// @ts-nocheck
import { WireType } from "@protobuf-ts/runtime";
import type { BinaryWriteOptions } from "@protobuf-ts/runtime";
import type { IBinaryWriter } from "@protobuf-ts/runtime";
import { UnknownFieldHandler } from "@protobuf-ts/runtime";
import type { BinaryReadOptions } from "@protobuf-ts/runtime";
import type { IBinaryReader } from "@protobuf-ts/runtime";
import type { PartialMessage } from "@protobuf-ts/runtime";
import { reflectionMergePartial } from "@protobuf-ts/runtime";
import { MessageType } from "@protobuf-ts/runtime";
import { NoteModel_EntityNote } from "./model_note";
/**
 * @generated from protobuf message TruckModel
 */
export interface TruckModel {
}
/**
 * @generated from protobuf message TruckModel.Availability
 */
export interface TruckModel_Availability {
}
/**
 * @generated from protobuf enum TruckModel.Availability.EmptyAtType
 */
export enum TruckModel_Availability_EmptyAtType {
    /**
     * @generated from protobuf enum value: unspecified = 0;
     */
    unspecified = 0,
    /**
     * @generated from protobuf enum value: current_location = 1;
     */
    current_location = 1,
    /**
     * @generated from protobuf enum value: dropoff = 2;
     */
    dropoff = 2
}
/**
 * @generated from protobuf message TruckModel.Truck
 */
export interface TruckModel_Truck {
    /**
     * @generated from protobuf field: string truck_id = 1;
     */
    truckId: string;
    /**
     * @generated from protobuf field: string reference_id = 2;
     */
    referenceId: string;
    /**
     * @generated from protobuf field: TruckModel.Type type = 3;
     */
    type: TruckModel_Type;
    /**
     * @generated from protobuf field: string vin = 4;
     */
    vin: string;
    /**
     * @generated from protobuf field: string make = 5;
     */
    make: string;
    /**
     * @generated from protobuf field: string model = 6;
     */
    model: string;
    /**
     * @generated from protobuf field: int64 year = 7;
     */
    year: number;
    /**
     * @generated from protobuf field: string color = 8;
     */
    color: string;
    /**
     * @generated from protobuf field: bool insurance_endorsed = 9;
     */
    insuranceEndorsed: boolean;
    /**
     * @generated from protobuf field: string toll_transponder = 10;
     */
    tollTransponder: string;
    /**
     * @generated from protobuf field: bool fuel_discounts_enabled = 11;
     */
    fuelDiscountsEnabled: boolean;
    /**
     * @generated from protobuf field: bool online = 12;
     */
    online: boolean;
    /**
     * @generated from protobuf field: TruckModel.Status status = 13;
     */
    status: TruckModel_Status;
    /**
     * @generated from protobuf field: string plate_id = 14;
     */
    plateId: string;
    /**
     * @generated from protobuf field: string vendor_id = 15;
     */
    vendorId: string;
    /**
     * @generated from protobuf field: string trailer_id = 16;
     */
    trailerId: string;
    /**
     * @generated from protobuf field: repeated TruckModel.Truck.Driver drivers = 17;
     */
    drivers: TruckModel_Truck_Driver[];
    /**
     * @generated from protobuf field: repeated TruckModel.Truck.Tag tags = 18;
     */
    tags: TruckModel_Truck_Tag[];
    /**
     * @generated from protobuf field: repeated string users = 19;
     */
    users: string[];
    /**
     * @generated from protobuf field: repeated NoteModel.EntityNote notes = 20;
     */
    notes: NoteModel_EntityNote[];
    /**
     * @generated from protobuf field: string parking_location = 21;
     */
    parkingLocation: string;
}
/**
 * @generated from protobuf message TruckModel.Truck.Driver
 */
export interface TruckModel_Truck_Driver {
    /**
     * @generated from protobuf field: string driver_id = 1;
     */
    driverId: string;
    /**
     * @generated from protobuf field: bool primary = 2;
     */
    primary: boolean;
}
/**
 * @generated from protobuf message TruckModel.Truck.Tag
 */
export interface TruckModel_Truck_Tag {
    /**
     * @generated from protobuf field: string tag_id = 1;
     */
    tagId: string;
    /**
     * @generated from protobuf field: string name = 2;
     */
    name: string;
}
/**
 * @generated from protobuf enum TruckModel.Status
 */
export enum TruckModel_Status {
    /**
     * @generated from protobuf enum value: unspecified = 0;
     */
    unspecified = 0,
    /**
     * @generated from protobuf enum value: onboarding = 1;
     */
    onboarding = 1,
    /**
     * @generated from protobuf enum value: compliance_review = 2;
     */
    compliance_review = 2,
    /**
     * @generated from protobuf enum value: active = 3;
     */
    active = 3,
    /**
     * @generated from protobuf enum value: inactive = 4;
     */
    inactive = 4,
    /**
     * @generated from protobuf enum value: pending_termination = 5;
     */
    pending_termination = 5,
    /**
     * @generated from protobuf enum value: terminated = 6;
     */
    terminated = 6,
    /**
     * @generated from protobuf enum value: deleted = 7;
     */
    deleted = 7
}
/**
 * @generated from protobuf enum TruckModel.Type
 */
export enum TruckModel_Type {
    /**
     * @generated from protobuf enum value: TYPE_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * @generated from protobuf enum value: TYPE_OWNED = 1;
     */
    OWNED = 1,
    /**
     * @generated from protobuf enum value: TYPE_LEASED = 2;
     */
    LEASED = 2,
    /**
     * @generated from protobuf enum value: TYPE_OWNER_OPERATOR = 3;
     */
    OWNER_OPERATOR = 3
}
// @generated message type with reflection information, may provide speed optimized methods
class TruckModel$Type extends MessageType<TruckModel> {
    constructor() {
        super("TruckModel", []);
    }
    create(value?: PartialMessage<TruckModel>): TruckModel {
        const message = globalThis.Object.create((this.messagePrototype!));
        if (value !== undefined)
            reflectionMergePartial<TruckModel>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: TruckModel): TruckModel {
        return target ?? this.create();
    }
    internalBinaryWrite(message: TruckModel, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message TruckModel
 */
export const TruckModel = new TruckModel$Type();
// @generated message type with reflection information, may provide speed optimized methods
class TruckModel_Availability$Type extends MessageType<TruckModel_Availability> {
    constructor() {
        super("TruckModel.Availability", []);
    }
    create(value?: PartialMessage<TruckModel_Availability>): TruckModel_Availability {
        const message = globalThis.Object.create((this.messagePrototype!));
        if (value !== undefined)
            reflectionMergePartial<TruckModel_Availability>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: TruckModel_Availability): TruckModel_Availability {
        return target ?? this.create();
    }
    internalBinaryWrite(message: TruckModel_Availability, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message TruckModel.Availability
 */
export const TruckModel_Availability = new TruckModel_Availability$Type();
// @generated message type with reflection information, may provide speed optimized methods
class TruckModel_Truck$Type extends MessageType<TruckModel_Truck> {
    constructor() {
        super("TruckModel.Truck", [
            { no: 1, name: "truck_id", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "reference_id", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 3, name: "type", kind: "enum", T: () => ["TruckModel.Type", TruckModel_Type, "TYPE_"] },
            { no: 4, name: "vin", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 5, name: "make", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 6, name: "model", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 7, name: "year", kind: "scalar", T: 3 /*ScalarType.INT64*/, L: 2 /*LongType.NUMBER*/ },
            { no: 8, name: "color", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 9, name: "insurance_endorsed", kind: "scalar", T: 8 /*ScalarType.BOOL*/ },
            { no: 10, name: "toll_transponder", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 11, name: "fuel_discounts_enabled", kind: "scalar", T: 8 /*ScalarType.BOOL*/ },
            { no: 12, name: "online", kind: "scalar", T: 8 /*ScalarType.BOOL*/ },
            { no: 13, name: "status", kind: "enum", T: () => ["TruckModel.Status", TruckModel_Status] },
            { no: 14, name: "plate_id", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 15, name: "vendor_id", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 16, name: "trailer_id", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 17, name: "drivers", kind: "message", repeat: 1 /*RepeatType.PACKED*/, T: () => TruckModel_Truck_Driver },
            { no: 18, name: "tags", kind: "message", repeat: 1 /*RepeatType.PACKED*/, T: () => TruckModel_Truck_Tag },
            { no: 19, name: "users", kind: "scalar", repeat: 2 /*RepeatType.UNPACKED*/, T: 9 /*ScalarType.STRING*/ },
            { no: 20, name: "notes", kind: "message", repeat: 1 /*RepeatType.PACKED*/, T: () => NoteModel_EntityNote },
            { no: 21, name: "parking_location", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
    create(value?: PartialMessage<TruckModel_Truck>): TruckModel_Truck {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.truckId = "";
        message.referenceId = "";
        message.type = 0;
        message.vin = "";
        message.make = "";
        message.model = "";
        message.year = 0;
        message.color = "";
        message.insuranceEndorsed = false;
        message.tollTransponder = "";
        message.fuelDiscountsEnabled = false;
        message.online = false;
        message.status = 0;
        message.plateId = "";
        message.vendorId = "";
        message.trailerId = "";
        message.drivers = [];
        message.tags = [];
        message.users = [];
        message.notes = [];
        message.parkingLocation = "";
        if (value !== undefined)
            reflectionMergePartial<TruckModel_Truck>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: TruckModel_Truck): TruckModel_Truck {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* string truck_id */ 1:
                    message.truckId = reader.string();
                    break;
                case /* string reference_id */ 2:
                    message.referenceId = reader.string();
                    break;
                case /* TruckModel.Type type */ 3:
                    message.type = reader.int32();
                    break;
                case /* string vin */ 4:
                    message.vin = reader.string();
                    break;
                case /* string make */ 5:
                    message.make = reader.string();
                    break;
                case /* string model */ 6:
                    message.model = reader.string();
                    break;
                case /* int64 year */ 7:
                    message.year = reader.int64().toNumber();
                    break;
                case /* string color */ 8:
                    message.color = reader.string();
                    break;
                case /* bool insurance_endorsed */ 9:
                    message.insuranceEndorsed = reader.bool();
                    break;
                case /* string toll_transponder */ 10:
                    message.tollTransponder = reader.string();
                    break;
                case /* bool fuel_discounts_enabled */ 11:
                    message.fuelDiscountsEnabled = reader.bool();
                    break;
                case /* bool online */ 12:
                    message.online = reader.bool();
                    break;
                case /* TruckModel.Status status */ 13:
                    message.status = reader.int32();
                    break;
                case /* string plate_id */ 14:
                    message.plateId = reader.string();
                    break;
                case /* string vendor_id */ 15:
                    message.vendorId = reader.string();
                    break;
                case /* string trailer_id */ 16:
                    message.trailerId = reader.string();
                    break;
                case /* repeated TruckModel.Truck.Driver drivers */ 17:
                    message.drivers.push(TruckModel_Truck_Driver.internalBinaryRead(reader, reader.uint32(), options));
                    break;
                case /* repeated TruckModel.Truck.Tag tags */ 18:
                    message.tags.push(TruckModel_Truck_Tag.internalBinaryRead(reader, reader.uint32(), options));
                    break;
                case /* repeated string users */ 19:
                    message.users.push(reader.string());
                    break;
                case /* repeated NoteModel.EntityNote notes */ 20:
                    message.notes.push(NoteModel_EntityNote.internalBinaryRead(reader, reader.uint32(), options));
                    break;
                case /* string parking_location */ 21:
                    message.parkingLocation = reader.string();
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
    internalBinaryWrite(message: TruckModel_Truck, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* string truck_id = 1; */
        if (message.truckId !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.truckId);
        /* string reference_id = 2; */
        if (message.referenceId !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.referenceId);
        /* TruckModel.Type type = 3; */
        if (message.type !== 0)
            writer.tag(3, WireType.Varint).int32(message.type);
        /* string vin = 4; */
        if (message.vin !== "")
            writer.tag(4, WireType.LengthDelimited).string(message.vin);
        /* string make = 5; */
        if (message.make !== "")
            writer.tag(5, WireType.LengthDelimited).string(message.make);
        /* string model = 6; */
        if (message.model !== "")
            writer.tag(6, WireType.LengthDelimited).string(message.model);
        /* int64 year = 7; */
        if (message.year !== 0)
            writer.tag(7, WireType.Varint).int64(message.year);
        /* string color = 8; */
        if (message.color !== "")
            writer.tag(8, WireType.LengthDelimited).string(message.color);
        /* bool insurance_endorsed = 9; */
        if (message.insuranceEndorsed !== false)
            writer.tag(9, WireType.Varint).bool(message.insuranceEndorsed);
        /* string toll_transponder = 10; */
        if (message.tollTransponder !== "")
            writer.tag(10, WireType.LengthDelimited).string(message.tollTransponder);
        /* bool fuel_discounts_enabled = 11; */
        if (message.fuelDiscountsEnabled !== false)
            writer.tag(11, WireType.Varint).bool(message.fuelDiscountsEnabled);
        /* bool online = 12; */
        if (message.online !== false)
            writer.tag(12, WireType.Varint).bool(message.online);
        /* TruckModel.Status status = 13; */
        if (message.status !== 0)
            writer.tag(13, WireType.Varint).int32(message.status);
        /* string plate_id = 14; */
        if (message.plateId !== "")
            writer.tag(14, WireType.LengthDelimited).string(message.plateId);
        /* string vendor_id = 15; */
        if (message.vendorId !== "")
            writer.tag(15, WireType.LengthDelimited).string(message.vendorId);
        /* string trailer_id = 16; */
        if (message.trailerId !== "")
            writer.tag(16, WireType.LengthDelimited).string(message.trailerId);
        /* repeated TruckModel.Truck.Driver drivers = 17; */
        for (let i = 0; i < message.drivers.length; i++)
            TruckModel_Truck_Driver.internalBinaryWrite(message.drivers[i], writer.tag(17, WireType.LengthDelimited).fork(), options).join();
        /* repeated TruckModel.Truck.Tag tags = 18; */
        for (let i = 0; i < message.tags.length; i++)
            TruckModel_Truck_Tag.internalBinaryWrite(message.tags[i], writer.tag(18, WireType.LengthDelimited).fork(), options).join();
        /* repeated string users = 19; */
        for (let i = 0; i < message.users.length; i++)
            writer.tag(19, WireType.LengthDelimited).string(message.users[i]);
        /* repeated NoteModel.EntityNote notes = 20; */
        for (let i = 0; i < message.notes.length; i++)
            NoteModel_EntityNote.internalBinaryWrite(message.notes[i], writer.tag(20, WireType.LengthDelimited).fork(), options).join();
        /* string parking_location = 21; */
        if (message.parkingLocation !== "")
            writer.tag(21, WireType.LengthDelimited).string(message.parkingLocation);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message TruckModel.Truck
 */
export const TruckModel_Truck = new TruckModel_Truck$Type();
// @generated message type with reflection information, may provide speed optimized methods
class TruckModel_Truck_Driver$Type extends MessageType<TruckModel_Truck_Driver> {
    constructor() {
        super("TruckModel.Truck.Driver", [
            { no: 1, name: "driver_id", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "primary", kind: "scalar", T: 8 /*ScalarType.BOOL*/ }
        ]);
    }
    create(value?: PartialMessage<TruckModel_Truck_Driver>): TruckModel_Truck_Driver {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.driverId = "";
        message.primary = false;
        if (value !== undefined)
            reflectionMergePartial<TruckModel_Truck_Driver>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: TruckModel_Truck_Driver): TruckModel_Truck_Driver {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* string driver_id */ 1:
                    message.driverId = reader.string();
                    break;
                case /* bool primary */ 2:
                    message.primary = reader.bool();
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
    internalBinaryWrite(message: TruckModel_Truck_Driver, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* string driver_id = 1; */
        if (message.driverId !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.driverId);
        /* bool primary = 2; */
        if (message.primary !== false)
            writer.tag(2, WireType.Varint).bool(message.primary);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message TruckModel.Truck.Driver
 */
export const TruckModel_Truck_Driver = new TruckModel_Truck_Driver$Type();
// @generated message type with reflection information, may provide speed optimized methods
class TruckModel_Truck_Tag$Type extends MessageType<TruckModel_Truck_Tag> {
    constructor() {
        super("TruckModel.Truck.Tag", [
            { no: 1, name: "tag_id", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "name", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
    create(value?: PartialMessage<TruckModel_Truck_Tag>): TruckModel_Truck_Tag {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.tagId = "";
        message.name = "";
        if (value !== undefined)
            reflectionMergePartial<TruckModel_Truck_Tag>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: TruckModel_Truck_Tag): TruckModel_Truck_Tag {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* string tag_id */ 1:
                    message.tagId = reader.string();
                    break;
                case /* string name */ 2:
                    message.name = reader.string();
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
    internalBinaryWrite(message: TruckModel_Truck_Tag, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* string tag_id = 1; */
        if (message.tagId !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.tagId);
        /* string name = 2; */
        if (message.name !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.name);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message TruckModel.Truck.Tag
 */
export const TruckModel_Truck_Tag = new TruckModel_Truck_Tag$Type();
