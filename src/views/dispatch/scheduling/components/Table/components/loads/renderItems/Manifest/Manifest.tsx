import React, { memo } from 'react';
import moment from 'moment-timezone';
import Scheduling from '@/store/dispatch/scheduling/types';
import { LOAD_WIDTH_SIZE } from '@/views/dispatch/scheduling/components/Table/components/loads/renderItems/contants';
import ManifestComponents from '@/views/dispatch/scheduling/components/Table/components/loads/renderItems/Manifest/ManifestComponents';
import { Stack } from '@mui/material';
import LoadTooltip from '@/views/dispatch/scheduling/components/Table/components/loads/renderItems/Manifest/components/manifest-tooltip/ManifestTooltip';
import { useManifestTruckRoute } from '@/store/streams/events/hooks';
import ManifestStatusAssignedChips from '@/views/dispatch/scheduling/components/Table/components/loads/renderItems/Manifest/components/chips/ManifestStatusAssignedChips';
import ManifestStatusInProgressChips from '@/views/dispatch/scheduling/components/Table/components/loads/renderItems/Manifest/components/chips/ManifestStatusInProgressChips';
import { AppPalette } from '@/@core/theme/palette';
import {
    getPrepareSchedulingStops,
    getPrepareStops,
    isCompletedManifest
} from '@/@grpcServices/services/manifests-service/utils';
import { ManifestModel_Manifest, ManifestModel_Status } from '@proto/models/model_manifest';
import { isCompletedLoadStop, isCompletedManifestStop } from '@/utils/load-stops';
import { PositionType } from '../../../../types';

type Props = {
    manifest?: ManifestModel_Manifest;
    width: number;
    position: PositionType;
    diffMinutes: number;
    overWidth?: boolean;
    openDetails: (manifest: ManifestModel_Manifest) => void;
};

const Manifest = ({
    manifest,
    width,
    position,
    diffMinutes,
    overWidth,
    openDetails
}: Props) => {
    const truckId = manifest?.truckId || '';
    const truck_route = useManifestTruckRoute(truckId);

    if (!manifest) return null;

    const prepareStops = getPrepareSchedulingStops(manifest.stops);

    const firstStop = prepareStops[0];
    const lastStop = prepareStops[prepareStops.length - 1];
    const manifestIsCompleted = isCompletedManifest(manifest.status);
    const errorSize = diffMinutes <= 60;
    const outsidePosition = position.right || Number(position.left) < 0;

    const activeStop = prepareStops.find((stop) => {
        if (stop.loadStopId) {
            return isCompletedLoadStop(stop.loadStopStatus);
        }
        if (stop.manifestStopId) {
            return isCompletedManifestStop(stop.manifestStopStatus);
        }
        return false;
    });

    const activeStopId = activeStop?.loadStopId || activeStop?.manifestStopId;
    const lastStopEta = truck_route?.find((stop) => stop.localeStopId === lastStop.stopId);
    const activeStopEta = truck_route?.find(
        (stop) => stop.localeStopId === (activeStopId || lastStop.stopId || '')
    );

    const getTime = (date: string) => {
        let format = 'HH:mm';

        if ((outsidePosition || overWidth) && width >= LOAD_WIDTH_SIZE.extraSmall + 40) {
            format = 'DD MMM HH:mm';
        }
        return moment(date).format(format);
    };

    // const isBadGpc =
    //     'timestamp' in fleetLocation
    //         ? moment().diff(moment(fleetLocation.timestamp), 'days') > 1
    //         : true;

    const getColorLastStopTime = (palette: AppPalette) => {
        if (![ManifestModel_Status.IN_PROGRESS].includes(manifest.status)) return undefined;
        if (!lastStopEta) return undefined;
        const isLate = lastStopEta.lateness > 0 || lastStopEta.earliness === 0;
        const isEarly = lastStopEta.earliness > 0;
        if (!isLate && !isEarly) return undefined;
        return isLate ? palette.utility.text.error : palette.utility.text.success;
    };

    return (
        <LoadTooltip
            manifest={manifest}
            errorSize={errorSize}
            key={manifest.manifestId}
        >
            <ManifestComponents.Container
                widthLoad={width}
                status={manifest.status}
                position={position}
                errorSize={errorSize}
                overWidth={overWidth}
                onClick={() => openDetails(manifest)}
            >
                {/* --------------- FIRST STOP --------------- */}
                <ManifestComponents.StopContainer loadWidth={width}>
                    <ManifestComponents.StopLocation
                        loadWidth={width}
                        isFirstStop
                    >
                        {width >= LOAD_WIDTH_SIZE.small && (
                            <>
                                <ManifestComponents.StopLocationCity>
                                    {firstStop.location?.city}
                                </ManifestComponents.StopLocationCity>
                                ,&nbsp;
                            </>
                        )}
                        <ManifestComponents.StopLocationState>
                            {firstStop.location?.state}
                        </ManifestComponents.StopLocationState>
                    </ManifestComponents.StopLocation>
                    <ManifestComponents.StopTime
                        textAlign="left"
                        hidden={width <= LOAD_WIDTH_SIZE.extraSmall}
                    >
                        {getTime(
                            manifestIsCompleted && firstStop.checkedInAt
                                ? firstStop.checkedInAt
                                : firstStop.appointmentStartAtLocal
                        )}
                    </ManifestComponents.StopTime>
                </ManifestComponents.StopContainer>

                {/* --------------- INFO LOAD --------------- */}
                {width >= LOAD_WIDTH_SIZE.large && (
                    <Stack
                        flexDirection="row"
                        alignItems="center"
                        flexWrap="wrap"
                        justifyContent="center"
                        overflow="hidden"
                        gap="4px"
                        flex="1 1 0"
                    >
                        {manifest.status === ManifestModel_Status.ASSIGNED &&
                            manifest.totalDistance && (
                            <ManifestStatusAssignedChips
                                totalMiles={manifest.totalDistance.miles}
                                appointmentAt={firstStop.appointmentStartAtLocal}
                            />
                        )}

                        {manifest.status === ManifestModel_Status.IN_PROGRESS && activeStopEta && (
                            <ManifestStatusInProgressChips stop={activeStopEta} />
                        )}
                    </Stack>
                )}

                {/* --------------- LAST STOP --------------- */}
                <ManifestComponents.StopContainer loadWidth={width}>
                    <ManifestComponents.StopLocation loadWidth={width}>
                        {width >= LOAD_WIDTH_SIZE.small && (
                            <>
                                <ManifestComponents.StopLocationCity>
                                    {lastStop.location?.city}
                                </ManifestComponents.StopLocationCity>
                                ,&nbsp;
                            </>
                        )}
                        <ManifestComponents.StopLocationState>
                            {lastStop.location?.state}
                        </ManifestComponents.StopLocationState>
                    </ManifestComponents.StopLocation>
                    <ManifestComponents.StopTime
                        textAlign="right"
                        sx={{
                            color: (theme) => getColorLastStopTime(theme.palette)
                        }}
                        hidden={width <= LOAD_WIDTH_SIZE.extraSmall}
                    >
                        {getTime(
                            manifestIsCompleted && lastStop.checkedInAt
                                ? lastStop.checkedInAt
                                : lastStop.appointmentEndAtLocal || lastStop.appointmentStartAtLocal
                        )}
                    </ManifestComponents.StopTime>
                </ManifestComponents.StopContainer>
            </ManifestComponents.Container>
        </LoadTooltip>
    );
};

export default memo(Manifest);
