/* eslint-disable max-len */

import ManifestsTypes from '@/store/dispatch/manifests/types';
import { TakeOutStop } from '@/views/dispatch/manifests/modals/take-out';
import React, { useCallback, useEffect, useRef } from 'react';
import { DragDropContext, Draggable, DropResult, Droppable } from 'react-beautiful-dnd';
import { Fade, Stack } from '@mui/material';
import { reorderStops, TableMode } from '@/@core/ui-kits/loads/load-stop/utils';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { ManifestsActions } from '@/store/dispatch/manifests/slice';
import {
    OverlayScrollbarsComponent,
    type OverlayScrollbarsComponentRef
} from 'overlayscrollbars-react';
import { useOverlayScrollToElement } from '@/hooks/useScrollToElement';
import FullStopItem from '@/@core/ui-kits/loads/load-stop/full-stop-item/FullStopItem';
import { isCompletedStop } from '@/utils/load-stops';
import moment from 'moment-timezone';
import findLastIndex from '@/utils/find-last-index';

type Props = {
    setPreparedStops: (preparedStops: ManifestsTypes.AnyPreparedStop[]) => void;
    stops: ManifestsTypes.AnyPreparedStop[];
    tableMode: TableMode;
    selectedStops: TakeOutStop[];
    setSelectedStops: React.Dispatch<React.SetStateAction<TakeOutStop[]>>;
    driverId: string;
    truckId: string;
    manifestId: string;
};

export default function ManifestsStops({
    stops,
    tableMode,
    setPreparedStops,
    selectedStops,
    setSelectedStops,
    driverId,
    truckId,
    manifestId
}: Props) {
    const dispatch = useAppDispatch();
    const scrollContainerRef = useRef<OverlayScrollbarsComponentRef | null>(null);
    const selectedStopId = useAppSelector((state) => state.manifests.map.selectedStopId);
    const scrollTo = useOverlayScrollToElement(scrollContainerRef);

    const setSelectedStopId = useCallback(
        (stopId: string | null) => {
            if (tableMode === TableMode.NONE) {
                dispatch(ManifestsActions.SetSelectedStopId(stopId));
            }
        },
        [dispatch, tableMode]
    );

    useEffect(() => {
        const stop = scrollContainerRef.current
            ?.getElement()
            ?.querySelector(`[data-rbd-draggable-id="${selectedStopId}"]`);
        scrollTo(stop as HTMLElement | null);
    }, [selectedStopId, scrollTo]);

    const onDragEnd = (result: DropResult) => {
        if (result.destination) {
            const reorderedStops = reorderStops(
                stops,
                result.source.index,
                result.destination.index
            );
            setPreparedStops(reorderedStops);
        }
    };

    const activeStopIdx = findLastIndex(stops, isCompletedStop);

    const percentageProgress = () => {
        if (activeStopIdx === -1) return 0;

        const activeStop = stops[activeStopIdx];
        const nextStop = stops[activeStopIdx + 1];
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

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="manifest-stops">
                {(droppableProvided) => (
                    <Fade in>
                        <Stack overflow="hidden">
                            <OverlayScrollbarsComponent ref={scrollContainerRef}>
                                <Stack
                                    mt="8px"
                                    ref={droppableProvided.innerRef}
                                    {...droppableProvided.droppableProps}
                                >
                                    {stops.map((stop, ind) => (
                                        <Draggable
                                            key={stop.stopId}
                                            draggableId={stop.stopId}
                                            index={ind}
                                            isDragDisabled={tableMode !== TableMode.EDIT_ROUTE}
                                        >
                                            {(provided) => (
                                                <FullStopItem
                                                    key={stop.stopId}
                                                    isActiveStop={activeStopIdx === ind}
                                                    manifestId={manifestId}
                                                    stop={stop}
                                                    onChangeSelectedStops={onChangeSelectedStops}
                                                    selectedStops={selectedStops}
                                                    provided={provided}
                                                    truckId={truckId}
                                                    tableMode={tableMode}
                                                    driverId={driverId}
                                                    isLastStop={ind === stops.length - 1}
                                                    setSelectedStopId={setSelectedStopId}
                                                    selected={selectedStopId === stop.stopId}
                                                    percentageProgress={percentageProgress()}
                                                    isManifestPage
                                                />
                                            )}
                                        </Draggable>
                                    ))}
                                    {droppableProvided.placeholder}
                                </Stack>
                            </OverlayScrollbarsComponent>
                        </Stack>
                    </Fade>
                )}
            </Droppable>
        </DragDropContext>
    );
}
