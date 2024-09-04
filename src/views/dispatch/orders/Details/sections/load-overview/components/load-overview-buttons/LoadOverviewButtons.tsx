import LoadOverviewStyled from '@/views/dispatch/orders/Details/sections/load-overview/LoadOverview.styled';
import UnassignTruckButton from '@/views/dispatch/orders/Details/sections/load-overview/components/load-overview-buttons/components/UnassignTruckButton';
import React from 'react';
import ChangeTruckButton from '@/views/dispatch/orders/Details/sections/load-overview/components/load-overview-buttons/components/ChangeTruckButton';
import FilterButton from '@/views/dispatch/orders/Details/sections/load-overview/components/load-overview-buttons/components/FilterButton';
import { useTruckById } from '@/store/storage/trucks/hooks/common';

type Props = {
    truckId: string;
    activeManifestId: string;
    activeManifestFriendlyId: string;
    loadId: string;
};

function LoadOverviewButtons({
    truckId,
    activeManifestFriendlyId,
    activeManifestId,
    loadId
}: Props) {
    const truckReferenceId = useTruckById(truckId)?.referenceId;

    return (
        <LoadOverviewStyled.Item.Container sx={{ flexShrink: 0, maxWidth: 'fit-content' }}>
            <FilterButton truckId={truckId} />
            <ChangeTruckButton
                loadId={loadId}
                manifestId={activeManifestId}
                truckId={truckId}
                manifestFriendlyId={activeManifestFriendlyId}
            />
            <UnassignTruckButton
                loadId={loadId}
                truck_reference_id={truckReferenceId}
                manifestId={activeManifestId}
            />
        </LoadOverviewStyled.Item.Container>
    );
}

export default React.memo(LoadOverviewButtons);
