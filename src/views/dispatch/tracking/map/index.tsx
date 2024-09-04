import React, { useMemo } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { LoadModel_Status } from '@proto/models/model_load';
import { trackingSelectedOrderSelector } from '@/store/dispatch/tracking/selectors';
import { TrackingActions } from '@/store/dispatch/tracking/slice';
import LoadsMap from '@/@core/ui-kits/loads/map';
import useOrderActiveManifest from '@/store/storage/orders/hooks/useOrderActiveManifest';

export type FlyToPoint = (lon: number, lat: number, zoom?: number) => void;

function TrackingMap() {
    const selectedStopId = useAppSelector((state) => state.tracking.map.selectedStopId);
    const order = useAppSelector(trackingSelectedOrderSelector);

    const {
        driverId,
        trailerId,
        truckId
    } = useOrderActiveManifest(order);

    const showOtherStops = useAppSelector((state) => state.tracking.showLoadStops);
    const dispatch = useAppDispatch();

    const setSelectedStopId = (stopId: string | null) => {
        dispatch(TrackingActions.SetSelectedStopId(stopId));
    };

    const setShowOtherStops = (value?: boolean) => {
        dispatch(TrackingActions.ToggleShowLoadStops({ value }));
    };

    const isCompletedLoad = useMemo(
        () =>
            order?.status === LoadModel_Status.delivered || order?.status === LoadModel_Status.tonu,

        [order?.status]
    );

    return (
        <LoadsMap
            driverId={driverId || ''}
            truckId={truckId || ''}
            trailerId={trailerId || ''}
            setShowOtherStops={setShowOtherStops}
            showOtherStop={showOtherStops}
            loadId={order?.loadId || ''}
            isCompletedLoad={isCompletedLoad}
            weatherControllerStorageKey="tracking_page"
            size="large"
            selectedStopId={selectedStopId}
            setSelectedStopId={setSelectedStopId}
        />
    );
}

export default TrackingMap;
