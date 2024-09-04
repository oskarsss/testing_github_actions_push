/* eslint-disable max-len */

import grpcAPI from '@/@grpcServices/api';
import { createRTKStream } from '@/@grpcServices/createStreamQuery';
import grpcTransport from '@/@grpcServices/grpcTransport';
import { useStableArray } from '@/hooks/useStable';
import { initialState } from '@/store/dispatch/scheduling/slice';
import { useAppSelector } from '@/store/hooks';
import { GetLoadsStatsReply, GetTrendsReply } from '@proto/stats';
import { StatsServiceClient } from '@proto/stats.client';
import {
    GetTrucksLoadsReply,
    GetTrucksLoadsReply_Truck,
    TrucksManifestsGetReply,
    TrucksManifestsGetRequest
} from '@proto/trucks';
import { TrucksServiceClient } from '@proto/trucks.client';
import moment from 'moment-timezone';
import { useMemo } from 'react';
import {
    useBrokersMap,
    useCustomersMap,
    useDriverTypesMap,
    useTrailersTypesMap
} from '@/store/hash_maps/hooks';
import Scheduling from '@/store/dispatch/scheduling/types';
import { TrailerModel_Type_Icon } from '@proto/models/model_trailer';
import { createPrivateQueryFn } from '@/@grpcServices/createQueryFn';
import { useOrdersPageData } from '@/@grpcServices/services/loads-service/service-hooks/loads-service-hooks';
import { LoadModel_Status, LoadModel_Stop_Type } from '@proto/models/model_load';
import { useTrailersMap } from '../storage/trailers/hooks/common';
import { useDriversMap } from '../storage/drivers/hooks/common';
import useOrdersPageStorage from '../storage/orders/hooks/useOrderPageData';
import { selectOrdersDataIndexes } from '../storage/orders/selectors';
import { ACTIVE_STOPS_STATUS } from '../storage/orders/utils/filters';

const LoadsStreamService = new TrucksServiceClient(grpcTransport);

const StatsStreamService = new StatsServiceClient(grpcTransport);

const truckLoadsStreamGrpcApi = grpcAPI.injectEndpoints({
    endpoints: ({ query }) => ({
        getTrucksLoadsStream: query(
            createRTKStream(
                LoadsStreamService,
                'getTrucksLoads',
                { ...GetTrucksLoadsReply.create(), loaded: false },
                (data) => ({
                    ...data,
                    loaded: true
                })
            )
        ),
        getTrucksManifestsStream: query(
            createRTKStream(
                LoadsStreamService,
                'trucksManifestsGet',
                { ...TrucksManifestsGetReply.create(), loaded: false },
                (data) => ({
                    ...data,
                    loaded: true
                })
            )
        ),
        getTruckManifests: query<TrucksManifestsGetReply, TrucksManifestsGetRequest>({
            queryFn     : createPrivateQueryFn(LoadsStreamService, 'trucksManifestsGetUnary'),
            providesTags: ['manifest', 'manifests']
        }),
        getLoadsStatsStream: query(
            createRTKStream(StatsStreamService, 'getLoadsStats', GetLoadsStatsReply.create())
        ),
        getLoadsTrendsStream: query(
            createRTKStream(StatsStreamService, 'getTrends', GetTrendsReply.create())
        )
    })
});

