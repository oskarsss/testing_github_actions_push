import { trackingSelectedOrderSelector } from '@/store/dispatch/tracking/selectors';
import { useAppSelector } from '@/store/hooks';
import { Divider, Stack, styled } from '@mui/material';
import React, { MouseEvent } from 'react';
import useOrderActiveManifest from '@/store/storage/orders/hooks/useOrderActiveManifest';
import { useAssignTruckToManifestMenu } from '@/@core/components/assign/modals/AssignTruckToManifest';
import Stops from '@/views/dispatch/tracking/load-line-panel/manifests/stops/Stops';
import ManifestHeader from '@/views/dispatch/tracking/load-line-panel/manifests/ManifestHeader';
import LinePanelOverview from '@/views/dispatch/tracking/load-line-panel/overview/LinePanelOverview';
import LinePanelHeader from '@/views/dispatch/tracking/load-line-panel/header/LinePanelHeader';
import { LOAD_STATUS_GRPC_ENUM } from '@/models/loads/load-mappings';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';

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
    const order = useAppSelector(trackingSelectedOrderSelector);
    const assignTruckToManifest = useAssignTruckToManifestMenu();

    const {
        truckId,
        trailerId,
        driverId,
        manifest
    } = useOrderActiveManifest(order);

    const assignTruckHandler = (event: MouseEvent<HTMLButtonElement>) => {
        if (!manifest) return;
        assignTruckToManifest.open({
            alertAssignTruckFromLoad: true,
            manifestFriendlyId      : manifest?.friendlyId,
            manifestId              : manifest?.manifestId || '',
            stops                   : manifest?.stops || [],
            loadId                  : order?.loadId || ''
        })(event);
    };

    if (!order) {
        return null;
    }

    return (
        <Container>
            <LinePanelHeader
                loadId={order.loadId}
                loadFriendlyId={order.friendlyId}
                loadStatus={LOAD_STATUS_GRPC_ENUM[order.status]}
            />

            <Divider
                orientation="horizontal"
                flexItem
            />

            <LinePanelOverview
                truckId={truckId}
                trailerId={trailerId}
                driverId={driverId}
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
                {order.manifests.map((manifest) => (
                    <React.Fragment key={manifest.manifestId}>
                        <ManifestHeader
                            manifestId={manifest.manifestId}
                            manifestStatus={manifest.status}
                            manifestFriendlyId={manifest.friendlyId}
                        />
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
                    </React.Fragment>
                ))}
            </OverlayScrollbarsComponent>
        </Container>
    );
}
