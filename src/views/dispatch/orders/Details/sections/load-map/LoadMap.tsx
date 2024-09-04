import React, { useMemo } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { LoadModel_Status } from '@proto/models/model_load';
import { LoadsActions } from '@/store/dispatch/loads/slice';
import LoadsMap from '@/@core/ui-kits/loads/map';
import { ordersPageSelectedOrderSelector } from '@/store/dispatch/loads/selectors';
import useOrderActiveManifest from '@/store/storage/orders/hooks/useOrderActiveManifest';
import { LoadData_Load } from '@proto/loads';

export type MapboxEvent = mapboxgl.MapMouseEvent & {
    features?: mapboxgl.MapboxGeoJSONFeature[] | undefined;
} & mapboxgl.Event;

export type FlyToPoint = (lon: number, lat: number, zoom?: number) => void;

type Props = {
    order: LoadData_Load;
};

function LoadMap({ order }: Props) {
    const selectedStopId = useAppSelector((state) => state.loads.map.selectedStopId);

    const {
        driverId,
        truckId,
        trailerId
    } = useOrderActiveManifest(order);

    const showOtherStops = useAppSelector((state) => state.loads.showLoadStops);
    const dispatch = useAppDispatch();

    const setShowOtherStops = (value?: boolean) => {
        dispatch(LoadsActions.ToggleShowLoadStops({ value }));
    };

    const setSelectedStopId = (stopId: string | null) => {
        dispatch(LoadsActions.SetSelectedStopId(stopId));
    };

    const isCompletedLoad = useMemo(
        () =>
            order?.status === LoadModel_Status.delivered || order?.status === LoadModel_Status.tonu,
        [order?.status]
    );

    return (
        <div
            style={{
                width       : '100%',
                height      : '100%',
                borderRadius: '8px',
                overflow    : 'hidden'
            }}
        >
            <LoadsMap
                driverId={driverId}
                truckId={truckId}
                trailerId={trailerId}
                selectedStopId={selectedStopId}
                setSelectedStopId={setSelectedStopId}
                setShowOtherStops={setShowOtherStops}
                showOtherStop={showOtherStops}
                loadId={order?.loadId || ''}
                isCompletedLoad={isCompletedLoad}
                weatherControllerStorageKey="loads_page"
                size="small"
            />
        </div>
    );
}

export default React.memo(LoadMap);
