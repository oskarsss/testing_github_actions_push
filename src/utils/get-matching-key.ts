/* eslint-disable no-restricted-syntax */
type StyleObject<T> = {
    [key in keyof T]: boolean;
};

export function getMatchingKey<T>(obj: StyleObject<T>): keyof T | null {
    for (const key in obj) {
        if (obj[key]) {
            return key as keyof T;
        }
    }
    return null;
}
