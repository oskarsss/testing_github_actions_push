import TableTypes from '@/@core/components/table/types';

export const DEFAULT_FILTERS = {
    page    : 0,
    per_page: 50,
    search  : '',
    order   : 'asc' as TableTypes.Order
};

export default function createFilters<
    T extends { orderBy: string | string[] } & Record<string, any> = { orderBy: string | string[] }
>(update: T) {
    return { ...DEFAULT_FILTERS, ...update };
}