function useConvertedTrucksLoads(data: GetTrucksLoadsReply_Truck[]): Scheduling.TruckRow[] {
    const driversMap = useDriversMap();
    const trailersMap = useTrailersMap();
    const driver_types = useDriverTypesMap();
    const trailer_types = useTrailersTypesMap();

    return useMemo(
        () =>
            data.map((truck) => ({
                ...truck,
                drivers: truck.drivers
                    .filter((d) => d.driverId in driversMap)
                    .map((d) => {
                        const driver = driversMap[d.driverId];
                        return {
                            ...d,
                            dutyStatus        : d.dutyStatus as Scheduling.Driver['dutyStatus'],
                            driver_id         : driver.driverId,
                            first_name        : driver.firstName,
                            last_name         : driver.lastName || '',
                            full_name         : `${driver.firstName} ${driver.lastName}`,
                            phone_number      : driver.phoneNumber,
                            status            : driver.status,
                            type_icon         : driver_types[driver.driverTypeId]?.icon,
                            type_name         : driver_types[driver.driverTypeId]?.name,
                            driver_friendly_id: driver.friendlyId,
                            selfie_thumb_url  : driver.selfieThumbUrl || ''
                        };
                    }),
                trailer:
                    truck.trailerId in trailersMap
                        ? {
                            model       : trailersMap[truck.trailerId].model,
                            make        : trailersMap[truck.trailerId].make,
                            reference_id: trailersMap[truck.trailerId].referenceId,
                            trailer_id  : trailersMap[truck.trailerId].trailerId,
                            status      : trailersMap[truck.trailerId].status,
                            type_name   : trailer_types[truck.trailerTypeId]?.name || '',
                            type_icon:
                                  trailer_types[truck.trailerTypeId]?.icon ||
                                  TrailerModel_Type_Icon.DEFAULT,
                            year: trailersMap[truck.trailerId].year
                        }
                        : null,
                loads: truck.loads.map((load) => ({
                    ...load,
                    stops: load.stops.toSorted((a, b) => (a.sequence > b.sequence ? 1 : -1))
                }))
            })),
        [data, driver_types, driversMap, trailer_types, trailersMap]
    );
}

export const useTrucksLoadsStream = ({
    from_date = initialState.search_options.from_date,
    end_date = initialState.search_options.end_date,
    only_with_drivers = true
}) => {
    const {
        data,
        isLoading
    } = truckLoadsStreamGrpcApi.useGetTrucksLoadsStreamQuery({
        fromDate       : moment(from_date).startOf('day').format('YYYY-MM-DD HH:mm:ss'),
        endDate        : moment(end_date).endOf('day').format('YYYY-MM-DD HH:mm:ss'),
        onlyWithDrivers: only_with_drivers
    });

    const truck_online = useAppSelector((state) => state.scheduling.truck_online);

    const trucks = useStableArray(data?.trucks);
    const filters = useStableArray(data?.filters);

    const truckLoads = useMemo(() => {
        if (!truck_online.truck_id) return trucks;
        return trucks.map((truck) => {
            if (truck.truckId === truck_online.truck_id) {
                return {
                    ...truck,
                    online: truck_online.online
                };
            }
            return truck;
        });
    }, [trucks, truck_online.truck_id, truck_online.online]);

    const rows = useConvertedTrucksLoads(truckLoads);

    return {
        isLoading: isLoading || !data?.loaded,
        trucks   : rows,
        filters
    };
};

export enum LoadsStatsEntityType {
    BROKER = 'broker',
    CUSTOMER = 'customer'
}

type ClientType = {
    loadsCount: number;
    name: string;
    entityType: LoadsStatsEntityType;
    entityId: string;
};

