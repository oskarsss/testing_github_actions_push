export const FieldEntityTypes = Object.freeze({
    TRUCK           : 'truck',
    TRAILER         : 'trailer',
    DRIVER          : 'driver',
    SETTLEMENT      : 'settlement',
    LOAD            : 'load',
    PLATE           : 'plate',
    TRAILER_COMPANY : 'trailer_company',
    BROKER          : 'broker',
    CUSTOMER        : 'customer',
    VENDOR          : 'vendor',
    COMPANY         : 'company',
    PLATE_COMPANY   : 'plate_company',
    LOAN            : 'loan',
    VEHICLE_WARRANTY: 'vehicle_warranty'
});
export type FieldEntityType = (typeof FieldEntityTypes)[keyof typeof FieldEntityTypes];
