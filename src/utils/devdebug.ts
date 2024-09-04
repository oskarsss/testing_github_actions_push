export const devdebug = (...args: unknown[]) => {
    if (process.env.NODE_ENV === 'development') {
        console.debug(...args);
    }
};

export function dev_toSnakeCase<T extends object>(obj: T): T {
    try {
        if (Array.isArray(obj)) {
            // @ts-expect-error
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return obj.map(dev_toSnakeCase);
        }
        if (obj !== null && obj?.constructor === Object) {
            return Object.keys(obj).reduce((acc, key) => {
                const snakeCaseKey = key.replace(/([A-Z])/g, '_$1').toLowerCase() as keyof T;

                // @ts-expect-error
                acc[snakeCaseKey] = dev_toSnakeCase(obj[key]);
                return acc;
            }, {} as T);
        }
        return obj;
    } catch (error) {
        console.error('Error converting to snake case', error);
        return obj;
    }
}

export const devGroup = (groupName: string, ...args: unknown[]) => {
    const filters = JSON.parse(window.localStorage.getItem('devLogsFilter') ?? '[]') as string[];
    const filterApplied = filters?.length > 0;
    const isFiltered = filterApplied
        ? filters?.some((filter) => groupName.toLowerCase().includes(filter.toLowerCase()))
        : true;
    if (process.env.NEXT_PUBLIC_APP_ENV !== 'production' && window.showDevLogs && isFiltered) {
        if (window.expandedLogs) {
            console.group(groupName);
        } else {
            console.groupCollapsed(groupName);
        }
        // eslint-disable-next-line no-restricted-syntax
        for (const arg of args) {
            if (Array.isArray(arg)) {
                console.debug(...(arg as object[]));
            } else {
                console.debug(arg);
            }
        }
        console.groupEnd();
    }
};

if (typeof window !== 'undefined') {
    window.devdebug = devdebug;
    window.devGroup = devGroup;

    window.convertToSnakeCase = dev_toSnakeCase;

    window.expandedLogs = false;
    window.showDevLogs =
        process.env.SHOW_DEV_LOGS === 'true' ||
        window.localStorage.getItem('showDevLogs') === 'true';

    window.enableDevLogs = () => {
        window.showDevLogs = true;
        window.localStorage.setItem('showDevLogs', 'true');
    };

    window.disableDevLogs = () => {
        window.showDevLogs = false;
        window.localStorage.setItem('showDevLogs', 'false');
    };

    window.filterDevLogs = (filter: string[]) => {
        window.devLogsFilter = filter;
        window.localStorage.setItem('devLogsFilter', JSON.stringify(filter));
    };

    window.clearDevLogsFilter = () => {
        window.devLogsFilter = [];
        window.localStorage.removeItem('devLogsFilter');
    };
}
