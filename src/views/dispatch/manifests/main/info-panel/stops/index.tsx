import ManifestsTypes from '@/store/dispatch/manifests/types';
import { Stack, Fade, Collapse } from '@mui/material';
import {
    ManifestModel_LoadStop_Status,
    ManifestModel_Manifest,
    ManifestModel_ManifestStop_Status
} from '@proto/models/model_manifest';
import React, { useCallback, useEffect, useMemo, useState, useRef } from 'react';
import StopsHeader from '@/views/dispatch/manifests/main/info-panel/stops/components/StopsHeader';
import StopsOverview from '@/views/dispatch/manifests/main/info-panel/stops/components/StopsOverview';
import StopsComponents from '@/@core/ui-kits/loads/load-stop/StopsComponents';
import StopsEmpty from '@/@core/ui-kits/loads/load-stop/StopsEmpty';
import { reorderStops, TableMode } from '@/@core/ui-kits/loads/load-stop/utils';
import { TakeOutStop } from '@/views/dispatch/manifests/modals/take-out';
import { getPrepareStops } from '@/@grpcServices/services/manifests-service/utils';
import TakeOutActions from '@/views/dispatch/manifests/details/sections/tables/stops/actions/TakeOutActions';
import EditRouteActions from '@/views/dispatch/manifests/details/sections/tables/stops/actions/EditRouteActions';
import WarningAlert from '@/@core/ui-kits/basic/warning-alert/WarningAlert';
import { DragDropContext, Draggable, DropResult, Droppable } from 'react-beautiful-dnd';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { ManifestsActions } from '@/store/dispatch/manifests/slice';
import type { OverlayScrollToElement } from '@/hooks/useScrollToElement';
import MiniStopItem from '@/@core/ui-kits/loads/load-stop/mini-stop-item/MiniStopItem';
import { isCompletedStop } from '@/utils/load-stops';
import { useManifestLoads } from '@/store/dispatch/manifests/hooks';
import moment from 'moment-timezone';
import findLastIndex from '@/utils/find-last-index';

type Props = {
    stops: ManifestsTypes.PreparedStop[];
    loadsCount: number;
    totalDistance: string;
    truckId: string;
    driverId: string;
    estimatedTotalDurationSeconds?: number;
    manifest: ManifestModel_Manifest;
    scrollTo: OverlayScrollToElement;
};

function ManifestStops({
    stops,
    loadsCount,
    totalDistance,
    truckId,
    driverId,
    estimatedTotalDurationSeconds,
    manifest,
    scrollTo
}: Props) {
    const [showCompleted, setShowCompleted] = useState(true);
    const [tableMode, setTableMode] = useState<TableMode>(TableMode.NONE);
    const [preparedStops, setPreparedStops] = useState(stops);
    const [selectedStops, setSelectedStops] = useState<TakeOutStop[]>([]);
    const containerRef = useRef<HTMLDivElement | null>(null);

    const { loads } = useManifestLoads(stops);

    const dispatch = useAppDispatch();

    const onSelectStop = useCallback(
        (stopId: string | null) => {
            dispatch(ManifestsActions.SetSelectedStopId(stopId));
        },
        [dispatch]
    );

    const selectedStopId = useAppSelector((state) => state.manifests.map.selectedStopId);

    useEffect(() => {
        const stop = selectedStopId
            ? containerRef.current?.querySelector(`[data-rbd-draggable-id="${selectedStopId}"]`)
            : undefined;

        scrollTo(stop);
    }, [scrollTo, selectedStopId]);

    const completedStops = preparedStops.filter((stop) =>
        [
            ManifestModel_ManifestStop_Status.COMPLETED,
            ManifestModel_LoadStop_Status.COMPLETED
        ].includes(stop.loadStopStatus || stop.manifestStopStatus));

    const filteredStops = useMemo(() => {
        if (tableMode !== TableMode.NONE) return preparedStops;
        if (showCompleted) return preparedStops;
        return preparedStops.filter(
            (stop) =>
                ![
                    ManifestModel_ManifestStop_Status.COMPLETED,
                    ManifestModel_LoadStop_Status.COMPLETED
                ].includes(stop.manifestStopStatus || stop.loadStopStatus)
        );
    }, [showCompleted, preparedStops, tableMode]);

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

    if (stops.length === 0) {
        return <StopsEmpty />;
    }

    const lastStop = stops[stops.length - 1];
    const activeStopIdx = findLastIndex(filteredStops, isCompletedStop);

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

    return (
        <Fade in>
            <Stack
                direction="column"
                gap="6px"
                ref={containerRef}
            >
                <Stack gap="6px">
                    <StopsHeader
                        truckId={truckId}
                        manifestId={manifest.manifestId || ''}
                        showCompleted={showCompleted}
                        setShowCompleted={setShowCompleted}
                        countCompleted={completedStops.length}
                        tableMode={tableMode}
                        setTableMode={setTableMode}
                        lastStopSequence={lastStop.sequence}
                        lastStopAppointmentEnd={
                            lastStop.appointmentEndAtLocal || lastStop.appointmentStartAtLocal
                        }
                    >
                        {tableMode === TableMode.TAKE_ROUTE && (
                            <TakeOutActions
                                selectedStops={selectedStops}
                                manifestId={manifest.manifestId || ''}
                                setTableMode={setTableMode}
                                setSelectedStops={setSelectedStops}
                                preparedStops={preparedStops}
                            />
                        )}
                        {tableMode === TableMode.EDIT_ROUTE && (
                            <EditRouteActions
                                cancelEditRoute={cancelEditRoute}
                                isEqualStopsSequence={isEqualStopsSequence}
                                preparedStops={preparedStops}
                                manifestId={manifest.manifestId || ''}
                                setTableMode={setTableMode}
                            />
                        )}
                    </StopsHeader>

                    <StopsOverview
                        loads={loads}
                        loadsCount={loads.length}
                        totalDistance={totalDistance}
                        estimatedTotalDurationSeconds={estimatedTotalDurationSeconds}
                    />
                </Stack>

                <StopsComponents.Divider sx={{ mt: '4px' }} />

                <Collapse
                    in={tableMode === TableMode.EDIT_ROUTE && !isEqualStopsSequence}
                    sx={{ flexShrink: 0 }}
                >
                    <WarningAlert text="common:warnings.change_route" />
                </Collapse>

                {filteredStops.length ? (
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId="manifest-stops">
                            {(droppableProvided) => (
                                <Stack
                                    ref={droppableProvided.innerRef}
                                    {...droppableProvided.droppableProps}
                                    sx={{ marginX: '-16px' }}
                                >
                                    {filteredStops.map((stop, ind) => (
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
                                                    manifestId={manifest.manifestId || ''}
                                                    selectStop={onSelectStop}
                                                    selectedStopId={selectedStopId}
                                                    key={stop.stopId}
                                                    stop={stop}
                                                    driverId={driverId}
                                                    truckId={truckId}
                                                    onChangeSelectedStops={onChangeSelectedStops}
                                                    selectedStops={selectedStops}
                                                    provided={provided}
                                                    tableMode={tableMode}
                                                    isLastStop={ind === filteredStops.length - 1}
                                                    isManifestPage
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
        </Fade>
    );
}

export default React.memo(ManifestStops);
