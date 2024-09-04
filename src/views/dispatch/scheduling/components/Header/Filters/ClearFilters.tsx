import { default_trucks_filters, useTrucksManifests } from '@/store/dispatch/scheduling/hooks';
import PageHeadersKit from '@/@core/ui-kits/page-headers';

export default function ClearFilters() {
    const {
        selected_filters,
        filter_id
    } = useTrucksManifests();
    return (
        <PageHeadersKit.Buttons.ClearFilter
            filter_id={filter_id}
            selected_filters={selected_filters}
            default_filters={default_trucks_filters}
        />
    );
}
