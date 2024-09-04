import { useAppliedFilters, useSelectedFilters } from '@/@core/components/table/hooks/helpers';
import { pollingIntervalForTable } from '@/@core/components/table/configs';
import { $Filter } from '@/@core/components/filters/utils';
import { useStableArray } from '@/hooks/useStable';
import PAGES_FILTERS_CONFIG from '@/configs/pages-filters-config';
import { useCallback } from 'react';
import { useDriverTypesMap, useTrailersTypesMap } from '@/store/hash_maps/hooks';
import useSelectSearchView from '@/hooks/search-params-filters/useSelectSearchView';
import { useTablePageData } from '@/hooks/page-table/useTablePageData';
import { TollGetReply_Toll, TollGetRequest_SortBy } from '@proto/tolls';
import TollsGrpcService from '@/@grpcServices/services/tolls.service';
import {
    TRUCK_STATUS_TO_GRPC_ENUM,
    TRUCK_STATUS_TO_LOCALE,
    TRUCK_TYPE_TO_GRPC_ENUM
} from '@/models/fleet/trucks/trucks-mappings';
import { TollModel_SettlementStatus } from '@proto/models/model_toll';
import TableTypes from '@/@core/components/table/types';
import { useTrucksMap } from '@/store/storage/trucks/hooks/common';
import { useTrailersMap } from '@/store/storage/trailers/hooks/common';
import { useDriversMap } from '@/store/storage/drivers/hooks/common';
import TollsTypes from './types';

import useWindowFocus from '../../../hooks/useWindowFocus';

const page = 'tolls';

export const default_tolls_filters = PAGES_FILTERS_CONFIG.ACCOUNTING.TOLLS.defaultFilters;

const filtersOrder = $Filter.order(default_tolls_filters)(
    'toll_settlement_status',
    'truck_type',
    'truck_status',
    'truck',
    'trailer'
);

enum TollSettlementStatus {
    ASSIGNED = 'assigned',
    UNASSIGNED = 'unassigned',
    UNKNOWN = 'unknown'
}

const TOLL_SETTLEMENT_STATUS_LOCALE: Record<TollModel_SettlementStatus, TollSettlementStatus> = {
    [TollModel_SettlementStatus.ASSIGNED]  : TollSettlementStatus.ASSIGNED,
    [TollModel_SettlementStatus.UNASSIGNED]: TollSettlementStatus.UNASSIGNED,
    [TollModel_SettlementStatus.UNKNOWN]   : TollSettlementStatus.UNKNOWN
};

type TollConverterType = (toll: TollGetReply_Toll) => TollsTypes.ConvertedTollRow;

const useConvertToll = () => {
    const trailersMap = useTrailersMap();
    const trailerTypesMap = useTrailersTypesMap();
    const driversMap = useDriversMap();
    const driverTypesMap = useDriverTypesMap();
    const trucksMap = useTrucksMap();
    const converter: TollConverterType = useCallback(
        (toll) => {
            const driver = driversMap[toll.driverId || ''];
            const truck = trucksMap[toll.truckId];
            const trailer = trailersMap[toll.trailerId];
            const driverType = driverTypesMap[driver?.driverTypeId || ''];
            const trailerType = trailerTypesMap[trailer?.trailerTypeId || ''];

            return {
                ...toll,
                unique_key        : toll.tollTransactionId,
                driver            : driver || null,
                truck             : truck || null,
                trailer           : trailer || null,
                driverType        : driverType || null,
                trailerType       : trailerType || null,
                transponder_number: toll.transponderNumber,
                plate_number      : toll.plateNumber,
                entry_plaza       : toll.entryPlaza,
                entry_datetime    : toll.entryDatetime,
                exit_plaza        : toll.exitPlaza,
                exit_datetime     : toll.exitDatetime,
                posting_date      : toll.postingDate,
                amount            : toll.amountFormatted,
                source            : toll.source,
                truck_status      : TRUCK_STATUS_TO_LOCALE[truck?.status] || '',
                settlement_status : TOLL_SETTLEMENT_STATUS_LOCALE[toll.settlementStatus],
                amount_formatted  : toll.amountFormatted,
                entityId          : toll.tollTransactionId
            };
        },
        [trailersMap, trailerTypesMap, driversMap, driverTypesMap, trucksMap]
    );

    return { converter };
};

type TableHeader =
    | 'agency'
    | 'amount_formatted'
    | 'transponder_number'
    | 'entry_datetime'
    | 'entry_plaza'
    | 'exit_datetime'
    | 'exit_plaza'
    | 'plate_number'
    | 'posting_date'
    | 'source';

