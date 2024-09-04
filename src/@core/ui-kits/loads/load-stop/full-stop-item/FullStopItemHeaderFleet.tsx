import { ManifestModel_Manifest } from '@proto/models/model_manifest';
import DriverBadge from '@/@core/ui-kits/loads/fleet-badges/DriverBadge';
import TruckBadge from '@/@core/ui-kits/loads/fleet-badges/TruckBadge';
import TrailerBadge from '@/@core/ui-kits/loads/fleet-badges/TrailerBadge';
import LoadManifestAssignTruck from '@/@core/ui-kits/loads/load-stop/LoadManifestAssignTruck';
import StopsComponents from '@/@core/ui-kits/loads/load-stop/StopsComponents';

type Props = {
    manifest: ManifestModel_Manifest;
    loadId?: string;
};

export default function FullStopItemHeaderFleet({
    manifest,
    loadId = ''
}: Props) {
    if (!manifest.truckId) {
        return (
            <LoadManifestAssignTruck
                stops={manifest.stops || []}
                manifestId={manifest.manifestId}
                manifestFriendlyId={manifest.friendlyId.toString()}
                loadId={loadId}
            />
        );
    }

    return (
        <StopsComponents.StopItemRowWrapper>
            <DriverBadge driverId={manifest.primaryDriverId || manifest.driverIds[0]} />
            <TruckBadge truckId={manifest.truckId} />
            <TrailerBadge trailerId={manifest.trailerId} />
        </StopsComponents.StopItemRowWrapper>
    );
}
