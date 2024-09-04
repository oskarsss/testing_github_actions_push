// @generated by protobuf-ts 2.9.4 with parameter long_type_number,generate_dependencies,ts_nocheck,output_typescript
// @generated from protobuf file "v1/models/model_page.proto" (syntax proto3)
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
/**
 * @generated from protobuf message PageModel
 */
export interface PageModel {
    /**
     * @generated from protobuf field: repeated PageModel.View views = 1;
     */
    views: PageModel_View[];
    /**
     * @generated from protobuf field: repeated PageModel.Header headers = 2;
     */
    headers: PageModel_Header[];
    /**
     * @generated from protobuf field: repeated PageModel.ColumnLayout columns = 3;
     */
    columns: PageModel_ColumnLayout[];
}
/**
 * @generated from protobuf message PageModel.View
 */
export interface PageModel_View {
    /**
     * @generated from protobuf field: string view_id = 1;
     */
    viewId: string;
    /**
     * @generated from protobuf field: string name = 2;
     */
    name: string;
    /**
     * @generated from protobuf field: int64 sequence = 3;
     */
    sequence: number;
    /**
     * @generated from protobuf field: int64 row_height = 4;
     */
    rowHeight: number;
    /**
     * @generated from protobuf field: repeated PageModel.View.Column columns = 5;
     */
    columns: PageModel_View_Column[];
}
/**
 * @generated from protobuf message PageModel.View.Column
 */
export interface PageModel_View_Column {
    /**
     * @generated from protobuf field: string column_id = 1;
     */
    columnId: string;
    /**
     * @generated from protobuf field: string name = 2;
     */
    name: string;
    /**
     * @generated from protobuf field: PageModel.View.Column.Type type = 3;
     */
    type: PageModel_View_Column_Type;
    /**
     * @generated from protobuf field: string friendly_name = 4;
     */
    friendlyName: string;
    /**
     * @generated from protobuf field: int64 width = 5;
     */
    width: number;
    /**
     * @generated from protobuf field: int64 sequence = 6;
     */
    sequence: number;
    /**
     * @generated from protobuf field: string header_id = 7;
     */
    headerId: string;
    /**
     * @generated from protobuf field: bool sticky = 8;
     */
    sticky: boolean;
    /**
     * @generated from protobuf field: bool border_left = 9;
     */
    borderLeft: boolean;
    /**
     * @generated from protobuf field: bool border_right = 10;
     */
    borderRight: boolean;
    /**
     * @generated from protobuf field: bool footer_total = 11;
     */
    footerTotal: boolean;
    /**
     * @generated from protobuf field: optional string header_icon = 12;
     */
    headerIcon?: string;
    /**
     * @generated from protobuf field: optional string header_icon_tooltip = 13;
     */
    headerIconTooltip?: string;
    /**
     * @generated from protobuf field: optional bool sticky_right = 14;
     */
    stickyRight?: boolean;
}
/**
 * @generated from protobuf enum PageModel.View.Column.Type
 */
export enum PageModel_View_Column_Type {
    /**
     * @generated from protobuf enum value: COLUMN_TYPE_UNSPECIFIED = 0;
     */
    COLUMN_TYPE_UNSPECIFIED = 0,
    /**
     * @generated from protobuf enum value: COLUMN_TYPE_FIELD = 1;
     */
    COLUMN_TYPE_FIELD = 1,
    /**
     * @generated from protobuf enum value: COLUMN_TYPE_SETTLEMENT_TRANSACTION_CATEGORY = 2;
     */
    COLUMN_TYPE_SETTLEMENT_TRANSACTION_CATEGORY = 2,
    /**
     * @generated from protobuf enum value: COLUMN_TYPE_CUSTOM = 3;
     */
    COLUMN_TYPE_CUSTOM = 3,
    /**
     * @generated from protobuf enum value: COLUMN_TYPE_TEXT = 4;
     */
    COLUMN_TYPE_TEXT = 4,
    /**
     * document page types
     *
     * @generated from protobuf enum value: COLUMN_TYPE_DOCUMENT = 5;
     */
    COLUMN_TYPE_DOCUMENT = 5,
    /**
     * @generated from protobuf enum value: COLUMN_TYPE_DOCUMENT_AND_EXPIRATION = 6;
     */
    COLUMN_TYPE_DOCUMENT_AND_EXPIRATION = 6,
    /**
     * @generated from protobuf enum value: COLUMN_TYPE_DOCUMENT_NUMBER = 7;
     */
    COLUMN_TYPE_DOCUMENT_NUMBER = 7,
    /**
     * @generated from protobuf enum value: COLUMN_TYPE_DOCUMENT_EXPIRES_AT = 8;
     */
    COLUMN_TYPE_DOCUMENT_EXPIRES_AT = 8,
    /**
     * recurring transaction page types
     *
     * @generated from protobuf enum value: COLUMN_TYPE_AMOUNT = 9;
     */
    COLUMN_TYPE_AMOUNT = 9,
    /**
     * @generated from protobuf enum value: COLUMN_TYPE_RECURRING_TRANSACTION = 10;
     */
    COLUMN_TYPE_RECURRING_TRANSACTION = 10
}
/**
 * @generated from protobuf message PageModel.Header
 */
