import { Stack } from '@mui/material';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { isCompletedLoadStop, isCompletedManifestStop } from '@/utils/load-stops';
import StopsEmpty from '@/@core/ui-kits/loads/load-stop/StopsEmpty';
import StopsComponents from '@/@core/ui-kits/loads/load-stop/StopsComponents';
import TrackingLoadManifestItem from '@/views/dispatch/tracking/info-panel/stops/StopsItem';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { TrackingActions } from '@/store/dispatch/tracking/slice';
import type { ScrollToElement } from '@/hooks/useScrollToElement';
import TrackingLoadStopsHeader from '@/views/dispatch/tracking/info-panel/stops/StopsHeader';
import { LoadData_Load } from '@proto/loads';
import TrackingLoadStopsOverview from './StopsOverview';

type Props = {
    load: LoadData_Load;
    scrollToElement: ScrollToElement;
};

function TrackingLoadStops({
    load,
    scrollToElement
}: Props) {
    const dispatch = useAppDispatch();
    const [showCompletedStops, setShowCompletedStops] = useState(true);
    const containerRef = React.useRef<HTMLDivElement | null>(null);

    const showOtherStops = useAppSelector((state) => state.tracking.showLoadStops);
    const selectedStopId = useAppSelector((state) => state.tracking.map.selectedStopId);

    useEffect(() => {
        const stop = selectedStopId
            ? containerRef.current?.querySelector(`[data-rbd-draggable-id="${selectedStopId}"]`)
            : undefined;

        scrollToElement(stop);
    }, [scrollToElement, selectedStopId]);

    const setShowOtherStops = useCallback(
        (value: boolean) => {
            dispatch(TrackingActions.ToggleShowLoadStops({ value }));
        },
        [dispatch]
    );

    const {
        manifests,
        counts
    } = useMemo(() => {
        const counts = load.manifests.reduce(
            (acc, manifest) => {
                manifest.stops.forEach((stop) => {
                    if (stop.loadStopId) {
                        if (stop.loadId !== load.loadId) {
                            acc.countOther += 1;
                        }
                        if (isCompletedLoadStop(stop.loadStopStatus)) {
                            acc.countCompleted += 1;
                        }
                    }
                    if (stop.manifestStopId) {
                        if (isCompletedManifestStop(stop.manifestStopStatus)) {
                            acc.countCompleted += 1;
                        }
                        acc.countOther += 1;
                    }
                });

                return acc;
            },
            { countCompleted: 0, countOther: 0 }
        );

        if (showOtherStops && showCompletedStops) {
            return {
                manifests: load.manifests,
                counts
            };
        }

        if (!showOtherStops && !showCompletedStops) {
            const manifests = load.manifests.map((manifest) => ({
                ...manifest,
                stops: manifest.stops.filter((stop) => {
                    if (stop.loadStopId) {
                        return (
                            stop.loadId === load.loadId && !isCompletedLoadStop(stop.loadStopStatus)
                        );
                    }
                    return false;
                })
            }));
            return {
                manifests: manifests.filter((manifest) => manifest.stops.length > 0),
                counts
            };
        }

        const manifests = load.manifests.map((manifest) => {
            let stops: typeof manifest.stops = [];
            if (showCompletedStops && !showOtherStops) {
                manifest.stops.forEach((stop) => {
                    if (stop.loadId) {
                        if (stop.loadId === load.loadId) {
                            stops = [...stops, stop];
                        }
                    }
                });
            }
            if (showOtherStops && !showCompletedStops) {
                manifest.stops.forEach((stop) => {
                    if (stop.loadId && !isCompletedLoadStop(stop.loadStopStatus)) {
                        stops = [...stops, stop];
                    }
                    if (stop.manifestStopId && !isCompletedManifestStop(stop.manifestStopStatus)) {
                        stops = [...stops, stop];
                    }
                });
            }

            return {
                ...manifest,
                stops
            };
        });

        return {
            manifests: manifests.filter((manifest) => manifest.stops.length > 0),
            counts
        };
    }, [showOtherStops, showCompletedStops, load.manifests, load.loadId]);

    const resetFilter = useCallback(() => {
        setShowCompletedStops(true);
        dispatch(TrackingActions.ToggleShowLoadStops({ value: true }));
    }, [dispatch]);

    const relatedLoads = useMemo(
        () =>
        // const loadMap = load.manifests
        //     .flatMap(({ stops }) => stops)
        //     .reduce(
        //         (
        //             acc,
        //             {
        //                 loadId,
        //                 loadFriendlyId
        //             }
        //         ) => {
        //             if (loadId && loadId !== load.loadId) {
        //                 acc[loadId] = { loadId, friendlyId: loadFriendlyId };
        //             }
        //             return acc;
        //         },
        //         {} as ManifestModel_Load
        //     );

            [],
        [load.loadId, load.manifests]
    );

    if (load.manifests.length === 0) {
        return (
            <Stack
                marginY="16px"
                gap="12px"
            >
                <StopsEmpty />
            </Stack>
        );
    }

    return (
        <Stack
            marginY="16px"
            gap="12px"
            ref={containerRef}
        >
            <Stack gap="6px">
                <TrackingLoadStopsHeader
                    showOtherStops={showOtherStops}
                    showCompletedStops={showCompletedStops}
                    setShowOtherStops={setShowOtherStops}
                    setShowCompletedStops={setShowCompletedStops}
                    countCompleted={counts.countCompleted}
                    countOther={counts.countOther}
                />
                <TrackingLoadStopsOverview
                    relatedLoads={relatedLoads}
                    totalDistance={load.totalMiles}
                    estimatedTotalDurationSeconds={0}
                />
            </Stack>
            <StopsComponents.Divider sx={{ mb: '4px' }} />
            {!manifests.length && <StopsEmpty />}
            {manifests.map((manifest) => (
                <TrackingLoadManifestItem
                    key={manifest.manifestId}
                    manifest={manifest}
                    loadId={load.loadId}
                    onResetFilter={resetFilter}
                />
            ))}
        </Stack>
    );
}

export default React.memo(TrackingLoadStops);
