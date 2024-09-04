import { ServiceLogsIcon } from '@/@core/icons/custom-nav-icons/icons';
import PageHeadersKit from '@/@core/ui-kits/page-headers';
import DateRange from '@/@core/components/data-range/DateRange';
import { defaultMaintenanceFilters, useServiceLogs } from '@/store/maitenance/service-logs/hooks';
import Filters from '@/@core/components/filters/selects-filters-group/Filters';
import SortByFilter from '@/@core/components/filters/sort-by-filter/SortByFilter';
import Search from './Search';
import CreateServiceLogButton from './CreateServiceLogButton';
import ServiceLogTypes from './ServiceLogTypes';
import SERVICE_LOGS_SORT_BY_OPTIONS from './service-log-sort-by-options';

export default function Header() {
    const {
        filter_id,
        selected_filters,
        filters
    } = useServiceLogs();

    return (
        <PageHeadersKit.Header
            topLeft={(
                <>
                    <PageHeadersKit.Title
                        Icon={<ServiceLogsIcon />}
                        title="navigation:items.maintenance.service_logs"
                    />

                    <Search />

                    <ServiceLogTypes />
                </>
            )}
            topRight={(
                <>
                    <PageHeadersKit.AvatarGroup />

                    <CreateServiceLogButton />
                </>
            )}
            bottomLeft={(
                <>
                    <DateRange
                        filterId={filter_id}
                        selectedFilters={selected_filters}
                        defaultStartAt={defaultMaintenanceFilters.start_at}
                        defaultEndAt={defaultMaintenanceFilters.end_at}
                    />

                    <PageHeadersKit.Divider />

                    <Filters
                        updateType="redux"
                        filters={filters}
                        default_filters={defaultMaintenanceFilters}
                        filter_id={filter_id}
                    />

                    <SortByFilter
                        defaultFilters={defaultMaintenanceFilters}
                        updateType="redux"
                        filter_id={filter_id}
                        selected_filters={selected_filters}
                        options={SERVICE_LOGS_SORT_BY_OPTIONS}
                    />
                </>
            )}
        />
    );
}
