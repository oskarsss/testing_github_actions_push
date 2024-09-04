import {
    default_fuel_filters,
    useFuelTransactionsStats,
    useMainFuelTransactions
} from '@/store/accounting/fuel/hooks';
import AddIcon from '@mui/icons-material/Add';
import { FuelIcon } from '@/@core/icons/custom-nav-icons/icons';
import Filters from '@/@core/components/filters/selects-filters-group/Filters';
import SwitchFilter from '@/@core/components/filters/switch-filter/SwitchFilter';
import PageHeadersKit from '@/@core/ui-kits/page-headers';
import { FiltersContainer } from '@/@core/components/filters/selects-filters-group/styled';
import DateRange from '@/@core/components/data-range/DateRange';
import Views from './Views';
import Search from './Search';
import { useCreateFuelTransactionDialog } from '../../dialogs/CreateFuelTransaction/CreateFuelTransaction';

export default function FuelHeader() {
    const {
        isLoading,
        selected_filters
    } = useMainFuelTransactions(false);

    const {
        filter_id,
        filters
    } = useFuelTransactionsStats();

    const CreateFuelTransactionDialog = useCreateFuelTransactionDialog();

    const handleAddButton = () => CreateFuelTransactionDialog.open({});

    return (
        <PageHeadersKit.Header
            topLeft={(
                <>
                    <PageHeadersKit.Title
                        Icon={<FuelIcon />}
                        title="pages:fuel"
                    />
                    <Search />
                    <Views />
                </>
            )}
            topRight={(
                <>
                    <PageHeadersKit.AvatarGroup />
                    <PageHeadersKit.Buttons.Import category_id="fuel" />
                    <PageHeadersKit.Buttons.Export
                        exporter_id="FUEL_EXPORTER"
                        filters={filters}
                        isNotImplemented
                    />
                    <PageHeadersKit.Divider />
                    <PageHeadersKit.Buttons.Primary
                        title="fuels:header.buttons.add_transaction"
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
                        defaultStartAt={default_fuel_filters.start_at}
                        defaultEndAt={default_fuel_filters.end_at}
                    />
                    <PageHeadersKit.Divider />
                    <FiltersContainer>
                        <Filters
                            default_filters={default_fuel_filters}
                            filter_id={filter_id}
                            filters={filters}
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
                        isLocalFilter
                    />
                    {!isLoading && (
                        <PageHeadersKit.Buttons.ClearFilter
                            filter_id={filter_id}
                            selected_filters={selected_filters}
                            default_filters={default_fuel_filters}
                        />
                    )}
                </>
            )}
        />
    );
}
