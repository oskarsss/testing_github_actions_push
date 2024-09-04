import PageHeadersKit from '@/@core/ui-kits/page-headers';
import { useAmazonInvoices } from '@/store/billing/hooks';

export default function Export() {
    const { filters } = useAmazonInvoices();
    return (
        <PageHeadersKit.Buttons.Export
            exporter_id="INVOICES_EXPORTER"
            size="small"
            filters={filters}
        />
    );
}
