import VectorIcons from '@/@core/icons/vector_icons';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { createTrackingViewAction } from '@/store/dispatch/tracking/actions';
import HotKeyTooltip from '@/@core/ui-kits/basic/hot-key-tooltip/HotKeyTooltip';
import { trackingViewsSelector } from '@/store/dispatch/tracking/selectors';
import { LOADS_VIEW_TYPES } from '@/@grpcServices/services/loads-service/service-utils/loads-default-models';
import { LoadStatuses } from '@/models/loads/load';
import { useTrackingFilters } from '@/@grpcServices/services/loads-service/service-hooks/tracking-service-hooks';
import { useTrucksMap } from '@/store/storage/trucks/hooks/common';
import { useCallback } from 'react';
import TrackingOverviewButtonsStyled from './styled';

type Props = {
    truckId: string;
};

export const useCreateTrackingTruckView = (truckId: string) => {
    const dispatch = useAppDispatch();
    const loadsViews = useAppSelector(trackingViewsSelector);

    const trucksMap = useTrucksMap();
    const { selectView } = useTrackingFilters();
    const truck = trucksMap[truckId];

    return useCallback(() => {
        const view = loadsViews.find((view) => view.view_id === `truck_${truck.truckId}`);

        if (view) {
            selectView(view.view_id);
        } else {
            const createdViewId = `truck_${truck.truckId}`;
            const filters = {
                truck      : [truck.truckId],
                load_status: [LoadStatuses.PENDING, LoadStatuses.ASSIGNED, LoadStatuses.IN_PROGRESS]
            };
            dispatch(
                createTrackingViewAction({
                    view_id: createdViewId,
                    name   : `${truck.referenceId}`,
                    type   : LOADS_VIEW_TYPES.TRUCK,
                    filters
                })
            );
            selectView(createdViewId);
        }
    }, [dispatch, selectView, truck, loadsViews]);
};

export default function FilterButton({ truckId }: Props) {
    const trucksMap = useTrucksMap();

    const onClick = useCreateTrackingTruckView(truckId);
    const truck = trucksMap[truckId];
    if (!truck) return null;

    return (
        <HotKeyTooltip
            title="common:tooltips.filter_by_truck"
            hot_keys="T"
        >
            <TrackingOverviewButtonsStyled.Button onClick={onClick}>
                <VectorIcons.Filter />
            </TrackingOverviewButtonsStyled.Button>
        </HotKeyTooltip>
    );
}
