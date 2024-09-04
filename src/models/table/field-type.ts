export const FieldTypes = Object.freeze({
    TEXT    : 'text',
    NUMBER  : 'number',
    AMOUNT  : 'amount',
    DATE    : 'date',
    DATETIME: 'datetime',
    SELECT  : 'select',
    CHECKBOX: 'checkbox'
});

export type FieldType = (typeof FieldTypes)[keyof typeof FieldTypes];
