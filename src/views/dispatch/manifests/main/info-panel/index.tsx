import { Stack, styled } from '@mui/material';
import ManifestFleet from '@/views/dispatch/manifests/main/info-panel/fleet/ManifestFleet';
import React, { useEffect, useMemo } from 'react';
import { useOverlayScrollToElement } from '@/hooks/useScrollToElement';
import { OverlayScrollbarsComponent, OverlayScrollbarsComponentRef } from 'overlayscrollbars-react';
import { getPrepareStops } from '@/@grpcServices/services/manifests-service/utils';
import { useAppSelector } from '@/store/hooks';
import { selectSelectedManifest } from '@/store/dispatch/manifests/selectors';
import { useManifestLoads } from '@/store/dispatch/manifests/hooks';
import ManifestStatus from './components/Status';
import AboutManifest from './components/AboutManifest';
import AssignTruckControl from '../../components/controls/AssignTruckControl';
import ManifestNotes from './Notes';
import ManifestStops from './stops';

export default function ManifestsInfoPanel() {
    const manifest = useAppSelector(selectSelectedManifest);

    const stops = useMemo(() => getPrepareStops(manifest?.stops || []), [manifest?.stops]);

    const scrollRef = React.useRef<OverlayScrollbarsComponentRef | null>(null);
    const scrollTo = useOverlayScrollToElement(scrollRef);

    const { loads } = useManifestLoads(manifest?.stops || []);

    useEffect(() => {
        if (manifest?.manifestId) {
            scrollTo();
        }
    }, [manifest?.manifestId, scrollTo]);

    if (!manifest) return null;
    return (
        <Stack
            width="100%"
            height="100%"
            overflow="hidden"
            sx={{
                backgroundColor: (theme) => theme.palette.semantic.background.white
            }}
        >
            <ManifestStatus
                manifestId={manifest.manifestId}
                status={manifest.status}
            />
            <Stack
                direction="column"
                gap="16px"
                padding="16px"
            >
                <AboutManifest
                    manifestId={manifest.manifestId}
                    amountFormatted={manifest.gross?.amountFormatted || '-'}
                    friendlyId={manifest.friendlyId}
                    rpmFormatted={manifest.rpm?.amountFormatted || '-'}
                />
            </Stack>
            <OverlayScrollbarsComponent ref={scrollRef}>
                <Stack
                    direction="column"
                    gap="16px"
                    padding="0 16px 16px 16px"
                >
                    {manifest.truckId ? (
                        <ManifestFleet
                            truckId={manifest.truckId}
                            manifestId={manifest.manifestId}
                            trailerId={manifest.trailerId}
                            driverIds={manifest.driverIds || []}
                            manifestFriendlyId={manifest.friendlyId}
                        />
                    ) : (
                        <AssignTruckControl
                            stops={manifest.stops || []}
                            manifestFriendlyId={manifest.friendlyId.toString() || ''}
                            manifestId={manifest.manifestId || ''}
                        />
                    )}

                    <ManifestStops
                        manifest={manifest}
                        loadsCount={loads.length}
                        totalDistance={manifest.totalDistance?.milesFormatted || ''}
                        stops={stops}
                        truckId={manifest.truckId || ''}
                        driverId={manifest.driverIds?.[0] || ''}
                        estimatedTotalDurationSeconds={manifest.estimatedTotalDurationSeconds}
                        scrollTo={scrollTo}
                    />
                    <ManifestNotes />
                </Stack>
            </OverlayScrollbarsComponent>
        </Stack>
    );
}
