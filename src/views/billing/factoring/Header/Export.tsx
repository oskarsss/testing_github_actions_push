import PageHeadersKit from '@/@core/ui-kits/page-headers';
import { useFactoringInvoices } from '@/store/billing/hooks';

export default function Export() {
    const { filters } = useFactoringInvoices();
    return (
        <PageHeadersKit.Buttons.Export
            exporter_id="INVOICES_EXPORTER"
            filters={filters}
            size="small"
        />
    );
}
