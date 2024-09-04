import PAGES_FILTERS_CONFIG from '@/configs/pages-filters-config';
import { useAppliedFilters, useSelectedFilters } from '@/@core/components/table/hooks/helpers';
import ServiceLogsGrpcService from '@/@grpcServices/services/maitenance-service/service-logs.service';
import { useStableArray } from '@/hooks/useStable';
import { useMemo } from 'react';
import { $Filter } from '@/@core/components/filters/utils';

export const defaultMaintenanceFilters =
    PAGES_FILTERS_CONFIG.MAINTENANCE.SERVICE_LOGS.defaultFilters;
const maintenancePage = PAGES_FILTERS_CONFIG.MAINTENANCE.SERVICE_LOGS.page;

export const defaultMaintenanceFiltersOrder = $Filter.order(defaultMaintenanceFilters)(
    'service_log_provider',
    'truck',
    'trailer',
    'driver'
);

export function useServiceLogs() {
    const {
        filter_id,
        selected_filters
    } = useSelectedFilters(
        maintenancePage,
        defaultMaintenanceFilters
    );

    const {
        data: logsData,
        isLoading: logsDataLoading,
        ...rest
    } = ServiceLogsGrpcService.useGetServiceLogsQuery(
        {
            page       : selected_filters.page,
            perPage    : selected_filters.per_page,
            sortType   : selected_filters.sortBy,
            search     : selected_filters.search,
            startDate  : selected_filters.start_at,
            endDate    : selected_filters.end_at,
            providerIds: selected_filters.service_log_provider,
            truckIds   : selected_filters.truck,
            trailerIds : selected_filters.trailer,
            driverIds  : selected_filters.driver,
            types      : selected_filters.service_log_type
        },
        {
            refetchOnMountOrArgChange: true,
            refetchOnFocus           : true
        }
    );

    const serviceLogs = useStableArray(logsData?.logs);

    const filteredServiceLogs = useMemo(
        () => serviceLogs.filter((log) => !log.deleted),
        [serviceLogs]
    );

    const {
        data: logsStatsData,
        isLoading: logsStatsDataLoading
    } =
        ServiceLogsGrpcService.useGetServiceLogsStatsQuery(
            {
                search     : selected_filters.search,
                startDate  : selected_filters.start_at,
                endDate    : selected_filters.end_at,
                providerIds: selected_filters.service_log_provider,
                truckIds   : selected_filters.truck,
                trailerIds : selected_filters.trailer,
                driverIds  : selected_filters.driver,
                types      : selected_filters.service_log_type
            },
            {
                refetchOnMountOrArgChange: true,
                refetchOnFocus           : true
            }
        );

    const total = useMemo(
        () => (logsStatsData ? logsStatsData.totalServiceLogCount : 0),
        [logsStatsData]
    );

    const initialFilters = useStableArray(logsStatsData?.filters);
    const filters = useAppliedFilters(defaultMaintenanceFiltersOrder, logsStatsData?.filters);

    return {
        filter_id,
        selected_filters,
        filters,
        initialFilters,
        total,
        serviceLogs: filteredServiceLogs,
        isLoading  : logsDataLoading || logsStatsDataLoading,
        ...rest
    };
}
