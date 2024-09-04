import { LoadData_Load } from '@proto/loads';
import { useMemo } from 'react';

const useOrderStops = (order: LoadData_Load) =>
    useMemo(
        () =>
            order.manifests?.flatMap((manifest) =>
                manifest.stops.filter((stop) => stop.loadId === order.loadId)),
        [order.manifests, order.loadId]
    );

export default useOrderStops;
