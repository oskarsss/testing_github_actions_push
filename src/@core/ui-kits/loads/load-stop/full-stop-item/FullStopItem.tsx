/* eslint-disable max-len */

import { Stack, Typography } from '@mui/material';
import StopItemTime from '@/@core/ui-kits/loads/load-stop-time/StopItemTime';
import FullStopItemInfo from '@/@core/ui-kits/loads/load-stop/full-stop-item/FullStopItemInfo';
import FullStopItemNote from '@/@core/ui-kits/loads/load-stop/full-stop-item/FullStopItemNote';
import StopItemDistance from '@/@core/ui-kits/loads/load-stop/StopItemDistance';
import React, { useMemo } from 'react';
import ManifestsTypes from '@/store/dispatch/manifests/types';
import { TakeOutStop } from '@/views/dispatch/manifests/modals/take-out';
import { DraggableProvided } from 'react-beautiful-dnd';
import { TableMode } from '@/@core/ui-kits/loads/load-stop/utils';
import { TimelineContent, TimelineDot, TimelineItem, TimelineSeparator } from '@mui/lab';
import {
    MANIFEST_STOP_TYPE_COLORS,
    MANIFEST_STOP_TYPE_ICONS
} from '@/@core/theme/entities/manifests/stop-type';
import { ManifestStopTypes } from '@/models/manifests/manifest-stop';
import VectorIcons from '@/@core/icons/vector_icons';
import Checkbox from '@/@core/ui-kits/basic/checkbox/Checkbox';
import FullStopItemHeader from '@/@core/ui-kits/loads/load-stop/full-stop-item/FullStopItemHeader';
import StopsComponents, { LineType } from '@/@core/ui-kits/loads/load-stop/StopsComponents';
import { ManifestModel_ManifestStop_Type } from '@proto/models/model_manifest';
import { isCompletedStop } from '@/utils/load-stops';
import { LOAD_STOP_TYPE_COLORS, LOAD_STOP_TYPE_ICONS } from '@/@core/theme/entities/load/stop_type';
import { LoadStopTypes } from '@/models/loads/load-stop';
import StopsIcons from '@/@core/ui-kits/loads/load-stop/StopsIcons';

type Props = {
    mainLoadId?: string;
    manifestId: string;
    tableMode: TableMode;
    selectedStops: TakeOutStop[];
    driverId: string;
    truckId: string;
    stop: ManifestsTypes.AnyPreparedStop;
    provided: DraggableProvided;
    onChangeSelectedStops: (stop: ManifestsTypes.AnyPreparedStop) => void;
    setSelectedStopId?: (stopId: string) => void;
    isLastStop: boolean;
    selected: boolean;
    isActiveStop: boolean;
    percentageProgress: number;
    isManifestPage?: boolean;
};

function FullStopItem({
    mainLoadId,
    manifestId,
    tableMode,
    selectedStops,
    driverId,
    truckId,
    stop,
    provided,
    onChangeSelectedStops,
    setSelectedStopId,
    isLastStop,
    selected,
    isActiveStop,
    percentageProgress,
    isManifestPage = false
}: Props) {
    const color =
        stop.originType === ManifestsTypes.OriginType.MANIFEST
            ? MANIFEST_STOP_TYPE_COLORS[ManifestStopTypes[stop.manifestStopType]]
            : LOAD_STOP_TYPE_COLORS[LoadStopTypes[stop.loadStopType]];

    const checked = selectedStops.some((selectedStop) => selectedStop.id === stop.stopId);
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

    const isShortStop = [
        ManifestModel_ManifestStop_Type.START,
        ManifestModel_ManifestStop_Type.END
    ].includes(stop.manifestStopType);

    return (
        <StopsComponents.Timeline
            {...provided.draggableProps}
            ref={provided.innerRef}
            color={color}
            tableMode={tableMode}
            onClick={() => setSelectedStopId?.(stop.stopId)}
            selected={selected}
        >
            <TimelineItem>
                <TimelineSeparator>
                    <TimelineDot {...provided.dragHandleProps}>
                        {tableMode === TableMode.EDIT_ROUTE && <VectorIcons.DragAndDropIcon />}

                        {tableMode === TableMode.TAKE_ROUTE && (
                            <Checkbox
                                onChange={() => onChangeSelectedStops(stop)}
                                checked={checked}
                                size="small"
                            />
                        )}

                        {tableMode === TableMode.NONE && (
                            <>
                                <Typography
                                    fontSize="12px"
                                    fontWeight={500}
                                    lineHeight={1.5}
                                    color={(theme) => theme.palette.semantic.text.white}
                                >
                                    {stop.sequence || ''}
                                </Typography>
                                {stop.originType === ManifestsTypes.OriginType.LOAD
                                    ? LOAD_STOP_TYPE_ICONS[LoadStopTypes[stop.loadStopType]]
                                    : MANIFEST_STOP_TYPE_ICONS[
                                        ManifestStopTypes[stop.manifestStopType]
                                    ]}
                            </>
                        )}
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
                <TimelineContent>
                    <FullStopItemHeader
                        manifestId={manifestId}
                        isShortStop={isShortStop}
                        stop={stop}
                    />
                    <Stack
                        overflow="hidden"
                        display={isShortStop ? 'none' : 'flex'}
                    >
                        <Stack
                            flexDirection="row"
                            alignItems="stretch"
                            overflow="hidden"
                            borderRadius={stop.note ? '4px 4px 0px 0px' : '4px'}
                            border={(theme) => `1px solid ${theme.palette.semantic.border.primary}`}
                        >
                            <Stack
                                width="180px"
                                flexShrink={0}
                                justifyContent="space-between"
                                sx={{
                                    'hr:last-child': {
                                        display: 'none'
                                    }
                                }}
                            >
                                <StopItemTime
                                    manifestId={manifestId}
                                    stop={stop}
                                    driverId={driverId}
                                    truckId={truckId}
                                />
                            </Stack>
                            <FullStopItemInfo
                                mainLoadId={mainLoadId}
                                stop={stop}
                                isManifestPage={isManifestPage}
                            />
                        </Stack>

                        <FullStopItemNote
                            manifestId={manifestId}
                            stop={stop}
                        />
                    </Stack>
                    <StopItemDistance distance={stop.distanceToNextStop} />
                </TimelineContent>
            </TimelineItem>
        </StopsComponents.Timeline>
    );
}

export default React.memo(FullStopItem);
