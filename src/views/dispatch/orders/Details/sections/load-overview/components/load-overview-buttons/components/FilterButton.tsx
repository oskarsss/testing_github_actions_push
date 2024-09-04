import VectorIcons from '@/@core/icons/vector_icons';
import Button from '@/views/dispatch/orders/Details/sections/load-overview/ui-elements/Button';
import { useCallback, useMemo } from 'react';
import { createLoadViewAction } from '@/store/dispatch/loads/actions';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useRouter } from 'next/router';
import { useOrdersPageFilters } from '@/@grpcServices/services/loads-service/service-hooks/loads-service-hooks';
import { LOADS_VIEW_TYPES } from '@/@grpcServices/services/loads-service/service-utils/loads-default-models';
import { LoadStatuses } from '@/models/loads/load';
import { useTrucksMap } from '@/store/storage/trucks/hooks/common';
import { openNewWindowWithQueryParams } from '@/utils/open-new-window';
import APP_ROUTES_CONFIG from '@/configs/app-routes-config';

type Props = {
    truckId: string;
};

export const useCreateLoadsTruckView = (truckId: string) => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { selectView } = useOrdersPageFilters();
    const trucksMap = useTrucksMap();
    const truck = trucksMap[truckId];
    const loadsViews = useAppSelector((state) => state.loads.views);

    const isNotLoadDetail = router.pathname !== APP_ROUTES_CONFIG.dispatch.orders.path;
    const selectedTruckId = useMemo(() => truck?.truckId || '', [truck?.truckId]);
    const createdViewId = useMemo(() => `truck_${selectedTruckId}`, [selectedTruckId]);
    const view = useMemo(
        () => loadsViews.find((view) => view.view_id === createdViewId),
        [createdViewId, loadsViews]
    );

    const filters = useMemo(
        () => ({
            truck      : [selectedTruckId],
            load_status: [LoadStatuses.PENDING, LoadStatuses.ASSIGNED, LoadStatuses.IN_PROGRESS]
        }),
        [selectedTruckId]
    );

    const createNewLoadView = useCallback(() => {
        dispatch(
            createLoadViewAction({
                type   : LOADS_VIEW_TYPES.TRUCK,
                view_id: createdViewId,
                name   : `${truck?.referenceId}`,
                filters
            })
        );
    }, [dispatch, createdViewId, truck?.referenceId, filters]);

    return useCallback(() => {
        if (isNotLoadDetail) {
            if (!view) {
                createNewLoadView();
            }

            openNewWindowWithQueryParams(APP_ROUTES_CONFIG.dispatch.orders.path, {
                viewId     : createdViewId,
                load_status: [
                    LoadStatuses.PENDING,
                    LoadStatuses.ASSIGNED,
                    LoadStatuses.IN_PROGRESS
                ],
                truck: [selectedTruckId]
            });
        } else if (view) {
            selectView(view.view_id);
        } else {
            createNewLoadView();
            selectView(createdViewId);
        }
    }, [createNewLoadView, createdViewId, isNotLoadDetail, selectView, selectedTruckId, view]);
};

export default function FilterButton({ truckId = '' }: Props) {
    const router = useRouter();

    const openTruckScheduling = useCreateLoadsTruckView(truckId);

    if (!truckId) return null;

    const isNotLoadDetail = router.pathname !== APP_ROUTES_CONFIG.dispatch.orders.path;

    return (
        <Button
            onClick={openTruckScheduling}
            tooltipProps={{
                title: isNotLoadDetail
                    ? 'loads:details.overview.tooltips.filter_by_truck_new_tab'
                    : 'common:tooltips.filter_by_truck',
                hot_keys: 'T'
            }}
        >
            <VectorIcons.Filter />
        </Button>
    );
}
