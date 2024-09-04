import React, { ReactElement, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Collapse, Stack } from '@mui/material';
import { ManifestModel_Manifest } from '@proto/models/model_manifest';
import LoadManifestsHeader from '@/@core/ui-kits/loads/load-stop/manifest-header/ManifestsStopHeader';
import { getPrepareStops } from '@/@grpcServices/services/manifests-service/utils';
import StopsEmpty from '@/@core/ui-kits/loads/load-stop/StopsEmpty';
import { reorderStops, TableMode } from '@/@core/ui-kits/loads/load-stop/utils';
import ManifestsTypes from '@/store/dispatch/manifests/types';
import {
    DragDropContext,
    Draggable,
    DraggableProvided,
    DraggingStyle,
    DropResult,
    Droppable
} from 'react-beautiful-dnd';
import { TakeOutStop } from '@/views/dispatch/manifests/modals/take-out';
import LoadManifestStop from '@/@core/ui-kits/loads/load-stop/full-stop-item/FullStopItem';
import WarningAlert from '@/@core/ui-kits/basic/warning-alert/WarningAlert';
import { createPortal } from 'react-dom';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { LoadsActions } from '@/store/dispatch/loads/slice';
import { isCompletedStop } from '@/utils/load-stops';
import ManifestsSubHeader from '@/@core/ui-kits/loads/load-stop/manifest-header/ManifestsSubHeader';
import moment from 'moment-timezone';
import findLastIndex from '@/utils/find-last-index';

type Props = {
    manifest: ManifestModel_Manifest;
    setShowCompletedStops: (value: boolean) => void;
    loadId: string;
};

export const useDraggableInPortal = () => {
    const element = useRef<HTMLDivElement>(document.createElement('div')).current;

    useEffect(() => {
        if (element) {
            element.style.pointerEvents = 'none';
            element.style.position = 'absolute';
            element.style.height = '100%';
            element.style.width = '100%';
            element.style.top = '0';

            document.body.appendChild(element);

            return () => {
                document.body.removeChild(element);
            };
        }
    }, [element]);

    return (render: (provided: DraggableProvided) => ReactElement) =>
        (provided: DraggableProvided) => {
            const result = render(provided);
            const style = provided.draggableProps.style as DraggingStyle;
            if (style.position === 'fixed') {
                return createPortal(result, element);
            }
            return result;
        };
};

function LoadManifestsItem({
    manifest,
    setShowCompletedStops,
    loadId
}: Props) {
    const dispatch = useAppDispatch();
    const [tableMode, setTableModeState] = useState<TableMode>(TableMode.NONE);
    const [preparedStops, setPreparedStops] = useState(getPrepareStops(manifest.stops));
    const [selectedStops, setSelectedStops] = useState<TakeOutStop[]>([]);
    const selectedStopId = useAppSelector((state) => state.loads.map.selectedStopId);

    const setSelectedStopId = useCallback(
        (stopId: string | null) => {
            if (tableMode === TableMode.NONE) {
                dispatch(LoadsActions.SetSelectedStopId(stopId));
            }
        },
        [dispatch, tableMode]
    );

    const setTableMode = useCallback(
        (mode: TableMode) => {
            if (mode !== TableMode.NONE) {
                dispatch(LoadsActions.setShowsLoadStops(true));
                setShowCompletedStops(true);
            }
            setTableModeState(mode);
        },
        [dispatch, setShowCompletedStops]
    );

    const isEqualStopsSequence = useMemo(
        () => JSON.stringify(preparedStops) === JSON.stringify(getPrepareStops(manifest.stops)),
        [preparedStops, manifest.stops]
    );

    useEffect(() => {
        if (JSON.stringify(preparedStops) !== JSON.stringify(getPrepareStops(manifest.stops))) {
            setPreparedStops(getPrepareStops(manifest.stops));
        }
    }, [manifest.stops]);

    const cancelEditRoute = () => {
        setPreparedStops(getPrepareStops(manifest.stops));
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

    const renderDraggable = useDraggableInPortal();
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
        <Stack position="relative">
            <Stack
                position="sticky"
                width="100%"
                top={0}
                zIndex={100}
                padding="4px 16px"
                sx={{
                    backgroundColor: (theme) => theme.palette.semantic.background.white
                }}
            >
                <LoadManifestsHeader
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
                sx={{ flexShrink: 0, mb: '8px' }}
            >
                <WarningAlert text="common:warnings.change_route" />
            </Collapse>
            {preparedStops.length !== 0 ? (
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="manifest-stops">
                        {(droppableProvided) => (
                            <Stack
                                mt="8px"
                                ref={droppableProvided.innerRef}
                                {...droppableProvided.droppableProps}
                            >
                                {preparedStops.map((stop, ind) => (
                                    <Draggable
                                        key={stop.stopId}
                                        draggableId={stop.stopId}
                                        index={ind}
                                        isDragDisabled={tableMode !== TableMode.EDIT_ROUTE}
                                    >
                                        {renderDraggable((provided) => (
                                            <LoadManifestStop
                                                isActiveStop={activeStopIdx === ind}
                                                manifestId={manifest.manifestId}
                                                stop={stop}
                                                onChangeSelectedStops={onChangeSelectedStops}
                                                selectedStops={selectedStops}
                                                provided={provided}
                                                truckId={manifest.truckId}
                                                tableMode={tableMode}
                                                driverId={manifest.driverIds[0] || ''}
                                                setSelectedStopId={setSelectedStopId}
                                                isLastStop={ind === preparedStops.length - 1}
                                                selected={selectedStopId === stop.stopId}
                                                mainLoadId={loadId}
                                                percentageProgress={percentageProgress()}
                                            />
                                        ))}
                                    </Draggable>
                                ))}
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

export default React.memo(LoadManifestsItem);
