export const PayoutTypes = Object.freeze({
    ach    : 'ach',
    wire   : 'wire',
    check  : 'check',
    cash   : 'cash',
    zelle  : 'zelle',
    venmo  : 'venmo',
    cashApp: 'cashApp',
    crypto : 'crypto'
});

export type PayoutType = (typeof PayoutTypes)[keyof typeof PayoutTypes];
