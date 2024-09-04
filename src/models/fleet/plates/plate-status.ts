export const PlateStatuses = Object.freeze({
    ACTIVE              : 'active',
    CANCELLED           : 'cancelled',
    PENDING_CANCELLATION: 'pending_cancellation',
    DELETED             : 'deleted'
});

export type PlateStatus = (typeof PlateStatuses)[keyof typeof PlateStatuses];
