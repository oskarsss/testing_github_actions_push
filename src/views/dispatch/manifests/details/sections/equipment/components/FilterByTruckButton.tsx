import ManifestStyled from '@/views/dispatch/manifests/components/styled';
import VectorIcons from '@/@core/icons/vector_icons';
import HotKeyTooltip from '@/@core/ui-kits/basic/hot-key-tooltip/HotKeyTooltip';
import { useAppDispatch } from '@/store/hooks';
import { useTrucksMap } from '@/store/storage/trucks/hooks/common';
import { useCallback } from 'react';
import { ManifestFilterStatuses } from '@/models/manifests/manifest';
import { createManifestViewAction } from '@/store/dispatch/manifests/actions/views';
import { MANIFESTS_VIEW_TYPES } from '@/store/dispatch/manifests/models';
import { useManifestsFilters } from '@/store/dispatch/manifests/hooks';

export const useCreateTruckManifestView = (truckId: string) => {
    const dispatch = useAppDispatch();
    const trucksMap = useTrucksMap();
    const {
        selectView,
        views
    } = useManifestsFilters();
    return useCallback(() => {
        const truck = trucksMap[truckId];
        const generatedViewId = `truck_${truckId}`;
        const isExist = views.find((view) => view.view_id === generatedViewId);

        if (!isExist) {
            const filters = {
                truck          : [truckId],
                manifest_status: [
                    ManifestFilterStatuses.STATUS_ASSIGNED,
                    ManifestFilterStatuses.STATUS_PLANNING,
                    ManifestFilterStatuses.STATUS_IN_PROGRESS
                ]
            };
            dispatch(
                createManifestViewAction({
                    type   : MANIFESTS_VIEW_TYPES.truck,
                    view_id: generatedViewId,
                    name   : `#${truck?.referenceId}` || '',
                    filters: {
                        truck          : [truckId],
                        manifest_status: [
                            ManifestFilterStatuses.STATUS_ASSIGNED,
                            ManifestFilterStatuses.STATUS_PLANNING,
                            ManifestFilterStatuses.STATUS_IN_PROGRESS
                        ]
                    }
                })
            );
            selectView(generatedViewId);
            return;
        }
        selectView(generatedViewId);
    }, [trucksMap, truckId, views, selectView, dispatch]);
};

type Props = {
    truckId: string;
};

export default function FilterByTruckButton({ truckId }: Props) {
    const handleFilterByTruck = useCreateTruckManifestView(truckId);

    return (
        <HotKeyTooltip
            title="common:tooltips.filter_by_truck"
            hot_keys="T"
        >
            <ManifestStyled.ActionButton
                kind="common"
                onClick={handleFilterByTruck}
                className="primary"
            >
                <VectorIcons.Filter />
            </ManifestStyled.ActionButton>
        </HotKeyTooltip>
    );
}