const TOLLS_SORT_BY_MAP: Record<TableHeader, Record<TableTypes.Order, TollGetRequest_SortBy>> = {
    agency: {
        asc : TollGetRequest_SortBy.AGENCY_ASC,
        desc: TollGetRequest_SortBy.AGENCY_DESC
    },
    amount_formatted: {
        asc : TollGetRequest_SortBy.AMOUNT_ASC,
        desc: TollGetRequest_SortBy.AMOUNT_DESC
    },
    transponder_number: {
        asc : TollGetRequest_SortBy.TRANSPONDER_NUMBER_ASC,
        desc: TollGetRequest_SortBy.TRANSPONDER_NUMBER_DESC
    },
    entry_datetime: {
        asc : TollGetRequest_SortBy.ENTRY_DATETIME_ASC,
        desc: TollGetRequest_SortBy.ENTRY_DATETIME_DESC
    },
    entry_plaza: {
        asc : TollGetRequest_SortBy.ENTRY_PLAZA_ASC,
        desc: TollGetRequest_SortBy.ENTRY_PLAZA_DESC
    },
    exit_datetime: {
        asc : TollGetRequest_SortBy.EXIT_DATETIME_ASC,
        desc: TollGetRequest_SortBy.EXIT_DATETIME_DESC
    },
    exit_plaza: {
        asc : TollGetRequest_SortBy.EXIT_PLAZA_ASC,
        desc: TollGetRequest_SortBy.EXIT_PLAZA_DESC
    },
    plate_number: {
        asc : TollGetRequest_SortBy.PLATE_NUMBER_ASC,
        desc: TollGetRequest_SortBy.PLATE_NUMBER_DESC
    },
    posting_date: {
        asc : TollGetRequest_SortBy.POSTING_DATE_ASC,
        desc: TollGetRequest_SortBy.POSTING_DATE_DESC
    },
    source: {
        asc : TollGetRequest_SortBy.SOURCE_ASC,
        desc: TollGetRequest_SortBy.SOURCE_DESC
    }
};

const TOLLS_SORTABLE_COLUMNS_CONFIG = Object.keys(TOLLS_SORT_BY_MAP);

const useMemoize = (tolls: TollGetReply_Toll[]) => {
    const {
        filter_id,
        selected_filters
    } = useSelectedFilters(page, default_tolls_filters);

    const views_and_headers = useTablePageData('TOLLS', TOLLS_SORTABLE_COLUMNS_CONFIG);

    const {
        selectView,
        defaultViewId,
        selectedViewId: selected_view_id,
        currentView: view
    } = useSelectSearchView({
        page,
        defaultFilters: default_tolls_filters,
        views         : views_and_headers.views
    });

    const { converter } = useConvertToll();

    const rows = useStableArray(tolls.map(converter));

    return {
        ...views_and_headers,
        rows,
        selected_filters,
        view,
        filter_id,
        selected_view_id,
        selectView,
        defaultViewId
    };
};

export function useMainTolls(isPollingInterval = true) {
    const { selected_filters } = useSelectedFilters(page, default_tolls_filters);

    const {
        isLoading,
        isError,
        data,
        endpointName,
        originalArgs,
        ...rest
    } =
        TollsGrpcService.useGetTollsQuery(
            {
                page    : selected_filters.page,
                perPage : selected_filters.per_page,
                truckIds: selected_filters.truck,
                assigned: !selected_filters.unassigned,
                sortBy:
                    TOLLS_SORT_BY_MAP[selected_filters.orderBy as TableHeader]?.[
                        selected_filters.order
                    ] || TollGetRequest_SortBy.TRANSPONDER_NUMBER_ASC,
                truckStatuses: selected_filters.truck_status.map(
                    (status) => TRUCK_STATUS_TO_GRPC_ENUM[status]
                ),
                truckTypes: selected_filters.truck_type.map(
                    (type) => TRUCK_TYPE_TO_GRPC_ENUM[type]
                ),
                endDate   : selected_filters.end_at,
                startDate : selected_filters.start_at,
                search    : selected_filters.search,
                trailerIds: selected_filters.trailer,
                ...(selected_filters.toll_settlement_status.length && {
                    settlementStatus:
                        selected_filters.toll_settlement_status[0] === 'assigned'
                            ? TollModel_SettlementStatus.ASSIGNED
                            : TollModel_SettlementStatus.UNASSIGNED
                })
            },
            {
                pollingInterval: isPollingInterval ? pollingIntervalForTable : undefined
            }
        );

    const tollsList = useStableArray(data?.tolls);
    const memoizedData = useMemoize(tollsList);

    return {
        ...rest,
        ...memoizedData,
        isError,
        isLoading,
        default_tolls_filters,
        tollsList
    };
}

export function useTollsStats() {
    const windowFocused = useWindowFocus('tolls');
    const {
        filter_id,
        selected_filters
    } = useSelectedFilters(page, default_tolls_filters);

    const {
        data,
        isLoading,
        isError
    } = TollsGrpcService.useGetTollStatsQuery(
        {
            assigned     : !selected_filters.unassigned,
            trailerIds   : selected_filters.trailer,
            truckIds     : selected_filters.truck,
            truckStatuses: selected_filters.truck_status.map(
                (status) => TRUCK_STATUS_TO_GRPC_ENUM[status]
            ),
            truckTypes: selected_filters.truck_type.map((type) => TRUCK_TYPE_TO_GRPC_ENUM[type]),
            startDate : selected_filters.start_at,
            ...(selected_filters.toll_settlement_status.length && {
                settlementStatus:
                    selected_filters.toll_settlement_status[0] === 'assigned'
                        ? TollModel_SettlementStatus.ASSIGNED
                        : TollModel_SettlementStatus.UNASSIGNED
            })
        },
        {
            pollingInterval: windowFocused ? 3000 : undefined
        }
    );

    const filters = useAppliedFilters(filtersOrder, data?.filters);

    const rows_total = data?.totalTollsCount || 0;

    return { rows_total, filter_id, filters, isError, isLoading, selected_filters };
}
