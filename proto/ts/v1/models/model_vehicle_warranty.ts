// @generated by protobuf-ts 2.9.4 with parameter long_type_number,generate_dependencies,ts_nocheck,output_typescript
// @generated from protobuf file "v1/models/model_vehicle_warranty.proto" (syntax proto3)
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
import { VehicleMaintenanceModel_VehicleType } from "./model_vehicle_maintenance";
/**
 * @generated from protobuf message VehicleWarrantyModel
 */
export interface VehicleWarrantyModel {
}
/**
 * @generated from protobuf message VehicleWarrantyModel.VehicleWarranty
 */
export interface VehicleWarrantyModel_VehicleWarranty {
    /**
     * @generated from protobuf field: string vehicle_warranty_id = 1;
     */
    vehicleWarrantyId: string;
    /**
     * @generated from protobuf field: VehicleMaintenanceModel.VehicleType vehicle_type = 2;
     */
    vehicleType: VehicleMaintenanceModel_VehicleType;
    /**
     * @generated from protobuf field: string truck_id = 3;
     */
    truckId: string;
    /**
     * @generated from protobuf field: string trailer_id = 4;
     */
    trailerId: string;
    /**
     * @generated from protobuf field: optional int64 period = 5;
     */
    period?: number; // years or months (will be reduced to months)
    /**
     * @generated from protobuf field: VehicleWarrantyModel.WarrantyPeriodUnitsEnum period_units = 6;
     */
    periodUnits: VehicleWarrantyModel_WarrantyPeriodUnitsEnum;
    /**
     * @generated from protobuf field: string started_at = 7;
     */
    startedAt: string;
    /**
     * @generated from protobuf field: optional int64 distance_miles = 8;
     */
    distanceMiles?: number;
    /**
     * @generated from protobuf field: optional int64 distance_kilometers = 9;
     */
    distanceKilometers?: number;
    /**
     * @generated from protobuf field: bool deleted = 10;
     */
    deleted: boolean;
    /**
     * @generated from protobuf field: string updated_at = 11;
     */
    updatedAt: string;
    /**
     * @generated from protobuf field: string created_at = 12;
     */
    createdAt: string;
}
/**
 * @generated from protobuf message VehicleWarrantyModel.ItemRead
 */
export interface VehicleWarrantyModel_ItemRead {
    /**
     * @generated from protobuf field: string vehicle_warranty_id = 1;
     */
    vehicleWarrantyId: string;
    /**
     * @generated from protobuf field: string warranty_item_id = 2;
     */
    warrantyItemId: string;
    /**
     * @generated from protobuf field: string name = 3;
     */
    name: string;
    /**
     * @generated from protobuf field: optional int64 period_months_range = 4;
     */
    periodMonthsRange?: number;
    /**
     * @generated from protobuf field: optional int64 distance_miles_range = 5;
     */
    distanceMilesRange?: number;
    /**
     * @generated from protobuf field: optional int64 distance_kilometers_range = 6;
     */
    distanceKilometersRange?: number;
}
/**
 * @generated from protobuf message VehicleWarrantyModel.ItemWrite
 */
export interface VehicleWarrantyModel_ItemWrite {
    /**
     * string vehicle_warranty_id
     * string warranty_item_id
     *
     * @generated from protobuf field: string name = 1;
     */
    name: string;
    /**
     * @generated from protobuf field: optional int64 period_months_range = 2;
     */
    periodMonthsRange?: number;
    /**
     * @generated from protobuf field: optional int64 distance_miles_range = 3;
     */
    distanceMilesRange?: number;
    /**
     * @generated from protobuf field: optional int64 distance_kilometers_range = 4;
     */
    distanceKilometersRange?: number;
}
/**
 * @generated from protobuf enum VehicleWarrantyModel.WarrantyPeriodUnitsEnum
 */
