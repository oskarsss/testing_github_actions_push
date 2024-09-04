import type { TFunction } from '@/@types/next-intl';

export enum SETTLEMENT_BILL_ERROR_CODES {
    VALID,
    REVENUE_TYPE_NOT_CONNECTED,
    VENDOR_NOT_CONNECTED,
    DRIVER_NOT_CONNECTED,
    DRIVER_HAS_NOT_REVENUE_TYPE,
    DRIVER_NOT_CORRECT_REVENUE_TYPE,
    SETTLEMENT_CATEGORY_NOT_CONNECTED,
    SETTLEMENT_STATUS
}

export const generateError = (
    errorCode: keyof typeof SETTLEMENT_BILL_ERROR_CODES,
    itemId?: string
) => ({
    errorCode: SETTLEMENT_BILL_ERROR_CODES[errorCode],
    itemId
});

type KeysConfig = 'title' | 'beforeLinkText' | 'linkText' | 'afterLinkText';
type Config = Record<KeysConfig, string>;
type ErrorConfig = (t: TFunction) => Record<SETTLEMENT_BILL_ERROR_CODES, Config>;

export const SETTLEMENT_BILL_ERROR_CONFIG: ErrorConfig = (t) => ({
    [SETTLEMENT_BILL_ERROR_CODES.REVENUE_TYPE_NOT_CONNECTED]: {
        title: t(
            'modals:settlements.edit_settlement.qb_bill.error.revenue_type_not_connected.title'
        ),
        beforeLinkText: t('modals:settlements.edit_settlement.qb_bill.error.beforeLinkText.please'),
        linkText      : t(
            'modals:settlements.edit_settlement.qb_bill.error.revenue_type_not_connected.linkText'
        ),
        afterLinkText: t('modals:settlements.edit_settlement.qb_bill.error.afterLinkText.connect')
    },
    [SETTLEMENT_BILL_ERROR_CODES.VENDOR_NOT_CONNECTED]: {
        title         : t('modals:settlements.edit_settlement.qb_bill.error.vendor_not_connected.title'),
        beforeLinkText: t('modals:settlements.edit_settlement.qb_bill.error.beforeLinkText.please'),
        linkText      : t(
            'modals:settlements.edit_settlement.qb_bill.error.vendor_not_connected.linkText'
        ),
        afterLinkText: t('modals:settlements.edit_settlement.qb_bill.error.afterLinkText.connect')
    },
    [SETTLEMENT_BILL_ERROR_CODES.DRIVER_NOT_CONNECTED]: {
        title         : t('modals:settlements.edit_settlement.qb_bill.error.driver_not_connected.title'),
        beforeLinkText: t('modals:settlements.edit_settlement.qb_bill.error.beforeLinkText.please'),
        linkText      : t(
            'modals:settlements.edit_settlement.qb_bill.error.driver_not_connected.linkText'
        ),
        afterLinkText: t('modals:settlements.edit_settlement.qb_bill.error.afterLinkText.connect')
    },
    [SETTLEMENT_BILL_ERROR_CODES.SETTLEMENT_CATEGORY_NOT_CONNECTED]: {
        title: t(
            'modals:settlements.edit_settlement.qb_bill.error.settlement_category_not_connected.title'
        ),
        beforeLinkText: t('modals:settlements.edit_settlement.qb_bill.error.beforeLinkText.please'),
        linkText      : t(
            'modals:settlements.edit_settlement.qb_bill.error.settlement_category_not_connected.linkText'
        ),
        afterLinkText: t('modals:settlements.edit_settlement.qb_bill.error.afterLinkText.connect')
    },
    [SETTLEMENT_BILL_ERROR_CODES.DRIVER_HAS_NOT_REVENUE_TYPE]: {
        title: t(
            'modals:settlements.edit_settlement.qb_bill.error.driver_has_not_revenue_type.title'
        ),
        beforeLinkText: t('modals:settlements.edit_settlement.qb_bill.error.beforeLinkText.please'),
        linkText      : t(
            'modals:settlements.edit_settlement.qb_bill.error.driver_has_not_revenue_type.linkText'
        ),
        afterLinkText: t(
            'modals:settlements.edit_settlement.qb_bill.error.driver_has_not_revenue_type.afterLinkText'
        )
    },
    [SETTLEMENT_BILL_ERROR_CODES.DRIVER_NOT_CORRECT_REVENUE_TYPE]: {
        title: t(
            'modals:settlements.edit_settlement.qb_bill.error.driver_not_correct_revenue_type.title'
        ),
        beforeLinkText: t('modals:settlements.edit_settlement.qb_bill.error.beforeLinkText.please'),
        linkText      : t(
            'modals:settlements.edit_settlement.qb_bill.error.driver_not_correct_revenue_type.linkText'
        ),
        afterLinkText: t(
            'modals:settlements.edit_settlement.qb_bill.error.driver_not_correct_revenue_type.afterLinkText'
        )
    },
    [SETTLEMENT_BILL_ERROR_CODES.SETTLEMENT_STATUS]: {
        title         : t('modals:settlements.edit_settlement.qb_bill.error.settlement_status.title'),
        beforeLinkText: t(
            'modals:settlements.edit_settlement.qb_bill.error.settlement_status.beforeLinkText'
        ),
        linkText     : '',
        afterLinkText: ''
    },
    [SETTLEMENT_BILL_ERROR_CODES.VALID]: {
        title         : '',
        beforeLinkText: '',
        linkText      : '',
        afterLinkText : ''
    }
});
