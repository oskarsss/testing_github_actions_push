function findLastIndex<T>(array: T[], predicate: (value: T) => boolean): number {
    const index = array.slice().reverse().findIndex(predicate);
    return index !== -1 ? array.length - 1 - index : -1;
}

export default findLastIndex;
