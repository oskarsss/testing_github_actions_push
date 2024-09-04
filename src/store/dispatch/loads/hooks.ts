/* eslint-disable arrow-body-style */
/* eslint-disable max-len */

import { useMemo, useRef } from 'react';

import { useBrokersMap, useCustomersMap, useUsersMap } from '@/store/hash_maps/hooks';
import { LoadData_Load } from '@proto/loads';
import { useStableArray } from '@/hooks/useStable';

import LoadDriverPayItemCategoriesGrpcService from '@/@grpcServices/services/loads-service/load-driver-pay-item-categories.service';
import LoadInvoiceItemCategoriesGrpcService from '@/@grpcServices/services/loads-service/load-invoice-item-categories.service';
import LoadTypesGrpcService from '@/@grpcServices/services/loads-service/load-types.service';
import { useTrucksMap } from '@/store/storage/trucks/hooks/common';
import { useDriversMap } from '@/store/storage/drivers/hooks/common';

export interface MapLoads extends LoadData_Load {
    broker: string;
    broker_name: string;
    broker_short_name: string;
    customer: string;
    customer_name: string;
    customer_short_name: string;
    truck_reference_id: string;
    dispatcher_name: string;
    first_driver_name: string;
    first_driver_first_name: string;
    first_driver_last_name: string;
    first_driver_middle_name: string;
    first_driver_full_name: string;
    first_driver_display_name: string;
    driverId: string;
    truckId: string;
    trailerId: string;
    firstOrderStop?: LoadData_Load['manifests'][0]['stops'][0];
    lastOrderStop?: LoadData_Load['manifests'][0]['stops'][0];
}

export const useConvertedLoads = (newLoads?: LoadData_Load[]) => {
    const stableArray = useRef([]).current;

    const brokersMap = useBrokersMap();

    const customersMap = useCustomersMap();

    const trucksMap = useTrucksMap();

    const dispatchersMap = useUsersMap();

    const driversMap = useDriversMap();

    const loads: MapLoads[] = useMemo(
        () =>
            newLoads?.map((load) => {
                const activeManifest = load.manifests?.find(
                    (manifest) => manifest.manifestId === load.activeManifestId
                );

                const truckId = activeManifest?.truckId ?? '';
                const trailerId = activeManifest?.trailerId ?? '';
                const driverId = activeManifest?.primaryDriverId ?? '';

                const broker = brokersMap[load.brokerId ?? ''];
                const customer = customersMap[load.customerId ?? ''];
                const truck = trucksMap[truckId ?? ''];
                const dispatcher = dispatchersMap[load.dispatcherId ?? ''];
                const driver = driversMap[driverId ?? ''];
                const orderStops = load.manifests.flatMap((manifest) =>
                    manifest.stops.filter((stop) => stop.loadId === load.loadId));
                return {
                    ...load,
                    driverId,
                    truckId,
                    trailerId,
                    broker             : broker?.shortName || broker?.name || '',
                    broker_name        : broker?.name ?? '',
                    broker_short_name  : broker?.shortName ?? '',
                    customer           : (customer?.shortName || customer?.name) ?? '',
                    customer_name      : customer?.name ?? '',
                    customer_short_name: customer?.shortName ?? '',
                    truck_reference_id : truck?.referenceId ?? '',
                    dispatcher_name    : `${dispatcher?.firstName} ${
                        dispatcher?.lastName ? dispatcher?.lastName : ''
                    }`,
                    first_driver_name:
                        `${driver?.firstName || ''} ${driver?.lastName || ''}` ??
                        driver?.firstName ??
                        '',
                    first_driver_first_name : driver?.firstName ?? '',
                    first_driver_last_name  : driver?.lastName ?? '',
                    first_driver_middle_name: driver?.middleName ?? '',
                    first_driver_full_name:
                        `${driver?.firstName || ''} ${driver?.lastName || ''}` ?? '',
                    first_driver_display_name:
                        driver?.friendlyName ||
                        `${driver?.firstName ?? ''} ${driver?.lastName?.[0] ?? ''}`.trim(),
                    firstOrderStop: orderStops[0],
                    lastOrderStop : orderStops[orderStops.length - 1]
                };
            }) ?? stableArray,
        [newLoads, stableArray, brokersMap, customersMap, trucksMap, dispatchersMap, driversMap]
    );

    return loads;
};

export type StatsFilter = {
    filter_id: string;
    counts: Record<string, number>;
    selected: (string | number)[];
    amounts?: Record<string, string>;
};

export function useActiveLoadsTypes() {
    const {
        data,
        isError,
        isLoading
    } = LoadTypesGrpcService.useGetLoadTypesQuery({});

    const types = useStableArray(data?.loadTypes);

    const formattingData = useMemo(() => {
        return types
            .filter((type) => !type.deleted)
            .map((option) => ({
                id   : option.loadTypeId,
                icon : option.icon,
                label: `${option.code} - ${option.name}`
            }));
    }, [types]);

    return { load_types: formattingData, isError, isLoading };
}

export function useActiveInvoiceItemCategories() {
    const { data } = LoadInvoiceItemCategoriesGrpcService.useGetInvoiceItemCategoriesQuery(
        {},
        {
            selectFromResult: (result) => ({
                ...result,
                data: result.data
                    ? result.data.invoiceItemCategories.filter((item) => !item.deleted)
                    : []
            })
        }
    );

    return data;
}

export function useDriverPayItemCategories() {
    const { data } =
        LoadDriverPayItemCategoriesGrpcService.endpoints.getDriverPayItemCategories.useQuery({});

    return useStableArray(data?.loadDriverPayItemCategories);
}
