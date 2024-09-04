import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Collapse, Stack } from '@mui/material';
import { ManifestModel_Manifest } from '@proto/models/model_manifest';
import { getPrepareStops } from '@/@grpcServices/services/manifests-service/utils';
import StopsEmpty from '@/@core/ui-kits/loads/load-stop/StopsEmpty';
import MiniStopItem from '@/@core/ui-kits/loads/load-stop/mini-stop-item/MiniStopItem';
import { reorderStops, TableMode } from '@/@core/ui-kits/loads/load-stop/utils';
import { TakeOutStop } from '@/views/dispatch/manifests/modals/take-out';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import ManifestsTypes from '@/store/dispatch/manifests/types';
import WarningAlert from '@/@core/ui-kits/basic/warning-alert/WarningAlert';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { TrackingActions } from '@/store/dispatch/tracking/slice';
import { isCompletedStop } from '@/utils/load-stops';
import moment from 'moment-timezone';
import ManifestsSubHeader from '@/@core/ui-kits/loads/load-stop/manifest-header/ManifestsSubHeader';
import LoadManifestsHeader from '@/@core/ui-kits/loads/load-stop/manifest-header/ManifestsStopHeader';
import findLastIndex from '@/utils/find-last-index';

type Props = {
    manifest: ManifestModel_Manifest;
    loadId: string;
    onResetFilter: () => void;
};

function TrackingLoadManifestItem({
    manifest,
    loadId,
    onResetFilter
}: Props) {
    const [tableMode, setTableModeState] = useState<TableMode>(TableMode.NONE);
    const selectedStopId = useAppSelector((state) => state.tracking.map.selectedStopId);

    const dispatch = useAppDispatch();
    const [preparedStops, setPreparedStops] = useState(getPrepareStops(manifest.stops));
    const [selectedStops, setSelectedStops] = useState<TakeOutStop[]>([]);

    const setTableMode = useCallback(
        (mode: TableMode) => {
            if (mode !== TableMode.NONE) {
                onResetFilter();
            }
            setTableModeState(mode);
        },
        [onResetFilter]
    );

    const selectStop = useCallback(
        (stopId: string | null) => {
            dispatch(TrackingActions.SetSelectedStopId(stopId));
        },
        [dispatch]
    );

    const isEqualStopsSequence = useMemo(
        () =>
            JSON.stringify(preparedStops) === JSON.stringify(getPrepareStops(manifest.stops || [])),
        [preparedStops, manifest.stops]
    );

    useEffect(() => {
        if (
            JSON.stringify(preparedStops) !== JSON.stringify(getPrepareStops(manifest.stops || []))
        ) {
            setPreparedStops(getPrepareStops(manifest.stops || []));
        }
    }, [manifest.stops]);

    const cancelEditRoute = () => {
        setPreparedStops(getPrepareStops(manifest.stops || []));
        setTableMode(TableMode.NONE);
    };

    const onDragEnd = (result: DropResult) => {
        if (result.destination) {
            const reorderedStops = reorderStops(
                preparedStops,
                result.source.index,
                result.destination.index
            );
            setPreparedStops(reorderedStops);
        }
    };

    const onChangeSelectedStops = useCallback(
        (stop: ManifestsTypes.AnyPreparedStop) => {
            setSelectedStops((prevState) =>
                prevState.find((s) => s.id === stop.stopId)
                    ? prevState.filter((s) => s.id !== stop.stopId)
                    : [
                        ...prevState,
                        {
                            id    : stop.stopId,
                            loadId: stop.loadId,
                            type  : stop.originType
                        }
                    ]);
        },
        [setSelectedStops]
    );

    const lastStop = preparedStops[preparedStops.length - 1];
    const activeStopIdx = findLastIndex(preparedStops, isCompletedStop);

    const percentageProgress = () => {
        if (activeStopIdx === -1) return 0;

        const activeStop = preparedStops[activeStopIdx];
        const nextStop = preparedStops[activeStopIdx + 1];
        if (!nextStop) return 100;

        const startAt = moment.utc(activeStop.appointmentStartAtLocal);
        const endAt = moment.utc(nextStop.appointmentStartAtLocal);

        const now = moment.utc();

        if (now.isBefore(startAt)) return 0;
        if (now.isAfter(endAt)) return 100;

        const totalDuration = endAt.diff(startAt);
        const elapsedDuration = now.diff(startAt);

        return (elapsedDuration / totalDuration) * 100;
    };

    return (
        <Stack gap="6px">
            <Stack
                position="sticky"
                width="100%"
                top={0}
                zIndex={100}
                padding="4px 0px"
                overflow="hidden"
                sx={{
                    backgroundColor: (theme) => theme.palette.semantic.background.white
                }}
            >
                <LoadManifestsHeader
                    size="small"
                    manifest={manifest}
                    tableMode={tableMode}
                    setTableMode={setTableMode}
                    lastStopSequence={lastStop?.sequence}
                    lastStopAppointmentEnd={
                        lastStop?.appointmentEndAtLocal || lastStop?.appointmentStartAtLocal
                    }
                />
                <ManifestsSubHeader
                    manifestId={manifest.manifestId}
                    tableMode={tableMode}
                    setTableMode={setTableMode}
                    selectedStops={selectedStops}
                    preparedStops={preparedStops}
                    setSelectedStops={setSelectedStops}
                    isEqualStopsSequence={isEqualStopsSequence}
                    cancelEditRoute={cancelEditRoute}
                    truckId={manifest.truckId}
                    trailerId={manifest.trailerId}
                    driverIds={manifest.driverIds}
                    manifestFriendlyId={manifest.friendlyId}
                    stops={manifest.stops}
                    loadId={loadId}
                />
            </Stack>

            <Collapse
                in={tableMode === TableMode.EDIT_ROUTE && !isEqualStopsSequence}
                sx={{ flexShrink: 0 }}
            >
                <WarningAlert text="common:warnings.change_route" />
            </Collapse>

            {preparedStops.length ? (
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="manifest-stops">
                        {(droppableProvided) => (
                            <Stack
                                ref={droppableProvided.innerRef}
                                {...droppableProvided.droppableProps}
                                sx={{ marginX: '-16px' }}
                            >
                                {preparedStops.map((stop, ind) => (
                                    <Draggable
                                        key={stop.stopId}
                                        draggableId={stop.stopId}
                                        index={ind}
                                        isDragDisabled={tableMode !== TableMode.EDIT_ROUTE}
                                    >
                                        {(provided) => (
                                            <MiniStopItem
                                                percentageProgress={percentageProgress()}
                                                isActiveStop={activeStopIdx === ind}
                                                manifestId={manifest.manifestId}
                                                selectStop={selectStop}
                                                selectedStopId={selectedStopId}
                                                key={stop.stopId}
                                                stop={stop}
                                                driverId={manifest.primaryDriverId || ''}
                                                truckId={manifest.truckId}
                                                onChangeSelectedStops={onChangeSelectedStops}
                                                selectedStops={selectedStops}
                                                provided={provided}
                                                tableMode={tableMode}
                                                loadId={loadId}
                                                isLastStop={ind === preparedStops.length - 1}
                                                mainLoadId={loadId}
                                            />
                                        )}
                                    </Draggable>
                                ))}
                                {droppableProvided.placeholder}
                            </Stack>
                        )}
                    </Droppable>
                </DragDropContext>
            ) : (
                <StopsEmpty />
            )}
        </Stack>
    );
}

export default React.memo(TrackingLoadManifestItem);
