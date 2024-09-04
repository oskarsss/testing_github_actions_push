import { Stack } from '@mui/material';
import React, { useEffect } from 'react';
import ManifestsNotes from '@/views/dispatch/manifests/details/sections/notes/ManifestsNotes';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectSelectedManifest } from '@/store/dispatch/manifests/selectors';
import { useManifestLoads } from '@/store/dispatch/manifests/hooks';
import ManifestsGrpcService from '@/@grpcServices/services/manifests-service/manifests.service';
import { ManifestsActions } from '@/store/dispatch/manifests/slice';
import Preloader from '@/@core/ui-kits/basic/preloader/Preloader';
import ManifestDetailsHeader from './sections/header';
import Equipment from './sections/equipment';
import ManifestDetailsTable from './sections/tables';
import ManifestsMap from '../map';
import StopsProgressBar from './sections/stops-progress-bar';
import KeyboardListener from './KeyboardListener';

type Props = {
    onCloseDialog?: () => void;
};

export default function SafetyManifestDetails({
    manifestId,
    onCloseDialog
}: {
    manifestId: string;
    onCloseDialog?: () => void;
}) {
    const manifests = useAppSelector((state) => state.manifests.liveMode.rows);
    const dispatch = useAppDispatch();

    const isLoading = useAppSelector((state) => state.manifests.isLoading);
    const { isLoading: isRetrieving } =
        ManifestsGrpcService.endpoints.retrieveManifest.useQueryState({ manifestId });

    useEffect(() => {
        const manifestIdx = manifests.findIndex((manifest) => manifest.manifestId === manifestId);
        if (manifests.length) {
            if (manifestIdx === -1) {
                dispatch(ManifestsGrpcService.endpoints.retrieveManifest.initiate({ manifestId }))
                    .unwrap()
                    .then((manifest) => {
                        if (manifest.manifest) {
                            dispatch(ManifestsActions.UpdateManifest(manifest.manifest));
                            dispatch(ManifestsActions.SelectManifestIdx(0));
                        }
                    });
            } else {
                dispatch(ManifestsActions.SelectManifestIdx(manifestIdx));
            }
        }
    }, [manifestId, manifests.length]);

    if (isLoading || isRetrieving) {
        return <Preloader />;
    }

    return <ManifestDetails onCloseDialog={onCloseDialog} />;
}

function ManifestDetails({ onCloseDialog }: Props) {
    const manifest = useAppSelector(selectSelectedManifest);
    const { loadIds } = useManifestLoads(manifest?.stops || []);

    if (!manifest) {
        return null;
    }

    return (
        <Stack
            direction="column"
            overflow="auto"
            height="100%"
        >
            <KeyboardListener />
            <ManifestDetailsHeader
                friendlyId={manifest.friendlyId?.toString() || ''}
                manifestId={manifest.manifestId || ''}
                status={manifest.status || 0}
                onCloseDialog={onCloseDialog}
                title={manifest.title || ''}
                loadIds={loadIds}
            />

            <Stack
                overflow="auto"
                direction="column"
                gap="14px"
                padding="28px 28px 0 28px"
                flex="1 1 100%"
            >
                <Stack
                    direction="row"
                    gap="28px"
                    flex="1 1 100%"
                    maxHeight="338px"
                >
                    <Stack flex="1 1 0">
                        <Stack
                            direction="row"
                            flex="1 1 100%"
                            gap="28px"
                        >
                            <Stack
                                flex="1 1 0"
                                height="100%"
                            >
                                <Equipment
                                    stops={manifest.stops || []}
                                    manifestFriendlyId={manifest.friendlyId?.toString() || ''}
                                    manifestId={manifest.manifestId || ''}
                                    truckId={manifest.truckId || ''}
                                    trailerId={manifest.trailerId || ''}
                                    driverIds={manifest.driverIds || []}
                                    gross={manifest.gross}
                                    totalMiles={manifest.totalDistance?.milesFormatted || '-'}
                                    loadedDistance={manifest.loadedDistance}
                                    emptyDistance={manifest.emptyDistance}
                                    rpm={manifest.rpm}
                                />
                            </Stack>
                            {/* <Stack
                                flex="1.5 1 0"
                                height="100%"
                            >
                                <Expenses
                                    actualExpenses="-"
                                    estimatedExpenses="-"
                                />
                            </Stack> */}
                        </Stack>
                    </Stack>
                    <Stack
                        flex="2 0 0"
                        maxHeight="338px"
                        minHeight="338px"
                        direction="row"
                        borderRadius="8px"
                        overflow="hidden"
                    >
                        <ManifestsMap
                            driverId={manifest.primaryDriverId || ''}
                            truckId={manifest.truckId || ''}
                            manifestId={manifest.manifestId || ''}
                            trailerId={manifest.trailerId || ''}
                            manifestStatus={manifest.status || 0}
                            size="small"
                        />
                    </Stack>
                </Stack>
                <StopsProgressBar
                    manifestId={manifest.manifestId || ''}
                    stops={manifest.stops}
                />
                <Stack
                    flexDirection="row"
                    overflow="hidden"
                    gap="20px"
                    height="100%"
                    width="100%"
                    flex="2 0 0"
                    minHeight="450px"
                >
                    <ManifestDetailsTable
                        manifest={manifest}
                        onCloseDialog={onCloseDialog}
                    />
                    <ManifestsNotes manifestId={manifest.manifestId || ''} />
                </Stack>
            </Stack>
        </Stack>
    );
}
