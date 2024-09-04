/* eslint-disable max-len */

import { DocumentModel_DocumentEntityType } from '@proto/models/model_document';
import API_TAGS, { ProvideTagsType } from '@/store/api_tags';

// export const DOCUMENT_STATUS_GRPC_ENUM: Record<DocumentModel_Status, Documents.Status> =
//     Object.freeze({
//         [DocumentModel_Status.DOCUMENT_STATUS_PENDING]    : 'pending',
//         [DocumentModel_Status.DOCUMENT_STATUS_DELETED]    : 'invalid',
//         [DocumentModel_Status.DOCUMENT_STATUS_INVALID]    : 'invalid',
//         [DocumentModel_Status.DOCUMENT_STATUS_VALID]      : 'valid',
//         [DocumentModel_Status.DOCUMENT_STATUS_UNSPECIFIED]: 'invalid'
//     });

// export const DOCUMENT_ENTITY_TYPE_TO_GRPC_ENUM: Record<
//     Documents.EntityType,
//     DocumentModel_DocumentEntityType
// > = Object.freeze({
//     [Documents.EntityType.TRAILER_COMPANY]: DocumentModel_DocumentEntityType.trailer_company,
//     [Documents.EntityType.PLATE]          : DocumentModel_DocumentEntityType.plate,
//     [Documents.EntityType.TRAILER]        : DocumentModel_DocumentEntityType.trailer,
//     [Documents.EntityType.TRUCK]          : DocumentModel_DocumentEntityType.truck,
//     [Documents.EntityType.BROKER]         : DocumentModel_DocumentEntityType.broker,
//     [Documents.EntityType.LOAD]           : DocumentModel_DocumentEntityType.load,
//     [Documents.EntityType.CUSTOMER]       : DocumentModel_DocumentEntityType.customer,
//     [Documents.EntityType.VENDOR]         : DocumentModel_DocumentEntityType.vendor,
//     [Documents.EntityType.DRIVER]         : DocumentModel_DocumentEntityType.driver,
//     [Documents.EntityType.COMPANY]        : DocumentModel_DocumentEntityType.company,
//     [Documents.EntityType.PLATE_COMPANY]  : DocumentModel_DocumentEntityType.plate_company,
//     [Documents.EntityType.LOAN]           : DocumentModel_DocumentEntityType.loan
// });

export const DOCUMENT_ENTITY_TYPE_GRPC_ENUM = {
    [DocumentModel_DocumentEntityType.TRAILER_COMPANY] : 'trailer_company',
    [DocumentModel_DocumentEntityType.PLATE]           : 'plate',
    [DocumentModel_DocumentEntityType.TRAILER]         : 'trailer',
    [DocumentModel_DocumentEntityType.TRUCK]           : 'truck',
    [DocumentModel_DocumentEntityType.BROKER]          : 'broker',
    [DocumentModel_DocumentEntityType.LOAD]            : 'load',
    [DocumentModel_DocumentEntityType.CUSTOMER]        : 'customer',
    [DocumentModel_DocumentEntityType.VENDOR]          : 'vendor',
    [DocumentModel_DocumentEntityType.DRIVER]          : 'driver',
    [DocumentModel_DocumentEntityType.COMPANY]         : 'company',
    [DocumentModel_DocumentEntityType.PLATE_COMPANY]   : 'plate_company',
    [DocumentModel_DocumentEntityType.LOAN]            : 'loan',
    [DocumentModel_DocumentEntityType.UNSPECIFIED]     : 'loan',
    [DocumentModel_DocumentEntityType.VEHICLE_WARRANTY]: 'vehicle_warranty',
    [DocumentModel_DocumentEntityType.SERVICE_LOG]     : 'service_log'
} as const;

// export const DOCUMENT_STATUS_TO_GRPC_ENUM: Record<Documents.Status, DocumentModel_Status> =
//     Object.freeze({
//         pending: DocumentModel_Status.DOCUMENT_STATUS_PENDING,
//         valid  : DocumentModel_Status.DOCUMENT_STATUS_VALID,
//         invalid: DocumentModel_Status.DOCUMENT_STATUS_INVALID
//     });

export const DOCUMENT_ENTITY_TYPE_TO_PROVIDE_TAG: Record<
    DocumentModel_DocumentEntityType,
    ProvideTagsType
> = Object.freeze({
    [DocumentModel_DocumentEntityType.TRAILER_COMPANY] : API_TAGS.trailer_companies,
    [DocumentModel_DocumentEntityType.PLATE]           : API_TAGS.plate,
    [DocumentModel_DocumentEntityType.TRAILER]         : API_TAGS.trailer,
    [DocumentModel_DocumentEntityType.TRUCK]           : API_TAGS.truck,
    [DocumentModel_DocumentEntityType.BROKER]          : API_TAGS.broker,
    [DocumentModel_DocumentEntityType.LOAD]            : API_TAGS.load,
    [DocumentModel_DocumentEntityType.CUSTOMER]        : API_TAGS.customer,
    [DocumentModel_DocumentEntityType.VENDOR]          : API_TAGS.vendor,
    [DocumentModel_DocumentEntityType.DRIVER]          : API_TAGS.driver,
    [DocumentModel_DocumentEntityType.COMPANY]         : API_TAGS.company,
    [DocumentModel_DocumentEntityType.PLATE_COMPANY]   : API_TAGS.plate_companies,
    [DocumentModel_DocumentEntityType.LOAN]            : API_TAGS.loan,
    [DocumentModel_DocumentEntityType.VEHICLE_WARRANTY]: API_TAGS.warranties,
    [DocumentModel_DocumentEntityType.SERVICE_LOG]     : API_TAGS.service_logs,
    [DocumentModel_DocumentEntityType.UNSPECIFIED]     : 'document_types'
});

export const DOCUMENT_ENTITY_TYPES_TO_PROVIDE_TAG: Record<
    DocumentModel_DocumentEntityType,
    (ProvideTagsType | { type: ProvideTagsType; id: string })[]
> = Object.freeze({
    [DocumentModel_DocumentEntityType.TRAILER_COMPANY] : [API_TAGS.trailer_companies],
    [DocumentModel_DocumentEntityType.PLATE]           : [API_TAGS.plates],
    [DocumentModel_DocumentEntityType.TRAILER]         : [API_TAGS.trailers],
    [DocumentModel_DocumentEntityType.TRUCK]           : [API_TAGS.trucks],
    [DocumentModel_DocumentEntityType.BROKER]          : [API_TAGS.brokers],
    [DocumentModel_DocumentEntityType.LOAD]            : [API_TAGS.loads],
    [DocumentModel_DocumentEntityType.SERVICE_LOG]     : [API_TAGS.service_logs],
    [DocumentModel_DocumentEntityType.CUSTOMER]        : [API_TAGS.customers],
    [DocumentModel_DocumentEntityType.VENDOR]          : [API_TAGS.vendors],
    [DocumentModel_DocumentEntityType.DRIVER]          : [API_TAGS.drivers],
    [DocumentModel_DocumentEntityType.COMPANY]         : [API_TAGS.company],
    [DocumentModel_DocumentEntityType.PLATE_COMPANY]   : [API_TAGS.plate_companies],
    [DocumentModel_DocumentEntityType.LOAN]            : [API_TAGS.loan],
    [DocumentModel_DocumentEntityType.VEHICLE_WARRANTY]: [API_TAGS.warranties],
    [DocumentModel_DocumentEntityType.UNSPECIFIED]     : ['document_types']
});
