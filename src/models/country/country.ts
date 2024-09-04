export const Countries = Object.freeze({
    US    : 'US',
    CANADA: 'CA',
    MEXICO: 'MX'
});

export type Country = (typeof Countries)[keyof typeof Countries];
