import { IntlMessageKey } from '@/@types/next-intl';

export enum ERROR_CODES {
    VALID,

    CLIENT_NOT_CONNECTED,

    BROKER_NOT_CONNECTED,
    BROKER_WITHOUT_BILLING_EMAIL,

    CUSTOMER_NOT_CONNECTED,
    CUSTOMER_WITHOUT_BILLING_EMAIL,

    LOAD_WITHOUT_INVOICE,

    INVOICE_ITEM_CATEGORY_DELETED,
    INVOICE_ITEM_CATEGORY_NOT_CONNECTED
}

export const generateError = (errorCode: keyof typeof ERROR_CODES, itemId?: string) => ({
    errorCode: ERROR_CODES[errorCode],
    itemId
});

type KeysConfig = 'title' | 'beforeLinkText' | 'linkText' | 'afterLinkText';
type Config = Record<KeysConfig, IntlMessageKey>;

export const ERROR_CONFIG: Record<ERROR_CODES, Config> = {
    [ERROR_CODES.BROKER_NOT_CONNECTED]: {
        title         : 'billing:panel.widget.quickbooks.errors.broker_not_connected.title',
        beforeLinkText: 'billing:panel.widget.quickbooks.errors.please',
        linkText      : 'billing:panel.widget.quickbooks.errors.broker_not_connected.link',
        afterLinkText : 'billing:panel.widget.quickbooks.errors.broker_not_connected.after_link'
    },
    [ERROR_CODES.BROKER_WITHOUT_BILLING_EMAIL]: {
        title         : 'billing:panel.widget.quickbooks.errors.broker_without_billing_email.title',
        beforeLinkText: 'billing:panel.widget.quickbooks.errors.please',
        linkText      : 'billing:panel.widget.quickbooks.errors.broker_without_billing_email.link',
        afterLinkText:
            'billing:panel.widget.quickbooks.errors.broker_without_billing_email.after_link'
    },
    [ERROR_CODES.CLIENT_NOT_CONNECTED]: {
        title         : 'billing:panel.widget.quickbooks.errors.client_not_connected.title',
        beforeLinkText: 'billing:panel.widget.quickbooks.errors.please',
        linkText      : 'billing:panel.widget.quickbooks.errors.client_not_connected.link',
        afterLinkText : 'billing:panel.widget.quickbooks.errors.client_not_connected.after_link'
    },
    [ERROR_CODES.CUSTOMER_WITHOUT_BILLING_EMAIL]: {
        title         : 'billing:panel.widget.quickbooks.errors.customer_without_billing_email.title',
        beforeLinkText: 'billing:panel.widget.quickbooks.errors.please',
        linkText      : 'billing:panel.widget.quickbooks.errors.customer_without_billing_email.link',
        afterLinkText:
            'billing:panel.widget.quickbooks.errors.customer_without_billing_email.after_link'
    },
    [ERROR_CODES.CUSTOMER_NOT_CONNECTED]: {
        title         : 'billing:panel.widget.quickbooks.errors.customer_not_connected.title',
        beforeLinkText: 'billing:panel.widget.quickbooks.errors.please',
        linkText      : 'billing:panel.widget.quickbooks.errors.customer_not_connected.link',
        afterLinkText : 'billing:panel.widget.quickbooks.errors.customer_not_connected.after_link'
    },
    [ERROR_CODES.LOAD_WITHOUT_INVOICE]: {
        title         : 'billing:panel.widget.quickbooks.errors.load_without_invoice.title',
        beforeLinkText: 'billing:panel.widget.quickbooks.errors.please',
        linkText      : 'billing:panel.widget.quickbooks.errors.load_without_invoice.link',
        afterLinkText : 'billing:panel.widget.quickbooks.errors.load_without_invoice.after_link'
    },
    [ERROR_CODES.INVOICE_ITEM_CATEGORY_DELETED]: {
        title         : 'billing:panel.widget.quickbooks.errors.invoice_item_category_deleted.title',
        beforeLinkText: 'billing:panel.widget.quickbooks.errors.please',
        linkText      : 'billing:panel.widget.quickbooks.errors.invoice_item_category_deleted.link',
        afterLinkText:
            'billing:panel.widget.quickbooks.errors.invoice_item_category_deleted.after_link'
    },
    [ERROR_CODES.INVOICE_ITEM_CATEGORY_NOT_CONNECTED]: {
        title         : 'billing:panel.widget.quickbooks.errors.invoice_item_category_not_connected.title',
        beforeLinkText: 'billing:panel.widget.quickbooks.errors.please',
        linkText      : 'billing:panel.widget.quickbooks.errors.invoice_item_category_not_connected.link',
        afterLinkText:
            'billing:panel.widget.quickbooks.errors.invoice_item_category_not_connected.after_link'
    },
    [ERROR_CODES.VALID]: {
        title         : '',
        beforeLinkText: '',
        linkText      : '',
        afterLinkText : ''
    }
};
