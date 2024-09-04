import React from 'react';
import { Stack } from '@mui/material';
import TrailerControlContent from '@/views/dispatch/manifests/components/controls/TrailerControlContent';
import StopsComponents from '@/@core/ui-kits/loads/load-stop/StopsComponents';
import DriverControlContent from '@/views/dispatch/manifests/components/controls/DriverControlContent';
import TruckControlContent from '@/views/dispatch/manifests/components/controls/TruckControlContent';
import ManifestNoDriver from '@/@core/components/manifest-no-driver/ManifestNoDriver';
import type { ManifestModel_Stop } from '@proto/models/model_manifest';
import { isEqual } from 'lodash';
import AssignTruck from './buttons/AssignTruck';
import UnassignTruckButton from './buttons/UnassignTruckButton';
import ChangeTruckButton from './buttons/ChangeTruckButton';
import FilterButton from './buttons/FilterButton';

type OverviewItemContainerProps = {
    children: React.ReactNode;
};

const OverviewItemContainer = ({ children }: OverviewItemContainerProps) => (
    <>
        <Stack padding="8px 0">{children}</Stack>
        <StopsComponents.Divider />
    </>
);

type Props = {
    truckId: string;
    trailerId: string;
    driverIds: string[];
    manifestId: string;
    manifestFriendlyId?: number | string;
    stops: ManifestModel_Stop[];
    loadId: string;
};

function TrackingLoadOverview({
    driverIds,
    trailerId,
    truckId,
    manifestId,
    manifestFriendlyId,
    stops,
    loadId
}: Props) {
    if (!truckId) {
        return (
            <AssignTruck
                loadId={loadId}
                stops={stops}
                friendlyId={manifestFriendlyId}
                manifestId={manifestId}
            />
        );
    }

    return (
        <Stack>
            <OverviewItemContainer>
                <TruckControlContent truckId={truckId}>
                    <FilterButton truckId={truckId} />
                    <ChangeTruckButton
                        loadId={loadId}
                        manifestId={manifestId}
                        truckId={truckId}
                        manifestFriendlyId={manifestFriendlyId}
                    />
                    <UnassignTruckButton
                        loadId={loadId}
                        manifestId={manifestId}
                    />
                </TruckControlContent>
            </OverviewItemContainer>

            <OverviewItemContainer>
                <TrailerControlContent trailerId={trailerId} />
            </OverviewItemContainer>

            {driverIds.length ? (
                driverIds.map((driverId, index) => (
                    <OverviewItemContainer key={driverId || index}>
                        <DriverControlContent driverIds={[driverId]} />
                    </OverviewItemContainer>
                ))
            ) : (
                <OverviewItemContainer>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <ManifestNoDriver manifestId={manifestId} />
                    </Stack>
                </OverviewItemContainer>
            )}
        </Stack>
    );
}

export default React.memo(TrackingLoadOverview, isEqual);
