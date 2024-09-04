import { IP_TruFund_Invoices_PreviewReply_Invoice } from '@proto/integration_provider_trufund';

export interface TruFundInvoice extends IP_TruFund_Invoices_PreviewReply_Invoice {
    clientName: string;
}

export function checkInvalidRow(row: TruFundInvoice) {
    return row.hasErrors || (!row.brokerId && !row.customerId);
}
