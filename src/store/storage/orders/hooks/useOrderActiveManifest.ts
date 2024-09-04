import { LoadData_Load } from '@proto/loads';
import { useMemo } from 'react';

const useOrderActiveManifest = (order?: LoadData_Load | null) =>
    useMemo(() => {
        const activeManifest = order?.manifests?.find(
            (manifest) => manifest.manifestId === order.activeManifestId
        );

        const truckId = activeManifest?.truckId || '';
        const trailerId = activeManifest?.trailerId || '';
        const driverIds = activeManifest?.driverIds || [];
        const driverId =
            activeManifest?.driverIds?.find((id) => id === activeManifest?.primaryDriverId) || '';

        return {
            manifest: activeManifest,
            truckId,
            trailerId,
            driverId,
            driverIds
        };
    }, [order?.manifests, order?.activeManifestId]);

export default useOrderActiveManifest;
