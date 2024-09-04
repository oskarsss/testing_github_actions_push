import Filters from '@/@core/components/filters/selects-filters-group/Filters';
import { DirectInvoiceIcon } from '@/@core/icons/custom-nav-icons/icons';
import PageHeadersKit from '@/@core/ui-kits/page-headers';
import { FiltersContainer } from '@/@core/components/filters/selects-filters-group/styled';
import DateRange from '@/@core/components/data-range/DateRange';
import IosShareIcon from '@mui/icons-material/IosShare';
import ExportGrpcService from '@/@grpcServices/services/export.service';
import { useDownloadFile } from '@/hooks/useDownloadFile';
import { defaultInvoicesFilters, useDirectInvoices } from '@/store/billing/hooks';
import Views from './Views';
import Search from './Search';

export default function InvoicesHeader() {
    const [exportTrigger, { isLoading }] = ExportGrpcService.useExportDirectInvoicesMutation();
    const downloadFile = useDownloadFile();
    const {
        filters,
        filterId,
        selectedFilters
    } = useDirectInvoices();

    const exportHandler = () => {
        exportTrigger({})
            .unwrap()
            .then(({ filePath }) => {
                downloadFile(filePath);
            });
    };

    return (
        <PageHeadersKit.Header
            topLeft={(
                <>
                    <PageHeadersKit.Title
                        Icon={<DirectInvoiceIcon />}
                        title="pages:billing.direct"
                    />
                    <Search />
                    <Views />
                </>
            )}
            topRight={(
                <>
                    <PageHeadersKit.AvatarGroup />
                    <PageHeadersKit.Buttons.Secondary
                        onClick={exportHandler}
                        icon={<IosShareIcon />}
                        disabled={isLoading}
                        size="small"
                        title="core:basic.page_headers.buttons.export"
                    />
                </>
            )}
            bottomLeft={(
                <>
                    <DateRange
                        filterId={filterId}
                        selectedFilters={selectedFilters}
                        defaultStartAt={defaultInvoicesFilters.start_at}
                        defaultEndAt={defaultInvoicesFilters.end_at}
                    />
                    <PageHeadersKit.Divider />
                    <FiltersContainer>
                        <Filters
                            filter_id={filterId}
                            filters={filters}
                            default_filters={defaultInvoicesFilters}
                        />
                    </FiltersContainer>
                    {/* <Stats /> */}
                </>
            )}
            bottomRight={(
                <PageHeadersKit.Buttons.ClearFilter
                    filter_id={filterId}
                    selected_filters={selectedFilters}
                    default_filters={defaultInvoicesFilters}
                />
            )}
        />
    );
}
