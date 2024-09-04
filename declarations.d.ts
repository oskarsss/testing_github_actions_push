export {};
declare global {
    interface Window {
        devdebug: (...args: any[]) => void;
        devGroup: (groupName: string, ...args: any[]) => void;
        __GRPCWEB_DEVTOOLS__: (services: any[]) => void;
    }

    // interface Symbol<T extends string | number> {
    //     description: T;
    // }
    // interface SymbolConstructor {
    //     <T extends string | number>(description?: T): symbol & { description: T };
    // }
}
