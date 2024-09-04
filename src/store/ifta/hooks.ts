import { filterRows } from '@/@core/components/filters/filter-button/hooks';
import { $Filter } from '@/@core/components/filters/utils';
import { useAppliedFilters, useSelectedFilters } from '@/@core/components/table/hooks/helpers';
import IftaGrpcService from '@/@grpcServices/services/ifta.service';
import PAGES_FILTERS_CONFIG from '@/configs/pages-filters-config';
import { useStableArray } from '@/hooks/useStable';
import { GetPeriodReply_Truck_Driver, GetPeriodReply_Truck_State } from '@proto/ifta';
import { useMemo } from 'react';
import { TruckType } from '@/models/fleet/trucks/truck-type';

const stops_page = 'reports/ifta/stops';
const trucks_page = 'reports/ifta/trucks';
const totals_page = 'reports/ifta/totals';

export const default_stops_filters = PAGES_FILTERS_CONFIG.REPORTS.IFTA.defaultFilters;
export const default_trucks_filters = PAGES_FILTERS_CONFIG.REPORTS.IFTA.defaultFilters;
export const default_totals_filters = PAGES_FILTERS_CONFIG.REPORTS.IFTA.defaultFilters;

export type ConvertedIftaTruck = {
    state: string;
    totalDistance: string;
    totalFuelQuantity: string;
    truckId: string;
    referenceId: string;
    type: TruckType;
    totalFuel: string;
    states: GetPeriodReply_Truck_State[];
    driver?: GetPeriodReply_Truck_Driver | undefined;
};

const searchFilter = <T extends Array<any>>(search: string, rows: T): T[] => {
    if (!search) {
        return rows;
    }
    return rows.filter((row) =>
        Object.values(row).some((value) => {
            if (typeof value === 'string') {
                return value.toLowerCase().includes(search.toLowerCase());
            }
            return false;
        }));
};

const filterByTruck = <T extends Array<any>>(trucks: string[], rows: T): T[] => {
    if (!trucks.length) {
        return rows;
    }
    return rows.filter((row) => trucks.includes(row.truckId));
};

const trucksFiltersOrder = $Filter.order(default_trucks_filters)('truck');
const stopsFiltersOrder = $Filter.order(default_trucks_filters)('truck');

export function useTrucksPeriod(periodId: string) {
    const {
        filter_id,
        selected_filters
    } = useSelectedFilters(trucks_page, default_trucks_filters);

    const {
        data,
        isLoading,
        error,
        refetch,
        isFetching
    } = IftaGrpcService.useGeIftatPeriodQuery({
        periodId
    });
    const trucks = useStableArray(data?.trucks);

    const {
        filteredRows,
        counts
    } = useMemo(() => {
        const rows = trucks
            .map((truck) => truck.states.map((state) => ({ ...truck, ...state })))
            .flat(1);

        const filteredRows = filterByTruck(
            selected_filters.truck,
            searchFilter(selected_filters.search, rows)
        );

        const counts = rows.reduce((acc, truck) => {
            if (!acc[truck.truckId]) {
                acc[truck.truckId] = 1;
            } else {
                acc[truck.truckId] += 1;
            }
            return acc;
        }, {} as Record<string, number>);

        return { filteredRows, counts };
    }, [trucks, selected_filters]);

    const filtersData = useMemo(
        () => [
            {
                filter_id: 'truck',
                counts
            }
        ],
        [counts]
    );

    const filters = useAppliedFilters(trucksFiltersOrder, filtersData);

    return {
        trucks       : filteredRows,
        filters,
        totalDistance: data?.trucksTotals?.fuelTotalFormatted || '',
        totalFuel    : data?.trucksTotals?.fuelTotalFormatted || '',
        isError      : error,
        isLoading,
        refetch,
        filter_id,
        selected_filters,
        isFetching
    };
}

export function useTotalsPeriod(period_id: string) {
    const {
        filter_id,
        selected_filters
    } = useSelectedFilters(totals_page, default_totals_filters);

    const {
        data,
        isLoading,
        error,
        isFetching
    } = IftaGrpcService.useGeIftatPeriodQuery({
        periodId: period_id
    });

    const totalsData = useStableArray(data?.totals);

    const rows = useMemo(
        () => filterRows(totalsData, selected_filters).rows,
        [totalsData, selected_filters]
    );

    return {
        totals       : rows,
        fuelTotals   : data?.totalsTotals?.fuelTotalFormatted || '',
        distanceTotal: data?.totalsTotals?.distanceTotalFormatted || '',
        isError      : error,
        isLoading,
        filter_id,
        selected_filters,
        isFetching
    };
}

export function useStopsPeriod(period_id: string) {
    const {
        filter_id,
        selected_filters
    } = useSelectedFilters(stops_page, default_stops_filters);

    const {
        data,
        isLoading,
        error,
        isFetching
    } = IftaGrpcService.useGeIftatPeriodQuery({
        periodId: period_id
    });

    // const stopsData = useFilteredRows(data?.stops, selected_filters);

    const stops = useStableArray(data?.stops);

    const {
        rows,
        counts,
        rowsTotal
    } = useMemo(() => {
        const filteredRows = filterByTruck(
            selected_filters.truck,
            searchFilter(selected_filters.search, stops)
        );

        const {
            per_page,
            page
        } = selected_filters;

        const rows = filteredRows.slice(page * per_page, (page + 1) * per_page);

        const counts = stops.reduce((acc, stop) => {
            if (!acc[stop.truckId]) {
                acc[stop.truckId] = 1;
            } else {
                acc[stop.truckId] += 1;
            }
            return acc;
        }, {} as Record<string, number>);

        return { rows, counts, rowsTotal: filteredRows.length };
    }, [stops, selected_filters]);

    const filtersData = useMemo(
        () => [
            {
                filter_id: 'truck',
                counts
            }
        ],
        [counts]
    );

    const filters = useAppliedFilters(stopsFiltersOrder, filtersData);

    return {
        // ...stopsData,
        rowsTotal,
        rows,
        isError: error,
        isLoading,
        filter_id,
        selected_filters,
        filters,
        isFetching
    };
}
