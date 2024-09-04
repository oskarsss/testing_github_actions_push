import PageHeadersKit from '@/@core/ui-kits/page-headers';
import { useAllInvoices } from '@/store/billing/hooks';

export default function Export() {
    const {
        filters,
        selectedFilters
    } = useAllInvoices();
    return (
        <PageHeadersKit.Buttons.Export
            filters={filters}
            selectedFilters={selectedFilters}
            exporter_id="INVOICES_EXPORTER"
            size="small"
        />
    );
}
