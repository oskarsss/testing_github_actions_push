namespace Filters {
    export namespace Actions {
        export type SetInitialFilters = {
            filters?: object;
        };

        export type UpdateFilters = {
            id: string;
            filters: object;
        };
    }
}

export default Filters;
