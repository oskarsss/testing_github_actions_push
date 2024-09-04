export default function objectEntries<T>(obj: { [P in keyof T]: T[P] }): [keyof T, T[keyof T]][] {
    return Object.entries(obj) as [keyof T, T[keyof T]][];
}
