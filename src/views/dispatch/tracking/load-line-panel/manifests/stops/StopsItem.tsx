import { ManifestModel_ManifestStop_Type, ManifestModel_Stop } from '@proto/models/model_manifest';
import {
    MANIFEST_STOP_TYPE_COLORS,
    MANIFEST_STOP_TYPE_ICONS
} from '@/@core/theme/entities/manifests/stop-type';
import { ManifestStopTypes } from '@/models/manifests/manifest-stop';
import { LOAD_STOP_TYPE_COLORS, LOAD_STOP_TYPE_ICONS } from '@/@core/theme/entities/load/stop_type';
import { LoadStopTypes } from '@/models/loads/load-stop';
import { isCompletedStop } from '@/utils/load-stops';
import StopsComponents, { LineType } from '@/@core/ui-kits/loads/load-stop/StopsComponents';
import React, { useMemo } from 'react';
import { TableMode } from '@/@core/ui-kits/loads/load-stop/utils';
import { TimelineDot, TimelineItem, TimelineSeparator } from '@mui/lab';
import { Stack, Typography } from '@mui/material';
import StopsIcons from '@/@core/ui-kits/loads/load-stop/StopsIcons';

function StopItem({
    stop,
    isLastStop,
    truckId,
    driverId,
    isActiveStop,
    percentageProgress
}: {
    stop: ManifestModel_Stop;
    isLastStop: boolean;
    truckId: string;
    driverId: string;
    isActiveStop: boolean;
    percentageProgress: number;
}) {
    const color = stop.manifestStopId
        ? MANIFEST_STOP_TYPE_COLORS[ManifestStopTypes[stop.manifestStopType]]
        : LOAD_STOP_TYPE_COLORS[LoadStopTypes[stop.loadStopType]];

    const isCompleted = isCompletedStop(stop);

    const type: LineType = useMemo((): LineType => {
        if (isLastStop) {
            return 'none';
        }
        if (ManifestModel_ManifestStop_Type.START === stop.manifestStopType) {
            return 'start';
        }
        if (isActiveStop) {
            return 'mixed';
        }
        if (isCompleted) {
            return 'completed';
        }
        return 'regular';
    }, [isActiveStop, isCompleted, isLastStop, stop.manifestStopType]);

    return (
        <StopsComponents.Timeline
            color={color}
            tableMode={TableMode.NONE}
        >
            <TimelineItem>
                <TimelineSeparator>
                    <TimelineDot>
                        <Typography
                            fontSize="12px"
                            fontWeight={500}
                            lineHeight={1.5}
                            hidden={!stop.sequence}
                            color={(theme) => theme.palette.semantic.text.white}
                        >
                            {stop.sequence}
                        </Typography>
                        {stop.loadId
                            ? LOAD_STOP_TYPE_ICONS[LoadStopTypes[stop.loadStopType]]
                            : MANIFEST_STOP_TYPE_ICONS[ManifestStopTypes[stop.manifestStopType]]}
                    </TimelineDot>
                    {!isLastStop && (
                        <StopsComponents.TimelineConnector
                            type={type}
                            color={color}
                            percentageProgress={percentageProgress}
                        >
                            {truckId && driverId && isActiveStop && isCompleted && (
                                <Stack
                                    bgcolor={(theme) =>
                                        theme.palette.semantic.foreground.white.primary}
                                    alignItems="center"
                                    justifyContent="center"
                                    height="18px"
                                    width="18px"
                                    position="absolute"
                                    top={`calc(${percentageProgress}% - 16px)`}
                                    left={0}
                                    zIndex={3}
                                    sx={{
                                        transform: 'translateX(-47%)'
                                    }}
                                >
                                    <StopsIcons.ArrowIcon />
                                </Stack>
                            )}
                        </StopsComponents.TimelineConnector>
                    )}
                </TimelineSeparator>
            </TimelineItem>
        </StopsComponents.Timeline>
    );
}

export default StopItem;
