export const hasNonEmptyArray = (obj: object) => {
    if (Array.isArray(obj)) {
        return obj.length > 0;
    }
    if (typeof obj === 'object') {
        return Object.values(obj).some(hasNonEmptyArray);
    }
    return false;
};
