import createOptionsFromEnum from '@/utils/createOptionsFromEnum';

enum LoadInvoicePaymentTermsEnum {
    DueOnReceipt = 'DUE_ON_RECEIPT',
    Net7 = 'NET_7',
    Net10 = 'NET_10',
    Net15 = 'NET_15',
    Net30 = 'NET_30',
    Net45 = 'NET_45',
    Net60 = 'NET_60',
    Net90 = 'NET_90',
    Net120 = 'NET_120'
}

export const invoicePaymentTermsOptions = createOptionsFromEnum(LoadInvoicePaymentTermsEnum);
