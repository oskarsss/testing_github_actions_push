export const createMapQuickbooks = <T>(array: T[] | undefined, key: keyof T) => {
    if (!array) {
        return {} as Record<string, T>;
    }

    return array.reduce((acc, item) => {
        if (Array.isArray(item[key])) {
            (item[key] as string[]).forEach((id) => {
                acc[id] = item;
            });
        }
        return acc;
    }, {} as Record<string, T>);
};
