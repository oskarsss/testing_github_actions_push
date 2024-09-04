import {
    useAppliedFilters,
    useFilteredRows,
    useSelectedFilters
} from '@/@core/components/table/hooks/helpers';
import { useMemo, useRef } from 'react';
import { pollingIntervalForTable } from '@/@core/components/table/configs';
import PAGES_FILTERS_CONFIG from '@/configs/pages-filters-config';
import useSelectSearchView from '@/hooks/search-params-filters/useSelectSearchView';
import { useStableArray } from '@/hooks/useStable';
import { useTablePageData } from '@/hooks/page-table/useTablePageData';
import { BrokersGrpcService } from '@/@grpcServices/services/brokers.service';
import type { BrokerGetReply, BrokerGetReply_Broker } from '@proto/brokers';

const page = 'brokers';

export const default_broker_filters = PAGES_FILTERS_CONFIG.DISPATCH.BROKERS.defaultFilters;

const useMemoize = (data?: BrokerGetReply) => {
    const {
        filter_id,
        selected_filters
    } = useSelectedFilters(page, default_broker_filters);

    const views_and_headers = useTablePageData('BROKERS');

    const {
        selectView,
        defaultViewId,
        selectedViewId: selected_view_id,
        currentView: view
    } = useSelectSearchView({
        page,
        defaultFilters: default_broker_filters,
        views         : views_and_headers.views
    });

    const brokers = useStableArray(data?.brokers);
    const brokersList = useMemo(
        () =>
            brokers
                .filter((broker) => !broker.deleted)
                .map((broker) => ({
                    ...broker,
                    created_at  : broker.createdAt,
                    entityId    : broker.brokerId,
                    phone_number: broker.phoneNumber,
                    short_name  : broker.shortName,
                    unique_key  : broker.brokerId,
                    entities    : {
                        broker: broker.brokerId
                    }
                })),
        [brokers]
    );
    const rowsData = useFilteredRows(brokersList, selected_filters);

    const filters = useAppliedFilters([]);

    return {
        ...views_and_headers,
        ...rowsData,
        brokers: data ? data.brokers : [],
        filters,
        selected_filters,
        view,
        filter_id,
        selected_view_id,
        selectView,
        defaultViewId
    };
};

export function useBrokers(isPollingInterval = true) {
    const {
        data,
        isError,
        isLoading
    } = BrokersGrpcService.useGetBrokersQuery(
        {},
        {
            pollingInterval: isPollingInterval ? pollingIntervalForTable : undefined
        }
    );

    const memoizedData = useMemoize(data);

    return { ...memoizedData, isError, isLoading };
}

export function useActiveBrokers() {
    const stableArray = useRef([]);
    const {
        data,
        isError,
        isLoading
    } = BrokersGrpcService.useGetBrokersQuery({});

    const brokers = useMemo(() => {
        if (!data?.brokers) return stableArray.current as BrokerGetReply_Broker[];
        return data.brokers.filter((broker) => !broker.deleted);
    }, [data]);

    return { brokers, isError, isLoading };
}

export function useBroker(brokerId: string) {
    const {
        data,
        isError,
        isLoading,
        isSuccess,
        refetch
    } =
        BrokersGrpcService.useRetrieveBrokerQuery(
            { brokerId },
            {
                skip                     : !brokerId,
                refetchOnMountOrArgChange: true
            }
        );
    return { data: data?.broker, isSuccess, isError, isLoading, refetch };
}
