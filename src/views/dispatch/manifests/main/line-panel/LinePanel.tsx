import { useAppSelector } from '@/store/hooks';
import { Divider, Stack, styled } from '@mui/material';
import React, { MouseEvent } from 'react';
import { useAssignTruckToManifestMenu } from '@/@core/components/assign/modals/AssignTruckToManifest';
import Stops from '@/views/dispatch/manifests/main/line-panel/manifests/stops/Stops';
import LinePanelOverview from '@/views/dispatch/manifests/main/line-panel/overview/LinePanelOverview';
import LinePanelHeader from '@/views/dispatch/manifests/main/line-panel/header/LinePanelHeader';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import { selectSelectedManifest } from '@/store/dispatch/manifests/selectors';

const Container = styled('div')(({ theme }) => ({
    display        : 'flex',
    flexDirection  : 'column',
    alignItems     : 'center',
    height         : '100%',
    backgroundColor: theme.palette.semantic.background.white,
    padding        : '2px 4px',
    overflow       : 'hidden'
}));

export default function LinePanel() {
    const manifest = useAppSelector(selectSelectedManifest);
    const assignTruckToManifest = useAssignTruckToManifestMenu();

    const assignTruckHandler = (event: MouseEvent<HTMLButtonElement>) => {
        if (!manifest) return;
        assignTruckToManifest.open({
            alertAssignTruckFromLoad: true,
            manifestFriendlyId      : manifest?.friendlyId,
            manifestId              : manifest?.manifestId || '',
            stops                   : manifest?.stops || []
        })(event);
    };

    if (!manifest) {
        return null;
    }

    return (
        <Container>
            <LinePanelHeader
                manifestId={manifest.manifestId}
                manifestFriendlyId={manifest.friendlyId}
                manifestStatus={manifest.status}
            />

            <Divider
                orientation="horizontal"
                flexItem
            />

            <LinePanelOverview
                truckId={manifest.truckId}
                trailerId={manifest.trailerId}
                driverId={manifest.primaryDriverId}
                assignTruckHandler={assignTruckHandler}
            />

            <Divider
                orientation="horizontal"
                flexItem
            />

            <OverlayScrollbarsComponent
                options={{
                    overflow: {
                        x: 'hidden'
                    }
                }}
            >
                <Stack
                    marginTop={2}
                    alignItems="center"
                >
                    <Stops
                        stops={manifest.stops}
                        primaryDriverId={manifest.primaryDriverId}
                        truckId={manifest.truckId}
                    />
                </Stack>
            </OverlayScrollbarsComponent>
        </Container>
    );
}
