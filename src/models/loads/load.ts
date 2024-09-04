export const LoadStatuses = Object.freeze({
    PENDING    : 'pending',
    ASSIGNED   : 'assigned',
    IN_PROGRESS: 'in_progress',
    DELIVERED  : 'delivered',
    CANCELED   : 'canceled',
    TONU       : 'tonu',
    DELETED    : 'deleted'
});

export { LoadModel } from '@proto/models/model_load';
export type LoadStatus = (typeof LoadStatuses)[keyof typeof LoadStatuses];

export const LoadInvoiceStatuses = Object.freeze({
    DETENTION_REQUESTED: 'detention_requested',
    NOT_INVOICED       : 'not_invoiced',
    INVOICED           : 'invoiced',
    PAID               : 'paid',
    NEED_REVIEW        : 'need_review',
    REJECTED           : 'rejected'
});

export type LoadInvoiceStatus = (typeof LoadInvoiceStatuses)[keyof typeof LoadInvoiceStatuses];
