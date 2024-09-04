import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import LoadManifestsHeader from '@/views/dispatch/orders/Details/sections/load-tabs/load-stops-tab/LoadManifestsHeader';
import StopsEmpty from '@/@core/ui-kits/loads/load-stop/StopsEmpty';
import { isCompletedLoadStop, isCompletedManifestStop } from '@/utils/load-stops';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { LoadsActions } from '@/store/dispatch/loads/slice';
import type { ScrollToElement } from '@/hooks/useScrollToElement';
import { LoadData_Load } from '@proto/loads';
import LoadManifestsItem from './LoadManifestsItem';
import LoadStopsStyled from './LoadStops.styled';

type Props = {
    load: LoadData_Load;
    scrollToElement?: ScrollToElement;
};

function LoadManifests({
    load,
    scrollToElement
}: Props) {
    // const [showOtherStops, setShowOtherStops] = useState(true);
    const [showCompletedStops, setShowCompletedStops] = useState(true);
    const containerRef = useRef<HTMLDivElement | null>(null);

    const showOtherStops = useAppSelector((state) => state.loads.showLoadStops);
    const selectedStopId = useAppSelector((state) => state.loads.map.selectedStopId);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (scrollToElement) {
            const stop = selectedStopId
                ? containerRef.current?.querySelector(`[data-rbd-draggable-id="${selectedStopId}"]`)
                : undefined;
            scrollToElement(stop, true, -32);
        }
    }, [selectedStopId, scrollToElement]);

    const setShowOtherStops = useCallback(() => {
        dispatch(LoadsActions.ToggleShowLoadStops({}));
    }, [dispatch]);

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
                    if (stop.loadStopId) {
                        if (stop.loadId === load.loadId) {
                            stops = [...stops, stop];
                        }
                    }
                });
            }
            if (showOtherStops && !showCompletedStops) {
                manifest.stops.forEach((stop) => {
                    if (stop.loadStopId && !isCompletedLoadStop(stop.loadStopStatus)) {
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

    return (
        <LoadStopsStyled.Container
            ref={containerRef}
            sx={{ gap: '12px' }}
        >
            <LoadManifestsHeader
                showOtherStops={showOtherStops}
                showCompletedStops={showCompletedStops}
                setShowOtherStops={setShowOtherStops}
                setShowCompletedStops={setShowCompletedStops}
                countCompleted={counts.countCompleted}
                countOther={counts.countOther}
            />
            {!manifests.length && <StopsEmpty />}
            {manifests.map((manifest) => (
                <LoadManifestsItem
                    key={manifest.manifestId}
                    manifest={manifest}
                    setShowCompletedStops={setShowCompletedStops}
                    loadId={load.loadId}
                />
            ))}
        </LoadStopsStyled.Container>
    );
}

export default React.memo(LoadManifests);
