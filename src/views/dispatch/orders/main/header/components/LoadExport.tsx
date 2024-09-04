import PageHeadersKit from '@/@core/ui-kits/page-headers';
import {
    useOrdersPageData,
    useOrdersPageFilters
} from '@/@grpcServices/services/loads-service/service-hooks/loads-service-hooks';
import { useLoadsFilters } from '@/@grpcServices/services/loads-service/service-hooks/utils/useLoadsFilters';

export default function LoadExport() {
    const { selected_filters } = useOrdersPageFilters();

    const { filters } = useOrdersPageData();

    return (
        <PageHeadersKit.Buttons.MoreImportAndExport
            export_item={{
                exporter_id: 'LOADS_EXPORTER',
                filters
            }}
            import_item={{
                category_id     : 'loads',
                isShowSelectType: false
            }}
        />
    );
}
