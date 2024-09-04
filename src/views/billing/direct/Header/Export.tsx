import PageHeadersKit from '@/@core/ui-kits/page-headers';
import { useDirectInvoices } from '@/store/billing/hooks';

export default function Export() {
    const { filters } = useDirectInvoices();
    return (
        <PageHeadersKit.Buttons.Export
            exporter_id="INVOICES_EXPORTER"
            size="small"
            filters={filters}
        />
    );
}
