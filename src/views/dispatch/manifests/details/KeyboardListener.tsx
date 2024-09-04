import React, { useEffect } from 'react';
import { useReAssignTruckToManifestDialog } from '@/@core/components/assign/modals/ReAssignTruckToManifest';
import { useAssignTruckToManifestDialog } from '@/@core/components/assign/modals/AssignTruckToManifest';
import { selectSelectedManifest } from '@/store/dispatch/manifests/selectors';
import { useAppSelector } from '@/store/hooks';
import { useUnassignTruckFromManifest } from './sections/equipment/components/UnassignTruckButton';

function KeyboardListener() {
    const manifest = useAppSelector(selectSelectedManifest);

    const unassignTruck = useUnassignTruckFromManifest({
        manifestId: manifest?.manifestId || '',
        truckId   : manifest?.truckId || ''
    });
    const assignTruck = useAssignTruckToManifestDialog();
    const reassignTruck = useReAssignTruckToManifestDialog();
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
            if (event.code === 'KeyA' && manifest && !manifest.truckId) {
                assignTruck.open({
                    manifestId        : manifest.manifestId,
                    manifestFriendlyId: manifest.friendlyId,
                    stops             : manifest.stops || []
                });
            }

            /** Reassign truck to manifest */
            if (event.code === 'KeyR' && manifest && manifest.truckId) {
                reassignTruck.open({
                    manifestId        : manifest.manifestId,
                    manifestFriendlyId: manifest.friendlyId,
                    selectedTruckId   : manifest.truckId
                });
            }

            /** Unassign truck */
            if (event.code === 'KeyU' && manifest && manifest.truckId) {
                unassignTruck();
            }
        };

        window.document.addEventListener('keydown', handleKeyDown);

        return () => {
            window.document.removeEventListener('keydown', handleKeyDown);
        };
    }, [assignTruck, manifest, reassignTruck, unassignTruck]);

    return null;
}

export default React.memo(KeyboardListener);