export interface PageModel_Header {
    /**
     * @generated from protobuf field: string header_id = 1;
     */
    headerId: string;
    /**
     * @generated from protobuf field: string name = 2;
     */
    name: string;
    /**
     * @generated from protobuf field: string color = 3;
     */
    color: string;
}
/**
 * @generated from protobuf message PageModel.ColumnLayout
 */
export interface PageModel_ColumnLayout {
    /**
     * @generated from protobuf field: string column_id = 1;
     */
    columnId: string;
    /**
     * @generated from protobuf field: PageModel.View.Column.Type type = 3;
     */
    type: PageModel_View_Column_Type;
    /**
     * @generated from protobuf field: string name = 4;
     */
    name: string;
    /**
     * @generated from protobuf field: int64 width = 5;
     */
    width: number;
    /**
     * @generated from protobuf field: bool total = 6;
     */
    total: boolean;
}
/**
 * @generated from protobuf enum PageModel.Page
 */
export enum PageModel_Page {
    /**
     * @generated from protobuf enum value: PAGE_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * @generated from protobuf enum value: PAGE_BROKERS = 1;
     */
    BROKERS = 1,
    /**
     * @generated from protobuf enum value: PAGE_CUSTOMERS = 2;
     */
    CUSTOMERS = 2,
    /**
     * @generated from protobuf enum value: PAGE_TRUCKS = 3;
     */
    TRUCKS = 3,
    /**
     * @generated from protobuf enum value: PAGE_DRIVERS = 4;
     */
    DRIVERS = 4,
    /**
     * @generated from protobuf enum value: PAGE_TRAILERS = 5;
     */
    TRAILERS = 5,
    /**
     * @generated from protobuf enum value: PAGE_PLATES = 6;
     */
    PLATES = 6,
    /**
     * @generated from protobuf enum value: PAGE_VENDORS = 7;
     */
    VENDORS = 7,
    /**
     * @generated from protobuf enum value: PAGE_TRAILER_COMPANIES = 8;
     */
    TRAILER_COMPANIES = 8,
    /**
     * @generated from protobuf enum value: PAGE_PLATE_COMPANIES = 9;
     */
    PLATE_COMPANIES = 9,
    /**
     * @generated from protobuf enum value: PAGE_BILLING_ALL = 10;
     */
    BILLING_ALL = 10,
    /**
     * @generated from protobuf enum value: PAGE_BILLING_FACTORING = 11;
     */
    BILLING_FACTORING = 11,
    /**
     * @generated from protobuf enum value: PAGE_BILLING_DIRECT = 12;
     */
    BILLING_DIRECT = 12,
    /**
     * @generated from protobuf enum value: PAGE_BILLING_AMAZON = 13;
     */
    BILLING_AMAZON = 13,
    /**
     * @generated from protobuf enum value: PAGE_SETTLEMENTS = 14;
     */
    SETTLEMENTS = 14,
    /**
     * @generated from protobuf enum value: PAGE_FUEL = 15;
     */
    FUEL = 15,
    /**
     * @generated from protobuf enum value: PAGE_TOLLS = 16;
     */
    TOLLS = 16
}
// @generated message type with reflection information, may provide speed optimized methods
class PageModel$Type extends MessageType<PageModel> {
    constructor() {
        super("PageModel", [
            { no: 1, name: "views", kind: "message", repeat: 1 /*RepeatType.PACKED*/, T: () => PageModel_View },
            { no: 2, name: "headers", kind: "message", repeat: 1 /*RepeatType.PACKED*/, T: () => PageModel_Header },
            { no: 3, name: "columns", kind: "message", repeat: 1 /*RepeatType.PACKED*/, T: () => PageModel_ColumnLayout }
        ]);
    }
    create(value?: PartialMessage<PageModel>): PageModel {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.views = [];
        message.headers = [];
        message.columns = [];
        if (value !== undefined)
            reflectionMergePartial<PageModel>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: PageModel): PageModel {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* repeated PageModel.View views */ 1:
                    message.views.push(PageModel_View.internalBinaryRead(reader, reader.uint32(), options));
                    break;
                case /* repeated PageModel.Header headers */ 2:
                    message.headers.push(PageModel_Header.internalBinaryRead(reader, reader.uint32(), options));
                    break;
                case /* repeated PageModel.ColumnLayout columns */ 3:
                    message.columns.push(PageModel_ColumnLayout.internalBinaryRead(reader, reader.uint32(), options));
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
    internalBinaryWrite(message: PageModel, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* repeated PageModel.View views = 1; */
        for (let i = 0; i < message.views.length; i++)
            PageModel_View.internalBinaryWrite(message.views[i], writer.tag(1, WireType.LengthDelimited).fork(), options).join();
        /* repeated PageModel.Header headers = 2; */
        for (let i = 0; i < message.headers.length; i++)
            PageModel_Header.internalBinaryWrite(message.headers[i], writer.tag(2, WireType.LengthDelimited).fork(), options).join();
        /* repeated PageModel.ColumnLayout columns = 3; */
        for (let i = 0; i < message.columns.length; i++)
            PageModel_ColumnLayout.internalBinaryWrite(message.columns[i], writer.tag(3, WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message PageModel
 */
export const PageModel = new PageModel$Type();
// @generated message type with reflection information, may provide speed optimized methods
class PageModel_View$Type extends MessageType<PageModel_View> {
    constructor() {
        super("PageModel.View", [
            { no: 1, name: "view_id", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "name", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 3, name: "sequence", kind: "scalar", T: 3 /*ScalarType.INT64*/, L: 2 /*LongType.NUMBER*/ },
            { no: 4, name: "row_height", kind: "scalar", T: 3 /*ScalarType.INT64*/, L: 2 /*LongType.NUMBER*/ },
            { no: 5, name: "columns", kind: "message", repeat: 1 /*RepeatType.PACKED*/, T: () => PageModel_View_Column }
        ]);
    }
    create(value?: PartialMessage<PageModel_View>): PageModel_View {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.viewId = "";
        message.name = "";
        message.sequence = 0;
        message.rowHeight = 0;
        message.columns = [];
        if (value !== undefined)
            reflectionMergePartial<PageModel_View>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: PageModel_View): PageModel_View {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* string view_id */ 1:
                    message.viewId = reader.string();
                    break;
                case /* string name */ 2:
                    message.name = reader.string();
                    break;
                case /* int64 sequence */ 3:
                    message.sequence = reader.int64().toNumber();
                    break;
                case /* int64 row_height */ 4:
                    message.rowHeight = reader.int64().toNumber();
                    break;
                case /* repeated PageModel.View.Column columns */ 5:
                    message.columns.push(PageModel_View_Column.internalBinaryRead(reader, reader.uint32(), options));
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
    internalBinaryWrite(message: PageModel_View, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* string view_id = 1; */
        if (message.viewId !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.viewId);
        /* string name = 2; */
        if (message.name !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.name);
        /* int64 sequence = 3; */
        if (message.sequence !== 0)
            writer.tag(3, WireType.Varint).int64(message.sequence);
        /* int64 row_height = 4; */
        if (message.rowHeight !== 0)
            writer.tag(4, WireType.Varint).int64(message.rowHeight);
        /* repeated PageModel.View.Column columns = 5; */
        for (let i = 0; i < message.columns.length; i++)
            PageModel_View_Column.internalBinaryWrite(message.columns[i], writer.tag(5, WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message PageModel.View
 */
export const PageModel_View = new PageModel_View$Type();
// @generated message type with reflection information, may provide speed optimized methods
class PageModel_View_Column$Type extends MessageType<PageModel_View_Column> {
    constructor() {
        super("PageModel.View.Column", [
            { no: 1, name: "column_id", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "name", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 3, name: "type", kind: "enum", T: () => ["PageModel.View.Column.Type", PageModel_View_Column_Type] },
            { no: 4, name: "friendly_name", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 5, name: "width", kind: "scalar", T: 3 /*ScalarType.INT64*/, L: 2 /*LongType.NUMBER*/ },
            { no: 6, name: "sequence", kind: "scalar", T: 3 /*ScalarType.INT64*/, L: 2 /*LongType.NUMBER*/ },
            { no: 7, name: "header_id", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 8, name: "sticky", kind: "scalar", T: 8 /*ScalarType.BOOL*/ },
            { no: 9, name: "border_left", kind: "scalar", T: 8 /*ScalarType.BOOL*/ },
            { no: 10, name: "border_right", kind: "scalar", T: 8 /*ScalarType.BOOL*/ },
            { no: 11, name: "footer_total", kind: "scalar", T: 8 /*ScalarType.BOOL*/ },
            { no: 12, name: "header_icon", kind: "scalar", opt: true, T: 9 /*ScalarType.STRING*/ },
            { no: 13, name: "header_icon_tooltip", kind: "scalar", opt: true, T: 9 /*ScalarType.STRING*/ },
            { no: 14, name: "sticky_right", kind: "scalar", opt: true, T: 8 /*ScalarType.BOOL*/ }
        ]);
    }
    create(value?: PartialMessage<PageModel_View_Column>): PageModel_View_Column {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.columnId = "";
        message.name = "";
        message.type = 0;
        message.friendlyName = "";
        message.width = 0;
        message.sequence = 0;
        message.headerId = "";
        message.sticky = false;
        message.borderLeft = false;
        message.borderRight = false;
        message.footerTotal = false;
        if (value !== undefined)
            reflectionMergePartial<PageModel_View_Column>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: PageModel_View_Column): PageModel_View_Column {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* string column_id */ 1:
                    message.columnId = reader.string();
                    break;
                case /* string name */ 2:
                    message.name = reader.string();
                    break;
                case /* PageModel.View.Column.Type type */ 3:
                    message.type = reader.int32();
                    break;
                case /* string friendly_name */ 4:
                    message.friendlyName = reader.string();
                    break;
                case /* int64 width */ 5:
                    message.width = reader.int64().toNumber();
                    break;
                case /* int64 sequence */ 6:
                    message.sequence = reader.int64().toNumber();
                    break;
                case /* string header_id */ 7:
                    message.headerId = reader.string();
                    break;
                case /* bool sticky */ 8:
                    message.sticky = reader.bool();
                    break;
                case /* bool border_left */ 9:
                    message.borderLeft = reader.bool();
                    break;
                case /* bool border_right */ 10:
                    message.borderRight = reader.bool();
                    break;
                case /* bool footer_total */ 11:
                    message.footerTotal = reader.bool();
                    break;
                case /* optional string header_icon */ 12:
                    message.headerIcon = reader.string();
                    break;
                case /* optional string header_icon_tooltip */ 13:
                    message.headerIconTooltip = reader.string();
                    break;
                case /* optional bool sticky_right */ 14:
                    message.stickyRight = reader.bool();
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
    internalBinaryWrite(message: PageModel_View_Column, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* string column_id = 1; */
        if (message.columnId !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.columnId);
        /* string name = 2; */
        if (message.name !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.name);
        /* PageModel.View.Column.Type type = 3; */
        if (message.type !== 0)
            writer.tag(3, WireType.Varint).int32(message.type);
        /* string friendly_name = 4; */
        if (message.friendlyName !== "")
            writer.tag(4, WireType.LengthDelimited).string(message.friendlyName);
        /* int64 width = 5; */
        if (message.width !== 0)
            writer.tag(5, WireType.Varint).int64(message.width);
        /* int64 sequence = 6; */
        if (message.sequence !== 0)
            writer.tag(6, WireType.Varint).int64(message.sequence);
        /* string header_id = 7; */
        if (message.headerId !== "")
            writer.tag(7, WireType.LengthDelimited).string(message.headerId);
        /* bool sticky = 8; */
        if (message.sticky !== false)
            writer.tag(8, WireType.Varint).bool(message.sticky);
        /* bool border_left = 9; */
        if (message.borderLeft !== false)
            writer.tag(9, WireType.Varint).bool(message.borderLeft);
        /* bool border_right = 10; */
        if (message.borderRight !== false)
            writer.tag(10, WireType.Varint).bool(message.borderRight);
        /* bool footer_total = 11; */
        if (message.footerTotal !== false)
            writer.tag(11, WireType.Varint).bool(message.footerTotal);
        /* optional string header_icon = 12; */
        if (message.headerIcon !== undefined)
            writer.tag(12, WireType.LengthDelimited).string(message.headerIcon);
        /* optional string header_icon_tooltip = 13; */
        if (message.headerIconTooltip !== undefined)
            writer.tag(13, WireType.LengthDelimited).string(message.headerIconTooltip);
        /* optional bool sticky_right = 14; */
        if (message.stickyRight !== undefined)
            writer.tag(14, WireType.Varint).bool(message.stickyRight);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message PageModel.View.Column
 */
export const PageModel_View_Column = new PageModel_View_Column$Type();
// @generated message type with reflection information, may provide speed optimized methods
class PageModel_Header$Type extends MessageType<PageModel_Header> {
    constructor() {
        super("PageModel.Header", [
            { no: 1, name: "header_id", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "name", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 3, name: "color", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
    create(value?: PartialMessage<PageModel_Header>): PageModel_Header {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.headerId = "";
        message.name = "";
        message.color = "";
        if (value !== undefined)
            reflectionMergePartial<PageModel_Header>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: PageModel_Header): PageModel_Header {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* string header_id */ 1:
                    message.headerId = reader.string();
                    break;
                case /* string name */ 2:
                    message.name = reader.string();
                    break;
                case /* string color */ 3:
                    message.color = reader.string();
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
    internalBinaryWrite(message: PageModel_Header, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* string header_id = 1; */
        if (message.headerId !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.headerId);
        /* string name = 2; */
        if (message.name !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.name);
        /* string color = 3; */
        if (message.color !== "")
            writer.tag(3, WireType.LengthDelimited).string(message.color);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message PageModel.Header
 */
export const PageModel_Header = new PageModel_Header$Type();
// @generated message type with reflection information, may provide speed optimized methods
class PageModel_ColumnLayout$Type extends MessageType<PageModel_ColumnLayout> {
    constructor() {
        super("PageModel.ColumnLayout", [
            { no: 1, name: "column_id", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 3, name: "type", kind: "enum", T: () => ["PageModel.View.Column.Type", PageModel_View_Column_Type] },
            { no: 4, name: "name", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 5, name: "width", kind: "scalar", T: 3 /*ScalarType.INT64*/, L: 2 /*LongType.NUMBER*/ },
            { no: 6, name: "total", kind: "scalar", T: 8 /*ScalarType.BOOL*/ }
        ]);
    }
    create(value?: PartialMessage<PageModel_ColumnLayout>): PageModel_ColumnLayout {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.columnId = "";
        message.type = 0;
        message.name = "";
        message.width = 0;
        message.total = false;
        if (value !== undefined)
            reflectionMergePartial<PageModel_ColumnLayout>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: PageModel_ColumnLayout): PageModel_ColumnLayout {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* string column_id */ 1:
                    message.columnId = reader.string();
                    break;
                case /* PageModel.View.Column.Type type */ 3:
                    message.type = reader.int32();
                    break;
                case /* string name */ 4:
                    message.name = reader.string();
                    break;
                case /* int64 width */ 5:
                    message.width = reader.int64().toNumber();
                    break;
                case /* bool total */ 6:
                    message.total = reader.bool();
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
    internalBinaryWrite(message: PageModel_ColumnLayout, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* string column_id = 1; */
        if (message.columnId !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.columnId);
        /* PageModel.View.Column.Type type = 3; */
        if (message.type !== 0)
            writer.tag(3, WireType.Varint).int32(message.type);
        /* string name = 4; */
        if (message.name !== "")
            writer.tag(4, WireType.LengthDelimited).string(message.name);
        /* int64 width = 5; */
        if (message.width !== 0)
            writer.tag(5, WireType.Varint).int64(message.width);
        /* bool total = 6; */
        if (message.total !== false)
            writer.tag(6, WireType.Varint).bool(message.total);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message PageModel.ColumnLayout
 */
export const PageModel_ColumnLayout = new PageModel_ColumnLayout$Type();
