const createOptionsFromEnum = <T extends Record<string, any>>(
    enumEntity: T
): { name: keyof T; value: T[keyof T] }[] =>
        Object.entries(enumEntity).map(([name, value]) => ({ name, value }));

export default createOptionsFromEnum;
