export const ColumnTypes = Object.freeze({
    TEXT                   : 'text',
    AMOUNT                 : 'amount',
    DOCUMENT               : 'document',
    DOCUMENT_AND_EXPIRATION: 'document_and_expiration',
    DOCUMENT_EXPIRES_AT    : 'document_expires_at',
    DOCUMENT_NUMBER        : 'document_number',
    FIELD                  : 'field',
    CUSTOM                 : 'custom',
    CHECKBOX               : 'checkbox'
});

export type ColumnType = (typeof ColumnTypes)[keyof typeof ColumnTypes];
