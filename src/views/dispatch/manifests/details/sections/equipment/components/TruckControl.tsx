import TruckControlContent from '@/views/dispatch/manifests/components/controls/TruckControlContent';
import RouteButton from '@/@core/components/route-button/RouteButton';
import { UnassignTruckButton } from '@/views/dispatch/manifests/details/sections/equipment/components/UnassignTruckButton';
import ReassignTruckButton from '@/views/dispatch/manifests/details/sections/equipment/components/ReassignTruckButton';
import FilterByTruckButton from '@/views/dispatch/manifests/details/sections/equipment/components/FilterByTruckButton';
import React from 'react';

type Props = {
    truckId: string;
    manifestId: string;
    manifestFriendlyId?: number | string;
    showRouteButton?: boolean;
    kind?: 'text' | 'common';
    showFilterButton?: boolean;
};

function TruckControl({
    manifestFriendlyId,
    manifestId,
    truckId,
    showRouteButton = false,
    showFilterButton = false,
    kind = 'common'
}: Props) {
    return (
        <TruckControlContent truckId={truckId}>
            {showRouteButton && <RouteButton path={`/trucks/${truckId}`} />}

            {showFilterButton && <FilterByTruckButton truckId={truckId} />}

            <ReassignTruckButton
                manifestId={manifestId}
                manifestFriendlyId={manifestFriendlyId}
                truckId={truckId}
                kind={kind}
            />

            <UnassignTruckButton
                manifestId={manifestId}
                truckId={truckId}
                kind={kind}
            />
        </TruckControlContent>
    );
}

export default React.memo(TruckControl);
