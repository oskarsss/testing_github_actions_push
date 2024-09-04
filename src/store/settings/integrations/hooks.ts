import { useMemo, useState } from 'react';
import { filterRows } from '@/@core/components/filters/filter-button/hooks';
import { useFilteredRows, useSelectedFilters } from '@/@core/components/table/hooks/helpers';
import IntegrationProviderGrpcService from '@/@grpcServices/services/intergrations.service';
import { AppThunkAction } from '@/store/types';
import PAGES_FILTERS_CONFIG from '@/configs/pages-filters-config';
import type { IntlMessageKey } from '@/@types/next-intl';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import useSelectSearchView from '@/hooks/search-params-filters/useSelectSearchView';
import { IntegrationCategoryArray } from '@/views/settings/tabs/Integrations/components/Content/categories_configs';
import { PageModel_View } from '@proto/models/model_page';
import { useTrucksMap } from '@/store/storage/trucks/hooks/common';
import { useTrailersMap } from '@/store/storage/trailers/hooks/common';
import { useDriversMap } from '@/store/storage/drivers/hooks/common';
import Settings from '../types';

export function useIntegrationProviders() {
    const {
        data,
        error,
        isError,
        isLoading
    } =
        IntegrationProviderGrpcService.useGetIntegrationProvidersQuery({});

    return {
        connected    : data ? data.integrationProviders.filter((el) => el.connected) : [],
        not_connected: data ? data.integrationProviders.filter((el) => !el.connected) : [],
        isSuccess    : !!data,
        isLoading,
        isError,
        error
    };
}

const page = 'integration_providers';
export const default_provider_filters =
    PAGES_FILTERS_CONFIG.SETTINGS.INTEGRATIONS.FLEET_PROVIDER.defaultFilters;

const VIEWS: { viewId: string; name: IntlMessageKey }[] = [
    {
        viewId: '0',
        name  : 'settings:integrations.details.right_side.manage.tabs.all'
    },
    {
        viewId: '1',
        name  : 'settings:integrations.details.right_side.manage.tabs.non_linked'
    },
    {
        viewId: '2',
        name  : 'settings:integrations.details.right_side.manage.tabs.linked'
    }
];

export function useManageProvider(integrationProviderId: string) {
    const {
        data,
        error,
        isError,
        isLoading
    } =
        IntegrationProviderGrpcService.useGetIntegrationProviderIdQuery({ integrationProviderId });

    return {
        provider : data?.integrationProvider,
        error,
        isSuccess: !!data,
        isError,
        isLoading
    };
}

export function useManageProviderVehicles(provider_id: string) {
    const [selected_view_id, selectView] = useState(VIEWS[0].viewId);
    const { t } = useAppTranslation();
    const {
        filter_id,
        selected_filters
    } = useSelectedFilters(page, default_provider_filters);
    const {
        provider,
        error,
        isError,
        isLoading
    } = useManageProvider(provider_id);

    const trucksMap = useTrucksMap();

    const trailersMap = useTrailersMap();

    const {
        views,
        selected_view
    } = useMemo(() => {
        const data_filtered: Record<string | number, Settings.ProviderVehicleRow[]> = {};
        if (provider) {
            VIEWS.forEach((view) => {
                const providerRows = (provider?.vehicles?.vehicles || []).map((item) => {
                    let friendlyEntityId = '';

                    if (item.entityType === 'truck') {
                        friendlyEntityId = trucksMap[item.entityId]?.referenceId || '';
                    } else if (item.entityType === 'trailer') {
                        friendlyEntityId = `${trailersMap[item.entityId]?.referenceId}`;
                    }

                    return {
                        ...item,
                        friendlyEntityId,
                        unique_key: item.referenceId,
                        entities  : {} as any
                    };
                });

                switch (view.viewId) {
                case '0':
                    data_filtered[view.viewId] = providerRows || [];
                    break;
                case '1':
                    data_filtered[view.viewId] = providerRows.filter(
                        (el) => el.connected === false
                    );
                    break;
                case '2':
                    data_filtered[view.viewId] = providerRows.filter(
                        (el) => el.connected === true
                    );
                    break;
                default:
                    break;
                }
            });
        }

        const views: { viewId: string; name: string }[] = VIEWS.map(({
            viewId,
            name
        }) => ({
            viewId,
            name: `${t(name)} (${data_filtered[viewId]?.length || 0})`
        }));

        const selected_view = filterRows<Settings.ProviderVehicleRow>(
            data_filtered[selected_view_id] || [],
            selected_filters,
            []
        );

        return { views, selected_view };
    }, [provider, selected_view_id, selected_filters, trucksMap, trailersMap]);

    return {
        provider,
        views,
        selected_view,
        error,
        isSuccess: !!provider,
        isError,
        isLoading,
        filter_id,
        selected_filters,
        selected_view_id,
        selectView
    };
}

