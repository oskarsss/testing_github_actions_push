export function getLocationColor(
    location: object | undefined,
    isOnline: boolean
): 'blue_dark' | 'gray' | 'error' {
    // eslint-disable-next-line no-nested-ternary
    return location ? (isOnline ? 'blue_dark' : 'gray') : 'error';
}
