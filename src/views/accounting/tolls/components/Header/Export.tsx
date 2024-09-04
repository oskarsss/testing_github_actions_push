import PageHeadersKit from '@/@core/ui-kits/page-headers';
import { useTollsStats } from '@/store/accounting/tolls/hooks';

export default function Export() {
    const {
        filters,
        selected_filters
    } = useTollsStats();
    return (
        <PageHeadersKit.Buttons.Export
            exporter_id="TOLLS_EXPORTER"
            filters={filters}
            selectedFilters={selected_filters}
        />
    );
}
