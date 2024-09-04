import { useAssignTruckToManifestDialog } from '@/@core/components/assign/modals/AssignTruckToManifest';
import { useReAssignTruckToManifestDialog } from '@/@core/components/assign/modals/ReAssignTruckToManifest';
import { memo, useEffect } from 'react';
import { useCreateTruckManifestView } from '@/views/dispatch/manifests/details/sections/equipment/components/FilterByTruckButton';
import { useAppSelector } from '@/store/hooks';
import { useManifestsFilters } from '@/store/dispatch/manifests/hooks';
import { selectSelectedManifest } from '@/store/dispatch/manifests/selectors';
import { useUnassignTruckFromManifest } from '../details/sections/equipment/components/UnassignTruckButton';

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
    const manifest = useAppSelector(selectSelectedManifest);

    const manifestId = manifest?.manifestId || '';
    const manifestFriendlyId = manifest?.friendlyId?.toString() || '';
    const truckId = manifest?.truckId || '';

    const assignTruck = useAssignTruckToManifestDialog();
    const reassignTruck = useReAssignTruckToManifestDialog();
    const createTruckView = useCreateTruckManifestView(truckId);
    const unassignTruck = useUnassignTruckFromManifest({ truckId, manifestId });
    const {
        views,
        selectView
    } = useManifestsFilters();

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
                assignTruck.open({ manifestId, manifestFriendlyId, stops: manifest?.stops || [] });
            }

            /** Reassign truck to manifest */
            if (event.code === 'KeyR' && truckId && manifestId) {
                reassignTruck.open({ manifestId, manifestFriendlyId, selectedTruckId: truckId });
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

        window.document.addEventListener('keydown', handleKeyDown);

        return () => {
            window.document.removeEventListener('keydown', handleKeyDown);
        };
    }, [
        assignTruck,
        createTruckView,
        manifest?.stops,
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
