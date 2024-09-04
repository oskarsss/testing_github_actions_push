import type { TFunction } from '@/@types/next-intl';
import { PageModel_View_Column, PageModel_View_Column_Type } from '@proto/models/model_page';

const PAYOUTS_VIEW_COLUMNS = (t: TFunction): PageModel_View_Column[] => [
    // {
    //     columnId    : 'payoutId',
    //     name         : 'Payout Id',
    //     type         : PageModel_View_Column_Type.COLUMN_TYPE_TEXT,
    //     friendlyName: 'Payout Id',
    //     width        : 150,
    //     sequence     : 1,
    //     headerId    : '',
    //
    //     sticky       : false,
    //     borderLeft  : false,
    //     borderRight : false,
    //     footerTotal : false,
    // },
    {
        columnId    : 'entityType',
        name        : t('payouts:table.columns.headers.entity_type'),
        type        : PageModel_View_Column_Type.COLUMN_TYPE_CUSTOM,
        friendlyName: t('payouts:table.columns.headers.entity_type'),
        width       : 230,
        sequence    : 2,
        headerId    : '',
        sticky      : false,
        borderLeft  : false,
        borderRight : false,
        footerTotal : false
    },
    {
        columnId    : 'amountFormatted',
        name        : t('common:amount'),
        type        : PageModel_View_Column_Type.COLUMN_TYPE_CUSTOM,
        friendlyName: t('common:amount'),
        width       : 150,
        sequence    : 3,
        headerId    : '',
        sticky      : false,
        borderLeft  : false,
        borderRight : false,
        footerTotal : false
    },
    {
        columnId    : 'referenceId',
        name        : t('payouts:table.columns.headers.reference_id'),
        type        : PageModel_View_Column_Type.COLUMN_TYPE_CUSTOM,
        friendlyName: t('payouts:table.columns.headers.reference_id'),
        width       : 150,
        sequence    : 4,
        headerId    : '',
        sticky      : false,
        borderLeft  : false,
        borderRight : false,
        footerTotal : false
    },

    {
        columnId    : 'status',
        name        : t('common:status'),
        type        : PageModel_View_Column_Type.COLUMN_TYPE_CUSTOM,
        friendlyName: t('common:status'),
        width       : 200,
        sequence    : 5,
        headerId    : '',
        sticky      : false,
        borderLeft  : false,
        borderRight : false,
        footerTotal : false
    },

    {
        columnId    : 'type',
        name        : t('common:type'),
        type        : PageModel_View_Column_Type.COLUMN_TYPE_CUSTOM,
        friendlyName: t('common:type'),
        width       : 200,
        sequence    : 6,
        headerId    : '',
        sticky      : false,
        borderLeft  : false,
        borderRight : false,
        footerTotal : false
    },

    {
        columnId    : 'bankName',
        name        : t('payouts:table.columns.headers.bank_name'),
        type        : PageModel_View_Column_Type.COLUMN_TYPE_TEXT,
        friendlyName: t('payouts:table.columns.headers.bank_name'),
        width       : 200,
        sequence    : 7,
        headerId    : '',
        sticky      : false,
        borderLeft  : false,
        borderRight : false,
        footerTotal : false
    },

    {
        columnId    : 'bankAccountLastFour',
        name        : t('payouts:table.columns.headers.bank_account_last_4'),
        type        : PageModel_View_Column_Type.COLUMN_TYPE_TEXT,
        friendlyName: t('payouts:table.columns.headers.bank_account_last_4'),
        width       : 200,
        sequence    : 8,
        headerId    : '',
        sticky      : false,
        borderLeft  : false,
        borderRight : false,
        footerTotal : false
    }
];

export default PAYOUTS_VIEW_COLUMNS;
