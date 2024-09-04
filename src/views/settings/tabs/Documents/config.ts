import { DocumentModel_DocumentEntityType } from '@proto/models/model_document';
import type { TFunction } from '@/@types/next-intl';

type ViewEntity = {
    id: string;
    value: DocumentModel_DocumentEntityType | '';
    label: string;
};

export type ViewsEntity = ViewEntity[];

export const getViewsEntity = (t: TFunction): ViewsEntity => [
    {
        id   : 'all',
        value: '',
        label: t('common:all')
    },
    {
        id   : 'driver',
        value: DocumentModel_DocumentEntityType.DRIVER,
        label: t('entity:driver')
    },
    {
        id   : 'truck',
        value: DocumentModel_DocumentEntityType.TRUCK,
        label: t('entity:truck')
    },
    {
        id   : 'trailer',
        value: DocumentModel_DocumentEntityType.TRAILER,
        label: t('entity:trailer')
    },
    {
        id   : 'trailer_company',
        value: DocumentModel_DocumentEntityType.TRAILER_COMPANY,
        label: t('entity:trailer_company')
    },
    {
        id   : 'plate',
        value: DocumentModel_DocumentEntityType.PLATE,
        label: t('entity:plate')
    },
    {
        id   : 'plate_company',
        value: DocumentModel_DocumentEntityType.PLATE_COMPANY,
        label: t('entity:plate_company')
    },
    {
        id   : 'load',
        value: DocumentModel_DocumentEntityType.LOAD,
        label: t('entity:load')
    },
    {
        id   : 'broker',
        value: DocumentModel_DocumentEntityType.BROKER,
        label: t('entity:broker')
    },
    {
        id   : 'customer',
        value: DocumentModel_DocumentEntityType.CUSTOMER,
        label: t('entity:customer')
    },
    {
        id   : 'vendor',
        value: DocumentModel_DocumentEntityType.VENDOR,
        label: t('entity:vendor')
    },
    {
        id   : 'company',
        value: DocumentModel_DocumentEntityType.COMPANY,
        label: t('entity:company')
    }
];
