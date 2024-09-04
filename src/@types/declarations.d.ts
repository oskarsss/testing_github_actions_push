export {};
declare global {
    interface Window {
        expandedLogs?: boolean;
        showDevLogs?: boolean;
        devLogsFilter?: string[];

        enableDevLogs: () => void;
        disableDevLogs: () => void;
        filterDevLogs: (filter: string[]) => void;
        clearDevLogsFilter: () => void;
        convertToSnakeCase: <T extends object>(obj: T) => T;
    }
}
