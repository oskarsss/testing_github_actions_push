import { useMemo } from 'react';
import { useStableArray } from '@/hooks/useStable';
import PAGES_FILTERS_CONFIG from '@/configs/pages-filters-config';
import { $Filter } from '@/@core/components/filters/utils';
import { useSelectedFilters } from '@/@core/components/table/hooks/helpers';
import { ManifestGetRequest_SortType } from '@proto/manifests';
import ManifestsGrpcService from './manifests.service';

export const manifestDefaultFilters = PAGES_FILTERS_CONFIG.DISPATCH.MANIFEST.defaultFilters;

export const manifests_filter_order = $Filter.order(manifestDefaultFilters)(
    'manifest_status',
    'driver',
    'truck',
    'trailer'
);

export type FilterType = 'driver' | 'truck' | 'trailer';
export type PageType = 'driver' | 'truck' | 'trailer';
type FleetLoadsQueryType = {
    filterType: FilterType;
    entityId: string;
    page: PageType;
};

export const useFleetManifestsQuery = ({
    filterType,
    entityId,
    page
}: FleetLoadsQueryType) => {
    const {
        filter_id,
        selected_filters
    } = useSelectedFilters(page, manifestDefaultFilters);

    const entityIdMap = {
        driver : filterType === 'driver' ? [entityId] : [],
        trailer: filterType === 'trailer' ? [entityId] : [],
        truck  : filterType === 'truck' ? [entityId] : []
    };

    const {
        data: manifestData,
        ...rest
    } = ManifestsGrpcService.useGetManifestsQuery(
        {
            page      : selected_filters.page,
            perPage   : selected_filters.per_page,
            sortType  : ManifestGetRequest_SortType.FIRST_STOP_APPOINTMENT_START_AT_DESC,
            driverIds : entityIdMap.driver,
            statuses  : [],
            trailerIds: entityIdMap.trailer,
            truckIds  : entityIdMap.truck,
            startDate : '',
            endDate   : '',
            loadIds   : [],
            search    : ''
        },
        {
            refetchOnFocus           : true,
            refetchOnMountOrArgChange: true
        }
    );

    const { data: manifestStatsData } = ManifestsGrpcService.useGetManifestStatsQuery({
        statuses  : [],
        truckIds  : entityIdMap.truck,
        driverIds : entityIdMap.driver,
        trailerIds: entityIdMap.trailer,
        startDate : '',
        endDate   : '',
        loadIds   : [],
        search    : ''
    });

    const manifests = useStableArray(manifestData?.manifests);
    const total = useMemo(
        () => (manifestStatsData ? manifestStatsData.totalManifestsCount : 0),
        [manifestStatsData]
    );

    return {
        manifests,
        total,
        filter_id,
        selected_filters,
        ...rest
    };
};
