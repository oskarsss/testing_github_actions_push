import { useCallback, useMemo, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
    useAppliedFilters,
    useFilterId,
    useFilteredRows,
    useSelectedFilters,
    useSelectedView,
    useTotals,
    useView,
    useViewsAndHeaders
} from '@/@core/components/table/hooks/helpers';
import { useDirectWidthUpdate } from '@/@core/components/table/ColumnWidthAdjust/ColumnWidthAdjustProvider';
import { pollingIntervalForTable } from '@/@core/components/table/configs';
import { $Filter } from '@/@core/components/filters/utils';
import { FILTER_SWITCH_KEY } from '@/@core/components/filters/constants';
import { useStableArray } from '@/hooks/useStable';
import PAGES_FILTERS_CONFIG from '@/configs/pages-filters-config';
import {
    useDriverTypesMap,
    useRevenueTypesMap,
    useTrailersTypesMap
} from '@/store/hash_maps/hooks';
import { useDispatchersCycleId } from '@/store/accounting/dispatchers/hooks';
import { TRUCK_TYPE_TO_GRPC_REVERSE_ENUM } from '@/models/fleet/trucks/trucks-mappings';
import SettlementCyclesGrpcService from '@/@grpcServices/services/settlements-service/settlement-cycles.service';
import SettlementCyclePeriodsGrpcService from '@/@grpcServices/services/settlements-service/settlement-cycle-periods';
import { PhpFilterTypeMap } from '@/@core/components/filters/types';
import { SettlementGetReply, SettlementGetReply_Settlement } from '@proto/settlements';
import SettlementsGrpcService from '@/@grpcServices/services/settlements-service/settlements.service';
import { SETTLEMENT_STATUS_GRPC_ENUM } from '@/models/settlements/settlements-mappings';
import createMap from '@/utils/create-map';
import PagesGrpcService from '@/@grpcServices/services/pages.service';
import { PageModel_Page } from '@proto/models/model_page';
import { useTrucksMap } from '@/store/storage/trucks/hooks/common';
import { useTrailersMap } from '@/store/storage/trailers/hooks/common';
import { useDriversMap } from '@/store/storage/drivers/hooks/common';
import SettlementsTypes from '../types';
import { SettlementsActions } from '../slice';

export enum PeriodOption {
    SETTLEMENTS = 'settlements',
    DISPATCHERS = 'dispatchers'
}

const page = 'settlements';

const default_settlements_filters = PAGES_FILTERS_CONFIG.ACCOUNTING.SETTLEMENTS.defaultFilters;

const filtersOrder = $Filter.order(default_settlements_filters)(
    'settlement_status',
    'truck_type',
    'driver_type',
    'settlement_driver_pay_amount_type'
);

type Row = SettlementsTypes.Cycles.Periods.Settlements.ConvertedSettlementRow;

const customFilterFunc = $Filter.compareMap({
    settlement_status: (row: Row, filter: string[]) =>
        filter.length ? filter.includes(row.settlementLocalStatus || '') : true,
    driver_type: (row: Row, filter: string[]) =>
        filter.length ? filter.includes(row.driver?.driverTypeId || '') : true,
    truck_type: (row: Row, filter: string[]) =>
        filter.length ? filter.includes(row.truckType || '') : true,
    settlement_driver_pay_amount_type: (row: Row, filter: string[]) =>
        filter.length ? filter.includes(row.settlementDriverPayAmountType) : true
});

export const useSettlementsViews = () => {
    const { data } = PagesGrpcService.endpoints.retrievePage.useQueryState({
        page: PageModel_Page.SETTLEMENTS
    });

    const views_and_headers = useViewsAndHeaders(data);

    const {
        selected_view_id,
        selectView
    } = useSelectedView(page);

    const view = useView(data?.views, selected_view_id);

    return {
        ...views_and_headers,
        selected_view_id,
        selectView,
        view,
        tableName: `${page}_${selected_view_id}`
    };
};

export const useSettlementsFilterId = () => useFilterId(page);

export const useUpdateSettlementsRequestData = () => {
    const dispatch = useAppDispatch();
    return useCallback(
        (data: { cycle_id?: string; period_id?: string }) => {
            dispatch(SettlementsActions.SetRequestData(data));
        },
        [dispatch]
    );
};

