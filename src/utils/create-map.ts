const createMap = <T>(array: T[], key: keyof T) =>
    array.reduce<Record<string, T>>((acc, item) => {
        acc[item[key] as string] = item;

        return acc;
    }, {});

export default createMap;
