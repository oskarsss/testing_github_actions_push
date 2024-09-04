import PageHeadersKit from '@/@core/ui-kits/page-headers';
import { useFuelTransactionsStats } from '@/store/accounting/fuel/hooks';

export default function Export() {
    const { filters } = useFuelTransactionsStats();

    return (
        <PageHeadersKit.Buttons.Export
            exporter_id="FUEL_EXPORTER"
            filters={filters}

            // selectedFilters={selected_filters}
        />
    );
}
