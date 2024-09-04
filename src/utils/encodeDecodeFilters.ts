export const decodeQueryFilters = <T>(filters: T): T =>
    filters
        ? decodeDecomposedObject(
            Object.entries(filters).reduce((acc, [key, value]) => {
                if (value === 'true' || value === 'false') {
                    return { ...acc, [key]: value === 'true' };
                }
                if (typeof value === 'string' && value.endsWith('[]')) {
                    return { ...acc, [key]: value.slice(0, -2).split(',') };
                }
                return { ...acc, [key]: value };
            }, {} as T)
        )
        : ({} as T);

export const encodeQueryFilters = <T extends object>(
    filters: T
): Record<string, string | string[]> =>
        Object.entries(filters).reduce((acc, [key, value]) => {
            if (Array.isArray(value)) {
                if (value.length > 0) {
                    return { ...acc, [key]: `${value.join(',')}[]` };
                }
                return acc;
            }
            if (typeof value === 'object' && value !== null) {
                const decomposed = decomposeObject(value, `${key}.`);

                Object.entries(decomposed).forEach(([decomposedKey, decomposedValue]) => {
                    if (decomposedValue === 'false' || !decomposedValue) {
                        delete acc[decomposedKey];
                        return;
                    }
                    (acc as Record<string, unknown>)[decomposedKey] = decomposedValue;
                });
                return acc;
            }

            return { ...acc, [key]: String(value) };
        }, {} as Record<string, string | string[]>);

function decomposeObject(obj: object, prefix = '') {
    const result: Record<string, unknown> = {};

    Object.entries(obj).forEach(([key, value]) => {
        if (typeof value === 'object' && value !== null) {
            Object.assign(result, decomposeObject(value, `${prefix}${key}.`));
        } else {
            result[`${prefix}${key}`] = value;
        }
    });

    return result;
}

function decodeDecomposedObject<T>(input: T): T {
    const result: object = {};

    // eslint-disable-next-line no-restricted-syntax
    for (const key in input) {
        if (Object.prototype.hasOwnProperty.call(input, key)) {
            const keys = key.split('.');
            let currentObject = result;

            // eslint-disable-next-line no-plusplus
            for (let i = 0; i < keys.length; i++) {
                const currentKey = keys[i];

                if (i === keys.length - 1) {
                    // Если последний уровень, устанавливаем значение
                    // @ts-ignore
                    currentObject[currentKey] = input[key];
                } else {
                    // Если не последний уровень, создаем новый объект, если его еще нет
                    // @ts-ignore
                    currentObject[currentKey] = currentObject[currentKey] || {};

                    // @ts-ignore
                    currentObject = currentObject[currentKey];
                }
            }
        }
    }

    return result as T;
}
