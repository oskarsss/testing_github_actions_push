import { useAppliedFilters, useSelectedFilters } from '@/@core/components/table/hooks/helpers';
import { pollingIntervalForTable } from '@/@core/components/table/configs';
import { $Filter } from '@/@core/components/filters/utils';
import PAGES_FILTERS_CONFIG from '@/configs/pages-filters-config';
import { useStableArray } from '@/hooks/useStable';
import useSelectSearchView from '@/hooks/search-params-filters/useSelectSearchView';
import { useTablePageData } from '@/hooks/page-table/useTablePageData';
import { FuelGetReply_Fuel, FuelGetRequest_SortBy } from '@proto/fuel';
import FuelGrpcService from '@/@grpcServices/services/fuel.service';
import {
    TRUCK_STATUS_TO_GRPC_ENUM,
    TRUCK_STATUS_TO_LOCALE,
    TRUCK_TYPE_TO_GRPC_ENUM,
    TRUCK_TYPE_TO_GRPC_REVERSE_ENUM
} from '@/models/fleet/trucks/trucks-mappings';
import { SETTLEMENT_STATUS_GRPC_ENUM } from '@/models/settlements/settlements-mappings';
import { useCallback } from 'react';
import TableTypes from '@/@core/components/table/types';
import { FuelModel_SettlementStatus } from '@proto/models/model_fuel';
import { useTrucksMap } from '@/store/storage/trucks/hooks/common';
import { useDriversMap } from '@/store/storage/drivers/hooks/common';
import useWindowFocus from '../../../hooks/useWindowFocus';
import Fuel from './types';

const page = 'fuels';
export const default_fuel_filters = PAGES_FILTERS_CONFIG.ACCOUNTING.FUEL.defaultFilters;

const filtersOrder = $Filter.order(default_fuel_filters)(
    'fuel_settlement_status',
    'fuel_transaction_verified',
    'truck_status',
    'truck_type',
    'truck'
);

type ConvertFuelType = (fuel: FuelGetReply_Fuel) => Fuel.FuelTransactionRow;

const useConvertFuel = () => {
    const trucksMap = useTrucksMap();
    const driversMap = useDriversMap();

    const converter: ConvertFuelType = useCallback(
        (fuel) => {
            const truck = trucksMap[fuel.truckId];
            const primaryDriverId = truck?.drivers.find((driver) => driver.primary)?.driverId || '';
            const driver = driversMap[primaryDriverId];

            return {
                ...fuel,
                truck,
                unique_key        : fuel.fuelTransactionId,
                truck_reference_id: truck?.referenceId || '',
                reference_id      : fuel.referenceId,
                unit_number       : fuel.unitNumber,
                driver_name       : `${driver?.firstName || ''} ${driver?.lastName || ''}` || '',
                truck_stop        : fuel.truckStop,
                in_network        : fuel.inNetwork,
                truck_type        : TRUCK_TYPE_TO_GRPC_REVERSE_ENUM[truck?.type] || '',
                settlement_id     : fuel.settlementId,
                created_at        : fuel.createdAt,
                truck_status      : TRUCK_STATUS_TO_LOCALE[truck?.status] || '',
                settlement_status : SETTLEMENT_STATUS_GRPC_ENUM[fuel.settlementStatus],
                entityId          : fuel.fuelTransactionId,

                total_amount_formatted           : fuel.totalAmountFormatted,
                discount_amount_formatted        : fuel.discountedAmountFormatted,
                total_discounted_amount_formatted: fuel.totalDiscountedAmountFormatted,
                total_amount                     : fuel.totalAmountFormatted,
                discount_amount                  : fuel.discountedAmountFormatted,
                total_discounted_amount          : fuel.totalDiscountedAmountFormatted
            };
        },
        [driversMap, trucksMap]
    );

    return { converter };
};

type TableHeader =
    | 'total_amount'
    | 'reference_id'
    | 'truck_stop'
    | 'quantity'
    | 'location'
    | 'datetime';

const FUEL_SORT_BY_MAP: Record<TableHeader, Record<TableTypes.Order, FuelGetRequest_SortBy>> = {
    total_amount: {
        asc : FuelGetRequest_SortBy.TOTAL_AMOUNT_ASC,
        desc: FuelGetRequest_SortBy.TOTAL_AMOUNT_DESC
    },
    reference_id: {
        asc : FuelGetRequest_SortBy.REFERENCE_ID_ASC,
        desc: FuelGetRequest_SortBy.REFERENCE_ID_DESC
    },
    truck_stop: {
        asc : FuelGetRequest_SortBy.TRUCK_STOP_ASC,
        desc: FuelGetRequest_SortBy.TRUCK_STOP_DESC
    },
    quantity: {
        asc : FuelGetRequest_SortBy.QUANTITY_ASC,
        desc: FuelGetRequest_SortBy.QUANTITY_DESC
    },
    location: {
        asc : FuelGetRequest_SortBy.LOCATION_ASC,
        desc: FuelGetRequest_SortBy.LOCATION_DESC
    },
    datetime: {
        asc : FuelGetRequest_SortBy.DATETIME_ASC,
        desc: FuelGetRequest_SortBy.DATETIME_DESC
    }
};

