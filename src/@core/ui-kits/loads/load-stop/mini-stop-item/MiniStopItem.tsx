import ManifestsTypes from '@/store/dispatch/manifests/types';
import React, { useCallback, useMemo } from 'react';
import MiniStopItemHeader from '@/@core/ui-kits/loads/load-stop/mini-stop-item/MiniStopItemHeader';
import { Box, Stack, Typography } from '@mui/material';
import StopItemTime from '@/@core/ui-kits/loads/load-stop-time/StopItemTime';
import MiniStopItemInfo from '@/@core/ui-kits/loads/load-stop/mini-stop-item/MiniStopItemInfo';
import MiniStopItemLocation from '@/@core/ui-kits/loads/load-stop/mini-stop-item/MiniStopItemLocation';
import StopItemDistance from '@/@core/ui-kits/loads/load-stop/StopItemDistance';
import { DraggableProvided } from 'react-beautiful-dnd';
import { TakeOutStop } from '@/views/dispatch/manifests/modals/take-out';
import { TableMode } from '@/@core/ui-kits/loads/load-stop/utils';
import { useStopItemContextMenu } from '@/views/dispatch/manifests/modals/stop-item-context';
import {
    MANIFEST_STOP_TYPE_COLORS,
    MANIFEST_STOP_TYPE_ICONS
} from '@/@core/theme/entities/manifests/stop-type';
import { ManifestStopTypes } from '@/models/manifests/manifest-stop';
import VectorIcons from '@/@core/icons/vector_icons';
import Checkbox from '@/@core/ui-kits/basic/checkbox/Checkbox';
import { TimelineContent, TimelineDot, TimelineItem, TimelineSeparator } from '@mui/lab';
import StopsComponents, { LineType } from '@/@core/ui-kits/loads/load-stop/StopsComponents';
import { ManifestModel_ManifestStop_Type } from '@proto/models/model_manifest';
import { isCompletedStop } from '@/utils/load-stops';
import { LOAD_STOP_TYPE_COLORS, LOAD_STOP_TYPE_ICONS } from '@/@core/theme/entities/load/stop_type';
import { LoadStopTypes } from '@/models/loads/load-stop';
import StopsIcons from '@/@core/ui-kits/loads/load-stop/StopsIcons';

type Props = {
    stop: ManifestsTypes.AnyPreparedStop;
    driverId: string;
    truckId: string;
    loadId?: string;
    provided: DraggableProvided;
    onChangeSelectedStops: (stop: ManifestsTypes.AnyPreparedStop) => void;
    selectedStops: TakeOutStop[];
    tableMode: TableMode;
    selectedStopId: string | null;
    selectStop: (stopId: string | null) => void;
    isLastStop: boolean;
    manifestId: string;
    mainLoadId?: string;
    isActiveStop: boolean;
    percentageProgress: number;
    isManifestPage?: boolean;
};

function MiniStopItem({
    stop,
    driverId,
    truckId,
    loadId,
    provided,
    onChangeSelectedStops,
    selectedStops,
    tableMode,
    selectStop,
    selectedStopId,
    isLastStop,
    manifestId,
    mainLoadId,
    isActiveStop,
    percentageProgress,
    isManifestPage = false
}: Props) {
    const checked = selectedStops.some((selectedStop) => selectedStop.id === stop.stopId);
    const contextMenu = useStopItemContextMenu();

    const handleContextMenu = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        contextMenu.open({
            stop,
            selectedStopId,
            selectStop,
            manifestId
        })(event);
    };

    const handleSelectStop = useCallback(() => {
        if (selectedStopId === stop.stopId) {
            selectStop(null);
        } else {
            selectStop(stop.stopId);
        }
    }, [selectedStopId, stop.stopId, selectStop]);

    const onClickContainer = () => {
        if (tableMode === TableMode.NONE) {
            handleSelectStop();
        }
    };
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

    const color = stop.manifestStopId
        ? MANIFEST_STOP_TYPE_COLORS[ManifestStopTypes[stop.manifestStopType]]
        : LOAD_STOP_TYPE_COLORS[LoadStopTypes[stop.loadStopType]];

    const isShortStop = [
        ManifestModel_ManifestStop_Type.START,
        ManifestModel_ManifestStop_Type.END
    ].includes(stop.manifestStopType);

    const otherStop = mainLoadId && stop.loadId ? stop.loadId !== mainLoadId : false;

    return (
        <StopsComponents.Timeline
            {...provided.draggableProps}
            ref={provided.innerRef}
            color={color}
            tableMode={tableMode}
            onClick={onClickContainer}
            selected={selectedStopId === stop.stopId}
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
                <TimelineContent onContextMenu={handleContextMenu}>
                    <MiniStopItemHeader
                        manifestId={manifestId}
                        selectStop={selectStop}
                        isSystemStop={isShortStop}
                        selectedStopId={selectedStopId}
                        stop={stop}
                        loadId={loadId}
                    />
                    <Stack
                        overflow="hidden"
                        display={isShortStop ? 'none' : 'flex'}
                    >
                        <Stack
                            flexDirection="row"
                            alignItems="stretch"
                            overflow="hidden"
                            borderRadius={!stop.location ? '4px 4px 0px 0px' : '4px'}
                            border={(theme) => `1px solid ${theme.palette.semantic.border.primary}`}
                        >
                            <Stack
                                width="150px"
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
                            <MiniStopItemInfo stop={stop} />
                        </Stack>
                        <MiniStopItemLocation
                            locationName={stop.location?.name}
                            locationAddress={stop.location?.address}
                            locationLat={stop.location?.lat}
                            locationLon={stop.location?.lon}
                            selectStop={handleSelectStop}
                            loadId={stop.loadId}
                            loadFriendlyId={stop.loadFriendlyId}
                            isManifestPage={isManifestPage}
                            otherStop={otherStop}
                        />
                    </Stack>
                    <StopItemDistance distance={stop.distanceToNextStop} />
                </TimelineContent>
            </TimelineItem>
        </StopsComponents.Timeline>
    );
}

export default React.memo(MiniStopItem);
