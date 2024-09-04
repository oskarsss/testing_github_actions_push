import { useCycles, useSettlements } from '@/store/accounting/settlements/hooks/settlements';
import { Stack } from '@mui/material';
import SelectsFiltersGroup from '@/@core/components/filters/selects-filters-group/Filters';
import { ContactsIcon } from '@/@core/icons/custom-nav-icons/icons';
import PageHeadersKit from '@/@core/ui-kits/page-headers';
import SyncButton from '@/views/accounting/settlements/Table/components/Header/components/Buttons/SyncButton';
import CreateSettlementButton from '@/views/accounting/settlements/Table/components/Header/components/Buttons/CreateSettlementButton';
import { $Filter } from '@/@core/components/filters/utils';
import { FiltersContainer } from '@/@core/components/filters/selects-filters-group/styled';
import SettlementsCyclePeriodSelect from '@/views/accounting/settlements/Table/components/Header/components/Periods/SettlementsCyclePeriodSelect';
import SettlementsCycleSelect from '@/views/accounting/settlements/Table/components/Header/components/Cycles/SettlementsCycleSelect';
import Search from './components/Search';
import TableEditorSelect from './components/TableEditorSelect/TableEditorSelect';
import TablePercentageSwitch from './components/TablePercentageSwitch';

const filterLabels = $Filter.labelsConfig({
    driver_type: 'settlements:header.filters.labels.driver_type',
    truck_type : 'settlements:header.filters.labels.truck_type'
});

export default function SettlementsHeader() {
    const {
        filter_id,
        filters,
        default_settlements_filters,
        isLoading,
        selected_filters
    } =
        useSettlements();
    const { cycles } = useCycles();
    return (
        <PageHeadersKit.Header
            sx={{ zIndex: 1 }}
            topLeft={(
                <>
                    <PageHeadersKit.Title
                        Icon={<ContactsIcon />}
                        title="pages:settlements"
                    />
                    <Stack
                        direction="row"
                        spacing={4}
                        alignItems="center"
                        flexGrow={1}
                        height="100%"
                        overflow="hidden"
                    >
                        <SettlementsCycleSelect />
                        <SettlementsCyclePeriodSelect />
                    </Stack>
                </>
            )}
            topRight={(
                <>
                    <SyncButton />
                    <PageHeadersKit.Buttons.Export
                        exporter_id="SETTLEMENTS_EXPORTER"
                        filters={filters}
                        size="small"
                    />
                    <CreateSettlementButton />
                </>
            )}
            bottomLeft={(
                <>
                    <Search />
                    {!!cycles.length && (
                        <FiltersContainer sx={{ flex: 1 }}>
                            <SelectsFiltersGroup
                                updateType="redux"
                                default_filters={default_settlements_filters}
                                filter_id={filter_id}
                                filters={filters}
                                loading={isLoading}
                                skeleton_count={4}
                                labelsConfig={filterLabels}
                            />
                        </FiltersContainer>
                    )}
                </>
            )}
            bottomRight={(
                <>
                    {!isLoading && (
                        <PageHeadersKit.Buttons.ClearFilter
                            filter_id={filter_id}
                            selected_filters={selected_filters}
                            default_filters={default_settlements_filters}
                            updateType="redux"
                        />
                    )}
                    <TablePercentageSwitch filter_id={filter_id} />
                    <TableEditorSelect />
                </>
            )}
        />
    );
}
