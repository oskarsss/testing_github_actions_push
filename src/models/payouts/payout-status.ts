export const PayoutStatuses = Object.freeze({
    pending  : 'pending',
    succeeded: 'succeeded',
    canceled : 'canceled',
    failed   : 'failed'
});

export type PayoutStatus = (typeof PayoutStatuses)[keyof typeof PayoutStatuses];
