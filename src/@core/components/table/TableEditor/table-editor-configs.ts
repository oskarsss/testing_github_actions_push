/* eslint-disable max-len */

import { PageModel_Page } from '@proto/models/model_page';
import { DocumentModel_DocumentEntityType } from '@proto/models/model_document';
import type { IntlMessageKey } from '@/@types/next-intl';
import { FieldModel_EntityType } from '@proto/models/model_field';

export const FIELD_ENTITY_TYPE_TO_DOCUMENT_ENTITY_TYPE: Record<
    FieldModel_EntityType,
    DocumentModel_DocumentEntityType
> = {
    [FieldModel_EntityType.FIELD_ENTITY_TYPE_UNSPECIFIED]:
        DocumentModel_DocumentEntityType.UNSPECIFIED,
    [FieldModel_EntityType.FIELD_ENTITY_TYPE_BROKER]  : DocumentModel_DocumentEntityType.BROKER,
    [FieldModel_EntityType.FIELD_ENTITY_TYPE_CUSTOMER]: DocumentModel_DocumentEntityType.CUSTOMER,
    [FieldModel_EntityType.FIELD_ENTITY_TYPE_TRUCK]   : DocumentModel_DocumentEntityType.TRUCK,
    [FieldModel_EntityType.FIELD_ENTITY_TYPE_DRIVER]  : DocumentModel_DocumentEntityType.DRIVER,
    [FieldModel_EntityType.FIELD_ENTITY_TYPE_TRAILER] : DocumentModel_DocumentEntityType.TRAILER,
    [FieldModel_EntityType.FIELD_ENTITY_TYPE_PLATE]   : DocumentModel_DocumentEntityType.PLATE,
    [FieldModel_EntityType.FIELD_ENTITY_TYPE_VENDOR]  : DocumentModel_DocumentEntityType.VENDOR,
    [FieldModel_EntityType.FIELD_ENTITY_TYPE_TRAILER_COMPANY]:
        DocumentModel_DocumentEntityType.TRAILER_COMPANY,
    [FieldModel_EntityType.FIELD_ENTITY_TYPE_PLATE_COMPANY]:
        DocumentModel_DocumentEntityType.PLATE_COMPANY,
    [FieldModel_EntityType.FIELD_ENTITY_TYPE_LOAD]: DocumentModel_DocumentEntityType.LOAD,
    [FieldModel_EntityType.FIELD_ENTITY_TYPE_SETTLEMENT]:
        DocumentModel_DocumentEntityType.UNSPECIFIED,
    [FieldModel_EntityType.FIELD_ENTITY_TYPE_FUEL]: DocumentModel_DocumentEntityType.UNSPECIFIED,
    [FieldModel_EntityType.FIELD_ENTITY_TYPE_TOLL]: DocumentModel_DocumentEntityType.UNSPECIFIED
};

export const PAGE_FIELD_ENTITY_TYPE: Record<PageModel_Page, FieldModel_EntityType[]> = {
    [PageModel_Page.UNSPECIFIED]: [],
    [PageModel_Page.TRUCKS]     : [
        FieldModel_EntityType.FIELD_ENTITY_TYPE_TRUCK,
        FieldModel_EntityType.FIELD_ENTITY_TYPE_TRAILER,
        FieldModel_EntityType.FIELD_ENTITY_TYPE_DRIVER
    ],
    [PageModel_Page.DRIVERS]: [
        FieldModel_EntityType.FIELD_ENTITY_TYPE_DRIVER,
        FieldModel_EntityType.FIELD_ENTITY_TYPE_TRUCK,
        FieldModel_EntityType.FIELD_ENTITY_TYPE_TRAILER
    ],
    [PageModel_Page.TRAILERS]: [
        FieldModel_EntityType.FIELD_ENTITY_TYPE_TRAILER,
        FieldModel_EntityType.FIELD_ENTITY_TYPE_TRUCK,
        FieldModel_EntityType.FIELD_ENTITY_TYPE_DRIVER
    ],
    [PageModel_Page.PLATES]           : [FieldModel_EntityType.FIELD_ENTITY_TYPE_PLATE],
    [PageModel_Page.FUEL]             : [],
    [PageModel_Page.SETTLEMENTS]      : [],
    [PageModel_Page.TRAILER_COMPANIES]: [FieldModel_EntityType.FIELD_ENTITY_TYPE_TRAILER_COMPANY],
    [PageModel_Page.PLATE_COMPANIES]  : [FieldModel_EntityType.FIELD_ENTITY_TYPE_PLATE_COMPANY],
    [PageModel_Page.BILLING_FACTORING]: [FieldModel_EntityType.FIELD_ENTITY_TYPE_LOAD],
    [PageModel_Page.BILLING_DIRECT]   : [FieldModel_EntityType.FIELD_ENTITY_TYPE_LOAD],
    [PageModel_Page.BILLING_ALL]      : [FieldModel_EntityType.FIELD_ENTITY_TYPE_LOAD],
    [PageModel_Page.BILLING_AMAZON]   : [FieldModel_EntityType.FIELD_ENTITY_TYPE_LOAD],
    [PageModel_Page.VENDORS]          : [FieldModel_EntityType.FIELD_ENTITY_TYPE_VENDOR],
    [PageModel_Page.BROKERS]          : [FieldModel_EntityType.FIELD_ENTITY_TYPE_BROKER],
    [PageModel_Page.CUSTOMERS]        : [FieldModel_EntityType.FIELD_ENTITY_TYPE_CUSTOMER],
    [PageModel_Page.TOLLS]            : []
};

