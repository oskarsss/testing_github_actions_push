/* eslint-disable max-len */
import {
    FORMATTED_MANIFEST_STATUS,
    FORMATTED_MANIFEST_STATUS_TO_GRPC_ENUM
} from '@/models/manifests/mapping';
import { ManifestGetRequest_SortType } from '@proto/manifests';
import { DriverModel_Driver } from '@proto/models/model_driver';
import { ManifestModel_Manifest, ManifestModel_Status } from '@proto/models/model_manifest';
import { TruckModel_Truck } from '@proto/models/model_truck';
import moment from 'moment-timezone';

const {
    FIRST_STOP_APPOINTMENT_START_AT_ASC,
    FIRST_STOP_APPOINTMENT_START_AT_DESC,
    GROSS_AMOUNT_DESC,
    GROSS_AMOUNT_ASC,
    DISTANCE_DESC,
    DISTANCE_ASC,
    LOADED_MILES_ASC,
    LOADED_MILES_DESC,
    SMART_DISPATCH
} = ManifestGetRequest_SortType;

export const connectFilters = <T extends any[]>(array: T, filters: ((arr: T) => T)[]) =>
    filters.reduce((result, filter) => filter(result), array);

export const generatePaginatedIndexMap = (
    indexes: number[],
    currentPage: number,
    itemsPerPage: number
): number[] => {
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return indexes.slice(startIndex, endIndex);
};

const getNumericalSortedIndexes = (indexMap: Record<number, number[]>, ascending = true) => {
    const sortedKeys = Object.keys(indexMap)
        .map(Number)
        .sort((a, b) => (ascending ? a - b : b - a));
    return sortedKeys.flatMap((key) => indexMap[key]);
};

const statusOrder = [
    ManifestModel_Status.PLANNING,
    ManifestModel_Status.ASSIGNED,
    ManifestModel_Status.IN_PROGRESS,
    ManifestModel_Status.DELIVERED,
    ManifestModel_Status.CANCELED,
    ManifestModel_Status.TONU,
    ManifestModel_Status.DELETED
];

const getDateSortedIndexes = (indexMap: Record<string, number[]>, ascending = true) => {
    const sortedKeys = Object.keys(indexMap).sort((a, b) => {
        const dateA = moment(a);
        const dateB = moment(b);
        return ascending ? dateA.diff(dateB) : dateB.diff(dateA);
    });
    return sortedKeys.flatMap((key) => indexMap[key]);
};

export const getSmartDispatchSortedIndexes = (indexes: any) => {
    let sortedArray: number[] = [];

    statusOrder.forEach((status) => {
        const statusIndexes = indexes[status];
        if (statusIndexes) {
            sortedArray = sortedArray.concat(statusIndexes);
        }
    });

    return sortedArray;
};

export const sortByFilter =
    (params: { sortBy: ManifestGetRequest_SortType }, indexes: any) =>
        (array: number[]): number[] => {
            switch (params.sortBy) {
            case FIRST_STOP_APPOINTMENT_START_AT_ASC:
                return getDateSortedIndexes(indexes.firstStopDate, true);
            case FIRST_STOP_APPOINTMENT_START_AT_DESC:
                return getDateSortedIndexes(indexes.firstStopDate, false);
            case GROSS_AMOUNT_DESC:
                return getNumericalSortedIndexes(indexes.grossAmount, false);
            case GROSS_AMOUNT_ASC:
                return getNumericalSortedIndexes(indexes.grossAmount, true);
            case DISTANCE_DESC:
                return getNumericalSortedIndexes(indexes.distance, false);
            case DISTANCE_ASC:
                return getNumericalSortedIndexes(indexes.distance, true);
            case LOADED_MILES_ASC:
                return getNumericalSortedIndexes(indexes.loadedDistance, true);
            case LOADED_MILES_DESC:
                return getNumericalSortedIndexes(indexes.loadedDistance, false);
            case SMART_DISPATCH:
                return getSmartDispatchSortedIndexes(indexes.status);
            default:
                return array; // Return the input array if no sorting criteria match
            }
        };

export const filterByStatus =
    (params: string[], indexes: Record<string | number, number[]>) =>
        (array: number[]): number[] => {
            const filteredIndexes: number[] = [];

            if (!params.length) {
                const nonDeletedIndexes = array.filter(
                    (index) => !indexes[ManifestModel_Status.DELETED]?.includes(index)
                );
                return nonDeletedIndexes;
            }

            params.forEach((status) => {
                const grpcStatus =
                FORMATTED_MANIFEST_STATUS_TO_GRPC_ENUM[
                    status as keyof typeof FORMATTED_MANIFEST_STATUS_TO_GRPC_ENUM
                ];
                if (indexes[grpcStatus]) {
                    filteredIndexes.push(...indexes[grpcStatus]);
                }
            });

            return array.filter((index) => filteredIndexes.includes(index));
        };

