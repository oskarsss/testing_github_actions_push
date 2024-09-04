/* eslint-disable max-len */

import { useMemo } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import { useAppSelector } from '@/store/hooks';
import {
    useAppliedFilters,
    useFilteredRows,
    SwitchFilterFn
} from '@/@core/components/table/hooks/helpers';

import Scheduling from '@/store/dispatch/scheduling/types';
import { useTrucksLoadsStream, useTrucksManifestsStream } from '@/store/streams/loads';
import { useLastDriverLocation, useTruckLocation } from '@/store/streams/events/hooks';
import moment from 'moment-timezone';
import getTimeAgo from '@/utils/get-time-ago';
import { NonUndefined } from 'react-hook-form';
import { $Filter } from '@/@core/components/filters/utils';
import { GetTrucksLoadsReply_Truck } from '@proto/trucks';
import PAGES_FILTERS_CONFIG from '@/configs/pages-filters-config';
import { FILTER_SWITCH_KEY } from '@/@core/components/filters/constants';
import { LOAD_STATUS_GRPC_ENUM } from '@/models/loads/load-mappings';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { FORMATTED_MANIFEST_STATUS, manifestStatuses } from '@/models/manifests/mapping';

export const default_trucks_filters = PAGES_FILTERS_CONFIG.DISPATCH.SCHEDULE.defaultFilters;

const filtersOrder = $Filter.order(default_trucks_filters)(
    'truck_status',
    'truck_type',
    'manifest_status',
    'trailer_type',
    'user',
    'truck_tags'
);

const switchFilter: SwitchFilterFn<Scheduling.TruckRow, typeof default_trucks_filters> = (
    rows,
    selectedFilters
) => {
    if (selectedFilters[FILTER_SWITCH_KEY].online) {
        return rows.filter((row) => row.online);
    }
    return rows;
};

const switchManifestFilter: SwitchFilterFn<
    Scheduling.TruckManifestRow,
    typeof default_trucks_filters
> = (rows, selectedFilters) => {
    if (selectedFilters[FILTER_SWITCH_KEY].online) {
        return rows.filter((row) => row.online);
    }
    return rows;
};

export function truckSorting<T extends { truckId: string; online: boolean }>(
    a: T,
    b: T,
    pinTrucks: string[]
) {
    const aPinned = pinTrucks.includes(a.truckId);
    const bPinned = pinTrucks.includes(b.truckId);

    const aOnline = Boolean(a.online);
    const bOnline = Boolean(b.online);

    const aPinnedAndOnline = aPinned && aOnline;
    const bPinnedAndOnline = bPinned && bOnline;

    if (aPinnedAndOnline && !bPinnedAndOnline) {
        return -1;
    }
    if (!aPinnedAndOnline && bPinnedAndOnline) {
        return 1;
    }
    if (aOnline && !bOnline) {
        return -1;
    }
    if (!aOnline && bOnline) {
        return 1;
    }
    if (aPinned && !bPinned) {
        return -1;
    }
    if (!aPinned && bPinned) {
        return 1;
    }
    return 0;
}

const connectFilters = (
    array: Scheduling.TruckRow[],
    filters: ((arr: Scheduling.TruckRow[]) => Scheduling.TruckRow[])[]
) => {
    let newArray = [...array];

    filters.forEach((filter) => {
        newArray = filter(newArray);
    });
    return newArray;
};

function filterByLoadStatus(statuses: any) {
    return (trucks: Scheduling.TruckRow[]) => {
        if (!statuses.length) {
            return trucks;
        }
        return trucks.map((truck) => {
            const loads = truck.loads.filter((load) =>
                statuses.includes(LOAD_STATUS_GRPC_ENUM[load.status]));
            return {
                ...truck,
                loads,
                timeOffs: []
            };
        });
    };
}

function filterByUser(users: any) {
    return (trucks: Scheduling.TruckRow[]) => {
        if (!users.length) {
            return trucks;
        }

        return trucks.map((truck) => {
            const filteredLoads = truck.loads.filter((load) => users?.includes(load.dispatcherId));

            return {
                ...truck,
                loads   : filteredLoads,
                timeOffs: []
            };
        });
    };
}

export const PIN_TRUCKS_STORAGE_KEY = 'pin_trucks';

const compareTrucks = $Filter.compareMap({
    manifest_status: () => true,
    truck_type     : (target: GetTrucksLoadsReply_Truck, filter: string[]) =>
        !filter.length || filter.includes(target.type),
    trailer_type: (target: GetTrucksLoadsReply_Truck, filter: string[]) =>
        !filter.length || filter.includes(target.trailerTypeId),
    user: (target: GetTrucksLoadsReply_Truck, filter: string[]) =>
        !filter.length || target.users.some((user) => filter.includes(user))
});

