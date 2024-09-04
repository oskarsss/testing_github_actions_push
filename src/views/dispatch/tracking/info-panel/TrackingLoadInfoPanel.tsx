import { Stack } from '@mui/material';
import { useEffect, useRef } from 'react';
import { PerfectScrollbar } from '@/@core/components/notes/components/AllNotes/AllNotes.styled';
import TrackingLoadOverview from '@/views/dispatch/tracking/info-panel/overview/TrackingLoadOverview';
import useScrollToElement from '@/hooks/useScrollToElement';
import { useAppSelector } from '@/store/hooks';
import { trackingSelectedOrderSelector } from '@/store/dispatch/tracking/selectors';
import useOrderActiveManifest from '@/store/storage/orders/hooks/useOrderActiveManifest';
import TrackingLoadStatus from './status/LoadStatus';
import TrackingLoadGeneralInfo from './general-info/TrackingLoadGeneralInfo';
import TrackingLoadStops from './stops/Stops';
import TrackingLoadNotes from './notes/TrackingLoadNotes';

export default function TrackingLoadInfoPanel() {
    const order = useAppSelector(trackingSelectedOrderSelector);
    const scrollContainerRef = useRef<HTMLElement | null>(null);
    const scrollToElement = useScrollToElement(scrollContainerRef);

    const {
        driverId,
        manifest,
        trailerId,
        truckId
    } = useOrderActiveManifest(order);

    useEffect(() => {
        if (order?.loadId) {
            scrollToElement();
        }
    }, [scrollToElement, order?.loadId]);

    if (!order) {
        return null;
    }

    return (
        <Stack
            width="100%"
            height="100%"
            overflow="hidden"
            sx={{
                backgroundColor: (theme) => theme.palette.semantic.background.white
            }}
        >
            <PerfectScrollbar
                containerRef={(ref) => {
                    scrollContainerRef.current = ref;
                }}
                options={{
                    wheelSpeed      : 1,
                    wheelPropagation: false,
                    suppressScrollX : true
                }}
            >
                <Stack
                    justifyContent="space-between"
                    height="100%"
                >
                    <TrackingLoadStatus
                        loadId={order.loadId}
                        loadStatus={order.status}
                        invoiceStatus={order.invoiceStatus}
                    />

                    <Stack
                        paddingX="16px"
                        sx={{ flex: 0.7 }}
                    >
                        <TrackingLoadGeneralInfo
                            loadFriendlyId={order.friendlyId}
                            loadRefId={order.referenceId}
                            brokerId={order.brokerId}
                            customerId={order.customerId}
                            loadId={order.loadId}
                        />

                        <TrackingLoadOverview
                            stops={manifest?.stops || []}
                            truckId={truckId}
                            loadId={order.loadId}
                            trailerId={trailerId}
                            driverIds={manifest?.driverIds || []}
                            manifestId={order.activeManifestId}
                            manifestFriendlyId={manifest?.friendlyId}
                        />

                        <TrackingLoadStops
                            load={order}
                            scrollToElement={scrollToElement}
                        />
                    </Stack>

                    <TrackingLoadNotes />
                </Stack>
            </PerfectScrollbar>
        </Stack>
    );
}
