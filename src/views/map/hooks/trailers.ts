import { useFilters } from '@/@core/components/filters/filter-button/hooks';
import { useAppliedFilters, useFilteredRows } from '@/@core/components/table/hooks/helpers';
import { $Filter } from '@/@core/components/filters/utils';
import { useConvertTrailer } from '@/store/fleet/trailers/hooks';
import { useMemo } from 'react';
import { TrailerStatuses } from '@/models/fleet/trailers/trailer-status';
import PAGES_FILTERS_CONFIG from '@/configs/pages-filters-config';
import { PhpFilterTypeMap } from '@/@core/components/filters/types';
import { TrailerModel_Status } from '@proto/models/model_trailer';
import { useAppSelector } from '@/store/hooks';
import { TrailerDataSelectors } from '@/store/storage/trailers/slice';

export const map_trailers_default_filters = PAGES_FILTERS_CONFIG.MAP.TRAILERS.defaultFilters;
const filtersOrder = $Filter.order(map_trailers_default_filters)(
    'trailer_status',
    'trailer_ownership_type',
    'trailer_type',
    'vendor',
    'trailer_company',
    'trailer_tags'
);

const filterIds = [
    PhpFilterTypeMap.TRAILER_STATUS,
    PhpFilterTypeMap.TRAILER_OWNERSHIP_TYPE,
    PhpFilterTypeMap.TRAILER_TYPE,
    PhpFilterTypeMap.VENDOR,
    PhpFilterTypeMap.TRAILER_COMPANY,
    PhpFilterTypeMap.TRAILER_TAGS
];

const filterValues = [
    'status',
    'ownershipType',
    'trailerType.trailerTypeId',
    'vendorId',
    'trailerCompanyId',
    'tags.tagId'
];

export const useMapTrailers = () => {
    const mapTrailersFilters = useFilters('map_trailers', map_trailers_default_filters);
    const { converter } = useConvertTrailer();
    const trailersData = useAppSelector(TrailerDataSelectors.getRows);
    const isLoading = useAppSelector(TrailerDataSelectors.getIsLoading);

    const activeTrailers = useMemo(() => {
        if (!trailersData) return [];
        if (mapTrailersFilters.trailer_status?.includes(TrailerStatuses.DELETED)) {
            return trailersData.filter((trailer) => trailer.status === TrailerModel_Status.DELETED);
        }
        return trailersData.filter((trailer) => trailer.status !== TrailerModel_Status.DELETED);
    }, [trailersData, mapTrailersFilters?.trailer_status]);

    const dataFilters = $Filter.getFiltersData(filterIds, filterValues);
    const counts = $Filter.calculateCounts(activeTrailers, dataFilters);
    const filters = useAppliedFilters(filtersOrder, counts);

    const { rows: trailers } = useFilteredRows(
        activeTrailers.map(converter),
        mapTrailersFilters,
        undefined,
        filtersOrder
    );

    return {
        trailers,
        isLoading,
        filters         : mapTrailersFilters,
        availableFilters: filters
    };
};