export const useSettlementCycleId = () => {
    const selected_cycle_id = useAppSelector((state) => state.settlements.cycle_id);
    return selected_cycle_id ?? '';
};

export const useSettlementPeriodId = () => {
    const selected_period_id = useAppSelector((state) => state.settlements.period_id);
    return selected_period_id ?? '';
};

export const useAllSettlements = (options?: RTKRequestOptions) => {
    const cycleId = useSettlementCycleId();
    const periodId = useSettlementPeriodId();
    const isSkip = !cycleId || !periodId;

    const query = {
        cycleId,
        periodId
    };

    return SettlementsGrpcService.useGetSettlementsQuery(query, {
        skip: isSkip,
        ...options
    });
};

export function usePeriods(type: PeriodOption) {
    const settlementCycleId = useSettlementCycleId();

    const dispatcherCycleId = useDispatchersCycleId();

    const cycleId = type === PeriodOption.SETTLEMENTS ? settlementCycleId : dispatcherCycleId;

    const {
        data,
        isError,
        isLoading
    } = SettlementCyclePeriodsGrpcService.useGetPeriodsQuery(
        { cycleId },
        { skip: !cycleId }
    );

    const periods = useStableArray(data?.periods);

    return {
        periods,
        isError,
        isLoading
    };
}

export function useMainPeriods(cycleId: string) {
    const {
        data,
        isError,
        isLoading
    } = SettlementCyclePeriodsGrpcService.useGetPeriodsQuery(
        { cycleId },
        { skip: !cycleId }
    );

    const periods = useStableArray(data?.periods);

    return {
        periods,
        isError,
        isLoading
    };
}

export const useCycles = () => {
    const stableArray = useRef([]).current;

    const {
        data,
        isError,
        isLoading
    } = SettlementCyclesGrpcService.useGetCyclesQuery({});

    const cycles = useMemo(
        () =>
            data?.settlementCycles
                ? [...data.settlementCycles].sort((a, b) => Number(b.default) - Number(a.default))
                : stableArray,
        [data]
    );

    return {
        cycles,
        isError,
        isLoading
    };
};

export const useActiveCycle = () => {
    const stableArray = useRef([]).current;

    const {
        data,
        isError,
        isLoading
    } = SettlementCyclesGrpcService.useGetCyclesQuery({});

    const cycles = useMemo(
        () =>
            data?.settlementCycles
                ? [...data.settlementCycles.filter((el) => !el.deleted)].sort(
                    (a, b) => Number(b.default) - Number(a.default)
                )
                : stableArray,
        [data]
    );

    return {
        cycles,
        isError,
        isLoading
    };
};

export const useSettlementsSwitchFilters = () => {
    const filter_id = useFilterId(page);
    const switchFilters = useAppSelector(
        (state) =>
            (state.filters[filter_id] as typeof default_settlements_filters)?.[FILTER_SWITCH_KEY]
    );

    return switchFilters;
};

type SettlementConverter = (
    row: SettlementGetReply_Settlement
) => SettlementsTypes.Cycles.Periods.Settlements.ConvertedSettlementRow;

