/* eslint-disable max-len */
import { GetLoadsRequest_SortBy } from '@proto/loads';
import { LoadModel_Status } from '@proto/models/model_load';
import { TruckModel_Truck } from '@proto/models/model_truck';
import moment from 'moment-timezone';
import { selectOrdersDataIndexes } from '../selectors';

const {
    GROSS_AMOUNT_ASC,
    GROSS_AMOUNT_DESC,
    LATEST,
    LOADED_MILES_ASC,
    LOADED_MILES_DESC,
    OLDEST,
    SMART_DISPATCH,
    TRUCK_NUMBER_ASC,
    TRUCK_NUMBER_DESC
} = GetLoadsRequest_SortBy;

/**
 * Sorts the existing array of indexes in place based on date strings.
 * @param {number[]} array - The array of indexes to sort.
 * @param {Record<string, number[]>} indexMap - A map where keys are date strings.
 * @param {boolean} ascending - Whether to sort in ascending order (default is true).
 */
const sortArrayByDate = (array: number[], indexMap: Record<string, number[]>, ascending = true) => {
    array.sort((a, b) => {
        const dateA = Object.keys(indexMap).find((key) => indexMap[key].includes(a));
        const dateB = Object.keys(indexMap).find((key) => indexMap[key].includes(b));

        if (!dateA || !dateB) {
            return 0;
        }

        const diff = moment(dateA).diff(moment(dateB));
        return ascending ? diff : -diff;
    });
};

/**
 * Sorts the existing array of indexes in place based on numerical values.
 * @param {number[]} array - The array of indexes to sort.
 * @param {Record<number, number[]>} indexMap - A map where keys are numbers.
 * @param {boolean} ascending - Whether to sort in ascending order (default is true).
 */
const sortArrayByNumerical = (
    array: number[],
    indexMap: Record<number, number[]>,
    ascending = true
) => {
    array.sort((a, b) => {
        const numA = Object.keys(indexMap).find((key) => indexMap[Number(key)].includes(a));
        const numB = Object.keys(indexMap).find((key) => indexMap[Number(key)].includes(b));

        if (numA === undefined || numB === undefined) {
            return 0;
        }

        return ascending ? Number(numA) - Number(numB) : Number(numB) - Number(numA);
    });
};

/**
 * Sorts the existing array of indexes in place based on truck reference numbers.
 * @param {number[]} array - The array of indexes to sort.
 * @param {Record<string, number[]>} truckIndexesMap - An index map where keys are truck identifiers.
 * @param {Record<string, TruckModel_Truck>} trucksMap - A map of trucks where each key is a truck ID.
 * @param {boolean} ascending - Whether to sort in ascending order (default is true).
 */
const sortArrayByTruckReferenceNumber = (
    array: number[],
    truckIndexesMap: Record<string, number[]>,
    trucksMap: Record<string, TruckModel_Truck>,
    ascending = true
) => {
    array.sort((a, b) => {
        // Find the truck keys for the given indexes
        const truckKeyA = Object.keys(truckIndexesMap).find((key) =>
            truckIndexesMap[key].includes(a));
        const truckKeyB = Object.keys(truckIndexesMap).find((key) =>
            truckIndexesMap[key].includes(b));

        // If either key is not found, consider them equal
        if (!truckKeyA || !truckKeyB) {
            return 0;
        }

        // Get the reference IDs from the truck keys
        const referenceIdA = trucksMap[truckKeyA]?.referenceId || '';
        const referenceIdB = trucksMap[truckKeyB]?.referenceId || '';

        // Sort based on reference ID
        return ascending
            ? referenceIdA.localeCompare(referenceIdB)
            : referenceIdB.localeCompare(referenceIdA);
    });
};

const statusOrder = [
    LoadModel_Status.pending,
    LoadModel_Status.assigned,
    LoadModel_Status.in_progress,
    LoadModel_Status.delivered,
    LoadModel_Status.canceled,
    LoadModel_Status.tonu,
    LoadModel_Status.deleted
];

/**
 * Sorts the existing array of indexes in place based on smart dispatch logic.
 * @param {number[]} array - The array of indexes to sort.
 * @param {Record<number, number[]>} loadStatusMap - A map where keys are load statuses.
 */
const sortArrayBySmartDispatch = (array: number[], loadStatusMap: Record<number, number[]>) => {
    array.sort((a, b) => {
        const statusA = Object.keys(loadStatusMap).find((status) =>
            loadStatusMap[Number(status)].includes(a));
        const statusB = Object.keys(loadStatusMap).find((status) =>
            loadStatusMap[Number(status)].includes(b));

        // Handle if status not found
        const indexA = statusOrder.indexOf(Number(statusA));
        const indexB = statusOrder.indexOf(Number(statusB));

        return indexA - indexB;
    });
};

export const sortByFilter =
    (
        params: { sortBy: GetLoadsRequest_SortBy },
        indexes: ReturnType<typeof selectOrdersDataIndexes>,
        trucksMap: Record<string, TruckModel_Truck>
    ) =>
        (array: number[]): number[] => {
            switch (params.sortBy) {
            case LATEST:
                sortArrayByDate(array, indexes.firstStopDate, false);
                break;
            case OLDEST:
                sortArrayByDate(array, indexes.firstStopDate, true);
                break;
            case GROSS_AMOUNT_DESC:
                sortArrayByNumerical(array, indexes.grossAmount, false);
                break;
            case GROSS_AMOUNT_ASC:
                sortArrayByNumerical(array, indexes.grossAmount, true);
                break;
            case LOADED_MILES_ASC:
                sortArrayByNumerical(array, indexes.loadedMiles, true);
                break;
            case LOADED_MILES_DESC:
                sortArrayByNumerical(array, indexes.loadedMiles, false);
                break;
            case TRUCK_NUMBER_ASC:
                sortArrayByTruckReferenceNumber(array, indexes.truck, trucksMap, true);
                break;
            case TRUCK_NUMBER_DESC:
                sortArrayByTruckReferenceNumber(array, indexes.truck, trucksMap, false);
                break;
            case SMART_DISPATCH:
                sortArrayBySmartDispatch(array, indexes.loadStatus);
                break;
            default:
                break;
            }
            return array; // Return the sorted array
        };
