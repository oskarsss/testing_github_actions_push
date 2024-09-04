export const SettlementsStatuses = Object.freeze({
    OPEN     : 'open',
    IN_REVIEW: 'in_review',
    VERIFIED : 'verified',
    CLOSED   : 'closed',
    SENT     : 'sent',
    PAID     : 'paid'
});

export type SettlementStatus = (typeof SettlementsStatuses)[keyof typeof SettlementsStatuses];

export enum SETTLEMENT_STATUS {
    IN_REVIEW = 'in_review',
    OPEN = 'open',
    CLOSED = 'closed',
    VERIFIED = 'verified',
    SENT = 'sent',
    PAID = 'paid'
}
