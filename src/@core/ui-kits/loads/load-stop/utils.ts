import ManifestsTypes from '@/store/dispatch/manifests/types';

export const reorderStops = (
    list: ManifestsTypes.AnyPreparedStop[],
    startIndex: number,
    endIndex: number
): ManifestsTypes.AnyPreparedStop[] => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

export enum TableMode {
    EDIT_ROUTE = 'EDIT_ROUTE',
    TAKE_ROUTE = 'TAKE_ROUTE',
    NONE = 'NONE'
}