export const TRANSLATE_FIELD_ENTITY_TYPE: Record<FieldModel_EntityType, IntlMessageKey> = {
    [FieldModel_EntityType.FIELD_ENTITY_TYPE_UNSPECIFIED]    : '',
    [FieldModel_EntityType.FIELD_ENTITY_TYPE_BROKER]         : 'entity:broker',
    [FieldModel_EntityType.FIELD_ENTITY_TYPE_CUSTOMER]       : 'entity:customer',
    [FieldModel_EntityType.FIELD_ENTITY_TYPE_TRUCK]          : 'entity:truck',
    [FieldModel_EntityType.FIELD_ENTITY_TYPE_DRIVER]         : 'entity:driver',
    [FieldModel_EntityType.FIELD_ENTITY_TYPE_TRAILER]        : 'entity:trailer',
    [FieldModel_EntityType.FIELD_ENTITY_TYPE_PLATE]          : 'entity:plate',
    [FieldModel_EntityType.FIELD_ENTITY_TYPE_VENDOR]         : 'entity:vendor',
    [FieldModel_EntityType.FIELD_ENTITY_TYPE_TRAILER_COMPANY]: 'entity:trailer_company',
    [FieldModel_EntityType.FIELD_ENTITY_TYPE_PLATE_COMPANY]  : 'entity:plate_company',
    [FieldModel_EntityType.FIELD_ENTITY_TYPE_LOAD]           : 'entity:load',
    [FieldModel_EntityType.FIELD_ENTITY_TYPE_SETTLEMENT]     : 'entity:settlement',
    [FieldModel_EntityType.FIELD_ENTITY_TYPE_FUEL]           : 'entity:fuel',
    [FieldModel_EntityType.FIELD_ENTITY_TYPE_TOLL]           : 'entity:toll'
};

export const TRANSLATE_PAGE_TYPE: Record<PageModel_Page, IntlMessageKey> = {
    [PageModel_Page.UNSPECIFIED]      : '',
    [PageModel_Page.TRUCKS]           : 'pages:trucks',
    [PageModel_Page.DRIVERS]          : 'pages:drivers',
    [PageModel_Page.TRAILERS]         : 'pages:trailers',
    [PageModel_Page.PLATES]           : 'pages:plates',
    [PageModel_Page.FUEL]             : 'pages:fuel',
    [PageModel_Page.SETTLEMENTS]      : 'pages:settlements',
    [PageModel_Page.TRAILER_COMPANIES]: 'pages:trailer_companies',
    [PageModel_Page.PLATE_COMPANIES]  : 'pages:plate_companies',
    [PageModel_Page.BILLING_FACTORING]: 'pages:billing.factoring',
    [PageModel_Page.BILLING_DIRECT]   : 'pages:billing.direct',
    [PageModel_Page.BILLING_ALL]      : 'pages:billing.all',
    [PageModel_Page.BILLING_AMAZON]   : 'pages:billing.amazon',
    [PageModel_Page.VENDORS]          : 'pages:vendors',
    [PageModel_Page.BROKERS]          : 'pages:brokers',
    [PageModel_Page.CUSTOMERS]        : 'pages:customers',
    [PageModel_Page.TOLLS]            : 'pages:customers'
};
