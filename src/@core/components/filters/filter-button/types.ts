import TableTypes from '@/@core/components/table/types';
import { FilterModel_FilterID } from '@proto/models/model_filter_type';
import { IntlMessageKey } from '@/@types/next-intl';

namespace EntityFilters {
    export interface FilterReducerState
        extends Record<
            string,
            | (string | number)[]
            | string
            | number
            | TableTypes.Order
            | TableTypes.Order[]
            | boolean
            | any
        > {
        page: number;
        per_page: number;
        search: string;
        orderBy: string | string[];
        order: TableTypes.Order | TableTypes.Order[];
        tags?: number[];
        year?: number[];
        hire_date?: string[];
        age?: number[];
        created_at?: string[];
    }

    export type Filter = {
        filter_id?: string; // converted to -> FilterTypeModel_FilterTypeID
        filterId?: FilterModel_FilterID; // converted to -> FilterTypeModel_FilterTypeID
        counts?: Record<string, number>;
        amounts?: Record<string, string>;
    };

    export type FilterComponent = React.ComponentType<{
        filter_id: string;
        value: string | number | boolean | (string | number)[];
        onChange: (new_selected: (string | number)[], filter_type: string) => void;
    }>;

    export type FiltersList = Filter[];

    export type MergedFilter = Filter;
    export type MergedFilters = MergedFilter[];

    export type FilterConfigItem = {
        label: React.ReactNode;
        searchValue: string;
        value: string;
        count?: number;
    };

    export type FilterConfig = {
        label?: IntlMessageKey;
        filterItems: FilterConfigItem[];
        customTotalCount?: number;
    };
}

export default EntityFilters;