export enum VehicleWarrantyModel_WarrantyPeriodUnitsEnum {
    /**
     * @generated from protobuf enum value: WARRANTY_PERIOD_UNITS_UNSPECIFIED = 0;
     */
    WARRANTY_PERIOD_UNITS_UNSPECIFIED = 0,
    /**
     * @generated from protobuf enum value: WARRANTY_PERIOD_UNITS_MONTH = 1;
     */
    WARRANTY_PERIOD_UNITS_MONTH = 1,
    /**
     * @generated from protobuf enum value: WARRANTY_PERIOD_UNITS_YEAR = 2;
     */
    WARRANTY_PERIOD_UNITS_YEAR = 2
}
// @generated message type with reflection information, may provide speed optimized methods
class VehicleWarrantyModel$Type extends MessageType<VehicleWarrantyModel> {
    constructor() {
        super("VehicleWarrantyModel", []);
    }
    create(value?: PartialMessage<VehicleWarrantyModel>): VehicleWarrantyModel {
        const message = globalThis.Object.create((this.messagePrototype!));
        if (value !== undefined)
            reflectionMergePartial<VehicleWarrantyModel>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: VehicleWarrantyModel): VehicleWarrantyModel {
        return target ?? this.create();
    }
    internalBinaryWrite(message: VehicleWarrantyModel, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message VehicleWarrantyModel
 */
export const VehicleWarrantyModel = new VehicleWarrantyModel$Type();
// @generated message type with reflection information, may provide speed optimized methods
class VehicleWarrantyModel_VehicleWarranty$Type extends MessageType<VehicleWarrantyModel_VehicleWarranty> {
    constructor() {
        super("VehicleWarrantyModel.VehicleWarranty", [
            { no: 1, name: "vehicle_warranty_id", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "vehicle_type", kind: "enum", T: () => ["VehicleMaintenanceModel.VehicleType", VehicleMaintenanceModel_VehicleType, "VEHICLE_TYPE_"] },
            { no: 3, name: "truck_id", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 4, name: "trailer_id", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 5, name: "period", kind: "scalar", opt: true, T: 3 /*ScalarType.INT64*/, L: 2 /*LongType.NUMBER*/ },
            { no: 6, name: "period_units", kind: "enum", T: () => ["VehicleWarrantyModel.WarrantyPeriodUnitsEnum", VehicleWarrantyModel_WarrantyPeriodUnitsEnum] },
            { no: 7, name: "started_at", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 8, name: "distance_miles", kind: "scalar", opt: true, T: 3 /*ScalarType.INT64*/, L: 2 /*LongType.NUMBER*/ },
            { no: 9, name: "distance_kilometers", kind: "scalar", opt: true, T: 3 /*ScalarType.INT64*/, L: 2 /*LongType.NUMBER*/ },
            { no: 10, name: "deleted", kind: "scalar", T: 8 /*ScalarType.BOOL*/ },
            { no: 11, name: "updated_at", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 12, name: "created_at", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
    create(value?: PartialMessage<VehicleWarrantyModel_VehicleWarranty>): VehicleWarrantyModel_VehicleWarranty {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.vehicleWarrantyId = "";
        message.vehicleType = 0;
        message.truckId = "";
        message.trailerId = "";
        message.periodUnits = 0;
        message.startedAt = "";
        message.deleted = false;
        message.updatedAt = "";
        message.createdAt = "";
        if (value !== undefined)
            reflectionMergePartial<VehicleWarrantyModel_VehicleWarranty>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: VehicleWarrantyModel_VehicleWarranty): VehicleWarrantyModel_VehicleWarranty {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* string vehicle_warranty_id */ 1:
                    message.vehicleWarrantyId = reader.string();
                    break;
                case /* VehicleMaintenanceModel.VehicleType vehicle_type */ 2:
                    message.vehicleType = reader.int32();
                    break;
                case /* string truck_id */ 3:
                    message.truckId = reader.string();
                    break;
                case /* string trailer_id */ 4:
                    message.trailerId = reader.string();
                    break;
                case /* optional int64 period */ 5:
                    message.period = reader.int64().toNumber();
                    break;
                case /* VehicleWarrantyModel.WarrantyPeriodUnitsEnum period_units */ 6:
                    message.periodUnits = reader.int32();
                    break;
                case /* string started_at */ 7:
                    message.startedAt = reader.string();
                    break;
                case /* optional int64 distance_miles */ 8:
                    message.distanceMiles = reader.int64().toNumber();
                    break;
                case /* optional int64 distance_kilometers */ 9:
                    message.distanceKilometers = reader.int64().toNumber();
                    break;
                case /* bool deleted */ 10:
                    message.deleted = reader.bool();
                    break;
                case /* string updated_at */ 11:
                    message.updatedAt = reader.string();
                    break;
                case /* string created_at */ 12:
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
    internalBinaryWrite(message: VehicleWarrantyModel_VehicleWarranty, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* string vehicle_warranty_id = 1; */
        if (message.vehicleWarrantyId !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.vehicleWarrantyId);
        /* VehicleMaintenanceModel.VehicleType vehicle_type = 2; */
        if (message.vehicleType !== 0)
            writer.tag(2, WireType.Varint).int32(message.vehicleType);
        /* string truck_id = 3; */
        if (message.truckId !== "")
            writer.tag(3, WireType.LengthDelimited).string(message.truckId);
        /* string trailer_id = 4; */
        if (message.trailerId !== "")
            writer.tag(4, WireType.LengthDelimited).string(message.trailerId);
        /* optional int64 period = 5; */
        if (message.period !== undefined)
            writer.tag(5, WireType.Varint).int64(message.period);
        /* VehicleWarrantyModel.WarrantyPeriodUnitsEnum period_units = 6; */
        if (message.periodUnits !== 0)
            writer.tag(6, WireType.Varint).int32(message.periodUnits);
        /* string started_at = 7; */
        if (message.startedAt !== "")
            writer.tag(7, WireType.LengthDelimited).string(message.startedAt);
        /* optional int64 distance_miles = 8; */
        if (message.distanceMiles !== undefined)
            writer.tag(8, WireType.Varint).int64(message.distanceMiles);
        /* optional int64 distance_kilometers = 9; */
        if (message.distanceKilometers !== undefined)
            writer.tag(9, WireType.Varint).int64(message.distanceKilometers);
        /* bool deleted = 10; */
        if (message.deleted !== false)
            writer.tag(10, WireType.Varint).bool(message.deleted);
        /* string updated_at = 11; */
        if (message.updatedAt !== "")
            writer.tag(11, WireType.LengthDelimited).string(message.updatedAt);
        /* string created_at = 12; */
        if (message.createdAt !== "")
            writer.tag(12, WireType.LengthDelimited).string(message.createdAt);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message VehicleWarrantyModel.VehicleWarranty
 */
export const VehicleWarrantyModel_VehicleWarranty = new VehicleWarrantyModel_VehicleWarranty$Type();
// @generated message type with reflection information, may provide speed optimized methods
class VehicleWarrantyModel_ItemRead$Type extends MessageType<VehicleWarrantyModel_ItemRead> {
    constructor() {
        super("VehicleWarrantyModel.ItemRead", [
            { no: 1, name: "vehicle_warranty_id", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "warranty_item_id", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 3, name: "name", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 4, name: "period_months_range", kind: "scalar", opt: true, T: 3 /*ScalarType.INT64*/, L: 2 /*LongType.NUMBER*/ },
            { no: 5, name: "distance_miles_range", kind: "scalar", opt: true, T: 3 /*ScalarType.INT64*/, L: 2 /*LongType.NUMBER*/ },
            { no: 6, name: "distance_kilometers_range", kind: "scalar", opt: true, T: 3 /*ScalarType.INT64*/, L: 2 /*LongType.NUMBER*/ }
        ]);
    }
    create(value?: PartialMessage<VehicleWarrantyModel_ItemRead>): VehicleWarrantyModel_ItemRead {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.vehicleWarrantyId = "";
        message.warrantyItemId = "";
        message.name = "";
        if (value !== undefined)
            reflectionMergePartial<VehicleWarrantyModel_ItemRead>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: VehicleWarrantyModel_ItemRead): VehicleWarrantyModel_ItemRead {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* string vehicle_warranty_id */ 1:
                    message.vehicleWarrantyId = reader.string();
                    break;
                case /* string warranty_item_id */ 2:
                    message.warrantyItemId = reader.string();
                    break;
                case /* string name */ 3:
                    message.name = reader.string();
                    break;
                case /* optional int64 period_months_range */ 4:
                    message.periodMonthsRange = reader.int64().toNumber();
                    break;
                case /* optional int64 distance_miles_range */ 5:
                    message.distanceMilesRange = reader.int64().toNumber();
                    break;
                case /* optional int64 distance_kilometers_range */ 6:
                    message.distanceKilometersRange = reader.int64().toNumber();
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
    internalBinaryWrite(message: VehicleWarrantyModel_ItemRead, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* string vehicle_warranty_id = 1; */
        if (message.vehicleWarrantyId !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.vehicleWarrantyId);
        /* string warranty_item_id = 2; */
        if (message.warrantyItemId !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.warrantyItemId);
        /* string name = 3; */
        if (message.name !== "")
            writer.tag(3, WireType.LengthDelimited).string(message.name);
        /* optional int64 period_months_range = 4; */
        if (message.periodMonthsRange !== undefined)
            writer.tag(4, WireType.Varint).int64(message.periodMonthsRange);
        /* optional int64 distance_miles_range = 5; */
        if (message.distanceMilesRange !== undefined)
            writer.tag(5, WireType.Varint).int64(message.distanceMilesRange);
        /* optional int64 distance_kilometers_range = 6; */
        if (message.distanceKilometersRange !== undefined)
            writer.tag(6, WireType.Varint).int64(message.distanceKilometersRange);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message VehicleWarrantyModel.ItemRead
 */
export const VehicleWarrantyModel_ItemRead = new VehicleWarrantyModel_ItemRead$Type();
// @generated message type with reflection information, may provide speed optimized methods
class VehicleWarrantyModel_ItemWrite$Type extends MessageType<VehicleWarrantyModel_ItemWrite> {
    constructor() {
        super("VehicleWarrantyModel.ItemWrite", [
            { no: 1, name: "name", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "period_months_range", kind: "scalar", opt: true, T: 3 /*ScalarType.INT64*/, L: 2 /*LongType.NUMBER*/ },
            { no: 3, name: "distance_miles_range", kind: "scalar", opt: true, T: 3 /*ScalarType.INT64*/, L: 2 /*LongType.NUMBER*/ },
            { no: 4, name: "distance_kilometers_range", kind: "scalar", opt: true, T: 3 /*ScalarType.INT64*/, L: 2 /*LongType.NUMBER*/ }
        ]);
    }
    create(value?: PartialMessage<VehicleWarrantyModel_ItemWrite>): VehicleWarrantyModel_ItemWrite {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.name = "";
        if (value !== undefined)
            reflectionMergePartial<VehicleWarrantyModel_ItemWrite>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: VehicleWarrantyModel_ItemWrite): VehicleWarrantyModel_ItemWrite {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* string name */ 1:
                    message.name = reader.string();
                    break;
                case /* optional int64 period_months_range */ 2:
                    message.periodMonthsRange = reader.int64().toNumber();
                    break;
                case /* optional int64 distance_miles_range */ 3:
                    message.distanceMilesRange = reader.int64().toNumber();
                    break;
                case /* optional int64 distance_kilometers_range */ 4:
                    message.distanceKilometersRange = reader.int64().toNumber();
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
    internalBinaryWrite(message: VehicleWarrantyModel_ItemWrite, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* string name = 1; */
        if (message.name !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.name);
        /* optional int64 period_months_range = 2; */
        if (message.periodMonthsRange !== undefined)
            writer.tag(2, WireType.Varint).int64(message.periodMonthsRange);
        /* optional int64 distance_miles_range = 3; */
        if (message.distanceMilesRange !== undefined)
            writer.tag(3, WireType.Varint).int64(message.distanceMilesRange);
        /* optional int64 distance_kilometers_range = 4; */
        if (message.distanceKilometersRange !== undefined)
            writer.tag(4, WireType.Varint).int64(message.distanceKilometersRange);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message VehicleWarrantyModel.ItemWrite
 */
export const VehicleWarrantyModel_ItemWrite = new VehicleWarrantyModel_ItemWrite$Type();
