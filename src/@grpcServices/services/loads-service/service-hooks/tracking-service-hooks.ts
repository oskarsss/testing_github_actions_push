import { useAppSelector } from '@/store/hooks';
import { TRACKING_LOCAL_STORAGE_CONFIG } from '@/store/dispatch/tracking/slice';
import useOrdersPageStorage from '@/store/storage/orders/hooks/useOrderPageData';
import { useLoadsFilters } from './utils/useLoadsFilters';

export const generateTrackingFilterId = (viewId: string) => `trucking_${viewId}`;

export const useTrackingFilters = () => {
    const views = useAppSelector((state) => state.tracking.views);
    const data = useLoadsFilters(
        TRACKING_LOCAL_STORAGE_CONFIG.PAGE,
        views,
        TRACKING_LOCAL_STORAGE_CONFIG.SELECTED_VIEW_ID
    );

    return data;
};

export const useTrackingPageData = () => {
    const { selected_filters } = useTrackingFilters();
    const data = useOrdersPageStorage({ selectedFilters: selected_filters });

    return data;
};
