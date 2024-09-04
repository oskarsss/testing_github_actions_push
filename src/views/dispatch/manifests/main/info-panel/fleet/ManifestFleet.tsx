import { Stack, styled } from '@mui/material';
import DriverControl from '@/views/dispatch/manifests/details/sections/equipment/components/DriverControl';
import TruckControl from '@/views/dispatch/manifests/details/sections/equipment/components/TruckControl';
import TrailerControlContent from '@/views/dispatch/manifests/components/controls/TrailerControlContent';
import React from 'react';
import { isEqual } from 'lodash';

const ControlContainer = styled('div')(({ theme }) => ({
    display        : 'flex',
    alignItems     : 'center',
    padding        : '8px 0px',
    borderBottom   : `1px solid ${theme.palette.semantic.border.primary}`,
    '&:first-child': {
        borderTop: `1px solid ${theme.palette.semantic.border.primary}`
    }
}));

type Props = {
    truckId: string;
    manifestId: string;
    trailerId: string;
    driverIds: string[];
    manifestFriendlyId?: number;
};

function ManifestFleet({
    truckId,
    manifestId,
    trailerId,
    driverIds,
    manifestFriendlyId
}: Props) {
    return (
        <Stack direction="column">
            <ControlContainer>
                <TruckControl
                    showFilterButton
                    truckId={truckId}
                    manifestId={manifestId}
                    manifestFriendlyId={manifestFriendlyId}
                />
            </ControlContainer>

            <ControlContainer>
                <TrailerControlContent trailerId={trailerId} />
            </ControlContainer>

            <ControlContainer>
                <DriverControl
                    manifestId={manifestId}
                    driverIds={driverIds}
                />
            </ControlContainer>
        </Stack>
    );
}

export default React.memo(ManifestFleet, isEqual);