const useConvertSettlement = () => {
    const driversMap = useDriversMap();
    const driverTypesMap = useDriverTypesMap();
    const trailersMap = useTrailersMap();
    const trailerTypesMap = useTrailersTypesMap();
    const trucksMap = useTrucksMap();
    const revenueTypesMap = useRevenueTypesMap();

    const converter: SettlementConverter = useCallback(
        (row) => {
            const driver = driversMap[row.driverId];
            const driverType = driverTypesMap[driver?.driverTypeId || ''];
            const driverRevenueType = revenueTypesMap[driver?.settlementRevenueTypeId || ''];
            const truck = trucksMap[row.truckId];
            const trailer = trailersMap[row.trailerId];
            const trailerType = trailerTypesMap[trailer?.trailerTypeId || ''];
            return {
                ...row,
                driver                : driver || null,
                driverType            : driverType || null,
                truck                 : truck || null,
                trailer               : trailer || null,
                trailerType           : trailerType || null,
                driverRevenueType     : driverRevenueType || null,
                unique_key            : row.settlementId,
                settlementLocalStatus : SETTLEMENT_STATUS_GRPC_ENUM[row.status],
                truckType             : truck ? TRUCK_TYPE_TO_GRPC_REVERSE_ENUM[truck.type] : null,
                company_net_amount    : row.companyNetAmount,
                total_loads_amount    : row.totalLoadsAmount,
                driver_pay_amount     : row.driverPayAmount,
                fuel_amount           : row.fuelAmount,
                tolls_amount          : row.tollsAmount,
                credits_amount        : row.creditsAmount,
                debits_amount         : row.debitsAmount,
                one_time_debits_amount: row.oneTimeDebitsAmount,
                entityId              : row.settlementId,
                trends                : createMap(
                    row.trends,
                    'entity'
                ) as SettlementsTypes.Cycles.Periods.Settlements.ConvertedSettlementRow['trends']
            };
        },
        [driversMap, driverTypesMap, trailersMap, trailerTypesMap, trucksMap, revenueTypesMap]
    );

    return {
        converter
    };
};

const filterIds = [
    PhpFilterTypeMap.SETTLEMENT_STATUS,
    PhpFilterTypeMap.TRUCK_TYPE,
    PhpFilterTypeMap.DRIVER_TYPE,
    PhpFilterTypeMap.SETTLEMENT_DRIVER_PAY_AMOUNT_TYPE
];

const filterValues = [
    'settlementLocalStatus',
    'truckType',
    'driver.driverTypeId',
    'settlementDriverPayAmountType'
];

const amountKeys = [
    { amountKey: 'driverPayAmount', mainKey: 'settlementDriverPayAmountType' }
] as const;

const useMemoize = (data?: SettlementGetReply) => {
    const {
        filter_id,
        selected_filters
    } = useSelectedFilters(page, default_settlements_filters);

    const { converter } = useConvertSettlement();

    const convertedSettlement = useMemo(
        () => data?.settlements.map(converter) || [],
        [data, converter]
    );

    const rowsData = useFilteredRows(
        convertedSettlement,
        selected_filters,
        undefined,
        filtersOrder,
        customFilterFunc,
        true
    );

    const amounts = $Filter.calculateAmounts(convertedSettlement, amountKeys);
    const dataFilters = $Filter.getFiltersData(filterIds, filterValues, amounts);
    const counts = $Filter.calculateCounts(convertedSettlement, dataFilters);
    const filters = useAppliedFilters(filtersOrder, counts);

    const { view } = useSettlementsViews();
    const totals: object | null = useTotals(rowsData.rows, view);

    return {
        ...rowsData,
        filters,
        selected_filters,
        filter_id,
        totals,
        default_settlements_filters
    };
};

export function useSettlements() {
    const cycleId = useSettlementCycleId();
    const periodId = useSettlementPeriodId();
    const {
        data,
        isError,
        isLoading
    } = useAllSettlements();

    const memoizedData = useMemoize(data);

    return { ...memoizedData, isError, isLoading: isLoading || !cycleId || !periodId };
}

export function useMainSettlements(isPollingInterval = true) {
    const cycleId = useSettlementCycleId();
    const periodId = useSettlementPeriodId();

    const {
        data,
        isError,
        isLoading,
        isFetching
    } = useAllSettlements({
        pollingInterval          : isPollingInterval ? pollingIntervalForTable : undefined,
        refetchOnMountOrArgChange: true
    });

    const memoizedData = useMemoize(data);

    const updateWidth = useDirectWidthUpdate(PagesGrpcService, 'retrievePage', {
        page: PageModel_Page.SETTLEMENTS
    });

    if (!cycleId || !periodId) {
        return {
            totals          : null,
            rows_total      : 0,
            rows            : [] as (typeof memoizedData)['rows'],
            filters         : [],
            selected_filters: default_settlements_filters,
            filter_id       : memoizedData.filter_id,
            isError         : false,
            isLoading       : false,
            updateWidth,
            isFetching
        };
    }

    return { ...memoizedData, isError, isLoading, updateWidth, isFetching };
}