const FUEL_COLUMNS_SORTABLE_CONFIG = Object.keys(FUEL_SORT_BY_MAP);

const useMemoize = (fuelTransactions: FuelGetReply_Fuel[]) => {
    const {
        filter_id,
        selected_filters
    } = useSelectedFilters(page, default_fuel_filters);
    const views_and_headers = useTablePageData('FUEL', FUEL_COLUMNS_SORTABLE_CONFIG);

    const {
        selectView,
        defaultViewId,
        selectedViewId: selected_view_id,
        currentView: view
    } = useSelectSearchView({
        page,
        defaultFilters: default_fuel_filters,
        views         : views_and_headers.views
    });

    const { converter } = useConvertFuel();

    const formattedRows = useStableArray(fuelTransactions.map(converter));

    return {
        ...views_and_headers,
        rows: formattedRows,
        selected_filters,
        view,
        filter_id,
        selected_view_id,
        selectView,
        defaultViewId
    };
};

export function useMainFuelTransactions(isPollingInterval = true) {
    const { selected_filters } = useSelectedFilters(page, default_fuel_filters);

    const { switchFilters } = selected_filters;

    const {
        data,
        isLoading,
        isError,
        ...rest
    } = FuelGrpcService.useGetFuelQuery(
        {
            page         : selected_filters.page,
            perPage      : selected_filters.per_page,
            truckStatuses: selected_filters.truck_status.map(
                (status) => TRUCK_STATUS_TO_GRPC_ENUM[status]
            ),
            truckIds  : selected_filters.truck,
            truckTypes: selected_filters.truck_type.map((type) => TRUCK_TYPE_TO_GRPC_ENUM[type]),
            endDate   : selected_filters.end_at,
            search    : selected_filters.search,
            startDate : selected_filters.start_at,
            assigned  : !switchFilters.unassigned,
            sortBy:
                FUEL_SORT_BY_MAP[selected_filters.orderBy as TableHeader]?.[
                    selected_filters.order
                ] || FuelGetRequest_SortBy.LATEST,
            ...(selected_filters.fuel_transaction_verified.length && {
                verified: selected_filters.fuel_transaction_verified[0] === 'verified'
            }),
            ...(selected_filters.fuel_settlement_status.length && {
                settlementStatus:
                    selected_filters.fuel_settlement_status[0] === 'assigned'
                        ? FuelModel_SettlementStatus.ASSIGNED
                        : FuelModel_SettlementStatus.UNASSIGNED
            })
        },
        {
            pollingInterval: isPollingInterval ? pollingIntervalForTable : undefined
        }
    );

    const fuelList = useStableArray(data?.fuels);

    const memoizedData = useMemoize(fuelList);

    return {
        ...rest,
        ...memoizedData,
        isError,
        isLoading,
        fuelList
    };
}

export function useFuelTransactionsStats() {
    const windowFocused = useWindowFocus('/fuel');
    const {
        filter_id,
        selected_filters
    } = useSelectedFilters(page, default_fuel_filters);

    const { switchFilters } = selected_filters;

    const {
        data,
        isLoading,
        isError
    } = FuelGrpcService.useGetFuelStatsQuery(
        {
            truckIds     : selected_filters.truck,
            truckStatuses: selected_filters.truck_status.map(
                (status) => TRUCK_STATUS_TO_GRPC_ENUM[status]
            ),
            truckTypes: selected_filters.truck_type.map((type) => TRUCK_TYPE_TO_GRPC_ENUM[type]),
            endDate   : selected_filters.end_at,
            startDate : selected_filters.start_at,
            assigned  : !switchFilters.unassigned,
            ...(selected_filters.fuel_transaction_verified.length && {
                verified: selected_filters.fuel_transaction_verified[0] === 'verified'
            }),
            ...(selected_filters.fuel_settlement_status.length && {
                settlementStatus:
                    selected_filters.fuel_settlement_status[0] === 'assigned'
                        ? FuelModel_SettlementStatus.ASSIGNED
                        : FuelModel_SettlementStatus.UNASSIGNED
            })
        },
        {
            pollingInterval: windowFocused ? 3000 : undefined
        }
    );

    const filters = useAppliedFilters(filtersOrder, data?.filters);

    const rows_total = data?.totalFuelCount || 0;

    return { rows_total, filter_id, filters, isError, isLoading };
}
