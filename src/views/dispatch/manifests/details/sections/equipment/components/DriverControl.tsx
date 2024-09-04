import DriverControlContent from '@/views/dispatch/manifests/components/controls/DriverControlContent';
import ManifestNoDriver from '@/@core/components/manifest-no-driver/ManifestNoDriver';
import RouteButton from '@/@core/components/route-button/RouteButton';
import ControlsStyled from '@/views/dispatch/manifests/components/controls/styled';
import React from 'react';

type Props = {
    driverIds: string[];
    manifestId: string;
    showRouteButton?: boolean;
};

function DriverControl({
    driverIds,
    manifestId,
    showRouteButton = false
}: Props) {
    if (!driverIds.length) {
        return (
            <ControlsStyled.Container>
                <ManifestNoDriver manifestId={manifestId} />
            </ControlsStyled.Container>
        );
    }

    return (
        <DriverControlContent driverIds={driverIds}>
            {showRouteButton && <RouteButton path={`/drivers/${driverIds[0]}`} />}
        </DriverControlContent>
    );
}

export default React.memo(DriverControl);
