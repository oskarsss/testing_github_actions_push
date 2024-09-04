import TableTypes from '@/@core/components/table/types';

type Comparator<T> = (a: T, b: T) => number;

const getValueByPath = <T>(obj: T, path: keyof T) =>
    (path as string).split('.').reduce((acc, part) => (acc as Record<string, any>)?.[part], obj);

const parseCurrency = (value: string): number => {
    const cleanedValue = value.replace(/,/g, '').replace(/[^\d.-]/g, '');
    return parseFloat(cleanedValue);
};

const isCurrencyString = (value: string): boolean => /[$€£¥₽]/.test(value);

const desc = <T>(a: T, b: T, orderBy: keyof T): number => {
    const aValue = getValueByPath<T>(a, orderBy);
    const bValue = getValueByPath<T>(b, orderBy);
    const aNullValue = aValue === null || aValue === undefined;
    const bNullValue = bValue === null || bValue === undefined;

    if (aNullValue && bNullValue) {
        return 0;
    }
    if (aNullValue) {
        return 1;
    }
    if (bNullValue) {
        return -1;
    }

    if (typeof aValue === 'number' && typeof bValue === 'number') {
        // Numeric comparison
        return bValue - aValue;
    }

    const aStr = String(aValue);
    const bStr = String(bValue);

    if (isCurrencyString(aStr) && isCurrencyString(bStr)) {
        const parsedA = parseCurrency(aStr);
        const parsedB = parseCurrency(bStr);
        if (!Number.isNaN(parsedA) && !Number.isNaN(parsedB)) {
            return parsedB - parsedA;
        }
    }

    return bStr.localeCompare(aStr);
};

export const stableSort = <T>(array: T[], cmp: Comparator<T>): T[] =>
    array
        .map((el, index) => [el, index] as [T, number])
        .sort((a, b) => {
            const order = cmp(a[0], b[0]);

            return order === 0 ? a[1] - b[1] : order;
        })
        .map((el) => el[0]);

export const getSorting = <T>(
    order: TableTypes.Order | TableTypes.Order[],
    orderBy: keyof T | (keyof T)[]
): Comparator<T> => {
    if (typeof orderBy === 'string' && typeof order === 'string') {
        return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
    }

    return (a, b) => {
        if (!Array.isArray(order) || !Array.isArray(orderBy)) {
            return 0;
        }

        return order.reduce((acc, orderValue, index) => {
            const compValue = desc(a, b, orderBy[index]);

            return acc + (orderValue === 'desc' ? compValue : -compValue);
        }, 0);
    };
};
