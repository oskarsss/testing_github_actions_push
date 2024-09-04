import { IP_ApexCapital_Invoices_PreviewReply_Invoice } from '@proto/integration_provider_apexcapital';

export interface ApexCapitalInvoice extends IP_ApexCapital_Invoices_PreviewReply_Invoice {
    brokerName: string;
    brokerId: string;
    brokerMc: string | number;
}
