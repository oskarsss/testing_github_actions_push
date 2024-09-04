import React from 'react';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Scheduling from '@/store/dispatch/scheduling/types';
import { Divider, Stack } from '@mui/material';
import {
    getPrepareSchedulingStops,
    getPrepareStops
} from '@/@grpcServices/services/manifests-service/utils';
import ManifestTooltipHeader from '@/views/dispatch/scheduling/components/Table/components/loads/renderItems/Manifest/components/manifest-tooltip/ManifestTooltipHeader';
import ManifestTooltipStop from '@/views/dispatch/scheduling/components/Table/components/loads/renderItems/Manifest/components/manifest-tooltip/ManifestTooltipStop';
import { ManifestModel_Status } from '@proto/models/model_manifest';
import ManifestsTypes from '@/store/dispatch/manifests/types';
import { isCompletedLoadStop, isCompletedManifestStop } from '@/utils/load-stops';
import WarningAlert from '@/@core/ui-kits/basic/warning-alert/WarningAlert';
import StopsEmpty from '@/@core/ui-kits/loads/load-stop/StopsEmpty';

type Props = {
    errorSize: boolean;
    manifest: Scheduling.TruckManifestRow['manifests'][0];
};
function MainTooltip({
    manifest,
    errorSize
}: Props) {
    const isMovingStatus = manifest.status === ManifestModel_Status.IN_PROGRESS;
    const prepareStops = getPrepareSchedulingStops(manifest.stops);
    const nextStop = prepareStops.find((stop) => {
        if (stop.originType === ManifestsTypes.OriginType.LOAD) {
            return !isCompletedLoadStop(stop.loadStopStatus);
        }
        return !isCompletedManifestStop(stop.manifestStopStatus);
    });

    return (
        <Stack gap="8px">
            <ManifestTooltipHeader
                manifestFriendlyId={manifest.friendlyId}
                nextStop={isMovingStatus ? nextStop : undefined}
                gross={manifest.gross?.amountFormatted}
                totalMiles={manifest.totalDistance?.milesFormatted}
                rpm={manifest.rpm?.amountFormatted}
                manifestStatus={manifest.status}
                manifestId={manifest.manifestId}
                truckId={manifest.truckId}
            />
            {errorSize && <WarningAlert text="schedule:table.tooltips.manifest.error_size" />}
            <Divider sx={{ margin: 0 }} />
            <Stack>
                {prepareStops.length ? (
                    prepareStops.map((stop) => (
                        <ManifestTooltipStop
                            manifestStatus={manifest.status}
                            truckId={manifest.truckId}
                            key={stop.stopId}
                            stop={stop}
                        />
                    ))
                ) : (
                    <StopsEmpty />
                )}
            </Stack>
        </Stack>
    );
}

type LoadTooltipProps = {
    manifest: Scheduling.TruckManifestRow['manifests'][0];
    errorSize: boolean;
    children: React.ReactHTMLElement<HTMLDivElement> | React.ReactElement;
    className?: string;
};

export default styled(({
    className,
    children,
    manifest,
    errorSize
}: LoadTooltipProps) => (
    <Tooltip
        followCursor
        disableInteractive
        key={manifest.manifestId}
        title={(
            <MainTooltip
                manifest={manifest}
                errorSize={errorSize}
            />
        )}
        classes={{ popper: className }}
    >
        {children}
    </Tooltip>
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        maxWidth       : 'none',
        minWidth       : '630px',
        marginTop      : '30px !important',
        backgroundColor: theme.palette.semantic.foreground.white.tertiary,
        padding        : '12px',
        borderRadius   : '8px',
        boxShadow:
            '0px 12px 16px -4px rgba(16, 24, 40, 0.08), 0px 4px 6px -2px rgba(16, 24, 40, 0.03)'
    }
}));
