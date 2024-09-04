export const TruckTypes = Object.freeze({
    OWNED         : 'owned',
    LEASED        : 'leased',
    OWNER_OPERATOR: 'owner_operator'
});

export type TruckType = (typeof TruckTypes)[keyof typeof TruckTypes];
