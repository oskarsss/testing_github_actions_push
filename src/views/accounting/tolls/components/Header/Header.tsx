import { default_tolls_filters, useMainTolls, useTollsStats } from '@/store/accounting/tolls/hooks';
import Filters from '@/@core/components/filters/selects-filters-group/Filters';
import AddIcon from '@mui/icons-material/Add';
import { PrePassIcon } from '@/@core/icons/custom-nav-icons/icons';
import SwitchFilter from '@/@core/components/filters/switch-filter/SwitchFilter';
import PageHeadersKit from '@/@core/ui-kits/page-headers';
import { $Filter } from '@/@core/components/filters/utils';
import { FiltersContainer } from '@/@core/components/filters/selects-filters-group/styled';
import DateRange from '@/@core/components/data-range/DateRange';
import Search from './Search';
import Views from './Views';
import { useCreateTollTransactionDialog } from '../../dialogs/CreateTollTransaction';

const labelConfig = $Filter.labelsConfig({
    settlement_status: 'entity:settlement'
});

export default function TollsHeader() {
    const {
        isLoading,
        selected_filters
    } = useMainTolls();

    const {
        filter_id,
        filters,
        isLoading: isLoadingStats
    } = useTollsStats();

    const createTransactionDialog = useCreateTollTransactionDialog();

    const handleAddButton = () => createTransactionDialog.open({});

    return (
        <PageHeadersKit.Header
            topLeft={(
                <>
                    <PageHeadersKit.Title
                        Icon={<PrePassIcon />}
                        title="pages:tolls"
                    />
                    <Search />
                    <Views />
                </>
            )}
            topRight={(
                <>
                    <PageHeadersKit.AvatarGroup />
                    <PageHeadersKit.Buttons.Import category_id="tolls" />
                    <PageHeadersKit.Buttons.Export
                        exporter_id="TOLLS_EXPORTER"
                        filters={filters}
                        isNotImplemented
                    />
                    <PageHeadersKit.Divider />
                    <PageHeadersKit.Buttons.Primary
                        title="tolls:header.buttons.add_transaction"
                        onClick={handleAddButton}
                        icon={<AddIcon fontSize="medium" />}
                    />
                </>
            )}
            bottomLeft={(
                <>
                    <DateRange
                        filterId={filter_id}
                        selectedFilters={selected_filters}
                        defaultStartAt={default_tolls_filters.start_at}
                        defaultEndAt={default_tolls_filters.end_at}
                    />
                    <PageHeadersKit.Divider />
                    <FiltersContainer>
                        <Filters
                            default_filters={default_tolls_filters}
                            filter_id={filter_id}
                            filters={filters}
                            loading={isLoadingStats}
                            skeleton_count={3}
                            labelsConfig={labelConfig}
                        />
                    </FiltersContainer>
                </>
            )}
            bottomRight={(
                <>
                    <SwitchFilter
                        label="common:button.unassigned"
                        filterType="unassigned"
                        filterId={filter_id}
                        selectedFilters={selected_filters}
                    />
                    {!isLoading && (
                        <PageHeadersKit.Buttons.ClearFilter
                            filter_id={filter_id}
                            selected_filters={selected_filters}
                            default_filters={default_tolls_filters}
                        />
                    )}
                </>
            )}
        />
    );
}
