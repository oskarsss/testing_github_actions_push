import { useAssignTruckToManifestDialog } from '@/@core/components/assign/modals/AssignTruckToManifest';
import { useReAssignTruckToManifestDialog } from '@/@core/components/assign/modals/ReAssignTruckToManifest';
import { memo, useEffect } from 'react';
import { useOrdersPageFilters } from '@/@grpcServices/services/loads-service/service-hooks/loads-service-hooks';
import { useAppSelector } from '@/store/hooks';
import { ordersPageSelectedOrderSelector } from '@/store/dispatch/loads/selectors';
import useOrderActiveManifest from '@/store/storage/orders/hooks/useOrderActiveManifest';
import { useUnassignTruckFromManifest } from '../../manifests/details/sections/equipment/components/UnassignTruckButton';
import { useCreateLoadsTruckView } from '../Details/sections/load-overview/components/load-overview-buttons/components/FilterButton';

const numbersKeys = [
    'Digit1',
    'Digit2',
    'Digit3',
    'Digit4',
    'Digit5',
    'Digit6',
    'Digit7',
    'Digit8',
    'Digit9'
];

function KeyboardListener() {
    const load = useAppSelector(ordersPageSelectedOrderSelector);
    const {
        manifest,
        truckId
    } = useOrderActiveManifest(load);

    const manifestId = manifest?.manifestId || '';
    const manifestFriendlyId = manifest?.friendlyId || '';

    const assignTruck = useAssignTruckToManifestDialog();
    const reassignTruck = useReAssignTruckToManifestDialog();

    const createTruckView = useCreateLoadsTruckView(truckId);
    const unassignTruck = useUnassignTruckFromManifest({ truckId, manifestId });
    const {
        views,
        selectView
    } = useOrdersPageFilters();

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            const target = event.target as HTMLElement;
            if (
                target.tagName === 'INPUT' ||
                target.classList.contains('MuiDialog-container') ||
                event.ctrlKey ||
                event.shiftKey ||
                event.altKey ||
                event.metaKey ||
                event.code === 'F12'
            ) {
                return;
            }

            event.stopPropagation();
            event.preventDefault();

            /**  Assign truck to manifest */
            if (event.code === 'KeyA' && !truckId && manifestId) {
                const activeManifest = load?.manifests.find(
                    (manifest) => manifest.manifestId === load?.activeManifestId
                );

                const stops = activeManifest?.stops || [];
                assignTruck.open({
                    manifestId,
                    loadId                  : load?.loadId || '',
                    manifestFriendlyId,
                    alertAssignTruckFromLoad: true,
                    stops
                });
            }

            /** Reassign truck to manifest */
            if (event.code === 'KeyR' && truckId && manifestId) {
                reassignTruck.open({
                    manifestId,
                    manifestFriendlyId,
                    selectedTruckId         : truckId,
                    loadId                  : load?.loadId || '',
                    alertAssignTruckFromLoad: true
                });
            }

            /** Create truck view */
            if (event.code === 'KeyT' && truckId) {
                createTruckView();
            }

            /** Select view */
            if (numbersKeys.includes(event.code)) {
                const numKey = Number(event.key);
                const view = views[numKey - 1];

                if (view) {
                    selectView(view.view_id);
                }
            }

            /** Unassign truck */
            if (event.code === 'KeyU' && truckId && manifestId) {
                unassignTruck();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [
        assignTruck,
        createTruckView,
        load?.activeManifestId,
        load?.loadId,
        load?.manifests,
        manifestFriendlyId,
        manifestId,
        reassignTruck,
        selectView,
        truckId,
        unassignTruck,
        views
    ]);

    return null;
}

export default memo(KeyboardListener);
