export const FilterTypes = Object.freeze({
    USER        : 'user',
    STATUS      : 'status',
    TYPE        : 'type',
    TEXT        : 'text',
    TRUCK       : 'truck',
    TRUCK_TYPE  : 'truck_type',
    DRIVER_TYPE : 'driver_type',
    TRAILER_TYPE: 'trailer_type',
    driver      : 'driver',
    truck       : 'truck'
});

export type FilterType = (typeof FilterTypes)[keyof typeof FilterTypes];