export const useLoadsStatsStream = () => {
    const indexes = useAppSelector(selectOrdersDataIndexes);
    const brokersMap = useBrokersMap();
    const customersMap = useCustomersMap();
    const { filteredIndexes } = useOrdersPageData();

    const clientsStats = useMemo(() => {
        const brokerLoadsCount: Record<string, number> = {};
        const customerLoadsCount: Record<string, number> = {};

        filteredIndexes.forEach((index) => {
            Object.entries(indexes.broker).forEach(([brokerId, loadIndexes]) => {
                if (loadIndexes.includes(index) && brokerId) {
                    brokerLoadsCount[brokerId] = (brokerLoadsCount[brokerId] || 0) + 1;
                }
            });
        });

        filteredIndexes.forEach((index) => {
            Object.entries(indexes.customer).forEach(([customerId, loadIndexes]) => {
                if (loadIndexes.includes(index) && customerId) {
                    customerLoadsCount[customerId] = (customerLoadsCount[customerId] || 0) + 1;
                }
            });
        });

        const customersArray: ClientType[] = Object.entries(customerLoadsCount).map(
            ([customerId, loadsCount]) => ({
                loadsCount,
                name      : customersMap[customerId]?.name || 'N/A',
                entityType: LoadsStatsEntityType.CUSTOMER,
                entityId  : customerId
            })
        );

        const brokersArray: ClientType[] = Object.entries(brokerLoadsCount).map(
            ([brokerId, loadsCount]) => ({
                loadsCount,
                name      : brokersMap[brokerId]?.name || 'N/A',
                entityType: LoadsStatsEntityType.BROKER,
                entityId  : brokerId
            })
        );

        return [...brokersArray, ...customersArray].toSorted((a, b) => b.loadsCount - a.loadsCount);
    }, [brokersMap, customersMap, filteredIndexes, indexes.broker, indexes.customer]);

    const {
        totalLateDropoff,
        totalLatePickups
    } = useMemo(() => {
        const activeOrders = filteredIndexes.filter(
            (index) =>
                (indexes.loadStatus[LoadModel_Status.assigned] || [])?.includes(index) ||
                (indexes.loadStatus[LoadModel_Status.pending] || [])?.includes(index) ||
                (indexes.loadStatus[LoadModel_Status.in_progress] || [])?.includes(index)
        );
        const totalLateDropoff =
            activeOrders.filter((index) => {
                const stops = indexes.stopsByIndex[index];
                const lastStop = stops.find(
                    (stop) =>
                        stop.loadStopType === LoadModel_Stop_Type.dropoff &&
                        ACTIVE_STOPS_STATUS.includes(stop.loadStopStatus)
                );
                const appStartAt = lastStop?.appointmentStartAtLocal || '';
                return appStartAt && moment(appStartAt).isBefore(moment());
            }).length || 0;

        const totalLatePickups =
            activeOrders.filter((index) => {
                const stops = indexes.stopsByIndex[index];
                const firstStop = stops.find(
                    (stop) =>
                        stop.loadStopType === LoadModel_Stop_Type.pickup &&
                        ACTIVE_STOPS_STATUS.includes(stop.loadStopStatus)
                );
                const appStartAt = firstStop?.appointmentStartAtLocal || '';
                return appStartAt && moment(appStartAt).isBefore(moment());
            }).length || 0;

        return {
            totalLateDropoff,
            totalLatePickups
        };
    }, [filteredIndexes, indexes.loadStatus, indexes.stopsByIndex]);

    const loads = useMemo(() => {
        const stats = [
            {
                count:
                    filteredIndexes.filter((index) =>
                        indexes.loadStatus[LoadModel_Status.in_progress]?.includes(index))?.length || 0,
                label: 'in_progress',
                value: 'in_progress'
            },
            {
                count:
                    filteredIndexes.filter((index) =>
                        indexes.loadStatus[LoadModel_Status.pending]?.includes(index))?.length || 0,
                label: 'pending',
                value: 'pending'
            },
            {
                count:
                    filteredIndexes.filter((index) =>
                        indexes.loadStatus[LoadModel_Status.assigned]?.includes(index))?.length || 0,
                label: 'assigned',
                value: 'assigned'
            }
        ].toSorted((a, b) => b.count - a.count);

        const total = stats.reduce((acc, stat) => acc + stat.count, 0);
        return {
            stats,
            total
        };
    }, [indexes, filteredIndexes]);

    return {
        clients        : clientsStats,
        active_loads   : loads.stats,
        totalLoadsCount: loads.total,
        late_pickups   : totalLatePickups,
        late_dropoffs  : totalLateDropoff,
        gps_inactive   : 0
    };
};

export const useLoadsTrendsStream = () => {
    const { data } = truckLoadsStreamGrpcApi.useGetLoadsTrendsStreamQuery({});

    return data;
};

// // ------------------------- TRUCKS MANIFESTS --------------------------

export const useTrucksManifestsStream = ({
    from_date = initialState.search_options.from_date,
    end_date = initialState.search_options.end_date,
    only_with_drivers = true
}) => {
    const {
        data,
        isLoading
    } = truckLoadsStreamGrpcApi.useGetTrucksManifestsStreamQuery({
        fromDate       : moment(from_date).startOf('day').format('YYYY-MM-DD HH:mm:ss'),
        endDate        : moment(end_date).endOf('day').format('YYYY-MM-DD HH:mm:ss'),
        onlyWithDrivers: only_with_drivers
    });

    const truck_online = useAppSelector((state) => state.scheduling.truck_online);

    const trucks = useStableArray(data?.trucks);
    const filters = useStableArray(data?.filters);

    const truckManifests = useMemo(() => {
        if (!truck_online.truck_id) return trucks;
        return trucks.map((truck) => {
            if (truck.truckId === truck_online.truck_id) {
                return {
                    ...truck,
                    online: truck_online.online
                };
            }
            return truck;
        });
    }, [trucks, truck_online.truck_id, truck_online.online]);

    return {
        isLoading: isLoading || !data?.loaded,
        trucks   : truckManifests,
        filters
    };
};
