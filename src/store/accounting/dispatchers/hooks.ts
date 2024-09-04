import DispatchersGrpcService from '@/@grpcServices/services/dispatch-payment.service';
import { useDriverTypesMap, useTrailersTypesMap, useUsersMap } from '@/store/hash_maps/hooks';
import { GetDispatchersReply_Dispatcher } from '@proto/dispatchers';
import { useCallback, useMemo } from 'react';
import Dispatch from '@/store/accounting/dispatchers/types';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { DispatchersActions } from '@/store/accounting/dispatchers/slice';
import { TruckModel_Status } from '@proto/models/model_truck';
import { useTrucksMap } from '@/store/storage/trucks/hooks/common';
import { useTrailersMap } from '@/store/storage/trailers/hooks/common';
import { useDriversMap } from '@/store/storage/drivers/hooks/common';

export const useDispatchersCycleId = () => {
    const selected_cycle_id = useAppSelector((state) => state.dispatch.cycle_id);
    return selected_cycle_id ?? '';
};

export const useDispatchersPeriodId = () => {
    const selected_period_id = useAppSelector((state) => state.dispatch.period_id);
    return selected_period_id ?? '';
};

export const useUpdateDispatchersRequestData = () => {
    const dispatch = useAppDispatch();
    return useCallback(
        (data: { cycle_id?: string; period_id?: string }) => {
            dispatch(DispatchersActions.SetRequestData(data));
        },
        [dispatch]
    );
};

const defaultUserStats: Dispatch.Stats = {
    avgGross   : 0,
    avgRpm     : 0,
    grossAmount: 0,
    loadedMiles: 0,
    emptyMiles : 0
};

const useConvertDispatcher = () => {
    const driverTypesMap = useDriverTypesMap();
    const trailerTypesMap = useTrailersTypesMap();
    const dispatchersMap = useUsersMap();
    const trucksMap = useTrucksMap();
    const driversMap = useDriversMap();
    const trailersMap = useTrailersMap();

    const convertDriver = useCallback(
        (driverId: string) => {
            const driver = driversMap[driverId];
            return driver
                ? {
                    type_icon       : driverTypesMap[driver.driverTypeId]?.icon,
                    fullName        : `${driver?.firstName || ''} ${driver?.lastName || ''}`,
                    selfie_thumb_url: driver.selfieThumbUrl
                }
                : null;
        },
        [driverTypesMap, driversMap]
    );

    const convertTrailer = useCallback(
        (trailerId: string) => {
            const trailer = trailersMap[trailerId];
            return trailer
                ? {
                    type_icon  : trailerTypesMap[trailer.trailerTypeId]?.icon,
                    referenceId: trailer.referenceId
                }
                : null;
        },
        [trailerTypesMap, trailersMap]
    );

    const converter: (user: GetDispatchersReply_Dispatcher) => Dispatch.ConverterDispatcher =
        useCallback(
            (user) => {
                const dispatcher = dispatchersMap[user.userId];
                const trucks = Object.entries(user.trucks).map(([key, value]) => {
                    const truck = trucksMap[key];
                    const primaryDriverId =
                        truck?.drivers.find((driver) => driver.primary)?.driverId || '';
                    const driver = convertDriver(primaryDriverId);
                    const trailer = convertTrailer(truck?.trailerId);

                    return {
                        truck_id   : truck?.truckId,
                        type       : truck?.type,
                        status     : truck?.status,
                        referenceId: truck?.referenceId,
                        year       : truck?.year,
                        model      : truck?.model,
                        driver,
                        trailer,
                        loadedMiles: value.stats?.loadedMiles || 0,
                        emptyMiles : value.stats?.emptyMiles || 0,
                        rpm        : value.stats?.avgRpm || 0,
                        gross      : value.stats?.grossAmount || 0
                    };
                });

                const activeTrucks = trucks.filter(
                    (truck) => truck.status === TruckModel_Status.active
                ).length;

                return {
                    dispatcherId: user.userId,
                    fullName    : dispatcher?.firstName
                        ? `${dispatcher?.firstName} ${dispatcher?.lastName}`
                        : null,
                    selfieThumbUrl: dispatcher?.selfieThumbUrl,
                    amountOfTrucks: trucks.length,
                    activeTrucks,
                    stats         : user?.stats || defaultUserStats,
                    trucks
                };
            },
            [convertDriver, convertTrailer, dispatchersMap, trucksMap]
        );

    return { converter };
};

export function useDispatchers() {
    const cycleId = useDispatchersCycleId();
    const periodId = useDispatchersPeriodId();

    const {
        data,
        isLoading,
        isError,
        isFetching
    } = DispatchersGrpcService.useGetDispatchersQuery({
        cycleId,
        periodId
    });
    const { converter } = useConvertDispatcher();

    const convertedDispatchers = useMemo(
        () => (data?.dispatchers ? data?.dispatchers.map(converter) : []),
        [data, converter]
    );

    return {
        convertedDispatchers,
        isLoading,
        isError,
        isFetching
    };
}
