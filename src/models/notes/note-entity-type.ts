export const NOTE_ENTITY_TYPE = Object.freeze({
    DRIVER          : 'driver',
    TRUCK           : 'truck',
    TRAILER         : 'trailer',
    TRAILER_COMPANY : 'trailer_company',
    PLATE           : 'plate',
    PLATE_COMPANY   : 'plate_company',
    LOAD            : 'load',
    LOAD_DRIVER     : 'loaddriver',
    BROKER          : 'broker',
    CUSTOMER        : 'customer',
    VENDOR          : 'vendor',
    TRUCKDISPATCH   : 'truckdispatch',
    SETTLEMENT      : 'settlement',
    COMPANY         : 'company',
    TOLL_TRANSACTION: 'toll_transaction',
    FUEL_TRANSACTION: 'fuel_transaction',
    TRUCKCHAT       : 'truckchat',
    TRAILERCHAT     : 'trailerchat',
    MANIFEST        : 'manifest',
    MANIFEST_DRIVER : 'manifestdriver'
});

export type NoteEntityType = (typeof NOTE_ENTITY_TYPE)[keyof typeof NOTE_ENTITY_TYPE];