export const filterByDate =
    (params: { start_at: string; end_at: string }, indexes: Record<string, number[]>) =>
        (array: number[]): number[] => {
            const {
                start_at,
                end_at
            } = params;

            if (!start_at && !end_at) {
                return array; // No date filters applied
            }

            const startDate = start_at ? moment(start_at).startOf('day') : null;
            const endDate = end_at ? moment(end_at).endOf('day') : null;

            const isDateInRange = (date: string) => {
                const dateMoment = moment(date);

                if (startDate && endDate && startDate.isSame(endDate, 'day')) {
                    return dateMoment.isSame(startDate, 'day');
                }
                if (startDate && endDate) {
                    return dateMoment.isBetween(startDate, endDate, undefined, '[]');
                }
                if (startDate) {
                    return dateMoment.isSameOrAfter(startDate);
                }
                if (endDate) {
                    return dateMoment.isSameOrBefore(endDate);
                }
                return true; // If both startDate and endDate are null
            };

            const filteredIndexes = Object.keys(indexes)
                .filter(isDateInRange)
                .flatMap((date) => indexes[date]);

            return array.filter((index) => filteredIndexes.includes(index));
        };

export const filterByFleet =
    (
        params: { trucks: string[]; drivers: string[]; trailer: string[] },
        trucksMap: Record<string, TruckModel_Truck>,
        indexes: {
            default: number[];
            truck: Record<string, number[]>;
            trailer: Record<string, number[]>;
            driver: Record<string, number[]>;
        }
    ) =>
        (array: number[]): number[] => {
            const {
                trucks,
                drivers,
                trailer
            } = params;

            // Initialize the filtered indexes with the original array
            let filteredIndexes: Set<number> = new Set(array);

            // Filter by trucks
            if (trucks.length) {
                const truckIndexes = trucks.flatMap((truckId) => indexes.truck[truckId] || []);
                filteredIndexes = new Set(
                    [...filteredIndexes].filter((index) => truckIndexes.includes(index))
                );
            }

            // Filter by drivers
            if (drivers.length) {
                const driverTruckIndexes = drivers.flatMap(
                    (driverId) => indexes.driver[driverId] || []
                );
                filteredIndexes = new Set(
                    [...filteredIndexes].filter((index) => driverTruckIndexes.includes(index))
                );
            }

            // Filter by trailers
            if (trailer.length) {
                const trailerIndexes = trailer.flatMap((trailerId) => indexes.trailer[trailerId] || []);
                filteredIndexes = new Set(
                    [...filteredIndexes].filter((index) => trailerIndexes.includes(index))
                );
            }

            return Array.from(filteredIndexes);
        };

const convertTimeFormat = (dateString: string) => {
    // Parse the input date string
    const date = moment(dateString, 'YYYY-MM-DD HH:mm:ss');

    // Format the date to the desired format
    const formattedDate = date.format('M/D HH:mm');

    return formattedDate;
};

export const searchFilter =
    (
        search: string,
        manifests: ManifestModel_Manifest[],
        trucksMap: Record<string, TruckModel_Truck>,
        driverMap: Record<string, DriverModel_Driver>
    ) =>
        (array: number[]): number[] => {
            if (!search.length) return array;
            const arr = search.split(':');
            const searchKey = arr[0];
            const searchValue = arr[1];

            if (searchKey === 'manifest_id') {
                return array.filter((index) => {
                    const manifest = manifests[index];
                    return manifest.friendlyId.toString() === searchValue;
                });
            }

            if (searchKey === 'order_id') {
                return array.filter((index) => {
                    const manifest = manifests[index];
                    return manifest.stops.some(
                        (stop) => stop.loadFriendlyId.toString() === searchValue
                    );
                });
            }

            return array.filter((index) => {
                const manifest = manifests[index];
                const truck = trucksMap[manifest.truckId];

                const originStop = manifest.stops[0];
                const destinationStop = manifest.stops[manifest.stops.length - 1];

                const originSearchLocation = originStop.location
                    ? `${originStop.location.city} ${originStop.location.state}`
                    : '';

                const originTime = convertTimeFormat(originStop.appointmentStartAtLocal);

                const destinationTime = convertTimeFormat(destinationStop.appointmentEndAtLocal);
                const destinationSearchLocation = destinationStop.location
                    ? `${destinationStop.location.city} ${destinationStop.location.state}`
                    : '';
                const loads = Array.from(
                    new Set(manifest.stops.map((stop) => stop.loadFriendlyId))
                ).join('');

                const driversSearch = manifest.driverIds
                    .map((driverId) => {
                        const d = driverMap[driverId];
                        return `${d.firstName}${d.lastName}`;
                    })
                    .join('');

                const searches = `${
                    truck?.referenceId || ''
                }${driversSearch}${loads}${originSearchLocation}${destinationSearchLocation}${originTime}${destinationTime}${
                    manifest.gross?.amount || ''
                }${manifest.loadedDistance?.miles || ''}${manifest.totalDistance?.miles || ''}${
                    FORMATTED_MANIFEST_STATUS[manifest.status]
                }${manifest.friendlyId}`
                    .trim()
                    .toLowerCase();

                return searches.includes(search.toLowerCase());
            });
        };