const page = 'scheduling';
const filter_id = page;
export function useTrucksLoads() {
    const [pinTrucks] = useLocalStorage<string[]>(PIN_TRUCKS_STORAGE_KEY, []);

    const {
        from_date,
        end_date
    } = useAppSelector((state) => state.scheduling.search_options);

    const storeFilters = useAppSelector((state) => state.filters?.[filter_id]);

    const selected_filters = useMemo(
        () => ({ ...default_trucks_filters, ...storeFilters }),
        [storeFilters]
    );

    const {
        trucks,
        isLoading,
        filters
    } = useTrucksLoadsStream({
        end_date,
        from_date
    });

    const availableFilters = useAppliedFilters(filtersOrder, filters);

    const { rows } = useFilteredRows<Scheduling.TruckRow>(
        trucks,
        selected_filters,
        switchFilter,
        filtersOrder,
        compareTrucks
    );

    const trucksFiltered = useMemo(
        () =>
            connectFilters(rows, [
                filterByLoadStatus(selected_filters.manifest_status),
                filterByUser(selected_filters.user)
            ]).sort((a, b) => truckSorting(a, b, pinTrucks)),
        [selected_filters.user, selected_filters.manifest_status, rows, pinTrucks]
    );

    return {
        trucks : rows,
        trucksFiltered,
        filter_id,
        filters: availableFilters,
        selected_filters,
        isLoading
    };
}

export type UseLocationFleet = (
    driver_id: string,
    truck_id?: string
) => {
    lat: number;
    lon: number;
    location_age: string | null;
    address: string | null;
    location_current: boolean;
    timestamp?: number;
    type?: 'truck' | 'driver';
};

export type UseLocationFleetResult = ReturnType<UseLocationFleet>;

export const useLocationFleet: UseLocationFleet = (driver_id: string, truck_id?: string) => {
    const { t } = useAppTranslation();
    const driver_location = useLastDriverLocation(driver_id);
    const truck_location = useTruckLocation(truck_id);

    return useMemo(() => {
        if (!driver_location && !truck_location) {
            return {
                lat             : 0,
                lon             : 0,
                location_age    : null,
                address         : null,
                location_current: false
            };
        }
        let type: 'truck' | 'driver' = truck_location ? 'truck' : 'driver';
        let location: NonUndefined<typeof driver_location | typeof truck_location> =
            truck_location || driver_location;

        if (driver_location && truck_location) {
            if (driver_location.timestamp > truck_location.timestamp) {
                type = 'driver';
                location = driver_location;
            } else {
                type = 'truck';
                location = truck_location;
            }
        } else if (!truck_location && driver_location) {
            type = 'driver';
            location = driver_location;
        }

        const location_age = getTimeAgo(location.timestamp, t);
        const is_online = moment().diff(moment(location.timestamp), 'minutes') < 2;
        return {
            lat             : location.lat,
            lon             : location.lon,
            location_age    : is_online ? '' : location_age,
            location_current: is_online,
            address         : location.address,
            timestamp       : location.timestamp,
            type
        };
    }, [driver_location, truck_location, t]);
};

const connectManifestFilters = (
    array: Scheduling.TruckManifestRow[],
    filters: ((arr: Scheduling.TruckManifestRow[]) => Scheduling.TruckManifestRow[])[]
) => {
    let newArray = [...array];

    filters.forEach((filter) => {
        newArray = filter(newArray);
    });
    return newArray;
};

function filterByManifestStatus(statuses: manifestStatuses[]) {
    return (trucks: Scheduling.TruckManifestRow[]) => {
        if (!statuses.length) {
            return trucks;
        }
        const filteredManifest = trucks.map((truck) => {
            const manifests = truck.manifests.filter((manifest) =>
                statuses.includes(FORMATTED_MANIFEST_STATUS[manifest.status]));
            return {
                ...truck,
                manifests,
                timeOffs: []
            };
        });
        return filteredManifest.filter((truck) => truck.manifests.length);
    };
}

export function useTrucksManifests() {
    const [pinTrucks] = useLocalStorage<string[]>(PIN_TRUCKS_STORAGE_KEY, []);

    const {
        from_date,
        end_date
    } = useAppSelector((state) => state.scheduling.search_options);

    const storeFilters = useAppSelector((state) => state.filters?.[filter_id]);

    const selected_filters = useMemo(
        () => ({ ...default_trucks_filters, ...storeFilters }),
        [storeFilters]
    );

    const {
        trucks,
        isLoading,
        filters
    } = useTrucksManifestsStream({
        end_date,
        from_date
    });

    const availableFilters = useAppliedFilters(filtersOrder, filters);

    const { rows } = useFilteredRows<Scheduling.TruckManifestRow>(
        trucks,
        selected_filters,
        switchManifestFilter,
        filtersOrder,
        compareTrucks
    );

    const trucksFiltered: Scheduling.TruckManifestRow[] = useMemo(
        () =>
            connectManifestFilters(rows, [
                filterByManifestStatus(selected_filters.manifest_status)

                // filterByUser(selected_filters.user) // TODO: Implement user filter
            ]).sort((a, b) => truckSorting(a, b, pinTrucks)),
        [selected_filters.manifest_status, rows, pinTrucks]
    );

    return {
        trucks : rows,
        trucksFiltered,
        filter_id,
        filters: availableFilters,
        selected_filters,
        isLoading
    };
}