export function useManageProviderDrivers(provider_id: string) {
    const [selected_view_id, selectView] = useState(VIEWS[0].viewId);
    const {
        filter_id,
        selected_filters
    } = useSelectedFilters(page, default_provider_filters);
    const {
        provider,
        error,
        isError,
        isLoading
    } = useManageProvider(provider_id);

    const driversMap = useDriversMap();
    const { t } = useAppTranslation();

    const {
        views,
        selected_view
    } = useMemo(() => {
        const data_filtered: Record<string | number, Settings.ProviderDriverRow[]> = {};
        if (provider) {
            VIEWS.forEach((view) => {
                const providerRows = (provider?.drivers?.drivers || []).map((item) => {
                    const friendlyEntityId = `${driversMap[item.vektorDriverId]?.friendlyId || ''}`;
                    const driver = driversMap[item.vektorDriverId];
                    return {
                        ...item,
                        friendlyEntityId,
                        entityId        : item.referenceId,
                        unique_key      : item.referenceId,
                        entities        : {} as any,
                        vektorDriverName: driver ? `${driver.firstName} ${driver.lastName}` : ''
                    };
                });
                switch (view.viewId) {
                case '0':
                    data_filtered[view.viewId] = providerRows || [];
                    break;
                case '1':
                    data_filtered[view.viewId] = providerRows.filter(
                        (el) => el.connected === false
                    );
                    break;
                case '2':
                    data_filtered[view.viewId] = providerRows.filter(
                        (el) => el.connected === true
                    );
                    break;
                default:
                    break;
                }
            });
        }

        const views = VIEWS.map(({
            viewId,
            name
        }) => ({
            viewId,
            name: `${t(name)} (${data_filtered[viewId]?.length || 0})`
        }));

        const selected_view = filterRows<Settings.ProviderDriverRow>(
            data_filtered[selected_view_id] || [],
            selected_filters,
            []
        );

        return { views, selected_view };
    }, [provider, selected_view_id, selected_filters, driversMap]);

    return {
        provider,
        views,
        selected_view,
        error,
        isSuccess: !!provider,
        isError,
        isLoading,
        filter_id,
        selected_filters,
        selected_view_id,
        selectView
    };
}

export function useFiltersIntegrations() {
    const {
        page,
        defaultFilters
    } = PAGES_FILTERS_CONFIG.SETTINGS.INTEGRATIONS.MAIN;

    const {
        filter_id,
        selected_filters
    } = useSelectedFilters(page, defaultFilters);

    const views: PageModel_View[] = useMemo(
        () =>
            IntegrationCategoryArray.map((category) => ({
                viewId   : category.toString(),
                name     : category.toString(),
                rowHeight: 0,
                sequence : 0,
                columns  : []
            })),
        []
    );

    const {
        selectView,
        defaultViewId,
        selectedViewId
    } = useSelectSearchView({
        page,
        defaultFilters,
        views
    });

    return {
        selected_filters,
        filter_id,
        selectView,
        defaultViewId,
        selectedViewId,
        views,
        page,
        defaultFilters
    };
}

export function useIntegrations() {
    const filters = useFiltersIntegrations();

    const response = IntegrationProviderGrpcService.useGetIntegrationProvidersQuery({});

    const filteredRows = useFilteredRows(
        response.data?.integrationProviders,
        filters.selected_filters
    );

    const rows = useMemo(() => {
        if (!filters.selectedViewId || filters.selectedViewId === '0') return filteredRows.rows;
        return filteredRows.rows.filter((row) =>
            row.categories.some((category) => category.toString() === filters.selectedViewId));
    }, [filteredRows.rows, filters]);

    return {
        ...filters,
        ...response,
        rows
    };
}
