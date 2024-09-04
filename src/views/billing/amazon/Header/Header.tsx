import Filters from '@/@core/components/filters/selects-filters-group/Filters';
import { AmazonInvoiceIcon } from '@/@core/icons/custom-nav-icons/icons';
import PageHeadersKit from '@/@core/ui-kits/page-headers';
import { FiltersContainer } from '@/@core/components/filters/selects-filters-group/styled';
import DateRange from '@/@core/components/data-range/DateRange';
import IosShareIcon from '@mui/icons-material/IosShare';
import { defaultInvoicesFilters, useAmazonInvoices } from '@/store/billing/hooks';
import Views from './Views';
import Search from './Search';
import { useExportFactoringBillingDialog } from '../../factoring/dialogs/export/ExportFactoringBilling';

export default function InvoicesHeader() {
    const {
        filters,
        selectedFilters,
        filterId
    } = useAmazonInvoices();

    const exportDialog = useExportFactoringBillingDialog();

    const exportHandler = () => {
        exportDialog.open({});
    };

    return (
        <PageHeadersKit.Header
            topLeft={(
                <>
                    <PageHeadersKit.Title
                        Icon={<AmazonInvoiceIcon />}
                        title="pages:billing.amazon"
                    />
                    <Search />
                    <Views />
                </>
            )}
            topRight={(
                <>
                    <PageHeadersKit.AvatarGroup />
                    <PageHeadersKit.Buttons.Import
                        category_id="loads"
                        size="small"
                        isNotImplemented
                    />
                    <PageHeadersKit.Buttons.Secondary
                        onClick={exportHandler}
                        icon={<IosShareIcon />}
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
