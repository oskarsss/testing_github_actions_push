/* eslint-disable max-len */
import { ManifestModel_Status, ManifestModel_Stop } from '@proto/models/model_manifest';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
    manifestDefaultFilters,
    manifests_filter_order
} from '@/@grpcServices/services/manifests-service/manifest-service-hooks';
import { selectView as _selectView } from '@/store/pages/slice';

import { useCallback, useMemo } from 'react';
import { FORMATTED_MANIFEST_STATUS } from '@/models/manifests/mapping';
import { FilterModel_Filter, FilterModel_FilterID } from '@proto/models/model_filter_type';
import { mergeFilters } from '@/@core/components/filters/filter-button/filter_helpers';
import PAGES_FILTERS_CONFIG from '@/configs/pages-filters-config';
import { useTrucksMap } from '@/store/storage/trucks/hooks/common';
import { useDriversMap } from '@/store/storage/drivers/hooks/common';
import {
    connectFilters,
    filterByDate,
    filterByFleet,
    filterByStatus,
    generatePaginatedIndexMap,
    searchFilter,
    sortByFilter
} from './utils/filters';
import { selectActiveModeRows, selectIndexes } from './selectors';

const { page } = PAGES_FILTERS_CONFIG.DISPATCH.MANIFEST;

export const useManifestsFilters = () => {
    const selected_view_id = useAppSelector((state) => state.pages[page]?.toString() || '');
    const views = useAppSelector((state) => state.manifests.views);
    const {
        filter_id,
        view
    } = useMemo(() => {
        const view = views?.length ? views.find((view) => view.view_id === selected_view_id) : null;
        const filter_id = `${page}_${selected_view_id}`;
        return { view, filter_id };
    }, [views, selected_view_id]);

    const storeFilters = useAppSelector((state) => state.filters[filter_id]);

    const selected_filters = useMemo(
        () => ({ ...manifestDefaultFilters, ...storeFilters }),
        [storeFilters]
    );
    const dispatch = useAppDispatch();

    const selectView = useCallback(
        (viewId: string) => {
            dispatch(_selectView({ page, view_id: viewId }));
        },
        [dispatch]
    );

    return {
        view,
        filter_id,
        selected_filters,
        views,
        selected_view_id,
        selectView
    };
};

export function useManifests() {
    const trucksMap = useTrucksMap();
    const driversMap = useDriversMap();
    const manifests = useAppSelector(selectActiveModeRows);
    const { selected_filters } = useManifestsFilters();

    const indexes = useAppSelector(selectIndexes);

    const rows = useMemo(() => {
        const filteredIndexes = connectFilters(indexes.default, [
            sortByFilter(selected_filters, indexes),
            filterByStatus(selected_filters.manifest_status, indexes.status),
            filterByFleet(
                {
                    drivers: selected_filters.driver,
                    trailer: selected_filters.trailer,
                    trucks : selected_filters.truck
                },
                trucksMap,
                indexes
            ),
            filterByDate(selected_filters, indexes.firstStopDate),
            searchFilter(selected_filters.search, indexes.manifests, trucksMap, driversMap)
        ]);

        const paginatedIndexes = generatePaginatedIndexMap(
            filteredIndexes,
            selected_filters.page,
            selected_filters.per_page
        );
        const dynamicRowsIndexesByDay = filteredIndexes.reduce<Record<string, string[]>>(
            (acc, index) => {
                const manifest = manifests[index];
                const date = manifest.stops[0].appointmentStartAtLocal;
                const key = date?.split(' ')[0];
                if (!acc[key]) {
                    acc[key] = [];
                }
                acc[key].push(manifest.manifestId);
                return acc;
            },
            {}
        );

        return { filteredIndexes, paginatedIndexes, dynamicRowsIndexesByDay };
    }, [indexes, selected_filters, trucksMap, driversMap, manifests]);

    const {
        statsFilters,
        totalManifestsCount
    } = useMemo(() => {
        const filters: FilterModel_Filter[] = [
            {
                filterId: FilterModel_FilterID.FILTER_MANIFEST_STATUS,
                amounts : {},
                counts  : Object.keys(indexes.status).reduce((acc, key) => {
                    acc[FORMATTED_MANIFEST_STATUS[Number(key) as ManifestModel_Status]] =
                        rows.filteredIndexes.filter((index) =>
                            indexes.status[key].includes(index)).length;
                    return acc;
                }, {} as Record<string, number>)
            },
            {
                filterId: FilterModel_FilterID.FILTER_TRUCK,
                amounts : {},
                counts  : Object.keys(indexes.truck).reduce((acc, key) => {
                    acc[key] = rows.filteredIndexes.filter((index) =>
                        indexes.truck[key].includes(index)).length;
                    return acc;
                }, {} as Record<string, number>)
            },
            {
                filterId: FilterModel_FilterID.FILTER_DRIVER,
                amounts : {},
                counts  : Object.keys(indexes.driver).reduce((acc, key) => {
                    acc[key] = rows.filteredIndexes.filter((index) =>
                        indexes.driver[key].includes(index)).length;
                    return acc;
                }, {} as Record<string, number>)
            },
            {
                filterId: FilterModel_FilterID.FILTER_TRAILER,
                amounts : {},
                counts  : Object.keys(indexes.trailer).reduce((acc, key) => {
                    acc[key] = rows.filteredIndexes.filter((index) =>
                        indexes.trailer[key].includes(index)).length;
                    return acc;
                }, {} as Record<string, number>)
            }
        ];

        return {
            statsFilters       : filters,
            totalManifestsCount: rows.filteredIndexes.length
        };
    }, [indexes.status, indexes.truck, indexes.driver, indexes.trailer, rows.filteredIndexes]);

    const filters = useMemo(
        () => mergeFilters(manifests_filter_order, statsFilters),
        [statsFilters]
    );

    return {
        filters,
        total                        : totalManifestsCount,
        rows                         : rows.paginatedIndexes,
        dynamicRowsIndexesByStartDate: rows.dynamicRowsIndexesByDay
    };
}

export const useManifestLoads = (stops: ManifestModel_Stop[]) =>
    useMemo(() => {
        // Use a Set to ensure unique loadIds
        const loadSet = new Set();
        const loads: {
            friendlyId: string;
            loadId: string;
        }[] = [];

        stops.forEach(({
            loadFriendlyId,
            loadId
        }) => {
            if (!loadSet.has(loadId) && loadId) {
                loadSet.add(loadId);
                loads.push({ friendlyId: loadFriendlyId, loadId });
            }
        });

        const firstLoad = loads.length > 0 ? loads[0] : null;
        const otherLoads = loads.length > 1 ? loads.slice(1) : [];
        const loadIds = loads.map(({ loadId }) => loadId);
        return {
            firstLoad,
            otherLoads,
            loads,
            loadIds
        };
    }, [stops]);
