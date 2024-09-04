type Value = string | string[] | number | boolean | Array<Value>;

type ObjectValue = { [key: string]: Value };

export type UniqueFilter = { [key: string]: unknown };

export function uniqueFilters<T extends UniqueFilter>(selectedFilters: T, defaultFilters: T): T {
    return Object.entries(selectedFilters).reduce((result, [key, value]) => {
        const defaultValue = defaultFilters[key as keyof T];
        if (value === defaultValue) {
            return result;
        }
        switch (typeof defaultValue) {
        case 'string':
            return {
                ...result,
                [key]: value
            };
        case 'number':
            return {
                ...result,
                ...(Number(value) ? { [key]: Number(value) } : {})
            };
        case 'boolean':
            return {
                ...result,
                ...(value === 'true' || value === 'false'
                    ? { [key]: value === 'true' }
                    : { [key]: value })
            };
        case 'object':
            if (typeof value !== 'object') {
                return result;
            }

            if (value && defaultValue) {
                if (Array.isArray(value) && Array.isArray(defaultValue)) {
                    return {
                        ...result,
                        [key]: [...value]
                    };
                }

                return {
                    ...result,
                    [key]: uniqueFilters(value as ObjectValue, defaultValue as ObjectValue)
                };
            }
            return result;
        default:
            return result;
        }
    }, {} as T);
}
